import mongoose from 'mongoose'
import ITransaction from '../Interfaces/ITransaction'

const TransactionSchema = new mongoose.Schema<ITransaction.Doc>(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'User Id required'],
    },
    orderRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    paymentId: {
      type: String,
      unique: [true, "Payment Id can't be repeated"],
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
      min: [0, "Amount can't be negative"]
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
