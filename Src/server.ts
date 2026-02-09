import Connection from './Config/Database'
import Router from './Routes/Router'
import { Server } from 'socket.io'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { globalErrorHandler } from './ErrorHandler/GlobalErrorHandler'
import { setupMessageHandlers } from './WebSockets/WebSockets'
import UserModel from './Models/User.Model'
const dotenv = require("dotenv")
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/v1', Router)

app.use(globalErrorHandler)
let io: Server
Connection()
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`)
    })
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH"],
      },
    })
    setupMessageHandlers(io)
  }).catch((err) => {
    console.log(err)
  })
export const getIo = () => {
  if (!io) throw new Error("Socket.IO not initialized yet");
  return io;
};