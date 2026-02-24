import { QueryFilter, Types } from "mongoose"
import { IProduct } from "../Interfaces/IProduct"
import ProductModel from "../Models/Product.Model"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import BusinessModel from "../Models/Business.Model"
import ValidatorUtils from "../Utils/ValidatorUtils"

class ProductRepo {
  public async create(data: IProduct.Create) {
    const business = await BusinessModel.findById(data.createdBy)
    if (!business || business.approvalStatus === "pending") {
      throw new ErrorHandler(
        404,
        "Either business not approved yet or business not found",
      )
    }
    const image = await ValidatorUtils.convertToUrl(data.image)
    if (!image)
      throw new ErrorHandler(500, "Error Occured While Uploading Image")
    const product = await ProductModel.create({
      createdBy: data.createdBy,
      description: data.description,
      forAdult: data.forAdult,
      variants: data.variants,
      image: image,
    })
    return product
  }
  public async update(
    productId: Types.ObjectId | string,
    data: IProduct.Update,
  ) {
    console.log(data)
    let product = await ProductModel.findOne({
      _id: productId,
      createdBy: data.createdBy,
    })
    if (!product) throw new ErrorHandler(404, "Product not found")
    if (data.description) {
      product.description = data.description
    }
    if (data.forAdult) {
      product.forAdult = data.forAdult
    }
    if (data.image) {
      const image = await ValidatorUtils.convertToUrl(data.image)
      if (image) product.image = image
      else console.log("Error occured while uploading image")
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
    if (data.productId) {
      _query._id = data.productId
    }
    if (data.createdBy) {
      _query.createdBy = data.createdBy
    }
    if (data.description) {
      _query.description = data.description
    }
    const product = await ProductModel.find(_query)
      .populate("createdBy")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
    return product
  }
}
export default new ProductRepo()
