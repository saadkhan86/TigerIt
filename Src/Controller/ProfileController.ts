import { Request, Response } from 'express'
import ProfileRepo from '../Repositories/ProfileRepo'

const ProfileController = {
  profile: async (req: Request, res: Response, next: Function) => {
    res.status(200).json({ success: true, user: req.user })
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      const profile = await ProfileRepo.update(req.user?._id!,{...req.body})
      res.status(200).json({ success: true, profile })
    } catch (error) {
      next(error)
    }
  },
}

export default ProfileController
