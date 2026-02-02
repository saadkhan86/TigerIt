import { Types } from 'mongoose'

export namespace IOrder {
  export interface Item {
    product: Types.ObjectId | string
    variant: Types.ObjectId | string
    quantity: number
  }
  export interface Doc extends Document {
    customerRef: Types.ObjectId | string
    paymentMethod: 'card' | 'wallet'
    paymentStatus: 'paid' | 'pending'
    tip?: number
    serviceFee: number
    deliveryFee: number
    pickupPlaceId: string
    deliveryPlaceId: string
    items: Item[]
    deliveryStatus: 'inProgress' | 'delivered' | 'cancelled'
    totalAmount: number
  }
  export interface Create {
    customerRef: Types.ObjectId | string
    paymentMethod: 'card' | 'wallet'
    tip: number
    serviceFee: number
    deliveryFee: number
    pickupPlaceId: string
    deliveryPlaceId: string
    items: Item[]
  }
  export interface Query {
    orderId?: Types.ObjectId | string
    customerRef?: Types.ObjectId | string
    paymentMethod?: 'card' | 'wallet'
    deliveryStatus?: 'inProgress' | 'delivered' | 'cancelled'
    paymentStatus?: 'paid' | 'pending'
    limit?: number
    page?: number
  }
}
