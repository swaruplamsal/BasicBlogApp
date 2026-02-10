// app/layout.js
import { Lora, Playfair_Display } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import { generateHomeMetadata } from "../lib/metadata";
import "./globals.css";

export const metadata = generateHomeMetadata();

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      <body className={`${lora.variable} ${playfair.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
