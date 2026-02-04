import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const Connection = async () => {
  const DB_URL = process.env.MONGODB_URL
  console.log(DB_URL)
  return await mongoose
    .connect(DB_URL!)
    .then(() => {
      console.log('Database Connected Successfully')
    })
    .catch((error) => {
      console.log(error.message)
    })
}
export default Connection
