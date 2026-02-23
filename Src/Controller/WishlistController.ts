import { Request, Response } from "express"
import WishlistRepo from "../Repositories/WishlistRepo"
import { IWishlist } from "../Interfaces/IWishlist"

const WishlistController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const wishlist = await WishlistRepo.create({
        userRef: req.user?._id!,
        businessRef: req.body.businessId as string,
      })
      res.status(200).json({ success: true, wishlist })
    } catch (error) {
      next(error, req, res)
    }
  },
  delete: async (req: Request, res: Response, next: Function) => {
    try {
      const wishlist = await WishlistRepo.delete({
        userRef: req.user?._id!,
        businessRef: req.params.id as string,
      })
      res.status(200).json({ success: true, wishlist })
    } catch (error) {
      next(error, req, res)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const _query: IWishlist.Query = req.query
      const wishlist = await WishlistRepo.query(req.user!._id, _query)

      res.status(200).json({ success: true, wishlist })
    } catch (error) {
      next(error, req, res)
    }
  },
}

export default WishlistController
