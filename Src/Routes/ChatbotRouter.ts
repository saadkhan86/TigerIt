import { Router } from "express"
import ChatbotController from "../Controller/ChatbotController"

const ChatbotRouter = Router()

ChatbotRouter.post("/create-chat", ChatbotController.create)
export default ChatbotRouter
