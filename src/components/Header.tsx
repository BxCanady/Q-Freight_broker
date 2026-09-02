'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto md:h-20 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 py-3 md:py-0">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-25 h-25 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border-4 border-red-600 shadow-md flex-shrink-0">
            <Image 
              src="/Logo.JPEG" 
              alt="rcs3pl Logo" 
              width={90} 
              height={90} 
              priority
              unoptimized
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-2xl font-extrabold text-red-600 tracking-tight">
            rcs3pl
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <Link href="/" className="text-red-600 font-medium hover:text-[#E9652D] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-red-600 font-medium hover:text-[#E9652D] transition-colors">
            About Us
          </Link>
          <Link href="/services" className="text-red-600 font-medium hover:text-[#E9652D] transition-colors">
            Services
          </Link>
          <Link href="/contact" className="text-red-600 font-medium hover:text-[#E9652D] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 bg-[#E9652D] text-white rounded-lg focus:outline-none hover:bg-[#C95120] transition-colors flex-shrink-0"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <nav className="md:hidden w-full bg-white border-t border-gray-100 px-4 py-4 space-y-3 animate-in fade-in duration-200">
          <Link href="/" className="block py-2 px-3 text-red-600 font-medium hover:text-[#E9652D] hover:bg-gray-50 rounded transition-colors">
            Home
          </Link>
          <Link href="/about" className="block py-2 px-3 text-red-600 font-medium hover:text-[#E9652D] hover:bg-gray-50 rounded transition-colors">
            About Us
          </Link>
          <Link href="/services" className="block py-2 px-3 text-red-600 font-medium hover:text-[#E9652D] hover:bg-gray-50 rounded transition-colors">
            Services
          </Link>
          <Link href="/contact" className="block py-2 px-3 text-red-600 font-medium hover:text-[#E9652D] hover:bg-gray-50 rounded transition-colors">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
