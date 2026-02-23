import { Document, Types } from "mongoose"

export declare namespace IUser {
  interface Doc extends Document {
    phone: string
    firebaseId: string
    stripeCustomerId: string
    name: string
    email: string
    gender: "male" | "female" | "personal"
    DOB: Date
    verificationStatus: "pending" | "approved" | "rejected"
    profileImage: string
    wallet: {
      balance: {
        amount: number
        currency: string
      }
    }
    deliveryAddress: string
  }
  interface Create {
    phone: string
    firebaseId: string
  }
  interface Update {
    name?: string
    email?: string
    gender?: "male" | "female" | "personal"
    DOB?: Date
    deliveryAddress?: string
    profileImage?: string
  }
  interface Query {
    userId?: Types.ObjectId | string
    verificationStatus?: "pending" | "approved" | "rejected"
    name?: string
    email?: string
    gender?: "male" | "female" | "personal"
    limit?: number
    page?: number
  }
}
