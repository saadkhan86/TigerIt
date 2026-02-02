import { Request, Response } from 'express'
import WalletRepo from '../Repositories/WalletRepo'
const WalletController = {
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const wallet = await WalletRepo.query(req.params._id as string)
      res.status(200).json({ success: true, wallet })
    } catch (error) {
      next(error, req, res)
    }
  },
}

export default WalletController
