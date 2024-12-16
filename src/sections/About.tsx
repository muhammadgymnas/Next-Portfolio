"use client";

import Image from "next/image";
import Jimnas from "../assets/images/Jim.png";
import ArrowDown from "../assets/icons/arrow-down.svg";

export const AboutSection = () => {
  const handleScrollToPortfolio = () => {
    const portfolioSection = document.getElementById("skillsets");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="about"
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      {/* Container */}
      <div className="relative bg-violet-950 rounded-lg px-6 py-8 shadow-lg w-full max-w-4xl md:max-w-2xl lg:max-w-7xl min-h-[470px] overflow-hidden">
        {/* Konten Flex */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Bagian Gambar */}
          <div className="relative group">
            {/* Border Hitam dengan Transisi */}
            <div className="absolute top-3 left-3 w-[100px] h-[120px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[420px] bg-black rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            {/* Gambar */}
            <div
              className="relative w-[100px] h-[120px] md:w-[250px] md:h-[350px] lg:w-[300px] lg:h-[420px] bg-cyan-400 rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 0 0 3px black",
              }}
            >
              <Image
                src={Jimnas}
                alt="About Jimi"
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Bagian Teks */}
          <div className="text-center md:text-left mt-4 md:mt-5 md:ml-6 text-white font-semibold lg:text-xl">
            <h2 className="text-3xl font-bold mb-6 mt-4">About me</h2>
            <h3 className="md:text-left text-lg font-semibold text-blue-400">
              AI & Data Scientist <br /> Cybersecurity Specialist
            </h3>
            <p className="mt-4 leading-relaxed text-white">
              Hi! I'm Mathematics Undergraduate Student at Padjadjaran
              University, currently specializing in AI, data science, and
              cybersecurity. I help build intelligent solutions and ensure
              robust digital security to tackle modern challenges.
            </p>

            {/* Tombol dengan Transisi */}
            <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
              <button
                onClick={handleScrollToPortfolio} // Fungsi scroll ke bawah
                className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl bg-transparent text-white font-semibold transition-all duration-500 hover:bg-white hover:text-black hover:shadow-lg"
              >
                <span>Uncover My Portfolio</span>
                <ArrowDown className="size-4 transition-transform duration-500 group-hover:translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
