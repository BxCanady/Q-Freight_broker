"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative my-12 overflow-hidden rounded-2xl bg-cover bg-center px-6 py-20 shadow-[0_24px_60px_rgba(17,30,56,0.1)] sm:px-8 sm:py-24 lg:px-16 xl:px-24"
      style={{ backgroundImage: "url('/about-bg.jfif')" }}
    >
      <div className="absolute inset-0 bg-white/55" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex justify-center">
          <motion.div
            className="relative h-28 w-28 overflow-hidden rounded-full bg-white shadow-[0_14px_30px_rgba(17,30,56,0.18)] ring-1 ring-[#D8E2DF] sm:h-36 sm:w-36"
            initial={{ opacity: 0, scale: 0.8, rotateY: -18 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: -8 }}
            whileHover={{ scale: 1.06, rotateY: 0, rotateX: -4 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ perspective: 600 }}
          >
            <Image
              src="/logo1.1.png"
              alt="Raheem Cargo Solutions LLC logo"
              fill
              sizes="(min-width: 640px) 144px, 112px"
              priority
              className="object-contain p-1"
            />
          </motion.div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#B85223]" />
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B85223]">
                About RCS
              </p>
            </div>
            <h2 className="max-w-xl text-4xl font-black tracking-tight text-[#12343B] sm:text-5xl lg:text-6xl">
              Experience that keeps freight moving.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#53706F] lg:pb-1">
            Raheem Cargo Solutions LLC (RCS), formerly known as Roll Tide
            Freight, is an established freight brokerage and asset-backed
            logistics provider based in Alabama and Louisiana. We specialize in
            general freight alongside complex, high-consequence, and specialized
            liquid bulk logistics.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-[#D8E2DF] bg-white/60 p-7 shadow-[0_12px_30px_rgba(18,52,59,0.06)] transition-all hover:-translate-y-1 hover:border-[#F4B395] hover:shadow-lg">
            <span className="text-sm font-bold text-[#B85223]">01</span>
            <h3 className="mt-5 text-lg font-bold text-[#12343B]">
              Hands-on transportation experience
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#53706F]">
              RCS is led by an owner with more than 10 years of experience as
              both a company driver and an owner-operator.
            </p>
          </article>
          <article className="rounded-xl border border-[#D8E2DF] bg-white/60 p-7 shadow-[0_12px_30px_rgba(18,52,59,0.06)] transition-all hover:-translate-y-1 hover:border-[#F4B395] hover:shadow-lg">
            <span className="text-sm font-bold text-[#B85223]">02</span>
            <h3 className="mt-5 text-lg font-bold text-[#12343B]">
              Direct market advantage
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#53706F]">
              Practical lane bidding and live quoting are built on real road
              experience, not generic marketing research algorithms.
            </p>
          </article>
          <article className="rounded-xl border border-[#D8E2DF] bg-white/60 p-7 shadow-[0_12px_30px_rgba(18,52,59,0.06)] transition-all hover:-translate-y-1 hover:border-[#F4B395] hover:shadow-lg">
            <span className="text-sm font-bold text-[#B85223]">03</span>
            <h3 className="mt-5 text-lg font-bold text-[#12343B]">
              Guaranteed asset capacity
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#53706F]">
              Direct equipment access and an established, vetted carrier network
              help loads get picked up immediately.
            </p>
          </article>
          <article className="rounded-xl border border-[#D8E2DF] bg-white/60 p-7 shadow-[0_12px_30px_rgba(18,52,59,0.06)] transition-all hover:-translate-y-1 hover:border-[#F4B395] hover:shadow-lg">
            <span className="text-sm font-bold text-[#B85223]">04</span>
            <h3 className="mt-5 text-lg font-bold text-[#12343B]">
              Commitment to quality
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#53706F]">
              We provide fair lane rates so cargo is delivered safely, legally,
              and on schedule.
            </p>
          </article>
        </div>

        <div className="mt-20 grid gap-10 rounded-2xl bg-[#12343B] p-8 text-white shadow-[0_20px_45px_rgba(18,52,59,0.18)] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <a
              href="https://www.linkedin.com/in/quintin-galloway-675b922b9/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Quint Galloway on LinkedIn"
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F4B395] bg-[#B85223] text-2xl font-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
            >
              QG
            </a>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#F4B395]">
              About the owner
            </p>
            <h3 className="text-3xl font-black tracking-tight sm:text-4xl">
              Quint Galloway
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Driver, owner-operator, fleet builder, and freight broker.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="font-bold text-[#F4B395]">Industry background</h4>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Quint began commercial driving in 2016 at age 21. Over the
                course of his transportation career, he built his own fleet,
                operated three semi-trucks, and launched a licensed brokerage.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#F4B395]">
                Specialized operations
              </h4>
              <p className="mt-2 text-sm leading-6 text-white/70">
                His experience includes hazardous cargo such as crude oil,
                liquefied petroleum gas (LPG), and liquid chemicals, alongside a
                network of specialized heavy-haul carriers.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#F4B395]">
                Government credentials
              </h4>
              <p className="mt-2 text-sm leading-6 text-white/70">
                RCS has earned DBE certification and maintains active SBA
                registration for government and defense contract bidding.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#F4B395]">Future vision</h4>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Quint is committed to sustainable regional logistics, community
                development, travel, and giving back locally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
