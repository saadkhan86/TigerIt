import { Request, Response } from "express";
import stripeAuthentication from "../Middlewares/stripeAuthentication";
import stripe from "../Config/Stripe";
import ITransaction from "../Interfaces/ITransaction";
import TransactionRepo from "../Repositories/TransactionRepo";

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
    }, paymentIntent: async (req: Request, res: Response, next: Function) => {
        try {
            const paymentIntent: ITransaction.IPaymentIntent = await stripe.paymentIntents.create({
                customer: req.user?.stripeCustomerId,
                amount: Math.round(req.body.amount * 100),
                receipt_email: req.user?.email,
                payment_method: req.body.paymentMethodId,
                description: req.body.paymentType,//topup || order
                currency: req.body.currency || "usd",
                statement_descriptor_suffix: "TigerIt Delivery",
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: "never",
                },
                metadata: {
                    userId: req.user!._id.toString(),
                    isPickup: req.body.isPickup || false,
                    orderId: req.body.orderId || null
                }

            })
            res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret })
        } catch (error) {
            next(error, req, res)
        }
    }, webhook: async (req: Request, res: Response) => {
        try {
            //pending
            res.status(200).json({ succesS: true })
        } catch (error) {

        }
    }, query: async (req: Request, res: Response, next: Function) => {
        try {
            let query: ITransaction.Query = req.query
            query.userId = req.user!._id
            const transactions = await TransactionRepo.query(query)
            res.status(200).json({ succesS: true, transactions })
        } catch (error) {
            next(error, req, res)
        }
    }
}
export default TransactionController