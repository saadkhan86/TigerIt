import { Document } from "mongoose"
import { Types } from "mongoose"

export declare namespace IMessage {
  interface Doc extends Document {
    sender: Types.ObjectId | string
    content: string
    chat: Types.ObjectId | string
  }
  interface Populated extends Document {
    sender: { _id: Types.ObjectId; name: string }
    content: string
    chat: Types.ObjectId | any
  }
}
