import { Request, Response } from 'express'
import ProfileRepo from '../Repositories/ProfileRepo'

const ProfileController = {
  profile: async (req: Request, res: Response, next: Function) => {
    let user = req.user
    res.status(200).json({ success: true, user: user })
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      const data = req.body
      const profile = await ProfileRepo.update(req.user?._id!, data)
      res.status(200).json({ success: true, profile: profile })
    } catch (error) {
      next(req, res, error)
    }
  },
}

export default ProfileController
