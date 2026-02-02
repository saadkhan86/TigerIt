import { Request, Response } from 'express'
import ProfileRepo from '../Repositories/ProfileRepo'
import BusinessRepo from '../Repositories/BusinessRepo'
import VerificationRepo from '../Repositories/VerificationRepo'
const VerificationController = {
  verificationCreate: async (req: Request, res: Response, next: Function) => {
    try {
      const verification = await VerificationRepo.userVerificationCreate({
        ...req.body,
      })
      res.status(200).json({ success: true, verification })
    } catch (error) {
      next(req, res, error)
    }
  },
  userVerificationUpdate: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const user = await VerificationRepo.userVerificationUpdate(req.body)
      res.status(200).json({ success: true, user })
    } catch (error) {
      next(req, res, error)
    }
  },
  businessVerificationUpdate: async (
    req: Request,
    res: Response,
    next: Function,
  ) => {
    try {
      const business = await VerificationRepo.businessVerificationUpdate(
        req.body,
      )
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(req, res, error)
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
      next(req, res, error)
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
      next(req, res, error)
    }
  },
}
export default VerificationController
