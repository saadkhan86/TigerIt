import { Request, Response } from "express"
import axios from "axios"
import ErrorHandler from "../ErrorHandler/ErrorHandler"
import GeoCodeRepo from "../Repositories/GeoCodeRepo"
const GeoCodeController = {
    getRoadDistance: async (req: Request, res: Response, next: Function) => {
        try {
            const { pickupPlaceId, dropPlaceId } = req.query
            const distance = await GeoCodeRepo.getRoadDistance(pickupPlaceId as string, dropPlaceId as string)
            res.status(200).json({ success: true, distance })
        } catch (error) {
            next(error, req, res)
        }
    }
}
export default GeoCodeController