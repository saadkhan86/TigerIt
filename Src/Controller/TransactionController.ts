import { Request, Response } from "express";
import stripeAuthentication from "../Middlewares/stripeAuthentication";
import stripe from "../Config/Stripe";
import ITransaction from "../Interfaces/ITransaction";
import TransactionRepo from "../Repositories/TransactionRepo";
import Stripe from "stripe";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import OrderRepo from "../Repositories/OrderRepo";
import WalletRepo from "../Repositories/WalletRepo";
import sendEmail from "../Services/SendEmail";
import ProductModel from "../Models/Product.Model";
import BusinessModel from "../Models/Business.Model";

const TransactionController = {
    createCardIntent: async (req: Request, res: Response, next: Function) => {
        try {
            const customerId = await stripeAuthentication(req.user!)
            const setupIntent = await stripe.setupIntents.create({
                customer: customerId,
            })
            res.status(200).json({ success: true, clientSecret: setupIntent.client_secret })
        } catch (error) {
            next(error, req, res)
        }
    }
    , getCards: async (req: Request, res: Response, next: Function) => {
        try {
            const cards = await stripe.paymentMethods.list({
                customer: req.user!.stripeCustomerId,
            })
            res.status(200).json({ success: true, cards })
        } catch (error) {
            next(error, req, res)
        }
    }, deleteCard: async (req: Request, res: Response, next: Function) => {
        try {
            const remove = await stripe.paymentMethods.detach(req.params.id as string)
            res.status(200).json({ success: true, remove })
        } catch (error) {
            next(error, req, res)
        }
    }, createPaymentIntent: async (req: Request, res: Response, next: Function) => {
        try {
            if (req.body.orderId) {
                const order = await OrderRepo.GetById(req.body.orderId)
                if (!order || order.paymentStatus === "paid") throw new ErrorHandler(404, "Order not found or already paid")
                req.body.amount = order.totalAmount
            }
            const paymentIntent: ITransaction.IPaymentIntent = await stripe.paymentIntents.create({
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
                    isPickup: req.body.isPickup === "yes" ? 'yes' : 'no',
                    orderId: req.body.orderId || null
                }
            })
            res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret })
        } catch (error) {
            next(error, req, res)
        }
    }, webhook: async (req: Request, res: Response, next: Function) => {
        try {
            const sig = req.headers['stripe-signature'] as string
            const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
            if (event.type === 'payment_intent.succeeded') {
                const intent = event.data.object as Stripe.PaymentIntent
                const charge = await stripe.charges.retrieve(intent.latest_charge as string)
                const card = charge.payment_method_details?.card
                const transaction = await TransactionRepo.create({
                    userId: intent.metadata.userId as string,
                    orderId: intent.metadata.orderId || null,
                    paymentId: intent.id,
                    transactionType: intent.description as "topup" | "purchase",
                    amount: intent.amount / 100,
                    currency: intent.currency,
                })

                if (intent.metadata.orderId) {
                    const order = await OrderRepo.Update({ orderId: intent.metadata.orderId, paymentStatus: "paid" })
                    if (order && order.paymentStatus === "paid") {
                        const productIds = order.items.map(item => item.product)
                        const products = await ProductModel.find({ _id: { $in: productIds } })
                        const businessIds = [...new Set(products.map(p => p.createdBy.toString()))]
                        const businesses = await BusinessModel.find({ _id: { $in: businessIds } })

                        await Promise.all(businesses.map(business =>
                            sendEmail("business_notification", "New Order Received", {
                                userId: business.ownerRef.toString(),
                                email: business.businessEmail,
                                name: business.businessTitle
                            }, order._id.toString())
                        ))
                    }
                }
                if (intent.description === 'topup' && intent.metadata.orderId == null) {
                    const wallet = await WalletRepo.topupUpdate(intent.metadata.userId as string, intent.amount / 100)
                    return await sendEmail("topup", "Payment Successfull", { userId: intent.metadata.userId as string, email: intent.receipt_email as string, name: intent.metadata.name as string }, null)
                } else if (intent.description === 'purchase' && intent.metadata.orderId) {
                    const order = await OrderRepo.GetById(intent.metadata.orderId as string)
                    if (!order) throw new ErrorHandler(404, "Order not found")
                    return await sendEmail("transaction", "Payment Successfull", { userId: intent.metadata.userId as string, email: intent.receipt_email as string, name: intent.metadata.name as string }, intent.metadata.orderId as string)
                }
            }
            res.status(200).json({ success: true, message: "Payment Successfull" })
        } catch (error) {
            next(error, req, res)
        }
    }, query: async (req: Request, res: Response, next: Function) => {
        try {
            let query: ITransaction.Query = req.query
            query.userId = req.user!._id.toString()
            const transactions = await TransactionRepo.query(query)
            res.status(200).json({ succesS: true, transactions })
        } catch (error) {
            next(error, req, res)
        }
    }
}
export default TransactionController