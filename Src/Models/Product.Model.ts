import mongoose, { Types } from 'mongoose'
import IProduct from '../Interfaces/IProduct'
const Schema = mongoose.Schema
const ProductSchema = new Schema<IProduct.Doc>({
  createdBy: {
    type: Types.ObjectId,
    required: [true, 'Business Id required to create product'],
  },
  description: {
    type: String,
    required: true,
  },
  forAdult: {
    type: Boolean,
    default: false,
    required: true,
  },
  variants: [
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        amount: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          default: '$',
        },
      },
    },
  ],
  image: {
    type: String,
    required: true,
  },
})

const ProductModel = mongoose.model<IProduct.Doc>('Product', ProductSchema)
export default ProductModel
