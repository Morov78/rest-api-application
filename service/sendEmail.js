const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const msg = { ...data, from: "morov78@ukr.net" };
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      // console.log(data);
      return true;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = sendEmail;
