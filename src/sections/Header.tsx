"use client";

import { useState } from "react";
import NavbarBurger from "../assets/icons/burger.svg";
import CloseIcon from "../assets/icons/close.svg";

export const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -100; // Offset sebesar 50px ke atas
      const yPosition =
        section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-white rounded-b-3xl shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
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

        <button
          className={`block md:hidden focus:outline-none transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "rotate-180" : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          {isMenuOpen ? (
            <CloseIcon
              alt="Close Menu"
              width={24}
              height={24}
              className="fill-white transition-opacity duration-900 ease-out"
            />
          ) : (
            <NavbarBurger
              alt="Open Menu"
              width={24}
              height={24}
              className="fill-white transition-opacity duration-900 ease-in"
            />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => handleScroll("hero")}
            className="nav-item text-base md:text-lg lg:text-xl"
          >
            Home
          </button>
          <button
            onClick={() => handleScroll("about")}
            className="nav-item text-base md:text-lg lg:text-xl"
          >
            About
          </button>
          <button
            onClick={() => handleScroll("projects")}
            className="nav-item text-base md:text-lg lg:text-xl"
          >
            Projects
          </button>
          <button
            onClick={() => handleScroll("contact")}
            className="nav-item text-base md:text-lg lg:text-xl"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center bg-gray-800 w-full px-6 py-4 space-y-4 md:hidden">
          <button
            onClick={() => handleScroll("hero")}
            className="nav-item text-white"
          >
            Home
          </button>
          <button
            onClick={() => handleScroll("about")}
            className="nav-item text-white"
          >
            About
          </button>
          <button
            onClick={() => handleScroll("projects")}
            className="nav-item text-white"
          >
            Projects
          </button>
          <button
            onClick={() => handleScroll("contact")}
            className="nav-item text-white"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
