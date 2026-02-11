import { Request, Response } from "express"
import ChatRepo from "../Repositories/ChatRepo"
import getIO from "../Services/Socket.IO"
const ChatController = {
    createChat: async (req: Request, res: Response, next: Function) => {
        try {
            const chat = await ChatRepo.createchat({ userId: req.body.userId, _id: req.user!._id })
            getIO().to(chat._id.toString()).emit("chat_created",chat)
            res.status(200).json({ success: true, chat })
        } catch (error) {
            next(error, req, res)
        }
    },
    getAllChats: async (req: Request, res: Response, next: Function) => {
        try {
            const chats = await ChatRepo.getAllChat(req.user!._id)
            res.status(200).json({ success: true, chats })
        } catch (error) {
            next(error, req, res)
        }
    },
    getSingleChatById:async(req:Request,res:Response,next:Function)=>{
        try {
            const chat = await ChatRepo.getSingleChatById({_id: req.params.chatId as string })
            res.status(200).json({ success: true, chat })
        } catch (error) {
            next(error, req, res)
        }
    },
    createMessage: async (req: Request, res: Response, next: Function) => {
        try {
            const message = await ChatRepo.messageCreate({ _id: req.user!._id, chatId: req.body.chatId, content: req.body.content })
            getIO().to(req.body.chatId as string).emit("message_created",message)
            res.status(200).json({ success: true, message })
        } catch (error) {
            next(error, req, res)
        }
    },
    updateMessage: async (req: Request, res: Response, next: Function) => {
        try {
            const chats = await ChatRepo.updateMessage({ _id: req.user!._id, chatId: req.body.chatId, messageId: req.body.messageId, content: req.body.content })
            getIO().to(req.body.chatId as string).emit("message_updated",chats)
            res.status(200).json({ success: true, chats })
        } catch (error) {
            next(error, req, res)
        }
    }
}
export default ChatController