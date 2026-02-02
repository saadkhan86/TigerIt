import { Request, Response } from 'express'
import OrderRepo from '../Repositories/OrderRepo'

const OrderController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const order = await OrderRepo.create({
        customerRef: req.user?._id,
        ...req.body,
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
