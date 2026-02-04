import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof mongoose.MongooseError) {
        return res
            .status(500)
            .json({ success: false, message: error.message.split('.')[0] })
    }

    const status = error.status || 500
    const message = error.message || 'server error'

    console.error(`[Error] ${status} - ${message}`)

    return res.status(status).json({ success: false, message })
}
