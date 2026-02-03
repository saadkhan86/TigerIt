import WishlistController from '../Controller/WishlistController'
import express from 'express'
import Authentication from '../Middlewares/Authentication'

const WishlistRouter = express.Router()
WishlistRouter.use(Authentication.userAuth)
WishlistRouter.post('/', WishlistController.create)
WishlistRouter.delete('/:id', WishlistController.delete)
WishlistRouter.get('/', WishlistController.query)
export default WishlistRouter
