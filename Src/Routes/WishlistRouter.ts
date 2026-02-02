import WishlistController from '../Controller/WishlistController'
import express from 'express'

const WishlistRouter = express.Router()
WishlistRouter.post('/:id', WishlistController.create)
WishlistRouter.delete('/:id', WishlistController.delete)
WishlistRouter.get('/', WishlistController.query)
export default WishlistRouter
