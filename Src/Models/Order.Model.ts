import mongoose, { Types } from 'mongoose'
import { IOrder } from '../Interfaces/IOrder'

const OrderSchema = new mongoose.Schema<IOrder.Doc>(
  {
    customerRef: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        variant: {
          type: Types.ObjectId,
          ref: 'Product.Variant',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ['wallet', 'card'],
      default: 'wallet',
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending'],
      default: 'pending',
    },
    serviceFee: {
      type: Number,
      enum: [3.44, 5.44, 8],
      required: true,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },
    pickupPlaceId: {
      type: String,
      required: true,
    },
    deliveryPlaceId: {
      type: String,
      required: true,
    },
    tip: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ['inProgress', 'delivered', 'cancelled'],
      default: 'inProgress',
    },
  },
  { timestamps: true },
)

export default mongoose.model<IOrder.Doc>('Order', OrderSchema)
