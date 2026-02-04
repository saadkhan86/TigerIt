import { Request, Response } from 'express'
import OrderRepo from '../Repositories/OrderRepo'
import { Types } from 'mongoose'

const OrderController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const order = await OrderRepo.create({
        customerRef: new Types.ObjectId(req.user?._id),
        paymentMethod: req.body.paymentMethod,
        tip: req.body.tip,
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
