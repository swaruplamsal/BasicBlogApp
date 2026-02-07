// app/components/Navbar.js
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const NavbarAuth = dynamic(() => import("./NavbarAuth"), { ssr: false });

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl border-b shadow-lg"
      style={{
        backgroundColor: "rgba(58, 37, 37, 0.8)",
        borderColor: "rgba(90, 69, 69, 0.5)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            {/* Replace the inline svg with a logo image from public/images/logo.png */}
            <div>
              <Image
                src="/images/logo.png"
                alt="Editorial logo"
                width={150}
                height={150}
                className="object-cover"
                priority
              />
            </div>
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
