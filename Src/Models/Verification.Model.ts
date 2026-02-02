import mongoose, { Types } from 'mongoose'
import IVerification from '../Interfaces/IVerification'
const Schema = mongoose.Schema

const VerificationSchema = new mongoose.Schema<IVerification.Doc>(
  {
    userRef: {
      type: Types.ObjectId,
      required: [true, 'user required for verification'],
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
    },
    documentType: {
      type: String,
      enum: ['passport', 'driverLicense', 'nationalId'],
      required: true,
    },
    docFrontImage: {
      type: String,
      required: true,
    },
    docBackImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)
const VerificationModel = mongoose.model<IVerification.Doc>(
  'Verification',
  VerificationSchema,
)
export default VerificationModel
