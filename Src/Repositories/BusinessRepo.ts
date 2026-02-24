import { QueryFilter, Types } from "mongoose"
import { IBusiness } from "../Interfaces/IBusiness"
import BusinessModel from "../Models/Business.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import ValidatorUtils from "../Utils/ValidatorUtils"

class BusinessRepo {
  public async create(data: IBusiness.Create) {
    const coverImage = await ValidatorUtils.convertToUrl(
      data.businessCoverImage,
    )
    const profileImage = await ValidatorUtils.convertToUrl(
      data.businessProfileImage,
    )
    if (!coverImage || !profileImage)
      throw new ErrorHandler(500, "Error Occured While Uploading Image")
    const business = await BusinessModel.create({
      businessTitle: data.businessTitle,
      approvalStatus: "pending",
      businessEmail: data.businessEmail,
      businessAddress: data.businessAddress,
      businessPhone: data.businessPhone,
      businessCoverImage: coverImage,
      businessProfileImage: profileImage,
      businessDescription: data.businessDescription,
      ownerRef: data.ownerRef,
    })
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
      throw new ErrorHandler(404, "Business Not Found")
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
      const coverImage = await ValidatorUtils.convertToUrl(
        data.businessCoverImage,
      )
      if (coverImage) business.businessCoverImage = coverImage
      else console.log("Error occured while uploading image")
    }
    if (data.businessProfileImage) {
      const profileImage = await ValidatorUtils.convertToUrl(
        data.businessProfileImage,
      )
      if (profileImage) business.businessProfileImage = profileImage
      else console.log("Error occured while uploading image")
    }
    if (data.businessDescription) {
      business.businessDescription = data.businessDescription
    }
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
