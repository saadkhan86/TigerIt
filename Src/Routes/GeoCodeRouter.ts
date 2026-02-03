import express from "express"
import GeoCodeController from "../Controller/GeoCodeController"
const GeoCodeRouter = express.Router()
GeoCodeRouter.get("/calculate-distance", GeoCodeController.getRoadDistance)
export default GeoCodeRouter