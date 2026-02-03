import mongoose from 'mongoose'

const DB_URL = 'mongodb://localhost:27017/'
const Connection = async () => {
  return mongoose
    .connect(DB_URL!)
    .then(() => {
      console.log('Database Connected Successfully')
    })
    .catch((error) => {
      console.log(error)
    })
}
export default Connection
