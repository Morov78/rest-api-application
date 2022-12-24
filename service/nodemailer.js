const nodemailer = require("nodemailer");

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "morov78@meta.ua",
    pass: process.env.META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendNodemailer = async (data) => {
  try {
    const emailOptions = { ...data, from: "morov78@meta.ua" };

    await transporter.sendMail(emailOptions);

    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendNodemailer;
