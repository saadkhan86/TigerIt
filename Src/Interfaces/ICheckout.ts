import { Types } from 'mongoose'

export namespace ICheckout {
  export interface Item {
    product: Types.ObjectId | string
    variant: Types.ObjectId | string
    quantity: number
  }

  export interface create {
    customerId: Types.ObjectId | string
    tip?: number
    serviceFee: number
    pickupPlaceId: string
    deliveryPlaceId: string
    deliveryFee: number
    items: Item[]
  }
}
export default ICheckout
