// app/components/Navbar.js
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const NavbarAuth = dynamic(() => import("./NavbarAuth"), { ssr: false });

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-gray-300">
            My Blog
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <NavbarAuth />
          </div>
        </div>
      </div>
    </nav>
  );
}
