import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";
import validator from "validator";
import DOMPurify from "isomorphic-dompurify";

// Handler API untuk pengiriman email
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message, recaptchaToken } = req.body;

    // Pastikan environment variables tersedia
    if (
      !process.env.RECAPTCHA_SECRET_KEY ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      return res.status(500).json({ error: "Server configuration error." });
    }

    // Validasi input
    if (!name || !email || !message || !recaptchaToken) {
      return res
        .status(400)
        .json({ error: "Please fill all fields and complete reCAPTCHA." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const sanitizedMessage = DOMPurify.sanitize(message);

    try {
      // Verifikasi reCAPTCHA
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const recaptchaResponse = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params: {
            secret: secretKey,
            response: recaptchaToken,
          },
        }
      );

      const { success, score, action } = recaptchaResponse.data;

      console.log("reCAPTCHA Score:", score, "Action:", action);

      if (!success || action !== "submit" || score < 0.5) {
        return res.status(400).json({
          error: "reCAPTCHA verification failed. Possible bot activity.",
        });
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
          Message: ${sanitizedMessage}
        `,
      };

      // Kirim email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error: any) {
      console.error("Error occurred:", error);

      if (error.response) {
        console.error("Error response from reCAPTCHA:", error.response.data);
      }

      res.status(500).json({
        error: "Failed to send email. Please try again later.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
