import { Request, Response } from 'express'
import CheckoutRepo from '../Repositories/CheckoutRepo'
import { Types } from 'mongoose'

const CheckoutController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const checkout = await CheckoutRepo.create({
        customerRef: new Types.ObjectId(req.user!._id),
        paymentMethod: req.body.paymentMethod,
        tip: req.body.tip,
        pickupPlaceId: req.body.pickupPlaceId,
        deliveryPlaceId: req.body.deliveryPlaceId,
        deliveryFee: req.body.deliveryFee,
        items: req.body.items,
      })
      res.status(200).json({ success: true, checkout })
    } catch (error) {
      next(error, req, res)
    }
  },
}
export default CheckoutController
