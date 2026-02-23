import mongoose from "mongoose"
import { IMessage } from "../Interfaces/IMessage"
const MessageSchema = new mongoose.Schema<IMessage.Doc>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Sender can't be empty"],
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "message can't be empty"],
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Chat Id can't be empty"],
      ref: "Chat",
    },
  },
  { timestamps: true },
)
const MessageModel = mongoose.model<IMessage.Doc>("Message", MessageSchema)
export default MessageModel
