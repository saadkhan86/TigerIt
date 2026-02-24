import { Request, Response } from "express"
import stripeAuthentication from "../Middlewares/stripeAuthentication"
import stripe from "../Config/Stripe"
import { ITransaction } from "../Interfaces/ITransaction"
import TransactionRepo from "../Repositories/TransactionRepo"
import Stripe from "stripe"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import OrderRepo from "../Repositories/OrderRepo"
import WalletRepo from "../Repositories/WalletRepo"
import sendEmail from "../Services/SendEmail"
import ProductModel from "../Models/Product.Model"

const TransactionController = {
  createCardIntent: async (req: Request, res: Response, next: Function) => {
    try {
      const customerId = await stripeAuthentication(req.user!)
      const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
      })
      res
        .status(200)
        .json({ success: true, clientSecret: setupIntent.client_secret })
    } catch (error) {
      next(error, req, res)
    }
  },
  getCards: async (req: Request, res: Response, next: Function) => {
    try {
      const cards = await stripe.paymentMethods.list({
        customer: req.user!.stripeCustomerId,
      })
      res.status(200).json({ success: true, cards })
    } catch (error) {
      next(error, req, res)
    }
  },
  deleteCard: async (req: Request, res: Response, next: Function) => {
    try {
      const remove = await stripe.paymentMethods.detach(req.params.id as string)
      res.status(200).json({ success: true, remove })
    } catch (error) {
      next(error, req, res)
    }
  },
  createPaymentIntent: async (req: Request, res: Response, next: Function) => {
    try {
      if (req.body.orderId) {
        const order = await OrderRepo.GetById(req.body.orderId)
        if (!order || order.paymentStatus === "paid")
          throw new ErrorHandler(404, "Order not found or already paid")
        req.body.amount = order.totalAmount
      }
      const paymentIntent: ITransaction.IPaymentIntent =
        await stripe.paymentIntents.create({
          customer: req.user?.stripeCustomerId,
          amount: Math.round(req.body.amount * 100),
          receipt_email: req.user?.email,
          payment_method: req.body.paymentMethodId,
          description: req.body.paymentType,
          currency: req.body.currency || "usd",
          statement_descriptor_suffix: "TigerIt Delivery",
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never",
          },
          metadata: {
            userId: req.user!._id.toString(),
            name: req.user!.name,
            isPickup: req.body.isPickup === "yes" ? "yes" : "no",
            orderId: req.body.orderId || null,
          },
        })
      res
        .status(200)
        .json({ success: true, clientSecret: paymentIntent.client_secret })
    } catch (error) {
      next(error, req, res)
    }
  },
  webhook: async (req: Request, res: Response, next: Function) => {
    try {
      const sig = req.headers["stripe-signature"] as string
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      )

      if (event.type === "payment_intent.succeeded") {
        const intent = event.data.object as Stripe.PaymentIntent
        const { userId, orderId, name } = intent.metadata
        const existingTransaction = await TransactionRepo.query({
          paymentId: intent.id,
          userId: userId as string,
        })
        if (existingTransaction) {
          return res
            .status(200)
            .json({ success: true, message: "Webhook already processed" })
        }
        await TransactionRepo.create({
          userId: userId as string,
          orderId: orderId || null,
          paymentId: intent.id,
          transactionType: intent.description as "topup" | "purchase",
          amount: intent.amount / 100,
          currency: intent.currency,
        })

        if (orderId) {
          const order = await OrderRepo.Update({
            orderId: orderId as string,
            paymentStatus: "paid",
            paymentMethod: "card",
          })
          if (order) {
            ;(async () => {
              try {
                if (order.items && order.items.length > 0) {
                  //all items in an order belong to the same business
                  const firstProductId = order.items[0].product
                  const product =
                    await ProductModel.findById(firstProductId).populate(
                      "createdBy",
                    )

                  if (product && product.createdBy) {
                    const business = product.createdBy as any
                    await sendEmail(
                      "business_notification",
                      "New Order Received",
                      {
                        userId: business.ownerRef.toString(),
                        email: business.businessEmail,
                        name: business.businessTitle,
                      },
                      order._id.toString(),
                    )
                  }
                }
              } catch (error) {
                console.error("Error in business notification:", error)
              }
            })()

            await sendEmail(
              "transaction",
              "Payment Successful",
              {
                userId: userId as string,
                email: intent.receipt_email as string,
                name: name as string,
              },
              orderId as string,
            ).catch((e) => console.error("Error sending user email:", e))
          }
        } else if (intent.description === "topup") {
          await WalletRepo.topupUpdate(userId as string, intent.amount / 100)
          await sendEmail(
            "topup",
            "Payment Successful",
            {
              userId: userId as string,
              email: intent.receipt_email as string,
              name: name as string,
            },
            null,
          ).catch((e) => console.error("Error sending topup email:", e))
        }
      }

      res.status(200).json({ success: true, message: "Payment Created" })
    } catch (error) {
      next(error, req, res)
    }
  },
  walletPayment: async (req: Request, res: Response, next: Function) => {
    try {
      const { orderId } = req.body
      const userId = req.user!._id.toString()

      const order = await OrderRepo.GetById(orderId)
      if (!order || order.paymentStatus === "paid") {
        throw new ErrorHandler(404, "Order not found or already paid")
      }

      const walletBalance = await WalletRepo.query(userId)
      if (walletBalance.balance.amount < order.totalAmount) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Topup to update wallet or purchase product by card",
          })
      }

      await WalletRepo.decrement(userId, order.totalAmount)
      await OrderRepo.Update({
        orderId: orderId,
        paymentStatus: "paid",
        paymentMethod: "wallet",
      })

      await TransactionRepo.create({
        userId: userId,
        orderId: orderId,
        paymentId: `wallet_${new Date().getTime()}`,
        transactionType: "purchase",
        amount: order.totalAmount,
        currency: "$",
      })

      ;(async () => {
        try {
          if (order.items && order.items.length > 0) {
            const firstProductId = order.items[0].product
            const product =
              await ProductModel.findById(firstProductId).populate("createdBy")
            if (product && product.createdBy) {
              const business = product.createdBy as any
              await sendEmail(
                "business_notification",
                "New Order Received",
                {
                  userId: business.ownerRef.toString(),
                  email: business.businessEmail,
                  name: business.businessTitle,
                },
                order._id.toString(),
              )
            }
          }
          await sendEmail(
            "transaction",
            "Payment Successful",
            {
              userId: userId,
              email: req.user!.email,
              name: req.user!.name,
            },
            orderId,
          )
        } catch (error) {
          console.error("Error in wallet payment notification:", error)
        }
      })()

      res.status(200).json({ success: true, message: "Payment Successful" })
    } catch (error) {
      next(error, req, res)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      let query: ITransaction.Query = req.query
      query.userId = req.user!._id.toString()
      const transactions = await TransactionRepo.query(query)
      res.status(200).json({ succesS: true, transactions })
    } catch (error) {
      next(error, req, res)
    }
  },
}
export default TransactionController
