import { Request, Response } from "express"
import ProductRepo from "../Repositories/ProductRepo"
const ProductController = {
  create: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductRepo.create({
        createdBy: req.body.businessId,
        description: req.body.description,
        forAdult: req.body.forAdult,
        variants: req.body.variants,
        image: req.body.image,
      })
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(error, req, res)
    }
  },
  update: async (req: Request, res: Response, next: Function) => {
    try {
      console.log(req.body)
      const product = await ProductRepo.update(req.params.productId as string, {
        createdBy: req.body.businessId,
        description: req.body.description,
        forAdult: req.body.forAdult,
        variants: req.body.variants,
        image: req.body.image,
      })
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(error, req, res)
    }
  },
  delete: async (req: Request, res: Response, next: Function) => {
    try {
      const _id = req.query.productId as string
      const createdBy = req.query.createdBy as string
      const product = await ProductRepo.delete({ _id, createdBy })
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(error, req, res)
    }
  },
  query: async (req: Request, res: Response, next: Function) => {
    try {
      const product = await ProductRepo.query(req.query)
      res.status(200).json({ success: true, product })
    } catch (error) {
      next(error, req, res)
    }
  },
}
export default ProductController
