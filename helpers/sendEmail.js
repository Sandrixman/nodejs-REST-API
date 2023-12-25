const nodemailer = require("nodemailer")
const HttpError = require("./HttpError")

require("dotenv").config()

const { EMAIL_PASSWORD, BASE_URL } = process.env

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: "sandrix@ukr.net",
        pass: EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (email, verificationToken) => {
    try {
        const sendEmailForVerification = {
            to: email,
            from: "sandrix@ukr.net",
            subject: "Verify email",
            html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click ferify email</a>`,
        }
        await transport.sendMail(sendEmailForVerification)
        console.log("Email sent successfully")
    } catch (error) {
        throw HttpError(404, "User not found")
    }
}

module.exports = sendEmail
