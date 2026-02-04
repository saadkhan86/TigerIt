import express from 'express'
import ProfileRouter from './ProfileRouter'
import BusinessRouter from './BusinessRouter'
import WalletRouter from './WalletRouter'
import ProductRouter from './ProductRouter'
import UserVerificationRouter from './UserVerificationRouter'
import AdminVerificationRouter from './AdminVerificationRouter'
import WishlistRouter from './WishlistRouter'
import CheckoutRouter from './CheckoutRouter'
import OrderRouter from './OrderRouter'
import TransactionRouter from './TransactionRouter'
const Router = express.Router()
Router.use('/profile', ProfileRouter)//checked
Router.use('/business', BusinessRouter)//checked
Router.use('/wallet', WalletRouter)//checked
Router.use('/product', ProductRouter)//checked
Router.use('/wishlist', WishlistRouter)//checked
Router.use('/checkout', CheckoutRouter)//checked
Router.use('/order', OrderRouter)//checked
Router.use('/transaction', TransactionRouter)
Router.use('/verification/user', UserVerificationRouter)//checked
Router.use('/verification/admin', AdminVerificationRouter)//checked
export default Router
