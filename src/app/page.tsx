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
