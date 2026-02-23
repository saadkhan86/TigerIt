import { Document, Types } from "mongoose"
import { IUser } from "./IUser"
import { IMessage } from "./IMessage"

export declare namespace IChat {
  interface UserSummary {
    _id: Types.ObjectId
    name: string
    phone: string
  }

  interface Doc extends Document {
    users: (Types.ObjectId | string)[]
    latestMessage: Types.ObjectId | string | IMessage.Doc | null
  }

  interface Populated extends Document {
    _id: Types.ObjectId
    users: UserSummary[]
    latestMessage: IMessage.Populated | null
    createdAt: Date
    updatedAt: Date
  }
}
