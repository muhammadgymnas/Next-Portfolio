import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-comic",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          montserrat.variable,
          "bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] text-white antialiased font-sans relative"
        )}
      >
        <div className="absolute inset-0 bg-black opacity-10 pointer-events-none z-10"></div>

        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
          <path
            d="M40 0C17.908 0 0 17.908 0 40s17.908 40 40 40 40-17.908 40-40S62.092 0 40 0zm0 75c-19.898 0-35-15.102-35-35S20.102 5 40 5s35 15.102 35 35-15.102 35-35 35z"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="4"
          />
          <circle cx="40" cy="40" r="15" fill="#60a5fa" />
        </div>

        {children}
      </body>
    </html>
  );
}
