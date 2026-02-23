import { Types } from "mongoose"

export declare namespace IWishlist {
  interface Doc extends Document {
    userRef: Types.ObjectId | string
    businessRef: Types.ObjectId | string
  }
  interface General {
    userRef: Types.ObjectId | string
    businessRef: Types.ObjectId | string
  }
  interface Query {
    businessRef?: Types.ObjectId | string
    wishlistId?: Types.ObjectId | string
    limit?: number
    page?: number
  }
}
