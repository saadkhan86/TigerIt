import express from 'express'
import ProductController from '../Controller/ProductController'
const ProductRouter = express.Router()
ProductRouter.post('/', ProductController.create)
ProductRouter.patch('/:id', ProductController.update)
ProductRouter.delete('/:id', ProductController.delete)
ProductRouter.get('/', ProductController.query)
export default ProductRouter
