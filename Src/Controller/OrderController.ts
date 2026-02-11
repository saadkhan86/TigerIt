import { Request, Response } from 'express'
import OrderRepo from '../Repositories/OrderRepo'

const OrderController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const order = await OrderRepo.create({
        customerRef: req.user!._id,
        paymentMethod: req.body.paymentMethod,
        tip: req.body.tip || 0,
        pickupPlaceId: req.body.pickupPlaceId,
        deliveryPlaceId: req.body.deliveryPlaceId,
        items: req.body.items
      })
      res.status(200).json({ success: true, order })
    } catch (error) {
      next(error, req, res)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const order = await OrderRepo.query(req.query)
      res.status(200).json({ success: true, order })
    } catch (error) {
      next(error, req, res)
    }
  },
}
export default OrderController
