import { QueryFilter, Types } from 'mongoose'
import IWishlist from '../Interfaces/IWishlist'
import WishlistModel from '../Models/Wishlist.Model'

class WishlistRepo {
  public async create(data: IWishlist.General) {
    const wishlist = await WishlistModel.create({
      userRef: data.userRef,
      businessRef: data.businessRef,
    })
    return wishlist
  }
  public async delete(data: IWishlist.General) {
    const wishlist = await WishlistModel.findOneAndDelete({
      userRef: data.userRef,
      businessRef: data.businessRef,
    })
    return wishlist
  }
  public async query(userRef: Types.ObjectId | string, data: IWishlist.Query) {
    const _query: QueryFilter<IWishlist.Doc> = {}
    const { page = 1, limit = 10 } = data
    if (data.businessRef) {
      _query.businessRef = data.businessRef
    }
    if (data.wishlistId) {
      _query._id = data.wishlistId
    }
    const wishlist = await WishlistModel.find({ userRef, _query })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()
    return wishlist
  }
}
export default new WishlistRepo()
