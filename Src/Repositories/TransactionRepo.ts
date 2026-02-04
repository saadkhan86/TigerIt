import { QueryFilter, Types } from "mongoose";
import ITransaction from "../Interfaces/ITransaction";
import TransactionModel from "../Models/Transaction.Model";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

class TransactionRepo {
    public async create(data: ITransaction.Create) {
        const transaction = await TransactionModel.create({
            userRef: data.userId,
            orderRef: data.orderId || null,
            amount: data.amount,
            currency: data.currency || "$",
            paymentMethod: data.paymentMethod,
            transactionType: data.transactionType,
            isPickup: data.isPickup,
        })
        return transaction
    }
    public async query(data: ITransaction.Query) {
        const _query: QueryFilter<ITransaction.Doc> = {}
        const { limit = 10, page = 1 } = data
        if (!data.userId) throw new ErrorHandler(400, "UserId required")
        if (data.userId) _query.userRef = data.userId as Types.ObjectId
        if (data._id) _query._id = data._id as Types.ObjectId
        if (data.orderId) _query.orderRef = data.orderId as Types.ObjectId
        if (data.isPickup) _query.isPickup = data.isPickup
        if (data.paymentMethod) _query.paymentMethod = data.paymentMethod
        if (data.transactionType) _query.transactionType = data.transactionType
        if (data.paymentStatus) _query.paymentStatus = data.paymentStatus
        return await TransactionModel.find(_query).limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 })
    }
}
export default new TransactionRepo()