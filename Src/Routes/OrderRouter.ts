import express from 'express'
import OrderController from '../Controller/OrderController'
const OrderRouter = express.Router()
OrderRouter.post('/', OrderController.create)
OrderRouter.get('/', OrderController.query)
export default OrderRouter
