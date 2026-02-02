import mongoose, { Types } from 'mongoose'
import IBusiness from '../Interfaces/IBusiness'
const Schema = mongoose.Schema
const BusinessSchema = new Schema<IBusiness.Doc>(
  {
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
    },
    ownerRef: {
      type: Types.ObjectId,
      required: [true, 'User Id required for creating business'],
      ref: 'User',
    },
    businessTitle: {
      type: String,
      required: true,
    },
    businessDescription: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\+?[1-9]\d{7,14}$/, 'Invalid phone number'],
    },
    businessAddress: {
      type: String,
      required: true,
    },
    businessCoverImage: {
      type: String,
      required: true,
      default: '234234',
    },
    businessProfileImage: {
      type: String,
      required: true,
      default: 'wieuroi732578',
    },
  },
  { timestamps: true },
)
const BusinessModel = mongoose.model<IBusiness.Doc>('Business', BusinessSchema)
export default BusinessModel
