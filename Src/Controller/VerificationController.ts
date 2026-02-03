import { Request, Response } from 'express'
import ProfileRepo from '../Repositories/ProfileRepo'
import BusinessRepo from '../Repositories/BusinessRepo'
import VerificationRepo from '../Repositories/VerificationRepo'
const VerificationController = {
  verificationCreate: async (req: Request, res: Response, next: Function) => {
    try {
      const verification = await VerificationRepo.userVerificationCreate({
        userRef: req.user!._id,
        ...req.body,
      })
      res.status(200).json({ success: true, verification })
    } catch (error) {
      next(error, req, res)
    }
  },
  userVerificationUpdate: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const user = await VerificationRepo.userVerificationUpdate({ verificationId: req.params.id, ...req.body })
      res.status(200).json({ success: true, user })
    } catch (error) {
      next(error, req, res)
    }
  },
  businessVerificationUpdate: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const business = await VerificationRepo.businessVerificationUpdate({ businessId: req.params.id as string, approvalStatus: req.body.approvalStatus })
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(error, req, res)
    }
  },
  userVerificationQuery: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const users = await VerificationRepo.userVerificationQuery({
        ...req.query,
      })
      res.status(200).json({ success: true, users })
    } catch (error) {
      next(error, req, res)
    }
  },
  businessVerificationQuery: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const business = await BusinessRepo.query({ ...req.query })
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(error, req, res)
    }
  },
}
export default VerificationController
