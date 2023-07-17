const nodemailer = require("nodemailer");

require("dotenv").config();

const { EMAIL_PASSWORD } = process.env;

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
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "sandrix@ukr.net" };
  await transport
    .sendMail(email)
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.log(error.message));
};

module.exports = sendEmail;
