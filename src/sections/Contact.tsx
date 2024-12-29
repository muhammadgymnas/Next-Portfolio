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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("reCAPTCHA script loaded.");
    };

    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script.");
      alert("Failed to load Google reCAPTCHA.");
    };

    if (
      !document.querySelector(
        'script[src="https://www.google.com/recaptcha/api.js"]'
      )
    ) {
      document.body.appendChild(script);
    }
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (recaptchaWidgetId === null) {
      alert("reCAPTCHA is not initialized. Please try again.");
      return;
    }

    const recaptchaToken = window.grecaptcha.getResponse(recaptchaWidgetId);

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        closeWithAnimation();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      window.grecaptcha.reset(recaptchaWidgetId); // Reset the widget for reuse
    }
  };

  const openWithAnimation = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalVisible(true);

      if (window.grecaptcha) {
        const widgetId = window.grecaptcha.render("recaptcha-container", {
          sitekey: "6Lefhp0qAAAAADnNXz49RTK1tO2ubsaUz-t5clyk",
        });
        setRecaptchaWidgetId(widgetId);
      }
    }, 100); // Ensure modal is fully rendered before rendering reCAPTCHA
  };

  const closeWithAnimation = () => {
    setIsModalVisible(false);
    setTimeout(() => setIsModalOpen(false), 300);
    setRecaptchaWidgetId(null); // Reset the widget ID when modal is closed
  };

  return (
    <div id="contact" className="bg-cyan-400 text-center py-20 mt-32">
      <p className="text-sm md:text-2xl font-bold text-white mb-10 md:mb-20">
        If You have any Query or Project ideas feel free to
      </p>
      <button onClick={openWithAnimation} className="contact-button">
        Contact me
      </button>

      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white p-6 rounded-md shadow-md w-11/12 md:w-2/3 lg:w-1/2 transform transition-transform duration-300 ${
              isModalVisible ? "scale-100" : "scale-95"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-cyan-500">Contact Me</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name.."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address.."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here.."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div id="recaptcha-container" className="mb-4"></div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeWithAnimation}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className={`flex items-center gap-2 bg-cyan-500 text-white py-2 px-4 rounded ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
