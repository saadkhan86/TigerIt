import WishlistController from "../Controller/WishlistController"
import express from "express"
import Authentication from "../Middlewares/Authentication"

const WishlistRouter = express.Router()
WishlistRouter.use(Authentication.userAuth)
WishlistRouter.post("/:businessId", WishlistController.create)
WishlistRouter.delete("/:wishlistId", WishlistController.delete)
WishlistRouter.get("/", WishlistController.query)
export default WishlistRouter
