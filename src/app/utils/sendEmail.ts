import nodemailer from "nodemailer";
import config from "../config";

// mail send er kaj ta nodemailer package diye kore
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    // host , port gmail er jnno fixed
    host: "smtp.gmail.com.",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "asawom250@gmail.com",
      pass: "gjxo kafj xzxk nyxw",
    },
  });

  await transporter.sendMail({
    from: "asawom250@gmail.com", // sender address
    to : "19101008@uap-bd.edu", // list of receivers
    subject: "Reset your password within ten mins!", // Subject line
    text: "", // plain text body
    html, // html body
  });
};
