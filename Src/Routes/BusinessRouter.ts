import BusinessController from '../Controller/BusinessController'
import express from 'express'
import Authentication from '../Middlewares/Authentication'

const BusinessRouter = express.Router()
BusinessRouter.use(Authentication.userAuth)
BusinessRouter.post('/', BusinessController.create)
BusinessRouter.patch('/:id', BusinessController.update)
BusinessRouter.get('/', BusinessController.query)
export default BusinessRouter
