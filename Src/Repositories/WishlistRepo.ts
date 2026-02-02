import { QueryFilter } from 'mongoose'
import IBusiness from '../Interfaces/IBusiness'
import IWishlist from '../Interfaces/IWishlist'
import WishlistModel from '../Models/WishList.Model'

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
  public async query(data: IWishlist.Query) {
    const _query: QueryFilter<IWishlist.Doc> = {}
    const { page = 0, limit = 10 } = data
    if (data.userRef) {
      _query.userRef = data.userRef
    }
    if (data.businessRef) {
      _query.businessRef = data.businessRef
    }
    const wishlist = await WishlistModel.find(_query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()
    return wishlist
  }
}
export default new WishlistRepo()
