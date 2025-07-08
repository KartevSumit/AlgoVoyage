import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const mailSender = async (email, title, body) => {
  try {
    let transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: 'Kartev Sumit',
      to: email,
      subject: title,
      text: body,
    });

    return info;
  } catch (error) {
    console.log('Error in mailSender.js', error);
  }
};
