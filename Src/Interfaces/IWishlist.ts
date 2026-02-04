import { Types } from 'mongoose'

export namespace IWishlist {
  export interface Doc extends Document {
    userRef: Types.ObjectId | string
    businessRef: Types.ObjectId | string
  }
  export interface General {
    userRef: Types.ObjectId | string
    businessRef: Types.ObjectId | string
  }
  export interface Query {
    businessRef?: Types.ObjectId | string
    wishlistId?: Types.ObjectId | string
    limit?: number
    page?: number
  }
}
export default IWishlist
