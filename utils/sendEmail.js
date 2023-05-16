const nodemailer = require("nodemailer");

// eslint-disable-next-line no-unused-vars
module.exports.sendEmail = async (emailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: emailOptions.email,
    subject: emailOptions.subject,
    text: emailOptions.message,
  };

  await transporter.sendMail(mailOptions);
};
