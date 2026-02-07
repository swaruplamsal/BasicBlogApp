// app/components/Navbar.js
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const NavbarAuth = dynamic(() => import("./NavbarAuth"), { ssr: false });

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-gray-800/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #000080, #FF0000)",
                boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.3)",
              }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#f1f5f9",
              }}
            >
              Editorial
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="link-nav font-medium text-sm tracking-wide"
            >
              Home
            </Link>
            <NavbarAuth />
          </div>
        </div>
      </div>
    </nav>
  );
}
