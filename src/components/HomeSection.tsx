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
        className="relative flex min-h-[32rem] flex-1 items-center justify-center overflow-hidden bg-cover bg-center"
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
            className="font-[family-name:var(--font-display)] text-4xl font-black leading-[0.95] text-orange-600 sm:text-5xl lg:text-6xl"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              WebkitTextStroke: "1px white",
            }}
          >
            Welcome to Raheem Cargo Solutions LLC (RCS)
          </motion.h1>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-white [text-shadow:0_2px_3px_rgba(17,30,56,0.8)] sm:text-2xl"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Asset-Backed Freight Brokerage &amp; Specialized Logistics
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
