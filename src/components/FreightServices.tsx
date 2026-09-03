"use client";

import { useState } from "react";

const SERVICES = [
  {
    code: "REEFER",
    title: "Reefer Services",
    desc: "Temperature-controlled refrigerated trailers for products that require dependable cold-chain handling.",
  },
  {
    code: "FLATBED",
    title: "Flatbed & Heavy Haul",
    desc: "Standard flatbeds, step-decks, and specialized open-deck equipment for oversized and irregular freight.",
  },
  {
    code: "POWER ONLY",
    title: "Power-Only Solutions",
    desc: "Dedicated power units to move customer-owned trailing equipment when and where it is needed.",
  },
  {
    code: "LIQUID BULK",
    title: "Specialized Liquid Bulk",
    desc: "Transport capabilities for crude oil, liquefied petroleum gas (LPG), and hazardous materials.",
  },
];

export default function FreightServices() {
  const [activeService, setActiveService] = useState(0);

  const handleServiceTabClick = (index: number, code: string) => {
    setActiveService(index);
    document
      .getElementById(`service-${code.toLowerCase().replaceAll(" ", "-")}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      className="relative overflow-hidden rounded-2xl bg-cover bg-center py-24 px-8 lg:px-16 xl:px-24"
      style={{ backgroundImage: "url('/fs_bg.jfif')" }}
    >
      <div className="absolute inset-0 bg-red-25/65" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left sticky label */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-px"
                style={{ background: "var(--brand-orange)" }}
              />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-600 shadow-md">
                What We Move
              </span>
            </div>
            <h2
              className="font-[family-name:var(--font-display)] font-black text-5xl xl:text-6xl leading-[0.92] mb-6"
              style={{
                color: "var(--brand-orange)",
                WebkitTextStroke: "1px white",
              }}
            >
              FREIGHT
              <br />
              SERVICES
            </h2>
            <p className="text-sm font-medium leading-relaxed text-red-600 shadow-md">
              Asset-backed freight brokerage for dependable capacity across
              general, specialized, and high-consequence logistics.
            </p>
          </div>

          {/* Tab + card area */}
          <div>
            <div
              className="flex gap-1 mb-8 border-b"
              style={{ borderColor: "rgba(18,52,59,0.12)" }}
            >
              {SERVICES.map((svc, i) => (
                <button
                  key={svc.code}
                  onClick={() => handleServiceTabClick(i, svc.code)}
                  className="text-sm font-bold tracking-[0.15em] uppercase px-5 py-3 border-b-2 transition-all duration-200"
                  style={{
                    WebkitTextStroke: "0.6px white",
                    borderColor:
                      activeService === i
                        ? "var(--brand-orange)"
                        : "transparent",
                    color:
                      activeService === i
                        ? "var(--brand-orange)"
                        : "rgba(18,52,59,0.45)",
                  }}
                >
                  {svc.code}
                </button>
              ))}
            </div>

            <div className="grid gap-3">
              {SERVICES.map((svc, i) => (
                <button
                  key={svc.code}
                  id={`service-${svc.code.toLowerCase().replaceAll(" ", "-")}`}
                  onClick={() => setActiveService(i)}
                  className="text-left p-6 border transition-all duration-200 group"
                  style={{
                    borderColor:
                      activeService === i
                        ? "var(--brand-orange)"
                        : "rgba(18,52,59,0.10)",
                    background:
                      activeService === i
                        ? "var(--brand-orange-soft)"
                        : "white",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xs font-bold tracking-widest uppercase px-2 py-1"
                        style={{
                          background:
                            activeService === i
                              ? "var(--brand-orange)"
                              : "rgba(18,52,59,0.07)",
                          color:
                            activeService === i
                              ? "rgba(255,255,255,0.82)"
                              : "rgba(18,52,59,0.5)",
                        }}
                      >
                        {svc.code}
                      </span>
                      <span
                        className="font-[family-name:var(--font-display)] font-bold text-xl transition-colors"
                        style={{ color: "var(--brand-deep-teal)" }}
                      >
                        {svc.title}
                      </span>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                      style={{
                        color:
                          activeService === i
                            ? "var(--brand-orange)"
                            : "rgba(18,52,59,0.3)",
                        transform:
                          activeService === i
                            ? "rotate(0deg)"
                            : "rotate(-45deg)",
                      }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                  {activeService === i && (
                    <p
                      className="text-sm font-light leading-relaxed pl-[calc(2rem+1rem)] opacity-70"
                      style={{ color: "var(--brand-deep-teal)" }}
                    >
                      {svc.desc}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
