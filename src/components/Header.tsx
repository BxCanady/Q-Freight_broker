"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navigationItems = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About Us", href: "/#about" },
  {
    id: "customers-shippers",
    label: "Customers / Shippers",
    href: "/#customers-shippers",
  },
  {
    id: "carriers-drivers",
    label: "Carriers & Drivers",
    href: "/#carriers-drivers",
  },
  {
    id: "digital-store",
    label: "Paycheck / Digital Store",
    href: "/#digital-store",
  },
  {
    id: "rts-factoring",
    label: "RTS Factoring Partner",
    href: "/#rts-factoring",
  },
  { id: "contact", label: "Contact Us", href: "/#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          )[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    const observedSections = new Set<HTMLElement>();
    const observeSections = () => {
      navigationItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && !observedSections.has(section)) {
          observer.observe(section);
          observedSections.add(section);
        }
      });
    };

    observeSections();
    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  const handleNavigation = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  const linkClass = (id: string, mobile = false) =>
    mobile
      ? `block rounded px-3 py-2 font-medium transition-colors ${activeSection === id ? "bg-red-50 text-red-700" : "text-red-600 hover:bg-gray-50 hover:text-[#E9652D]"}`
      : `font-medium transition-colors ${activeSection === id ? "border-b-2 border-red-600 text-red-700" : "text-red-600 hover:text-[#E9652D]"}`;

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-[0_2px_6px_rgba(107,114,128,0.25)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto md:h-20 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 py-3 md:py-0">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 md:mr-6"
        >
          <div className="w-23 h-22 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 shadow-[0_10px_22px_rgba(17,30,56,0.32)] transition-transform duration-300 [transform:perspective(600px)_rotateY(-8deg)_rotateX(4deg)] hover:[transform:perspective(600px)_rotateY(0deg)_rotateX(0deg)]">
            <Image
              src="/logo1.1.jfif"
              alt="rcs3pl Logo"
              width={100}
              height={100}
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
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={linkClass(item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={() => handleNavigation(item.id)}
            >
              {item.label}
            </Link>
          ))}
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
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={linkClass(item.id, true)}
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={() => handleNavigation(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
