'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF5722] rounded-tl-xl rounded-br-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-2xl font-extrabold text-[#0D233A] tracking-tight">
            Togeto
          </span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-[#FF5722] text-white rounded-lg focus:outline-none hover:bg-[#e04d1d] transition-colors"
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
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

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2"
        >
          <Link href="/" className="block py-2 text-gray-700 font-medium hover:text-[#FF5722]">
            Home
          </Link>
          <Link href="/about" className="block py-2 text-gray-700 font-medium hover:text-[#FF5722]">
            About Us
          </Link>
          <Link href="/services" className="block py-2 text-gray-700 font-medium hover:text-[#FF5722]">
            Services
          </Link>
          <Link href="/contact" className="block py-2 text-gray-700 font-medium hover:text-[#FF5722]">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
