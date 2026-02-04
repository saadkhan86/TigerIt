import { QueryFilter, Types } from 'mongoose'
import IVerification from '../Interfaces/IVerification'
import VerificationModel from '../Models/Verification.Model'
import BusinessModel from '../Models/Business.Model'
import ProfileRepo from './ProfileRepo'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import ValidatorUtils from '../Utils/ValidatorUtils'

class VerificationRepo {
  public async userVerificationCreate(data: IVerification.Create) {
    let verification = await VerificationModel.findOne({
      userRef: data.userRef,
    })
    if (verification) {
      if (verification.verificationStatus == "pending" || verification.verificationStatus == "accepted")
        throw new ErrorHandler(400, `Verification already ${verification.verificationStatus}`)
      else if (verification.verificationStatus == "rejected") {
        verification.verificationStatus = "pending"
        verification.docFrontImage = data.docFrontImage
        verification.docBackImage = data.docBackImage
        verification.documentType = data.documentType
        return await verification.save()
      }
    }
    const docFrontImage = await ValidatorUtils.convertToUrl(data.docFrontImage)
    if (!docFrontImage) throw new ErrorHandler(500, "Error Occured While Uploading Image")
    const docBackImage = await ValidatorUtils.convertToUrl(data.docBackImage)
    if (!docBackImage) throw new ErrorHandler(500, "Error Occured While Uploading Image")
    verification = new VerificationModel({
      userRef: data.userRef,
      documentType: data.documentType,
      docFrontImage,
      docBackImage,
      verificationStatus: "pending"
    })
    return await verification.save()
  }
  public async userVerificationUpdate(data: {
    verificationId: Types.ObjectId | string
    approvalStatus: 'approved' | 'rejected'
  }) {
    const verification = await VerificationModel.findByIdAndUpdate(
      data.verificationId,
      { verificationStatus: data.approvalStatus },
      { new: true }
    )
    if (!verification) throw new ErrorHandler(404, "Verification Not Found")
    await ProfileRepo.update(verification.userRef!, {
      verificationStatus: data.approvalStatus,
    })
    return verification
  }
  public async businessVerificationUpdate(data: {
    businessId: Types.ObjectId | string
    approvalStatus: 'accepted' | 'rejected'
  }) {
    const business = await BusinessModel.findByIdAndUpdate(new Types.ObjectId(data.businessId), {
      approvalStatus: data.approvalStatus,
    }, { new: true }).lean()
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
      .lean()
    return verification
  }
}
export default new VerificationRepo()
