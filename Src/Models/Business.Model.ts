import mongoose from "mongoose"
import { IBusiness } from "../Interfaces/IBusiness"
const BusinessSchema = new mongoose.Schema<IBusiness.Doc>(
  {
    ownerRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User Id required for creating business"],
      ref: "User",
    },
    businessTitle: {
      type: String,
      required: [true, "Business Title Required"],
      trim: true,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    businessDescription: {
      type: String,
      trim: true,
      required: [true, "Business Description Required"],
    },
    businessEmail: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email",
      ],
      required: [true, "Business Email Required"],
    },
    businessPhone: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Business Phone Required"],
      match: [/^\+?[1-9]\d{7,14}$/, "Invalid phone number"],
    },
    businessAddress: {
      type: String,
      trim: true,
      required: [true, "Business Address Required"],
    },
    businessCoverImage: {
      type: String,
      required: [true, "Business Cover Image Required"],
    },
    businessProfileImage: {
      type: String,
      required: [true, "Business Profile Image Required"],
    },
  },
  { timestamps: true },
)
const BusinessModel = mongoose.model<IBusiness.Doc>("Business", BusinessSchema)
export default BusinessModel
