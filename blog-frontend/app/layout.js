// app/layout.js
import { AuthProvider } from "./context/AuthContext";
import { generateSiteMetadata } from "../lib/metadata";
import "./globals.css";

export const metadata = generateSiteMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
