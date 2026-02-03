import ProfileController from '../Controller/ProfileController'
import express from 'express'
import Authentication from '../Middlewares/Authentication'

const ProfileRouter = express.Router()
ProfileRouter.use(Authentication.userAuth)
ProfileRouter.get('/', ProfileController.profile)
ProfileRouter.patch('/', ProfileController.update)
export default ProfileRouter
