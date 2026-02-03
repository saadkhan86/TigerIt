import express from 'express'
import ProductController from '../Controller/ProductController'
import Authentication from '../Middlewares/Authentication'
const ProductRouter = express.Router()
ProductRouter.use(Authentication.userAuth)
ProductRouter.post('/', ProductController.create)
ProductRouter.patch('/:id', ProductController.update)
ProductRouter.delete('/:id', ProductController.delete)
ProductRouter.get('/', ProductController.query)
export default ProductRouter
