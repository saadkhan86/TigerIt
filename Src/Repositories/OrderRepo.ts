import { QueryFilter } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import { IOrder } from '../Interfaces/IOrder'
import OrderModel from '../Models/Order.Model'
import ProductModel from '../Models/Product.Model'

class OrderRepo {
  public async create(data: IOrder.Create) {
    let totalAmount = 0
    const productIds = data.items.map((item) => item.product)
    const products = await ProductModel.find({
      _id: { $in: productIds },
    })
    for (const item of data.items) {
      const product = products.find((p) => {
        p._id.toString() === item.product.toString()
      })
      if (!product) throw new ErrorHandler(404, 'product not found')
      const variant = product.variants.find((v) => {
        v._id.toString() === item.variant.toString()
      })
      if (!variant) throw new Error('Variant not found')
      const price = variant.price.amount
      totalAmount += price * item.quantity
    }
    totalAmount += data.tip || 0
    let serviceFee: 3.44 | 5.44 | 8
    if (totalAmount < 9) {
      serviceFee = 3.44
      totalAmount += serviceFee
    } else if (totalAmount < 19) {
      serviceFee = 5.44
      totalAmount += serviceFee
    } else {
      serviceFee = 8
      totalAmount += serviceFee
    }
    const order = await OrderModel.create({
      customerRef: data.customerRef,
      items: data.items,
      paymentMethod: data.paymentMethod,
      serviceFee: data.serviceFee,
      deliveryFee: data.deliveryFee,
      pickupPlaceId: data.pickupPlaceId,
      deliveryPlaceId: data.deliveryPlaceId,
      tip: data.tip || 0,
      totalAmount,
    })
    return order
  }
  public async query(data: IOrder.Query) {
    let _query: QueryFilter<IOrder.Doc> = {}
    const { limit = 10, page = 1 } = data
    if (data.orderId) {
      _query._id = data.orderId
    }
    if (data.paymentMethod) {
      _query.paymentMethod = data.paymentMethod
    }
    if (data.paymentStatus) {
      _query.paymentStatus = data.paymentStatus
    }
    if (data.customerRef) {
      _query.customerRef = data.customerRef
    }
    if (data.deliveryStatus) {
      _query.deliveryStatus = data.deliveryStatus
    }
    const order = await OrderModel.find(_query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
    return order
  }
}

export default new OrderRepo()
