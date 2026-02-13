import { Types } from "mongoose";
import ChatModel from "../Models/Chat.Model";
import UserModel from "../Models/User.Model";
import MessageModel from "../Models/Message.Model";
import IChat from "../Interfaces/IChat";
import IMessage from "../Interfaces/IMessage";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

class ChatRoomRepo {

    public async createchat(data: { _id: Types.ObjectId | string, userId: Types.ObjectId | string }): Promise<IChat.Populated> {
        let chat = await this.getSingleChatByUser({ _id: data._id, userId: data.userId });
        if (!chat) {
            await ChatModel.create({
                users: [data._id, data.userId]
            })
            chat = await this.getSingleChatByUser({ _id: data._id, userId: data.userId });
        }
        return chat as IChat.Populated;
    }

    public async getSingleChatByUser(data: { _id: Types.ObjectId | string, userId?: Types.ObjectId | string }): Promise<IChat.Populated | null> {
        let chat = await ChatModel.findOne({
            users: {
                $all: [data._id, data.userId]
            }
        }).populate("users", "name phone").populate("latestMessage")
        
        if (chat) {
            await UserModel.populate(chat, { path: "latestMessage.sender", select: "name" })
        }
        return chat as unknown as IChat.Populated | null
    }

    public async getSingleChatById(data: { _id: Types.ObjectId | string }): Promise<IChat.Populated | null> {
        let chat = await MessageModel.findOne({chat:data._id}).populate("sender","name").populate("chat","users")
        if(chat){
            await UserModel.populate(chat, { path: "chat.users", select: "name" })
        }
        return chat as unknown as IChat.Populated | null
    }

    public async getAllChat(_id: Types.ObjectId | string): Promise<IChat.Populated[]> {
        let chats = await ChatModel.find({
            users: _id
        }).populate("users", "name phone").populate("latestMessage")
        
        await UserModel.populate(chats, { path: "latestMessage.sender", select: "name" })
        return chats as unknown as IChat.Populated[];
    }

    public async messageCreate(data: { chatId: Types.ObjectId | string, _id: Types.ObjectId | string, content: string }): Promise<IMessage.Populated> {
        let message = await MessageModel.create({
            chat: data.chatId,
            sender: "6989c521e05d587c5a5b9e0c",
            content: data.content
        })
        await message.populate("sender", "name")
        await message.populate("chat")
        
        await ChatModel.findByIdAndUpdate(data.chatId, {
            latestMessage: message._id
        }, { new: true, runValidators: true })
        
        return message as unknown as IMessage.Populated
    }

    public async updateMessage(data: { chatId: Types.ObjectId | string, _id: Types.ObjectId | string, messageId: Types.ObjectId | string, content: string }): Promise<IMessage.Doc> {
        let message = await MessageModel.findOneAndUpdate({ _id: data.messageId, sender: data._id, chat: data.chatId }, {
            content: data.content
        }, { new: true, runValidators: true })
        
        if (!message) {
            throw new ErrorHandler(404,"Message not found")
        }
        
        const latestMessage = await MessageModel.findById(message._id).select("_id").lean()
        await ChatModel.findByIdAndUpdate(data.chatId, {
            latestMessage: latestMessage ? latestMessage._id : null
        }, { new: true, runValidators: true })
        
        return message
    }
    public async deleteMessage(data:{chatId:string,messageId:string,senderId:string | Types.ObjectId}){
        const message = await MessageModel.findOneAndDelete({_id:data.messageId,sender:data.senderId})
        if(!message){
            throw new ErrorHandler(404,"Message not found")
        }
        const latestMessage = await MessageModel.findOne({chat:data.chatId}).sort({createdAt:-1}).select("_id").lean()
        await ChatModel.findByIdAndUpdate(data.chatId, {
            latestMessage: latestMessage ? latestMessage._id : null
        }, { new: true, runValidators: true })
        return message
    }
}

export default new ChatRoomRepo();
