"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

export const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Muat script reCAPTCHA
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log("reCAPTCHA script loaded successfully.");
    };

    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script.");
    };
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!window.grecaptcha) {
      alert("reCAPTCHA is not loaded. Please reload the page.");
      return;
    }

    console.log("Running reCAPTCHA...");
    // Jalankan reCAPTCHA
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("6Lefhp0qAAAAADnNXz49RTK1tO2ubsaUz-t5clyk", {
          action: "submit",
        })
        .then(async (recaptchaToken) => {
          console.log("reCAPTCHA token received:", recaptchaToken);
          await sendEmail(recaptchaToken);
        })
        .catch((err) => {
          console.error("reCAPTCHA execution failed:", err);
          alert("Failed to verify reCAPTCHA. Please try again.");
        });
    });
  };

  const sendEmail = async (recaptchaToken: string) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken, // Kirim token reCAPTCHA
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setIsModalOpen(false);
      } else {
        console.error("Failed response from server:", response);
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="bg-cyan-400 text-center py-20 mt-32">
      <p className="text-sm md:text-2xl font-bold text-white mb-10 md:mb-20">
        If You have any Query or Project ideas feel free to
      </p>
      <button onClick={() => setIsModalOpen(true)} className="contact-button">
        Contact me
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-11/12 md:w-19/20">
            <h2 className="text-lg font-bold mb-4 text-cyan-500">Contact Me</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 text-white py-2 px-4 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
