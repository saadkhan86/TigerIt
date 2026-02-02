import { Request, Response } from 'express'
import Admin from '../Firebase/Admin'
import UserModel from '../Models/User.Model'

const Authentication = {
  userAuth: async (req: Request, res: Response, next: Function) => {
    try {
      var token: string | null = null
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1]
      }
      if (!token || token === undefined) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
      }
      const decoded = await Admin.auth().verifyIdToken(token!)
      if (!decoded) {
        res
          .status(401)
          .json({ success: false, message: 'Invalid Token Provided' })
      }
      var user = await UserModel.findOne({ firebaseId: decoded.uid })
      if (!user) {
        user = await UserModel.create({
          phone: decoded.phone_number,
          firebaseId: decoded.uid,
        })
      }
      req.user = user
      return next()
    } catch (error: any) {
      next(req, res, error)
    }
  },
}
