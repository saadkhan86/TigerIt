import express from "express"
import ProfileRouter from "./ProfileRouter"
import BusinessRouter from "./BusinessRouter"
import WalletRouter from "./WalletRouter"
import ProductRouter from "./ProductRouter"
import UserVerificationRouter from "./UserVerificationRouter"
import AdminVerificationRouter from "./AdminVerificationRouter"
import WishlistRouter from "./WishlistRouter"
import CheckoutRouter from "./CheckoutRouter"
import OrderRouter from "./OrderRouter"
import TransactionRouter from "./TransactionRouter"
import ChatRouter from "./ChatRouter"
import ChatbotRouter from "./ChatbotRouter"
const Router = express.Router()

Router.use("/verification/admin", AdminVerificationRouter)
Router.use("/verification/user", UserVerificationRouter)
Router.use("/chat-with-ai-assistant", ChatbotRouter)
Router.use("/transaction", TransactionRouter)
Router.use("/wishlist", WishlistRouter)
Router.use("/checkout", CheckoutRouter)
Router.use("/business", BusinessRouter)
Router.use("/profile", ProfileRouter)
Router.use("/product", ProductRouter)
Router.use("/wallet", WalletRouter)
Router.use("/order", OrderRouter)
Router.use("/chat", ChatRouter)
export default Router
