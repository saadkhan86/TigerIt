import { Request, Response } from 'express'
import CheckoutRepo from '../Repositories/CheckoutRepo'
import { Types } from 'mongoose'

const CheckoutController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const checkout = await CheckoutRepo.create({
        customerId: req.user!._id,
        tip: req.body.tip,
        serviceFee: 0,
        pickupPlaceId: req.body.pickupPlaceId,
        deliveryPlaceId: req.body.deliveryPlaceId,
        deliveryFee: req.body.deliveryFee,
        items: req.body.items,
      })
      res.status(200).json({ success: true, checkout })
    } catch (error) {
      next(req, res, error)
    }
  },
}
export default CheckoutController
