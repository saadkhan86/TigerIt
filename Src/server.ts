import Connection from './Config/Database'
import Router from './Routes/Router'
import cors from 'cors'
import express from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(Router)

Connection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error.message)
  })
