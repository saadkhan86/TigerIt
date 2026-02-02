import CheckoutController from '../Controller/CheckoutController'
import express from 'express'

const CheckoutRouter = express.Router()
CheckoutRouter.post('/', CheckoutController.create)
export default CheckoutRouter
