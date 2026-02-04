import Connection from './Config/Database'
import Router from './Routes/Router'
import cors from 'cors'
import express from 'express'
import { globalErrorHandler } from './Middlewares/ErrorHandler'
import env from "dotenv"
env.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/v1', Router)

app.use(globalErrorHandler)

Connection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.error(error.message)
  })
