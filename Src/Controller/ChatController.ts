import { Request, Response } from "express"
import ChatRepo from "../Repositories/ChatRepo"

const ChatController = {
    createChat: async (req: Request, res: Response, next: Function) => {
        try {
            const chatRoom = await ChatRepo.createchat({ userId: req.body.userId, _id: req.user!._id })
            res.status(200).json({ success: true, chatRoom })
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
            const chats = await ChatRepo.messageCreate({ _id: req.user!._id, chatId: req.body.chatId, content: req.body.content })
            res.status(200).json({ success: true, chats })
        } catch (error) {
            next(error, req, res)
        }
    },
    updateMessage: async (req: Request, res: Response, next: Function) => {
        try {
            const chats = await ChatRepo.updateMessage({ _id: req.user!._id, chatId: req.body.chatId, messageId: req.body.messageId, content: req.body.content })
            res.status(200).json({ success: true, chats })
        } catch (error) {
            next(error, req, res)
        }
    }
}
export default ChatController