import type { Metadata } from "next";
import { Press_Start_2P, VT323, Outfit } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ta Duc Dung | Software Engineer Portfolio",
  description: "Personal developer portfolio of Ta Duc Dung (DungTa) - Aspiring Software Engineer focusing on scalable systems, backend services, and clean interface designs.",
  keywords: ["Ta Duc Dung", "DungTa", "juntaaa", "Software Engineer", "Backend Developer", "Golang", "TypeScript", "React", "Next.js", "ICPC"],
  authors: [{ name: "Ta Duc Dung" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart2P.variable} ${vt323.variable} ${outfit.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[#0b0c10] text-[#ededed] font-sans antialiased selection:bg-[#ffd700] selection:text-black">
        {children}
      </body>
    </html>
  );
}
