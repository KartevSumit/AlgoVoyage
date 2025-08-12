import nodeMailer from 'nodemailer';
import { MAIL_TRANSPORT_OPTIONS } from '../config/env.js';

export const mailSender = async (email: string, title: string, body: string) => {
  try {
    let transporter = nodeMailer.createTransport(MAIL_TRANSPORT_OPTIONS);

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
