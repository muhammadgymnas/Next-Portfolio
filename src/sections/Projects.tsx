"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import RightArrow from "../assets/icons/right-arrow.svg";
import LeftArrow from "../assets/icons/left-arrow.svg";

const projects = [
  {
    id: 1,
    title: "Analyzing Survival Outcomes in Hepatocellular Carcinoma",
    description:
      "This project aims to investigate the survival outcomes of patients diagnosed with Hepatocellular Carcinoma (HCC) using a comprehensive dataset obtained from a University Hospital in Portugal. Key Methods: Pandas, K-Nearest Neighbors (KNN) imputation, Kaplan-Meier estimator, Log-rank test, Cox Proportional Hazards Model, Logistic Regression, Confusion matrix, ROC curve, and AUC.",
    link: "/projects/hcc-survival-analysis",
  },
  {
    id: 2,
    title:
      "Peak Traffic Patterns: Analyzing Hourly Traffic Flow Data Across Great Britain",
    description:
      "This project aims to analyze hourly traffic count data collected from various count points across Great Britain to identify peak traffic periods throughout the day and trends over multiple years. By utilizing the Raw Count Data dataset provided by the Department for Transport (DfT), this analysis will segment traffic flows by vehicle type and direction of travel.",
    link: "/projects/traffic-pattern-analysis",
  },
  {
    id: 3,
    title: "Proofix.ai",
    description:
      "Proofix.ai is a cutting-edge generative AI platform designed to tackle advanced mathematics problems with precision and ease. Empowering students, educators, and professionals, it transforms complex equations into elegant solutions in seconds, unlocking new possibilities in learning and problem-solving.",
    link: "/projects/proofix-ai",
  },
];

export const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const showNextProject = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPrevProject = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    const section = document.getElementById("projects");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="projects" className="bg-indigo-900 py-16 px-4 md:px-8 mt-24">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          className="text-4xl font-bold text-cyan-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -30,
          }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          Projects
        </motion.h2>
        <motion.p
          className="text-white mt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 30,
          }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            delay: 0.3,
          }}
        >
          Explore my recent work and projects in IT development, design, and
          problem-solving.
        </motion.p>
      </div>

      {/* Projects Container */}
      <div className="relative w-full flex justify-center items-center">
        <motion.div
          className="w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="w-full flex-shrink-0 bg-indigo-500 rounded-lg shadow-lg p-6 text-white min-h-100 overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : 50,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 * project.id,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <div className="bg-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 text-2xl">
                  {project.id}
                </div>
                <h3 className="text-xl font-semibold mb-2 break-words">
                  {project.title}
                </h3>
                <p className="text-sm break-words">{project.description}</p>
                <Link href={project.link}>
                  <span className="mt-4 font-bold inline-block bg-sky-300 text-black py-2 px-4 rounded hover:bg-teal-400 hover:text-white transition-all duration-300">
                    Learn More
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <motion.button
          onClick={showPrevProject}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-full bg-sky-300 text-black transition hover:scale-105 ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          whileHover={{ scale: 1.1 }}
        >
          <LeftArrow className="size-4 transition-transform duration-500 group-hover:translate-y-1" />
        </motion.button>
        <motion.button
          onClick={showNextProject}
          disabled={currentIndex === projects.length - 1}
          className={`px-6 py-3 rounded-full bg-sky-300 text-black transition hover:scale-105 ${
            currentIndex === projects.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          whileHover={{ scale: 1.1 }}
        >
          <RightArrow className="size-4 transition-transform duration-500 group-hover:translate-y-1" />
        </motion.button>
      </div>
    </section>
  );
};

export default ProjectsSection;
