"use client";

import { useEffect } from "react";
import { Header } from "../sections/Header";
import { HeroSection } from "../sections/Hero";
import { AboutSection } from "../sections/About";
import { SkillsetsSection } from "../sections/Skillsets";
import { ProjectsSection } from "../sections/Projects";
import { ContactSection } from "../sections/Contact";
import { FooterSection } from "../sections/Footer";

export default function Home() {
  useEffect(() => {
    // Memuat script reCAPTCHA saat komponen di-mount
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/enterprise.js?render=YOUR_SITE_KEY";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Fungsi untuk menjalankan reCAPTCHA
    script.onload = () => {
      grecaptcha.enterprise.ready(() => {
        grecaptcha.enterprise
          .execute("YOUR_SITE_KEY", { action: "homepage" })
          .then((token) => {
            console.log("reCAPTCHA token:", token);
            // Kirim token ke backend di sini
          });
      });
    };
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsetsSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
