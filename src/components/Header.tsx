"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navigationItems = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About Us", href: "/#about" },
  { id: "services", label: "Services", href: "/#services" },
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
    label: "Digital Store",
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

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    setActiveSection(id);
    setIsMenuOpen(false);
    const target =
      document.getElementById(id) ??
      document.querySelector<HTMLElement>(`[data-section-id="${id}"]`);

    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const linkClass = (id: string, mobile = false) =>
    mobile
      ? `block rounded-lg border border-[#111e38] px-3 py-2 font-medium text-white transition-colors ${activeSection === id ? "bg-[#E9652D]" : "bg-[#111e38] hover:bg-[#1e2e4a]"}`
      : `rounded-lg border border-[#111e38] bg-[#111e38] px-3 py-2 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1e2e4a] hover:shadow-md ${activeSection === id ? "border-[#E9652D] bg-[#E9652D]" : ""}`;

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-[0_2px_6px_rgba(107,114,128,0.25)] sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 md:mr-6"
        >
          <motion.div
            className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-transparent p-0 shadow-[0_10px_22px_rgba(204,85,0,0.45)] sm:h-20 sm:w-20 md:h-[5.5rem] md:w-[5.75rem]"
            initial={{ opacity: 0, scale: 0.8, rotateY: -18 }}
            animate={{ opacity: 1, scale: 1, rotateY: -8 }}
            whileHover={{ scale: 1.06, rotateY: 0, rotateX: -4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ perspective: 600 }}
          >
            <Image
              src="/logo1.1.png"
              alt="rcs3pl Logo"
              width={100}
              height={100}
              priority
              unoptimized
              className="h-full w-full scale-[1.35] object-contain mix-blend-multiply"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={linkClass(item.id)}
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={(event) => handleNavigation(event, item.id)}
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
              onClick={(event) => handleNavigation(event, item.id)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
