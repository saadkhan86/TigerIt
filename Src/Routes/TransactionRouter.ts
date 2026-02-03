import express from 'express'
import TransactionController from '../Controller/TransactionController'
const TransactionRouter = express.Router()
TransactionRouter.post("/create-card-intent", TransactionController.createCardIntent)
TransactionRouter.post("/delete-card/:id", TransactionController.deleteCard)
TransactionRouter.post("/payment-intent", TransactionController.paymentIntent)
TransactionRouter.post("/webhook", TransactionController.webhook)
TransactionRouter.get("/cards", TransactionController.getCards)
TransactionRouter.get("/query", TransactionController.query)
export default TransactionRouter
