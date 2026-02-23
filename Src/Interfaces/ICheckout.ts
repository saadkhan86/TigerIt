import { Types } from 'mongoose'

export namespace ICheckout {
   interface Item {
    product: Types.ObjectId | string
    variant: Types.ObjectId | string
    quantity: number
  }

  interface Create {
    customerId: string | Types.ObjectId
    tip?: number
    serviceFee?: number
    pickupPlaceId: string
    deliveryPlaceId: string
    deliveryFee?: number
    items: Item[]
  }
}
export default ICheckout
