import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./constant";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const passwordEncrypt = async (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const result = await bcrypt.hashSync(password, salt);
  return result;
};

export const passwordCompare = async (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

export const createToken = (user_id, email) => {
  return jwt.sign({ user_id, email }, "XyskeiRKreomkwjwuU");
};

export const verifyToken = (token) => {
  return jwt.verify(token, "XyskeiRKreomkwjwuU");
};

export const generateSixDigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendEmailVerification = (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME || "dharmikv.dev@gmail.com",
      pass: process.env.SMTP_PASSWORD || "kpsysfzyubvbiypj",
    },
  });
  const mailOptions = {
    from: process.env.SMTP_USERNAME || "dharmikv.dev@gmail.com",
    to: email,
    subject: "Email Otp Verification",
    html: `To continue your application as a instructor, please use the following Application Code/OTP,<br/><br/><h1 style={{textAlign:'center'}}> ${otp}</h1><br/><br/>This OTP is valid for only 10 mins. If you require any assistance. Please contact our 24 hr Customer Service Hotline at 1800 xxx xxxx.
<br/>Thank you`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
