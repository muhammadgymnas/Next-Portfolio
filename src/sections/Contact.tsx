"use client";
import { useState, ChangeEvent, FormEvent } from "react";

export const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const recaptchaResponse = (
      document.getElementById("g-recaptcha-response") as HTMLInputElement
    )?.value;

    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA verification.");
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
          recaptchaToken: recaptchaResponse,
        }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setIsModalOpen(false);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
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
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
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
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-cyan-500"
                  rows={4}
                  required
                ></textarea>
              </div>
              {/* reCAPTCHA v2 element */}
              <div
                className="g-recaptcha mb-4"
                data-sitekey="6Lc2Yp0qAAAAAItRLy9f9zRFsv9WnhRvpGp3KFfB"
              ></div>
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
