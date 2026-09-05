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
        className="section-reveal relative flex min-h-[36rem] flex-1 items-center justify-center overflow-hidden bg-cover bg-center py-16"
        style={{ backgroundImage: "url('/home_bg.jfif')" }}
      >
        {/* Dark Navy Glassmorphism Overlay matched to RCS Brand Navy (#1B2A4A) */}
        <div className="absolute inset-0 bg-[#1B2A4A]/40" aria-hidden="true" />

        <motion.div
          className="relative z-10 w-full max-w-6xl px-6 text-center"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
        >
          {/* Orange, Blue, Gray & Red Title */}
          <motion.h1
            className="font-[family-name:var(--font-display)] text-4xl font-black leading-[0.95] sm:text-5xl lg:text-6xl bg-[linear-gradient(to_bottom,#F97316_0%,#93C5FD_35%,#CBD5E1_65%,#DC2626_100%)] bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
            style={{ WebkitTextStroke: "1px #ffffff" }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Welcome to Raheem Cargo Solutions LLC (RCS)
          </motion.h1>

          {/* Sparkle Subtitle */}
          <motion.p
            className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#E57A3B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base"
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
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#CBD5E1]"
            >
              ✨
            </motion.span>

            <span
              className="bg-gradient-to-r from-[#93C5FD] via-[#CBD5E1] to-[#DC2626] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ WebkitTextStroke: "0.5px #ffffff" }}
            >
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
              className="text-[#CBD5E1]"
            >
              ✨
            </motion.span>
          </motion.p>

          {/* Trust Badges */}
          <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-center sm:gap-28">
            {[HERO_BADGES.slice(0, 2), HERO_BADGES.slice(2, 4)].map(
              (group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="grid flex-1 grid-cols-2 gap-4 text-left"
                >
                  {group.map((badge) => {
                    const Icon = badge.icon;

                    return (
                      <motion.div
                        key={badge.title}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group rounded-xl border border-white/20 bg-[#1B2A4A]/60 p-5 text-white shadow-xl backdrop-blur-md transition-all hover:border-[#E57A3B]/60 hover:bg-[#1B2A4A]/80 hover:shadow-2xl hover:shadow-[#E57A3B]/10"
                        variants={fadeUp}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                      >
                        <div className="inline-flex rounded-lg border border-[#E57A3B]/30 bg-[#C25E28]/10 p-2 text-[#E57A3B] transition-colors group-hover:border-[#E57A3B] group-hover:bg-[#C25E28]/20 group-hover:text-white">
                          <Icon className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <h2 className="mt-3 text-sm font-bold tracking-wide text-white">
                          {badge.title}
                        </h2>
                        <p className="mt-1 text-xs leading-5 text-slate-300">
                          {badge.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              ),
            )}
          </div>
        </motion.div>
      </section>

      <div className="relative z-10 mx-4 sm:mx-8 lg:mx-16 xl:mx-24">
        <FreightServices />
      </div>
    </>
  );
}
