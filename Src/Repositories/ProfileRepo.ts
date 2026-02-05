import { QueryFilter, Types } from 'mongoose'
import UserModel from '../Models/User.Model'
import { IUser } from '../Interfaces/IUser'
import ValidatorUtils from '../Utils/ValidatorUtils'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

class ProfileRepo {
  public async update(userId: Types.ObjectId | string, data: IUser.Update) {
    const userProfile = await UserModel.findById(userId)
    if (!userProfile) {
      throw new ErrorHandler(404, "User Not Found")
    }

    const { name, email, verificationStatus, deliveryAddress, gender, DOB, profileImage } = data
    if (name) userProfile.name = name
    if (email) userProfile.email = email
    if (verificationStatus) userProfile.verificationStatus = verificationStatus
    if (deliveryAddress) userProfile.deliveryAddress = deliveryAddress
    if (gender) userProfile.gender = gender
    if (DOB) userProfile.DOB = DOB

    if (profileImage) {
      const imgUrl = await ValidatorUtils.convertToUrl(profileImage)
      if (imgUrl) {
        userProfile.profileImage = imgUrl
      } else {
        console.error('Error occurred while uploading image')
      }
    }

    return await userProfile.save()
  }
  public async query(data: IUser.Query) {
    let _query: QueryFilter<IUser.Doc> = {}
    const { limit = 10, page = 1 } = data
    if (data.verificationStatus) {
      _query.verificationStatus = data.verificationStatus
    }
    if (data.name) {
      _query.name = data.name
    }
    if (data.email) {
      _query.email = data.email
    }
    if (data.gender) {
      _query.gender = data.gender
    }
    if (data.userId) {
      _query._id = data.userId
    }
    const users = await UserModel.find(_query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean()
    return users
  }
}
export default new ProfileRepo()
