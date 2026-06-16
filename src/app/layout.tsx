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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dungta.dev";
const SITE_TITLE = "Ta Duc Dung | Software Engineer Portfolio";
const SITE_DESCRIPTION =
  "Personal developer portfolio of Ta Duc Dung (DungTa) - Aspiring Software Engineer focusing on scalable systems, backend services, and clean interface designs.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ["Ta Duc Dung", "DungTa", "juntaaa", "Software Engineer", "Backend Developer", "Golang", "TypeScript", "React", "Next.js", "ICPC"],
  authors: [{ name: "Ta Duc Dung" }],
  alternates: {
    canonical: "/",
  },
  // og:image and twitter:image are injected automatically from
  // opengraph-image.tsx / twitter-image.tsx in this segment.
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: "Ta Duc Dung Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
