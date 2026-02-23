import { Types } from "mongoose"

export declare namespace IBusiness {
  interface Doc extends Document {
    approvalStatus: "pending" | "approved" | "rejected"
    ownerRef: Types.ObjectId | string
    businessTitle: string
    businessDescription: string
    businessEmail: string
    businessPhone: string
    businessAddress: string
    businessCoverImage: string
    businessProfileImage: string
  }
  interface Create {
    ownerRef: Types.ObjectId | string
    approvalStatus?: "pending" | "approved" | "rejected"
    businessTitle: string
    businessDescription: string
    businessEmail: string
    businessPhone: string
    businessAddress: string
    businessCoverImage: string
    businessProfileImage: string
  }
  interface Update {
    ownerRef?: Types.ObjectId | string
    businessTitle?: string
    businessDescription?: string
    businessEmail?: string
    businessPhone?: string
    businessAddress?: string
    businessCoverImage?: string
    businessProfileImage?: string
  }
  interface Query {
    approvalStatus?: "pending" | "approved" | "rejected"
    ownerRef?: Types.ObjectId | string
    businessTitle?: string
    businessEmail?: string
    businessId?: Types.ObjectId | string
    page?: number
    limit?: number
  }
}
