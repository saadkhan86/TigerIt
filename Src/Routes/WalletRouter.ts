import WalletController from '../Controller/WalletController'
import express from 'express'

const WalletRouter = express.Router()
WalletRouter.get('/', WalletController.query)
export default WalletRouter
