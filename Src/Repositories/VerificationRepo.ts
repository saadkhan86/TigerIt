import { QueryFilter, Types } from "mongoose"
import { IVerification } from "../Interfaces/IVerification"
import VerificationModel from "../Models/Verification.Model"
import BusinessModel from "../Models/Business.Model"
import ProfileRepo from "./ProfileRepo"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import ValidatorUtils from "../Utils/ValidatorUtils"
import UserModel from "../Models/User.Model"

class VerificationRepo {
  public async userVerificationUpdate(data: {
    verificationId: Types.ObjectId | string
    approvalStatus: "approved" | "rejected"
  }) {
    const verification = await VerificationModel.findByIdAndUpdate(
      data.verificationId,
      { verificationStatus: data.approvalStatus },
      { new: true },
    )
    if (!verification) throw new ErrorHandler(404, "Verification Not Found")
    await UserModel.findByIdAndUpdate(verification.userRef, {
      verificationStatus: data.approvalStatus,
    })
    return verification
  }
  public async businessVerificationUpdate(data: {
    businessId: Types.ObjectId | string
    approvalStatus: "accepted" | "rejected"
  }) {
    const business = await BusinessModel.findByIdAndUpdate(
      new Types.ObjectId(data.businessId),
      {
        approvalStatus: data.approvalStatus,
      },
      { new: true },
    ).lean()
    return business
  }
  public async userVerificationQuery(data: IVerification.Query) {
    let _query: QueryFilter<IVerification.Doc> = {}
    const { limit = 10, page = 1 } = data
    if (data.documentType) {
      _query.documentType = data.documentType
    }
    if (data.verificationStatus) {
      _query.verificationStatus = data.verificationStatus
    }
    if (data.userId) {
      _query.userRef = new Types.ObjectId(data.userId)
    }
    if (data._id) {
      _query._id = new Types.ObjectId(data._id)
    }
    const verification = await VerificationModel.find(_query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    return verification
  }
  public async userVerificationCreate(data: IVerification.Create) {
    const verification = await this.userVerificationQuery({
      userId: data.userRef,
    })
    if (verification.length > 0) {
      if (
        verification[0].verificationStatus == "pending" ||
        verification[0].verificationStatus == "accepted"
      )
        throw new ErrorHandler(
          409,
          `Verification already ${verification[0].verificationStatus}`,
        )
    }
    const docFrontImage = await ValidatorUtils.convertToUrl(data.docFrontImage)
    if (!docFrontImage)
      throw new ErrorHandler(500, "Error Occured While Uploading Image")
    const docBackImage = await ValidatorUtils.convertToUrl(data.docBackImage)
    if (!docBackImage)
      throw new ErrorHandler(500, "Error Occured While Uploading Image")
    if (!data.name || !data.email || !data.phone)
      throw new ErrorHandler(400, "Profile not completed yet")
    const newVerification = await VerificationModel.create({
      userRef: data.userRef,
      name: data.name,
      phone: data.phone,
      email: data.email,
      documentType: data.documentType,
      docFrontImage,
      docBackImage,
      verificationStatus: "pending",
    })
    return newVerification
  }
}
export default new VerificationRepo()
