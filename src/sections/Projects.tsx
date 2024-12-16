"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
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
    title: "C++ Secure File Storage System",
    description:
      "This project aims to develop a secure file storage application that features encryption and decryption to protect sensitive data. The application will allow users to safely store files, encrypt files upon storage, and decrypt files when accessed. This way, user data will be protected from unauthorized access.",
    link: "/projects/cpp-secure-storage",
  },
  {
    id: 3,
    title: "Golang Task Tracker API",
    description:
      "The Task Tracker API is a RESTful application that allows users to manage and track their tasks. Users can create, read, update, and delete tasks, as well as mark tasks as complete. The application will provide authentication using JSON Web Tokens (JWT) to ensure that each user has a personalized and secure experience. Data will be stored in a NoSQL database, and the application will use the Gin framework to build the API.",
    link: "/projects/golang-task-tracker",
  },
  {
    id: 4,
    title:
      "Peak Traffic Patterns: Analyzing Hourly Traffic Flow Data Across Great Britain",
    description:
      "This project aims to analyze hourly traffic count data collected from various count points across Great Britain to identify peak traffic periods throughout the day and trends over multiple years. By utilizing the Raw Count Data dataset provided by the Department for Transport (DfT), this analysis will segment traffic flows by vehicle type and direction of travel.",
    link: "/projects/traffic-pattern-analysis",
  },
  {
    id: 5,
    title: "C++ Inventory Management System",
    description:
      "This project develops a desktop or web-based inventory management system with Linked List-based CRUD, stock alerts, automated reporting, and role-based security. It enables users to manage products, record transactions, search items, receive stock notifications, and generate analytical reports, optimizing inventory control for businesses. The system is offline and not designed for real-time use.",
    link: "/projects/cpp-inventory-system",
  },
  {
    id: 6,
    title: "C++ 41 Card Games",
    description:
      "This program simulates the 41 card game with shuffled decks, turn-based play (circular queue), and real-time terminal display of cards. Players draw, discard, and score based on matching symbols. The game ends when a player scores 41 or the deck is empty, with scores ranked and the winner announced. Key features include stack-based card handling and efficient card translation.",
    link: "/projects/cpp-card-games",
  },
];

export const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <section id="projects" className="bg-indigo-900 py-16 px-4 md:px-8 mt-24">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-cyan-400">Projects</h2>
        <p className="text-white mt-2">
          Explore my recent work and projects in IT development, design, and
          problem-solving.
        </p>
      </div>

      {/* Projects Container */}
      <div className="relative w-full flex justify-center items-center">
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-full flex-shrink-0 bg-indigo-500 rounded-lg shadow-lg p-6 text-white min-h-100 overflow-hidden"
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={showPrevProject}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-full bg-sky-300 text-black transition hover:scale-105 ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <LeftArrow className="size-4 transition-transform duration-500 group-hover:translate-y-1" />
        </button>
        <button
          onClick={showNextProject}
          disabled={currentIndex === projects.length - 1}
          className={`px-6 py-3 rounded-full bg-sky-300 text-black transition hover:scale-105 ${
            currentIndex === projects.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <RightArrow className="size-4 transition-transform duration-500 group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;
