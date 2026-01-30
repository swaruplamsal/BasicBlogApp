// app/layout.js
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Blog - Discover Stories & Ideas",
  description:
    "A modern, elegant blog platform built with Django and Next.js. Share stories, ideas, and insights with the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
