import { Request, Response } from "express"
import Admin from '../Firebase/Admin'
import UserModel from "../Models/User.Model"
import AdminModel from "../Models/Admin.Model"

const Authentication = {
  userAuth: async (req: Request, res: Response, next: Function) => {
    try {
      let token: string | null = null

       if (
         req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
       ) {
        token = req.headers.authorization.split(' ')[1]
       }

      if (!token) {
         return res.status(401).json({ success: false, message: 'Unauthorized' })
       }

       const decoded = await Admin.auth().verifyIdToken(token)
       if (!decoded) {
         return res
           .status(401)
           .json({ success: false, message: 'Invalid Token Provided' })
       }
      req.user = user
      return next()
    } catch (error: any) {
      next(error, req, res)
    }
  },
  adminAuth: async (req: Request, res: Response, next: Function) => {
    try {
      const { email, phone } = req.body
      if (!email) {
        return res
          .status(401)
          .json({ success: false, message: "Email Required" })
      }

      let admin = await AdminModel.findOne({ phone, email })
      if (!admin) {
        return
        res.status(404).json({ succesas: false, message: "Admin Not Found" })
      }
      req.admin = admin
      return next()
    } catch (error: any) {
      next(error, req, res)
    }
  },
}
export default Authentication
