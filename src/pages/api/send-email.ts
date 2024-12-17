import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import validator from "validator";
import DOMPurify from "isomorphic-dompurify";

// Ambil variabel lingkungan
const PROJECT_ID = process.env.GCP_PROJECT_ID || "";
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || "";
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || "";
const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASS = process.env.EMAIL_PASS || "";

// Validasi bahwa semua variabel lingkungan sudah terisi
if (!PROJECT_ID || !RECAPTCHA_SITE_KEY || !EMAIL_USER || !EMAIL_PASS) {
  throw new Error(
    "Missing required environment variables. Please check your .env.local file."
  );
}

// Inisialisasi klien Google reCAPTCHA Enterprise
const recaptchaClient = new RecaptchaEnterpriseServiceClient();

// Handler API untuk pengiriman email
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Batasi hanya metode POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, message, recaptchaToken } = req.body;

  // Validasi input
  if (!name || !email || !message || !recaptchaToken) {
    return res
      .status(400)
      .json({ error: "Please fill all fields and complete reCAPTCHA." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      error: "Name must be between 2 and 50 characters.",
    });
  }

  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({
      error: "Message must be between 10 and 1000 characters.",
    });
  }

  const sanitizedMessage = DOMPurify.sanitize(message);

  try {
    // Verifikasi reCAPTCHA menggunakan Google reCAPTCHA Enterprise
    const projectPath = recaptchaClient.projectPath(PROJECT_ID);

    const [response] = await recaptchaClient.createAssessment({
      parent: projectPath,
      assessment: {
        event: {
          token: recaptchaToken,
          siteKey: RECAPTCHA_SITE_KEY,
        },
      },
    });

    const { tokenProperties, riskAnalysis } = response;

    // Validasi token reCAPTCHA
    if (!tokenProperties?.valid) {
      console.error(
        `Invalid reCAPTCHA token: ${tokenProperties?.invalidReason}`
      );
      return res.status(400).json({
        error: "Invalid reCAPTCHA token. Please try again.",
      });
    }

    // Validasi aksi dan risiko
    if (tokenProperties.action !== "submit") {
      console.error("Unexpected reCAPTCHA action:", tokenProperties.action);
      return res.status(400).json({
        error: "Unexpected reCAPTCHA action. Please try again.",
      });
    }

    const score = riskAnalysis?.score ?? 0;

    if (score < 0.5) {
      console.error("reCAPTCHA risk score is too low:", score);
      return res.status(400).json({
        error: "Failed reCAPTCHA verification. Please try again.",
      });
    }

    // Konfigurasi Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Gunakan SSL
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: `New Message from ${name}`,
      text: `
        You have a new message from:
        Name: ${name}
        Email: ${email}
        Message: ${sanitizedMessage}
      `,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(
      "Error during email sending or reCAPTCHA verification:",
      error.message
    );
    return res.status(500).json({
      error:
        "An error occurred while processing your request. Please try again.",
    });
  }
}
