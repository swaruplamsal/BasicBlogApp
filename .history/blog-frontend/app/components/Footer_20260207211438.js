import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t mt-12 py-8 textre dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="rounded-sm"
            />
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300 ml-4">
            © {new Date().getFullYear()} The Chronicle. All rights reserved.
          </p>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 dark:text-gray-300 dark:hover:text-red-400 active:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 dark:text-gray-300 dark:hover:text-red-400 active:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 dark:text-gray-300 dark:hover:text-red-400 active:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 rounded"
          >
            Privacy
          </Link>
        </nav>

        <div>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
