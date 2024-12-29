"use client";

import { useEffect, useState } from "react";
import { Header } from "../sections/Header";
import { HeroSection } from "../sections/Hero";
import { AboutSection } from "../sections/About";
import { SkillsetsSection } from "../sections/Skillsets";
import { ProjectsSection } from "../sections/Projects";
import { ContactSection } from "../sections/Contact";
import { FooterSection } from "../sections/Footer";

// Import framer-motion untuk animasi
import { motion } from "framer-motion";

const sections = [
  { id: "hero", Component: HeroSection },
  { id: "about", Component: AboutSection },
  { id: "skillsets", Component: SkillsetsSection },
  { id: "projects", Component: ProjectsSection },
  { id: "contact", Component: ContactSection },
];

export default function Home() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".section");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div>
      <Header />
      {sections.map(({ id, Component }) => (
        <motion.div
          key={id}
          className="section"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Component />
        </motion.div>
      ))}
      <FooterSection />
    </div>
  );
}
