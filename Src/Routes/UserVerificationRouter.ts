import VerificationController from '../Controller/VerificationController'
import express from 'express'

const UserVerificationRouter = express.Router()
UserVerificationRouter.post('/', VerificationController.verificationCreate)
export default UserVerificationRouter
