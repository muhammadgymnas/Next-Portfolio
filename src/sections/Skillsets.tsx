import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CppIcon from "../assets/icons/cpp.svg";
import GolangIcon from "../assets/icons/golang.svg";
import CsharpIcon from "../assets/icons/csharp.svg";
import JuliaIcon from "../assets/icons/julia.svg";
import MatlabIcon from "../assets/icons/matlab.svg";
import PythonIcon from "../assets/icons/python.svg";
import RIcon from "../assets/icons/r.svg";
import RustIcon from "../assets/icons/rust.svg";
import ScalaIcon from "../assets/icons/scala.svg";
import JavascriptIcon from "../assets/icons/javascript.svg";
import SparkIcon from "../assets/icons/spark.svg";
import MongodbIcon from "../assets/icons/mongodb.svg";
import MysqlIcon from "../assets/icons/mysql.svg";
import PowerBIIcon from "../assets/icons/powerbi.svg";
import PostgresqlIcon from "../assets/icons/postgresql.svg";
import TableauIcon from "../assets/icons/tableau.svg";
import CssIcon from "../assets/icons/css.svg";
import HtmlIcon from "../assets/icons/html.svg";
import NextjsIcon from "../assets/icons/nextjs.svg";
import ReactjsIcon from "../assets/icons/reactjs.svg";
import TailwindIcon from "../assets/icons/tailwind.svg";
import LinuxIcon from "../assets/icons/linux.svg";
import BashIcon from "../assets/icons/bash.png";
import WiresharkIcon from "../assets/icons/wireshark.png";
import BurpsuiteIcon from "../assets/icons/burpsuite.svg";
import PerlIcon from "../assets/icons/perl.svg";
import PowershellIcon from "../assets/icons/powershell.svg";

const skills = [
  {
    category: "Programming Language",
    items: [
      { name: "C++", icon: <CppIcon className="w-16 h-16" /> },
      { name: "Go Lang", icon: <GolangIcon className="w-16 h-16" /> },
      { name: "C#", icon: <CsharpIcon className="w-16 h-16" /> },
      { name: "Julia", icon: <JuliaIcon className="w-16 h-16" /> },
      { name: "Matlab", icon: <MatlabIcon className="w-16 h-16" /> },
      { name: "Python", icon: <PythonIcon className="w-16 h-16" /> },
      { name: "R", icon: <RIcon className="w-16 h-16" /> },
      { name: "Rust", icon: <RustIcon className="w-16 h-16" /> },
      { name: "Scala", icon: <ScalaIcon className="w-16 h-16" /> },
      { name: "JavaScript", icon: <JavascriptIcon className="w-16 h-16" /> },
    ],
  },
  {
    category: "Data Analysis",
    items: [
      { name: "Apache Spark", icon: <SparkIcon className="w-16 h-16" /> },
      { name: "MongoDB", icon: <MongodbIcon className="w-16 h-16" /> },
      { name: "MySQL", icon: <MysqlIcon className="w-16 h-16" /> },
      { name: "Power BI", icon: <PowerBIIcon className="w-16 h-16" /> },
      { name: "PostgreSQL", icon: <PostgresqlIcon className="w-16 h-16" /> },
      { name: "Tableau", icon: <TableauIcon className="w-16 h-16" /> },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "CSS", icon: <CssIcon className="w-16 h-16" /> },
      { name: "HTML", icon: <HtmlIcon className="w-16 h-16" /> },
      { name: "Next.js", icon: <NextjsIcon className="w-16 h-16" /> },
      { name: "React.js", icon: <ReactjsIcon className="w-16 h-16" /> },
      { name: "Tailwind CSS", icon: <TailwindIcon className="w-16 h-16" /> },
    ],
  },
  {
    category: "Cybersecurity",
    items: [
      { name: "Linux", icon: <LinuxIcon className="w-16 h-16" /> },
      {
        name: "Bash",
        icon: (
          <Image
            src={BashIcon}
            alt="Bash"
            width={64}
            height={64}
            className="grayscale group-hover:grayscale-0 transition duration-300"
          />
        ),
      },
      {
        name: "Wireshark",
        icon: (
          <Image
            src={WiresharkIcon}
            alt="Wireshark"
            width={64}
            height={64}
            className="grayscale group-hover:grayscale-0 transition duration-300"
          />
        ),
      },
      { name: "Burp Suite", icon: <BurpsuiteIcon className="w-16 h-16" /> },
      { name: "Perl", icon: <PerlIcon className="w-16 h-16" /> },
      { name: "PowerShell", icon: <PowershellIcon className="w-16 h-16" /> },
    ],
  },
];

export const SkillsetsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 50% of the section is in view
      }
    );

    const section = document.getElementById("skillsets");
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
    <section id="skillsets" className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 w-[96%] max-w-7xl min-h-3 mx-auto bg-blue-900 top-20 rounded-lg shadow-xl -z-10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-white mb-8 -mt-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 50,
          }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          My Skillsets
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
              }}
              transition={{
                duration: 1,
                delay: 0.3 * index,
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
            >
              <motion.h3
                className="text-xl font-semibold mb-4 text-gray-100"
                initial={{ opacity: 0, x: -30 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : -30,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 * index,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                {skillCategory.category}
              </motion.h3>
              <div className="h-1 bg-gradient-to-r from-fuchsia-300 to-blue-400 mb-6 rounded"></div>
              <div className="flex flex-wrap gap-4">
                {skillCategory.items.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center group hover:scale-110 transition-transform ease-in-out duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      y: isVisible ? 0 : 30,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: (index + idx) * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 10,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                  >
                    <div className="w-16 h-16 filter grayscale group-hover:filter-none transition duration-300">
                      {skill.icon}
                    </div>
                    <p className="mt-2 text-white text-sm font-medium group-hover:text-gray-100">
                      {skill.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
