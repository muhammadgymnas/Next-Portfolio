import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import validator from "validator";
import DOMPurify from "isomorphic-dompurify";

// Google Cloud Project ID
const PROJECT_ID =
  process.env.GCP_PROJECT_ID || "jimi-portfolio-r-1734369808876";
const RECAPTCHA_SITE_KEY =
  process.env.RECAPTCHA_SITE_KEY || "6Lefhp0qAAAAADnNXz49RTK1tO2ubsaUz-t5clyk";
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Initialize Google reCAPTCHA Enterprise Client
const recaptchaClient = new RecaptchaEnterpriseServiceClient();

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

  // Validasi input
  if (!name || !email || !message || !recaptchaToken) {
    return res
      .status(400)
      .json({ error: "Please fill all fields and complete reCAPTCHA." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
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

    if (score >= 0.5) {
      console.log("reCAPTCHA risk score:", score);
    } else {
      console.error("reCAPTCHA risk score is too low.");
      return res.status(400).json({
        error: "Failed reCAPTCHA verification. Please try again.",
      });
    }

    // Konfigurasi Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,
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
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(
      "Error during email sending or reCAPTCHA verification:",
      error
    );
    return res
      .status(500)
      .json({ error: "An error occurred. Please try again." });
  }
}
