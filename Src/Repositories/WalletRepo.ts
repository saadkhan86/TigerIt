import { Types } from 'mongoose'
import UserModel from '../Models/User.Model'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

class WalletRepo {
  public async query(userId: Types.ObjectId | string) {
    const user = await UserModel.findById(userId).select('wallet').lean()
    if (!user) {
      throw new ErrorHandler(404, 'wallet not found')
    }
    return user.wallet
  }
  public async topupUpdate(userId: Types.ObjectId | string, amount: number) {
    const user = await UserModel.findById(userId).select('wallet')
    if (!user) {
      throw new ErrorHandler(404, 'wallet not found')
    }
    user.wallet.balance.amount += amount
    await user.save()
    return user.wallet
  }
  public async decrement(userId: Types.ObjectId | string, amount: number) {
    const user = await UserModel.findById(userId).select('wallet')
    if (!user) {
      throw new ErrorHandler(404, 'wallet not found')
    }
    if (user.wallet.balance.amount < amount) {
      throw new ErrorHandler(400, 'Insufficient wallet balance')
    }
    user.wallet.balance.amount -= amount
    await user.save()
    return user.wallet
  }
}

export default new WalletRepo()
