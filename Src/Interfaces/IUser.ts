import { Document, Types } from 'mongoose'

export namespace IUser {
  export interface Doc extends Document {
    phone: string
    firebaseId: string
    stripeCustomerId: string
    name: string
    email: string
    gender: 'male' | 'female' | 'personal'
    DOB: Date
    verificationStatus: 'pending' | 'approved' | 'rejected'
    profileImage: string
    wallet: {
      balance: {
        amount: number
        currency: string
      }
    }
    deliveryAddress: string
  }
  export interface Create {
    phone: string
    firebaseId: string
  }
  export interface Update {
    verificationStatus?: 'pending' | 'approved' | 'rejected'
    name?: string
    email?: string
    gender?: 'male' | 'female' | 'personal'
    DOB?: Date
    deliveryAddress?: string
    profileImage?: string
  }
  export interface Query {
    userId?: Types.ObjectId | string
    verificationStatus?: 'pending' | 'approved' | 'rejected'
    name?: string
    email?: string
    gender?: 'male' | 'female' | 'personal'
    limit?: number
    page?: number
  }
}
