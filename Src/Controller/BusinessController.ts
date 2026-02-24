import { Request, Response } from "express"
import BusinessRepo from "../Repositories/BusinessRepo"
import { Types } from "mongoose"
import { IBusiness } from "../Interfaces/IBusiness"

const BusinessController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const userId = req.user?._id
      const business = await BusinessRepo.create({
        ownerRef: new Types.ObjectId(userId!),
        businessTitle: req.body.businessTitle,
        businessEmail: req.body.businessEmail,
        businessAddress: req.body.businessAddress,
        businessPhone: req.body.businessPhone,
        businessCoverImage: req.body.businessCoverImage,
        businessProfileImage: req.body.businessProfileImage,
        businessDescription: req.body.businessDescription,
      })
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(error, req, res)
    }
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      let data: IBusiness.Update = {}
      data.ownerRef = new Types.ObjectId(req.user?._id!)
      if (req.body.businessTitle) data.businessTitle = req.body.businessTitle
      if (req.body.businessEmail) data.businessEmail = req.body.businessEmail
      if (req.body.businessAddress)
        data.businessAddress = req.body.businessAddress
      if (req.body.businessPhone) data.businessPhone = req.body.businessPhone
      if (req.body.businessCoverImage)
        data.businessCoverImage = req.body.businessCoverImage
      if (req.body.businessProfileImage)
        data.businessProfileImage = req.body.businessProfileImage
      if (req.body.businessDescription)
        data.businessDescription = req.body.businessDescription
      const business = await BusinessRepo.update(req.params.id as string, data)
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(error, req, res)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      let _query: IBusiness.Query = req.query
      const business = await BusinessRepo.query(_query)
      res.status(200).json({ success: true, business })
    } catch (error) {
      next(error, req, res)
    }
  },
}
export default BusinessController
