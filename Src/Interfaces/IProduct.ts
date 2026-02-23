import { Document, Types } from "mongoose"

export declare namespace IProduct {
  interface Variants {
    _id: Types.ObjectId | string
    title: string
    price: {
      amount: number
      currency: string
    }
  }
  interface Doc extends Document {
    createdBy: Types.ObjectId | string
    description: string
    forAdult: boolean
    variants: Variants[]
    image: string
  }
  interface Create {
    createdBy: Types.ObjectId | string
    description: string
    forAdult: boolean
    variants: Variants[]
    image: string
  }
  interface Update {
    createdBy: Types.ObjectId | string
    description?: string
    forAdult?: boolean
    variants?: Variants[]
    image?: string
  }
  interface Delete {
    createdBy: Types.ObjectId | string
    _id: Types.ObjectId | string
  }
  interface Query {
    createdBy?: Types.ObjectId | string
    productId?: Types.ObjectId | string
    description?: string
    limit?: number
    page?: number
  }
}
