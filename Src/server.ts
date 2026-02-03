import mongoose from 'mongoose'
import Connection from './Config/Database'
import Router from './Routes/Router'
import cors from 'cors'
import express, { Request, Response } from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/api/v1",Router)

app.use((error: any, req: Request, res: Response, next: Function) => {
  if (error instanceof mongoose.MongooseError) {
    return res
      .status(500)
      .json({ success: false, message: error.message.split('.')[0] })
  }
  const status = error.status || 500
  const message = error.message || 'server error'
  return res.status(status).json({ success: false, message })
})
Connection()
  .then(() => {
    app.listen(8080, () => {
      console.log(`Server is listening on port 8080`)
    })
  })
  .catch((error) => {
    console.log(error.message)
  })
