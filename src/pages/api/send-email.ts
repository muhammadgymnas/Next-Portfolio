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
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

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

  // Tambahkan validasi panjang pesan
  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({
      error: "Message must be between 10 and 1000 characters.",
    });
  }

  const sanitizedMessage = DOMPurify.sanitize(message);

  try {
    // Verifikasi reCAPTCHA
    const recaptchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    const { success, score, action } = recaptchaResponse.data;

    console.log("reCAPTCHA Score:", score, "Action:", action);

    if (!success || score < 0.5) {
      return res.status(400).json({
        error: "reCAPTCHA verification failed. Possible bot activity.",
      });
    }

    // Konfigurasi Nodemailer
    try {
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

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
      return res
        .status(500)
        .json({ error: "Failed to send email. Please try again later." });
    }
  } catch (recaptchaError) {
    console.error("reCAPTCHA verification failed:", recaptchaError);
    return res.status(500).json({
      error: "reCAPTCHA verification failed. Please try again.",
    });
  }
}
