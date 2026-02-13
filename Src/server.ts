import Connection from './Config/Database'
import Router from './Routes/Router'
import cors from 'cors'
import express from 'express'
import { globalErrorHandler } from './ErrorHandler/GlobalErrorHandler'
import { setupSocket } from './Services/Socket.IO'
import dotenv from 'dotenv'
import UserModel from './Models/User.Model'
dotenv.config()

const app = express()
app.get("/",async()=>{
  await UserModel.insertMany([
    {
      phone:"+923065723247",
      firebaseId:"12345",
      name:"Ali",
      email:"ali@gmail.com",
      gender:"male",
      DOB:new Date("2005-01-23"),
      verificationStatus:"approved",
      deliveryAddress:"ali",
      stripeCustomerId:"1923819283djfks"
    },
    {
      phone:"+923066783940",
      firebaseId:"678910",
      name:"usman",
      email:"usman@gmail.com",
      gender:"male",
      DOB:new Date("2029-01-23"),
      verificationStatus:"approved",
      deliveryAddress:"usman",
      stripeCustomerId:"9181928ksjdsk"
    }
  ])
})
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
    setupSocket(server)
  })