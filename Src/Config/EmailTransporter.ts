import nodemailer from "nodemailer";
const transporter = async () => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: 'sk8613013@gmail.com',
            pass: 'fqpqbiqmzmfzkkgn'
        }
    })
}
export default transporter
