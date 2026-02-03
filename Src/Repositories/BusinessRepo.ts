import { QueryFilter, Types } from 'mongoose'
import UserModel from '../Models/User.Model'
import IBusiness from '../Interfaces/IBusiness'
import BusinessModel from '../Models/Business.Model'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

class BusinessRepo {
  public async create(data: IBusiness.Create) {
    const business = await BusinessModel.create(data)
    return business
  }
  public async update(
    businessId: Types.ObjectId | string,
    data: IBusiness.Update,
  ) {
    let business = await BusinessModel.findOne({
      _id: businessId,
      ownerRef: data.ownerRef,
    })
    if (!business) {
      throw new ErrorHandler(404, 'Business Not Found')
    }
    if (data.businessTitle) {
      business.businessTitle = data.businessTitle
    }
    if (data.businessEmail) {
      business.businessEmail = data.businessEmail
    }
    if (data.businessAddress) {
      business.businessAddress = data.businessAddress
    }
    if (data.businessPhone) {
      business.businessPhone = data.businessPhone
    }
    if (data.businessCoverImage) {
      business.businessCoverImage = data.businessCoverImage
    }
    if (data.businessProfileImage) {
      business.businessProfileImage = data.businessProfileImage
    }
    if (data.businessDescription) {
      business.businessDescription = data.businessDescription
    }
    business.approvalStatus = 'pending'
    return await business.save()
  }
  public async query(data: IBusiness.Query) {
    let _query: QueryFilter<IBusiness.Doc> = {}
    const { page = 1, limit = 10 } = data
    if (data.businessTitle) {
      _query.businessTitle = data.businessTitle
    }
    if (data.businessEmail) {
      _query.businessEmail = data.businessEmail
    }
    if (data.ownerRef) {
      _query.ownerRef = data.ownerRef
    }
    if (data.businessId) {
      _query._id = data.businessId
    }
    if (data.approvalStatus) {
      _query.approvalStatus = data.approvalStatus
    }
    const business = await BusinessModel.find(_query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean()
    return business
  }
}
export default new BusinessRepo()
