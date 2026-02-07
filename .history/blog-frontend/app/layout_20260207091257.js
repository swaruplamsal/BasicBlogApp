// app/layout.js
import { Lora, Playfair_Display } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import { generateSiteMetadata } from "../lib/metadata";
import "./globals.css";

export const metadata = generateSiteMetadata();

const lora = Lora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-lora",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-playfair",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
