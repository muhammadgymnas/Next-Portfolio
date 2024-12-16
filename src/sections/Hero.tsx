import Image from "next/image";
import Jimnas from "../assets/images/Jim.png";

export const HeroSection = () => {
  return (
    <div
      id="hero"
      className="flex flex-col px-6 py-2 md:flex-row md:items-center md:p-6 md:justify-between"
    >
      {/* Bagian Teks */}
      <div className="text-left md:text-left mt-10 md:ml-12">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900 leading-tight">
          Hello, <br className="md:block" /> I'm{" "}
          <span className="md:hidden">Jimi</span>
          <span className="hidden md:inline">Jimi</span>
        </h1>
        <p className="text-gray-800 md:text-gray-700 text-lg md:text-xl lg:text-2xl mt-2">
          <span className="md:hidden">
            AI & Data Scientist <br /> Cybersecurity Specialist
          </span>
          <span className="hidden md:inline">
            AI & Data Scientist, <br />
            <span>Cybersecurity Specialist</span>
          </span>
        </p>

        {/* Tombol */}
        <div className="hidden md:font-bold md:flex md:gap-4 md:mt-6 md:flex-row lg:text-xl">
          {/* Hire Me */}
          <a
            href="https://linkedin.com/in/muhammadgymnas"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-black text-white px-6 py-2 rounded-lg shadow-lg button-effect hover:bg-white hover:text-black transition-all duration-300"
          >
            Hire me
          </a>
          {/* Download CV */}
          <a
            href="/CV_Muhammad Gymnastiar.pdf"
            download="Muhammad Gymnastiar_CV.pdf"
            className="relative bg-black text-white px-6 py-2 rounded-lg shadow-lg button-effect hover:bg-white hover:text-black transition-all duration-300"
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Bagian Gambar */}
      <div className="relative mt-6 md:mt-0 md:mr-12 lg:mr-20 lg:mt-8">
        {/* Border Hitam di Belakang */}
        <div className="absolute top-3 left-3 w-[250px] h-[350px] md:w-[300px] md:h-[420px] lg:w-[350px] lg:h-[490px] bg-black rounded-lg"></div>
        {/* Border Cyan di Depan */}
        <div className="relative w-[250px] h-[350px] md:w-[300px] md:h-[420px] lg:w-[350px] lg:h-[490px] bg-cyan-400 rounded-lg">
          <Image
            src={Jimnas}
            alt="Ghiblify Jimnas"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      {/* Tombol */}
      <div className="flex flex-row gap-4 mt-9 md:hidden font-bold leading-tight">
        {/* Tombol Hire Me */}
        <a
          href="https://linkedin.com/in/muhammadgymnas" // Ganti dengan URL LinkedIn Anda
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-black text-white px-6 py-2 rounded-lg shadow-lg button-effect hover:bg-white hover:text-black transition-all duration-300"
        >
          Hire me
        </a>
        {/* Tombol Download CV */}
        <a
          href="/CV_Muhammad Gymnastiar.pdf" // Ganti dengan path file PDF CV Anda
          download="Muhammad Gymnastiar_CV.pdf"
          className="relative bg-black text-white px-6 py-2 rounded-lg shadow-lg button-effect hover:bg-white hover:text-black transition-all duration-300"
        >
          Download CV
        </a>
      </div>
    </div>
  );
};
