import CheckoutController from '../Controller/CheckoutController'
import express from 'express'
import Authentication from '../Middlewares/Authentication'

const CheckoutRouter = express.Router()
CheckoutRouter.post('/', Authentication.userAuth, CheckoutController.create)
export default CheckoutRouter
