import { QueryFilter, Types } from 'mongoose'
import IVerification from '../Interfaces/IVerification'
import VerificationModel from '../Models/Verification.Model'
import BusinessModel from '../Models/Business.Model'

class VerificationRepo {
  public async userVerificationCreate(data: IVerification.Create) {
    const verification = new VerificationModel(data)
    return await verification.save()
  }
  public async userVerificationUpdate(data: {
    verificationId: Types.ObjectId | string
    approvalStatus: 'approved' | 'rejected'
  }) {
    const verification = await VerificationModel.findByIdAndUpdate(
      new Types.ObjectId(data.verificationId),
      { approvalStatus: data.approvalStatus },
    )
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
