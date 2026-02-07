// app/components/Navbar.js
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const NavbarAuth = dynamic(() => import("./NavbarAuth"), { ssr: false });

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-neutral-800/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-mint-400 shadow-brand flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="text-xl font-serif font-semibold text-neutral-100 group-hover:text-gradient transition-all duration-300">
              Editorial
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/" className="nav-link text-sm font-medium">
              Home
            </Link>
            <Link href="/posts" className="nav-link text-sm font-medium hidden sm:block">
              Articles
            </Link>
            <NavbarAuth />
          </div>
        </div>
      </div>
    </nav>
  );
}
