import EmailTransporter from "../Config/EmailTransporter"
import { businessOrderNotification, transactionEmail, verificationEmail } from "../Utils/EmailContent"

const sendEmail = async (topic: string, subject: string, receivers: { userId: string, email: string, name: string }[] | { userId: string, email: string, name: string }, orderId?: string | null) => {
    const transporter = await EmailTransporter()
    let content = undefined
    const mainReceiver = Array.isArray(receivers) ? receivers[0] : receivers
    const recipientInfo = Array.isArray(receivers)
        ? receivers.map(r => r.email).join(', ')
        : receivers.email
    if (topic === "verification") {
        content = verificationEmail(mainReceiver.name)
    } if (topic === "topup" || topic === "transaction") {
        content = transactionEmail(mainReceiver.name, orderId ?? null)
    } if (topic === "business_notification" && orderId) {
        content = businessOrderNotification(mainReceiver.name, orderId)
    }
    const mailOptions = {
        from: 'TigerIt Delivery <tigerit_delivery@gmail.com>',
        to: recipientInfo,
        subject: subject,
        text: content?.text,
        html: content?.html
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}
export default sendEmail