import { Document, Types } from 'mongoose'

export namespace IProduct {
  export interface Variants {
    _id: Types.ObjectId | string
    title: string
    price: {
      amount: number
      currency: string
    }
  }
  export interface Doc extends Document {
    createdBy: Types.ObjectId | string
    description: string
    forAdult: boolean
    variants: Variants[]
    image: string
  }
  export interface Create {
    createdBy: Types.ObjectId | string
    description: string
    forAdult: boolean
    variants: Variants[]
    image: string
  }
  export interface Update {
    createdBy: Types.ObjectId | string
    description?: string
    forAdult?: boolean
    variants?: Variants[]
    image?: string
  }
  export interface Delete {
    createdBy: Types.ObjectId | string
    _id: Types.ObjectId | string
  }
  export interface Query {
    createdBy?: Types.ObjectId | string
    productId?: Types.ObjectId | string
    description?: string
    limit?: number
    page?: number
  }
}
export default IProduct
