import { Document, Types } from "mongoose"

export namespace ITransaction {
    export interface IPaymentIntent {
        amount: number
        currency: string
        payment_method: string | any | null
        customer: string | any | null
        description: string | null
        statement_descriptor_suffix: string | null
        automatic_payment_methods: {
            enabled: boolean
            allow_redirects?: string
        } | null
        metadata: {
            userId: Types.ObjectId | string
            isPickup: boolean
            orderId: Types.ObjectId | string
        } | any | null

        client_secret?: string | null
    }
    export interface Doc extends Document {
        userRef: Types.ObjectId | string
        orderRef: Types.ObjectId | string | null
        paymentId: string
        transactionType: "topup" | "purchase"
        amount: number
        currency: string
        paymentStatus: "pending" | "succeeded" | "failed"
    }
    export interface Create {
        userId: Types.ObjectId | string
        orderId: Types.ObjectId | string | null
        paymentId: string
        transactionType: "topup" | "purchase"
        amount: number
        currency: string
    }
    export interface Query {
        paymentId?: string
        userId?: Types.ObjectId | string
        _id?: Types.ObjectId | string
        orderId?: Types.ObjectId | string
        transactionType?: "topup" | "purchase"
        paymentStatus?: "succeeded" | "failed"
        limit?: number
        page?: number
    }
}
export default ITransaction