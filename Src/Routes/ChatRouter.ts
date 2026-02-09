import express from "express"
import ChatController from "../Controller/ChatController"
import authMiddleware from "../Middlewares/Authentication"
const ChatRouter = express.Router()
ChatRouter.use(authMiddleware.userAuth)
ChatRouter.post("/", ChatController.createChat)//checked
ChatRouter.get("/", ChatController.getAllChats)//checked
ChatRouter.get("/:chatId", ChatController.getSingleChatById)
ChatRouter.post("/message", ChatController.createMessage)
ChatRouter.patch("/message", ChatController.updateMessage)

export default ChatRouter