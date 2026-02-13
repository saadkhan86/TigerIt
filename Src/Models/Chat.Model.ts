import mongoose from "mongoose";
import IChat from "../Interfaces/IChat";
const ChatSchema = new mongoose.Schema<IChat.Doc>({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null
    }
}, { timestamps: true })
const ChatModel = mongoose.model<IChat.Doc>("Chat", ChatSchema);
export default ChatModel