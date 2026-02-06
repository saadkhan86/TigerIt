import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const message = error.message || 'server error'
    const status = error.status || 500
    if (error instanceof mongoose.MongooseError) {
        return res
            .status(status)
            .json({ success: false, message: message || error.message.split('.')[0] })
    }

    return res.status(status).json({ success: false, message })
}
