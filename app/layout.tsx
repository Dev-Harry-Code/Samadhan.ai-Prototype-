import type { Metadata } from "next";
import { Geist_Mono, Ysabeau, Ysabeau_Infant } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const ysabeau = Ysabeau({
  variable: "--font-ysabeau",
  subsets: ["latin"],
});

const ysabeauInfant = Ysabeau_Infant({
  variable: "--font-ysabeau-infant",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samadhan.AI — Civic Crowdsourcing Bridge",
  description:
    "One citizen. One problem. One platform. Real change. AI-powered routing from citizen reports to universities and funders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ysabeau.variable} ${ysabeauInfant.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}