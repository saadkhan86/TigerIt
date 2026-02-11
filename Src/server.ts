import Connection from './Config/Database'
import Router from './Routes/Router'
import { Server } from 'socket.io'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { globalErrorHandler } from './ErrorHandler/GlobalErrorHandler'
const dotenv = require("dotenv")
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/v1', Router)

app.use(globalErrorHandler)
Connection()
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`)
    })
  })