// app/layout.js
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "My Blog",
  description: "A blog built with Django and Next.js",
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
