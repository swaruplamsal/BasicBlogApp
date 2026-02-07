// app/layout.js
import { Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import { AuthProvider } from "./context/AuthContext";
import { generateSiteMetadata } from "../lib/metadata";
import "./globals.css";

export const metadata = generateSiteMetadata();

const geist = localFont({
  src: [
    {
      path: "https://cdn.jsdelivr.net/npm/geist@1.2.1/dist/fonts/geist-sans/Geist-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "https://cdn.jsdelivr.net/npm/geist@1.2.1/dist/fonts/geist-sans/Geist-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "https://cdn.jsdelivr.net/npm/geist@1.2.1/dist/fonts/geist-sans/Geist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "https://cdn.jsdelivr.net/npm/geist@1.2.1/dist/fonts/geist-sans/Geist-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "https://cdn.jsdelivr.net/npm/geist@1.2.1/dist/fonts/geist-sans/Geist-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "https://cdn.jsdelivr.net/npm/geist@1.2.1/dist/fonts/geist-sans/Geist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-source-serif",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${sourceSerif.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
