import { Types } from 'mongoose'

export namespace IBusiness {
  export interface Doc extends Document {
    approvalStatus: 'pending' | 'approved' | 'rejected'
    ownerRef: Types.ObjectId | string
    businessTitle: string
    businessDescription: string
    businessEmail: string
    businessPhone: string
    businessAddress: string
    businessCoverImage: string
    businessProfileImage: string
  }
  export interface Create {
    ownerRef: Types.ObjectId | string
    businessTitle: string
    businessDescription: string
    businessEmail: string
    businessPhone: string
    businessAddress: string
    businessCoverImage: string
    businessProfileImage: string
  }
  export interface Update {
    ownerRef: Types.ObjectId | string
    businessTitle?: string
    businessDescription?: string
    businessEmail?: string
    businessPhone?: string
    businessAddress?: string
    businessCoverImage?: string
    businessProfileImage?: string
  }
  export interface Query {
    approvalStatus?: 'pending' | 'approved' | 'rejected'
    ownerRef?: Types.ObjectId | string
    businessTitle?: string
    businessEmail?: string
    businessId?: Types.ObjectId | string
    page?: number
    limit?: number
  }
}
export default IBusiness
