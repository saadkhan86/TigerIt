import { Request, Response } from 'express'
import ProductRepo from '../Repositories/ProductRepo'
const ProductController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductRepo.create(req.body)
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(req, res, error)
    }
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductRepo.update(req.params.id as string, {
        ...req.body,
      })
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(req, res, error)
    }
  },
  delete: async (req: Request, res: Response, next: Function) => {
    try {
      const _id = req.query._id as string
      const createdBy = req.query.createdBy as string
      const product = await ProductRepo.delete({ _id, createdBy })
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(req, res, error)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductRepo.query(req.query)
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(req, res, error)
    }
  },
}
export default ProductController
