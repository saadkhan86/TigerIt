import WalletController from '../Controller/WalletController'
import express from 'express'
import Authentication from '../Middlewares/Authentication'

const WalletRouter = express.Router()
WalletRouter.use(Authentication.userAuth)
WalletRouter.get('/', WalletController.query)
export default WalletRouter
