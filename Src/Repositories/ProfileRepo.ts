import { QueryFilter, Types } from 'mongoose'
import UserModel from '../Models/User.Model'
import { IUser } from '../Interfaces/IUser'

class ProfileRepo {
  public async update(userId: Types.ObjectId | string, data: IUser.Update) {
    let updatedProfile: any = {}
    if (data.name) {
      updatedProfile.name = data.name
    }
    if (data.email) {
      updatedProfile.email = data.email
    }
    if (data.deliveryAddress) {
      updatedProfile.deliveryAddress = data.deliveryAddress
    }
    if (data.gender) {
      updatedProfile.gender = data.gender
    }
    if (data.profileImage) {
      updatedProfile.profileImage = data.profileImage
    }
    updatedProfile = await UserModel.findByIdAndUpdate(userId, data)
    return updatedProfile
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
