import VerificationController from "../Controller/VerificationController"
import express from "express"
import Authentication from "../Middlewares/Authentication"

const AdminVerificationRouter = express.Router()
AdminVerificationRouter.use(Authentication.adminAuth)
AdminVerificationRouter.patch(
  "/user/:id",
  VerificationController.userVerificationUpdate,
)
AdminVerificationRouter.patch(
  "/business/:id",
  VerificationController.businessVerificationUpdate,
)
AdminVerificationRouter.get(
  "/user",
  VerificationController.userVerificationQuery,
)
AdminVerificationRouter.get(
  "/business",
  VerificationController.businessVerificationQuery,
)
export default AdminVerificationRouter
