import express from 'express'
import TransactionController from '../Controller/TransactionController'
import Authentication from '../Middlewares/Authentication'
const TransactionRouter = express.Router()
TransactionRouter.use(Authentication.userAuth)
TransactionRouter.post("/create-card-intent", TransactionController.createCardIntent)
TransactionRouter.post("/delete-card/:id", TransactionController.deleteCard)
TransactionRouter.post("/create-payment-intent", TransactionController.createPaymentIntent)
TransactionRouter.post("/wallet-payment", TransactionController.walletPayment)
TransactionRouter.post("/webhook", express.raw({ type: 'application/json' }), TransactionController.webhook)
TransactionRouter.get("/cards", TransactionController.getCards)
TransactionRouter.get("/query", TransactionController.query)
export default TransactionRouter
