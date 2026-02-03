import VerificationController from '../Controller/VerificationController'
import express from 'express'
import Authentication from '../Middlewares/Authentication'

const UserVerificationRouter = express.Router()
UserVerificationRouter.post('/', Authentication.userAuth, VerificationController.verificationCreate)
export default UserVerificationRouter
