import { Document, Types } from "mongoose"

export declare namespace IVerification {
  interface Doc extends Document {
    userRef: Types.ObjectId | string
    name: string
    email: string
    phone: string
    documentType: "passport" | "driverLicense" | "nationalId"
    verificationStatus: "pending" | "accepted" | "rejected"
    docFrontImage: string
    docBackImage: string
  }
  interface Create {
    userRef: Types.ObjectId | string
    name: string
    email: string
    phone: string
    documentType: "passport" | "driverLicense" | "nationalId"
    docFrontImage: string
    docBackImage: string
  }
  interface Query {
    _id?: Types.ObjectId | string
    userId?: Types.ObjectId | string
    documentType?: "passport" | "driverLicense" | "nationalId"
    verificationStatus?: "pending" | "accepted" | "rejected"
    limit?: number
    page?: number
  }
}
