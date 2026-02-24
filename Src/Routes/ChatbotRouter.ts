import { Router } from "express"
import ChatbotController from "../Controller/ChatbotController"

const ChatbotRouter = Router()

ChatbotRouter.post("/chat-with-ai", ChatbotController.create)
export default ChatbotRouter
