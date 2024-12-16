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
    // Memuat script reCAPTCHA v2 saat komponen di-mount
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsetsSection />
      <ProjectsSection />
      <div
        className="g-recaptcha"
        data-sitekey="6Lefhp0qAAAAADnNXz49RTK1tO2ubsaUz-t5clyk
"
      ></div>
      <ContactSection />
      <FooterSection />
    </div>
  );
}
