import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  // display: "swap", // Ensures text remains visible during font loading
});

export const metadata: Metadata = {
  title: "FOBOH Price Adjuster",
  description: "FOBOH price adjuster tech challenge by Will Dunlop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
