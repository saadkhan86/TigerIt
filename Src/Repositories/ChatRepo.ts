import { Types } from "mongoose";
import ChatModel from "../Models/Chat.Model";
import UserModel from "../Models/User.Model";
import MessageModel from "../Models/Message.Model";
class ChatRoomRepo {

    public async createchat(data: { _id: Types.ObjectId | string, userId: Types.ObjectId | string }) {

        let chat: any = await this.getSinguleChatByUser({ _id: data._id, userId: data.userId });
        if (!chat) {
            await ChatModel.create({
                users: [data._id, data.userId]
            })
            chat = await this.getSinguleChatByUser({ _id: data._id, userId: data.userId });
        }
        return chat;
    }
    public async getSinguleChatByUser(data: { _id: Types.ObjectId | string, userId?: Types.ObjectId | string }) {
        let chat: any = await ChatModel.findOne({
            users: {
                $all: [data._id, data.userId]
            }
        }).populate("users", "name phone").populate("latestMessage")
        chat = await UserModel.populate(chat, { path: "latestMessage.sender", select: "name" })
        return chat
    }
    public async getSingleChatById(data: { _id: Types.ObjectId | string }) {
        let chat: any = await ChatModel.findById(data._id).populate("users", "name phone").populate("latestMessage")
        chat = await UserModel.populate(chat, { path: "latestMessage.sender", select: "name" })
        return chat
    }
    public async getAllChat(_id: Types.ObjectId | string) {
        let chat: any = await ChatModel.find({
            users: _id
        }).populate("users", "name phone").populate("latestMessage")
        console.log(chat)
        chat = await UserModel.populate(chat, { path: "latestMessage.sender", select: "name" })
        return chat;
    }
    public async messageCreate(data: { chatId: Types.ObjectId | string, _id: Types.ObjectId | string, content: string }) {
        let message = await MessageModel.create({
            chat: data.chatId,
            sender: data._id,
            content: data.content
        })
        message = await message.populate("sender", "name")
        message = await message.populate("chat")
        await ChatModel.findByIdAndUpdate(data.chatId, {
            latestMessage: message._id
        })
        return message
    }
    public async updateMessage(data: { chatId: Types.ObjectId | string, _id: Types.ObjectId | string, messageId: Types.ObjectId | string, content: string }) {
        let message = await MessageModel.findOneAndUpdate({ _id: data.messageId, sender: data._id, chat: data.chatId }, {
            content: data.content
        }, { new: true, runValidators: true })
        if (!message) {
            throw new Error("Message not found")
        }
        const latestMessage = await MessageModel.findById(message._id).select("_id").lean()
        await ChatModel.findByIdAndUpdate(data.chatId, {
            latestMessage: latestMessage ? latestMessage : null
        }, { new: true, runValidators: true })
        return message
    }
}

export default new ChatRoomRepo();
