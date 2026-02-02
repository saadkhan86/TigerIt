import BusinessController from '../Controller/BusinessController'
import express from 'express'

const BusinessRouter = express.Router()
BusinessRouter.post('/', BusinessController.create)
BusinessRouter.patch('/:id', BusinessController.update)
BusinessRouter.get('/', BusinessController.query)
export default BusinessRouter
