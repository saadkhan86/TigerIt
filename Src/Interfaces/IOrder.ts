import { Types } from "mongoose"

export declare namespace IOrder {
  interface Item {
    product: Types.ObjectId | string
    variant: Types.ObjectId | string
    quantity: number
  }
  interface Doc extends Document {
    customerRef: Types.ObjectId | string
    paymentMethod: "card" | "wallet"
    paymentStatus: "paid" | "pending"
    tip?: number
    serviceFee: number
    deliveryFee: number
    pickupPlaceId: string
    deliveryPlaceId: string
    items: Item[]
    deliveryStatus: "inProgress" | "delivered" | "cancelled"
    totalAmount: number
  }
  interface Create {
    customerRef: Types.ObjectId | string
    paymentMethod: "card" | "wallet"
    tip: number
    serviceFee?: 3.44 | 5.44 | 8
    deliveryFee?: number
    pickupPlaceId: string
    deliveryPlaceId: string
    items: Item[]
  }
  interface Query {
    orderId?: Types.ObjectId | string
    customerRef?: Types.ObjectId | string
    paymentMethod?: "card" | "wallet"
    deliveryStatus?: "inProgress" | "delivered" | "cancelled"
    paymentStatus?: "paid" | "pending"
    limit?: number
    page?: number
  }
}
