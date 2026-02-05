import mongoose, { Types } from 'mongoose'
import ITransaction from '../Interfaces/ITransaction'

const Schema = mongoose.Schema
const TransactionSchema = new Schema<ITransaction.Doc>(
  {
    userRef: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, 'User Id required'],
    },
    orderRef: {
      type: Types.ObjectId,
      ref: "Order",
      default: null,
    },
    paymentId: {
      type: String,
      required: [true, 'payment id required'],
    },
    transactionType: {
      type: String,
      enum: ['topup', 'purchase'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'succeeded', 'failed'],
      required: true,
    },
  },
  { timestamps: true },
)
const TransactionModel = mongoose.model<ITransaction.Doc>("Transaction", TransactionSchema)
export default TransactionModel
