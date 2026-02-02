import mongoose, { Types } from 'mongoose'
import IWishlist from '../Interfaces/IWishlist'
const Schema = mongoose.Schema
const WishlistSchema = new Schema<IWishlist.Doc>(
  {
    userRef: {
      type: Types.ObjectId,
      required: [true, 'User Id Required'],
    },
    businessRef: {
      type: Types.ObjectId,
      required: [true, 'Business Id Required'],
    },
  },
  { timestamps: true },
)
const WishlistModel = mongoose.model<IWishlist.Doc>('Wishlist', WishlistSchema)
export default WishlistModel
