import ProfileController from '../Controller/ProfileController'
import express from 'express'

const ProfileRouter = express.Router()
ProfileRouter.get('/', ProfileController.profile)
ProfileRouter.patch('/', ProfileController.update)
export default ProfileRouter
