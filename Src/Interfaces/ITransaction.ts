import { Document, Types } from "mongoose"

export namespace ITransaction {
    export interface IPaymentIntent {
        amount: number
        currency: string
        payment_method: string
        customer: string
        description: string
        statement_descriptor_suffix: string
        automatic_payment_methods: {
            enabled: boolean
            allow_redirects: string
        }
        metadata: {
            userId: string
            isPickup: boolean
            orderId: string
        }

        client_secret?: string
    }
    export interface Doc extends Document {
        userRef: Types.ObjectId | string
        orderRef: Types.ObjectId | string | null
        paymentId: string
        isPickup: boolean
        transactionType: "topup" | "purchase"
        paymentMethod: "wallet" | "card"
        amount: number
        currency: string
        paymentStatus: "pending" | "succeeded" | "failed"
    }
    export interface Create {
        userId: Types.ObjectId | string
        orderId: Types.ObjectId | string
        isPickup: boolean
        transactionType: "topup" | "purchase"
        paymentMethod: "wallet" | "card"
        amount: number
        currency: string
    }
    export interface Query {
        _id?: Types.ObjectId | string
        userId?: Types.ObjectId | string
        orderId?: Types.ObjectId | string
        isPickup?: boolean
        paymentMethod?: "wallet" | "card"
        transactionType?: "topup" | "purchase"
        paymentStatus?: "pending" | "succeeded" | "failed"
        limit?: number
        page?: number
    }
}
export default ITransaction