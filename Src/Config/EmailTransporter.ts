import nodemailer from "nodemailer";
const transporter = async () => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
}
export default transporter
