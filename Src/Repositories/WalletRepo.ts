import { Types } from 'mongoose'
import UserModel from '../Models/User.Model'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

class WalletRepo {
  public async query(userId: Types.ObjectId | string) {
    const wallet = await UserModel.findById(userId).select('wallet').lean()
    if (!wallet) {
      throw new ErrorHandler(404, 'wallet not found')
    }
    return wallet
  }
}
export default new WalletRepo()
