import mongoose from "mongoose"
import { IProduct } from "../Interfaces/IProduct"
const ProductSchema = new mongoose.Schema<IProduct.Doc>({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Business Id required to create product"],
    ref: "Business",
  },
  description: {
    type: String,
    required: [true, "Product Description Required"],
    trim: true,
  },
  forAdult: {
    type: Boolean,
    default: false,
  },
  variants: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        amount: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          default: "$",
        },
      },
    },
  ],
  image: {
    type: String,
    required: true,
  },
})

const ProductModel = mongoose.model<IProduct.Doc>("Product", ProductSchema)
export default ProductModel
