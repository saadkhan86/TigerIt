import { QueryFilter, Types } from "mongoose"
import { IWishlist } from "../Interfaces/IWishlist"
import WishlistModel from "../Models/Wishlist.Model"

class WishlistRepo {
  public async create(data: IWishlist.General) {
    let wishlist = await WishlistModel.findOne({ userRef: data.userRef })
    if (wishlist) {
      wishlist.businessRef.push(data.businessRef)
    } else {
      wishlist = new WishlistModel({
        userRef: data.userRef,
        businessRef: [data.businessRef],
      })
    }
    await wishlist.save().then(() => {
      wishlist.populate("businessRef")
    })
    return wishlist
  }
  public async delete(data: IWishlist.General) {
    let wishlist = await WishlistModel.findOne({ userRef: data.userRef })
    if (wishlist) {
      wishlist.businessRef.pull(data.businessRef)
      await wishlist.save()
    }
    return wishlist
  }
  public async query(userRef: Types.ObjectId | string, data: IWishlist.Query) {
    const _query: QueryFilter<IWishlist.Doc> = {}
    const { page = 1, limit = 10 } = data
    if (data.wishlistId) {
      _query._id = data.wishlistId
    }
    const wishlist = await WishlistModel.find({ userRef, ..._query })
      .populate("businessRef")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()
    return wishlist
  }
}
export default new WishlistRepo()
