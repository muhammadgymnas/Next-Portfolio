import React, { useEffect, useState, useRef } from "react";
import InstagramIcon from "../assets/icons/instagram.svg";
import GithubIcon from "../assets/icons/github.svg";
import LinkedinIcon from "../assets/icons/linkedin.svg";
import GmailIcon from "../assets/icons/gmail.svg";
import KaggleIcon from "../assets/icons/kaggle.svg";
import LocationIcon from "../assets/icons/location.svg";

export const FooterSection = () => {
  const [inView, setInView] = useState(false);
  const footerRef = useRef(null);

  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <InstagramIcon className="w-8 h-8 transition-all duration-300 filter grayscale hover:filter-none" />
      ),
      link: "https://instagram.com/muhammadgymnas",
    },
    {
      name: "Github",
      icon: (
        <GithubIcon className="w-8 h-8 transition-all duration-300 filter grayscale hover:filter-none" />
      ),
      link: "https://github.com/muhammadgymnas",
    },
    {
      name: "Linkedin",
      icon: (
        <LinkedinIcon className="w-8 h-8 transition-all duration-300 filter grayscale hover:filter-none" />
      ),
      link: "https://linkedin.com/in/muhammadgymnas",
    },
    {
      name: "Gmail",
      icon: (
        <GmailIcon className="w-8 h-8 transition-all duration-300 filter grayscale hover:filter-none" />
      ),
      link: "mailto:muhammadgym23@gmail.com",
    },
    {
      name: "Kaggle",
      icon: (
        <KaggleIcon className="w-8 h-8 transition-all duration-300 filter grayscale hover:filter-none" />
      ),
      link: "https://kaggle.com/muhammadgymnastiar",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`relative text-center py-10 pb-16 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Logo and Name */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="relative flex items-center">
          <div className="absolute top-0 left-0 w-[52px] h-[52.3px] bg-white rounded-full"></div>
          <div
            className="relative flex justify-center items-center bg-blue-500 w-[50px] h-[50px] rounded-full"
            style={{
              boxShadow: "0 0 0 1px black",
            }}
          >
            <span
              className="text-black text-3xl font-extrabold"
              style={{ fontFamily: "var(--font-comic)" }}
            >
              J
            </span>
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Muhammad Gymnastiar
        </h1>
      </div>

      {/* Copywriting */}
      <p className="text-md md:text-lg text-gray-800 max-w-md mx-auto mb-8">
        Ready to bring your ideas to life? Let’s collaborate and create
        something amazing together. Contact me now!
      </p>

      {/* Social Media Icons */}
      <div className="flex space-x-4 justify-center mb-10">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 rounded-full shadow-md transition-transform transform hover:scale-110 hover:rotate-12"
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Location */}
      <div className="md:absolute md:bottom-4 md:left-4 flex items-center justify-center space-x-2 text-gray-700">
        <LocationIcon className="w-6 h-6" />
        <span>Indonesia</span>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-4 inset-x-0 text-center text-gray-700 text-sm">
        © 2025, All Rights by Muhammad Gymnastiar.
      </div>
    </footer>
  );
};
