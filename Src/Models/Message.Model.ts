import mongoose, { Types } from "mongoose";
const MessageSchema = new mongoose.Schema({
    sender: {
        type: Types.ObjectId,
        required: [true, "Sender can't be empty"],
        ref: "User"
    },
    content: {
        type: String,
        required: [true, "message can't be empty"]
    }, chat: {
        type: Types.ObjectId,
        required: [true, "Chat Id can't be empty"],
        ref: "Chat"
    }
}, { timestamps: true })
const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel