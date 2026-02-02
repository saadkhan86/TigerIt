import { QueryFilter, Types } from 'mongoose'
import IProduct from '../Interfaces/IProduct'
import ProductModel from '../Models/Product.Model'
import BusinessRepo from './BusinessRepo'
import IBusiness from '../Interfaces/IBusiness'
import ErrorHandler from '../ErrorHandler/ErrorHandler'

class ProductRepo {
  public async create(data: IProduct.Create) {
    const business: QueryFilter<IBusiness.Doc> = await BusinessRepo.query({
      businessId: data.createdBy,
    })
    if (!business || business.approvalStatus === 'pending') {
      throw new ErrorHandler(
        404,
        'Either business not approved yet or business not found',
      )
    }
    const product = await ProductModel.create(data)
    return product
  }
  public async update(
    productId: Types.ObjectId | string,
    data: IProduct.Update,
  ) {
    let product = await ProductModel.findOne({
      _id: productId,
      createdBy: data.createdBy,
    })
    if (!product) return null
    if (data.description) {
      product.description = data.description
    }
    if (data.forAdult) {
      product.forAdult = data.forAdult
    }
    if (data.image) {
      product.image = data.image
    }
    if (data.variants) {
      product.variants = data.variants
    }
    return await product.save()
  }
  public async delete(data: IProduct.Delete) {
    const product = await ProductModel.findOneAndDelete({
      createdBy: data.createdBy,
      _id: data._id,
    })
    return product
  }
  public async query(data: IProduct.Query) {
    let _query: QueryFilter<IProduct.Doc> = {}
    const { page = 1, limit = 10 } = data
    if (data._id) {
      _query._id = data._id
    }
    if (data.createdBy) {
      _query.createdBy = data.createdBy
    }
    if (data.description) {
      _query.description = data.description
    }
    const product = await ProductModel.find(_query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
    return product
  }
}
export default new ProductRepo()
