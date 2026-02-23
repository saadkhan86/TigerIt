import mongoose, { Types } from "mongoose"
import { IVerification } from "../Interfaces/IVerification"
const Schema = mongoose.Schema

const VerificationSchema = new mongoose.Schema<IVerification.Doc>(
  {
    userRef: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "user required for verification"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email",
      ],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[1-9]\d{7,14}$/, "Invalid phone number"],
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    documentType: {
      type: String,
      enum: ["passport", "driverLicense", "nationalId"],
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
  "Verification",
  VerificationSchema,
)
export default VerificationModel
