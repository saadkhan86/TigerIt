import Stripe from "stripe";
console.log(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
});
export default stripe