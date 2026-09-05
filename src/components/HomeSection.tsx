"use client";

import { motion } from "framer-motion";
import FreightServices from "@/components/FreightServices";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ShieldCheck,
  Truck,
} from "lucide-react";

const HERO_BADGES = [
  {
    icon: ShieldCheck,
    title: "SBA Certified",
    description: "Registered for government contracts and competitive bidding.",
  },
  {
    icon: BadgeCheck,
    title: "MBE Certified",
    description: "Certified Minority Business Enterprise.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Licensed & Bonded",
    description: "Fully compliant freight brokerage operation.",
  },
  {
    icon: Truck,
    title: "Industry Veteran",
    description: "Over 10 years of hands-on transportation experience.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HomeSection() {
  return (
    <>
      <section
        id="home"
        className="section-reveal relative flex min-h-[32rem] flex-1 items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/home_bg.jfif')" }}
      >
        <div className="absolute inset-0 bg-[#12343B]/50" aria-hidden="true" />
        <motion.div
          className="relative z-10 w-full max-w-6xl px-6 text-center"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.h1
            className="font-[family-name:var(--font-display)] text-4xl font-black leading-[0.95] sm:text-5xl lg:text-6xl bg-gradient-to-b from-amber-200 via-orange-500 to-amber-700 bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] [webkit-text-stroke:1px_white]"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Welcome to Raheem Cargo Solutions LLC (RCS)
          </motion.h1>
          <motion.p
            className="relative inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Left Sparkle */}
            <motion.span
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
                rotate: [0, 15, -15, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/800"
            >
              ✨
            </motion.span>

            <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              Asset-Backed Freight Brokerage &amp; Specialized Logistics
            </span>

            {/* Right Sparkle */}
            <motion.span
              animate={{
                scale: [1.2, 0.8, 1.2],
                opacity: [1, 0.6, 1],
                rotate: [0, -15, 15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="text-amber-400"
            >
              ✨
            </motion.span>
          </motion.p>
          <div className="mx-auto mt-10 grid max-w-5xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {HERO_BADGES.map((badge) => {
              const Icon = badge.icon;

              return (
                <motion.div
                  key={badge.title}
                  className="rounded-xl border border-white/25 bg-[var(--brand-navy)]/20 p-4 text-white shadow-lg backdrop-blur-sm"
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <Icon className="h-6 w-6 text-[#F4B395]" strokeWidth={2} />
                  <h2 className="mt-3 text-sm font-bold">{badge.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    {badge.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
      <div className="relative z-10 mx-4 sm:mx-8 lg:mx-16 xl:mx-24">
        <FreightServices />
      </div>
    </>
  );
}
