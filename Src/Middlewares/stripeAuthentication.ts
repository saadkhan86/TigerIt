import stripe from "../Config/Stripe";
import { IUser } from "../Interfaces/IUser";

const stripeAuthentication = async (user: IUser.Doc) => {
    if (user.stripeCustomerId) {
        return user.stripeCustomerId
    }
    const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        phone: user.phone,
        metadata: {
            userId: user._id.toString()
        }
    })
    user.stripeCustomerId = customer.id
    await user.save()
    return customer.id
}
export default stripeAuthentication