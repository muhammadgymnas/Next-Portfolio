import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";

// Handler API untuk pengiriman email
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message, recaptchaToken } = req.body;

    // Pastikan semua field terisi
    if (!name || !email || !message || !recaptchaToken) {
      return res
        .status(400)
        .json({ error: "Please fill all fields and complete reCAPTCHA." });
    }

    try {
      // Verifikasi reCAPTCHA
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const recaptchaResponse = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: secretKey,
            response: recaptchaToken,
          },
        }
      );

      if (!recaptchaResponse.data.success) {
        return res
          .status(400)
          .json({ error: "reCAPTCHA verification failed." });
      }

      // Konfigurasi Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Contact Message",
        text: `
          You have a new message from:
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
      };

      // Kirim email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
