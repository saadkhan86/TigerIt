import ProductModel from '../Models/Product.Model'
import ICheckout from '../Interfaces/ICheckout'
import WalletRepo from './WalletRepo'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import GeoCodeController from '../Controller/GeoCodeController'
import GeoCodeRepo from './GeoCodeRepo'

class CheckoutRepo {
  public async create(data: ICheckout.Create) {
    let totalCheckoutAmount = 0
    const productIds = data.items.map((item) => item.product)
    const products = await ProductModel.find({
      _id: { $in: productIds },
    })
    for (const item of data.items) {
      const product = products.find(
        (p) => p._id.toString() === item.product.toString(),
      )

      if (!product) throw new Error('Product not found')

      const variant = product.variants.find(
        (v) => v._id.toString() === item.variant.toString(),
      )
      if (!variant) throw new Error('Variant not found')

      if (item.quantity <= 0) throw new Error('Quantity must be greater than 0')

      const price = variant.price.amount

      totalCheckoutAmount += price * item.quantity
    }

    // Verify all products belong to same business
    if (products.length > 0) {
      const firstBusiness = products[0].createdBy.toString()
      const differentBusinessProduct = products.find(p => p.createdBy.toString() !== firstBusiness)
      if (differentBusinessProduct) {
        throw new Error('All items must be from the same business')
      }
    }
    const deliveryDistance = await GeoCodeRepo.getRoadDistance(data.pickupPlaceId, data.deliveryPlaceId)
    if (data.deliveryFee && deliveryDistance > 3) {
      totalCheckoutAmount += data.deliveryFee
    } else {
      totalCheckoutAmount += 20
    }
    let serviceFee: 3.44 | 5.44 | 8
    if (totalCheckoutAmount < 9) {
      serviceFee = 3.44
      totalCheckoutAmount += serviceFee
    } else if (totalCheckoutAmount < 19) {
      serviceFee = 5.44
      totalCheckoutAmount += serviceFee
    } else {
      serviceFee = 8
      totalCheckoutAmount += serviceFee
    }
    totalCheckoutAmount += data.tip || 0

    const walletData = await WalletRepo.query(data.customerId)

    const userWalletAmount = walletData.wallet.balance.amount

    return {
      userWalletAmount: userWalletAmount,
      totalCheckoutAmount,
      remainingBalance: userWalletAmount - totalCheckoutAmount,
    }
  }
}

export default new CheckoutRepo()
