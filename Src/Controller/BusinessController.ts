import { Request, Response } from 'express'
import BusinessRepo from '../Repositories/BusinessRepo'
import { Types } from 'mongoose'
import IBusiness from '../Interfaces/IBusiness'

const BusinessController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const userId = req.user?._id
      const business = await BusinessRepo.create({
        businessOwner: userId,
        ...req.body,
      })
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(req, res, error)
    }
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      const business = await BusinessRepo.update(req.params.id as string, {
        ownerRef: req.user?._id,
        ...req.body,
      })
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(req, res, error)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      let _query: IBusiness.Query = req.params
      const business = await BusinessRepo.query(_query)
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(req, res, error)
    }
  },
}
export default BusinessController
