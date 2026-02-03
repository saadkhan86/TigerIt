import { Document, Types } from 'mongoose'

export namespace IVerification {
  export interface Doc extends Document {
    userRef: Types.ObjectId | string
    documentType: 'passport' | 'driverLicense' | 'nationalId'
    verificationStatus: 'pending' | 'accepted' | 'rejected'
    docFrontImage: string
    docBackImage: string
  }
  export interface Create {
    userRef: Types.ObjectId | string
    documentType: 'passport' | 'driverLicense' | 'nationalId'
    docFrontImage: string
    docBackImage: string
  }
  export interface Query {
    _id?: Types.ObjectId | string
    userId?: Types.ObjectId | string
    documentType?: 'passport' | 'driverLicense' | 'nationalId'
    verificationStatus?: 'pending' | 'accepted' | 'rejected'
    limit?: number
    page?: number
  }
}
export default IVerification
