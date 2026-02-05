import { Request, Response } from 'express'
import CheckoutRepo from '../Repositories/CheckoutRepo'

const CheckoutController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const checkout = await CheckoutRepo.create({
        customerId: req.user!._id,
        tip: req.body.tip,
        pickupPlaceId: req.body.pickupPlaceId,
        deliveryPlaceId: req.body.deliveryPlaceId,
        items: req.body.items,
      })
      res.status(200).json({ success: true, checkout })
    } catch (error) {
      next(error, req, res)
    }
  },
}
export default CheckoutController
