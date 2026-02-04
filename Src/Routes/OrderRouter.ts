import express from 'express'
import OrderController from '../Controller/OrderController'
import Authentication from '../Middlewares/Authentication'
const OrderRouter = express.Router()
OrderRouter.use(Authentication.userAuth)
OrderRouter.post('/', OrderController.create)
OrderRouter.get('/', OrderController.query)
export default OrderRouter
