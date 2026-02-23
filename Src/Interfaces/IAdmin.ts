import { Document } from "mongoose"

export declare namespace IAdmin {
  interface Doc extends Document {
    name: string
    email: string
    phone: string
  }
}
