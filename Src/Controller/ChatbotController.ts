import { Request, Response } from "express"
import { OpenAI } from "openai"
import { ChatbotService } from "../Services/Chatbot.service"
const ChatbotController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
      const aiResponse = await openai.responses.create({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: ChatbotService.instructions,
          },
          { role: "user", content: req.body.message },
        ],
      })
      console.log(aiResponse)
      res.status(200).json({ success: true, message: aiResponse.output_text })
    } catch (error) {
      next(error)
    }
  },
}

export default ChatbotController
