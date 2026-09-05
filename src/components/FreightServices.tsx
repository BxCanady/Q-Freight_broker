"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";

interface Service {
  code: string;
  title: string;
  desc: string;
  longDesc: string;
  specs: string[];
  bgImage: string;
}

const SERVICES: Service[] = [
  {
    code: "REEFER",
    title: "Reefer Services",
    desc: "Temperature-controlled refrigerated trailers for products that require dependable cold-chain handling.",
    longDesc:
      "Our cold-chain network delivers strict continuous temperature monitoring, multi-zone climate settings, and real-time telemetry tracking for perishable goods, pharmaceutical assets, and sensitive foods.",
    specs: ["-20°F to 70°F Range", "Real-Time Temp Tracking", "FSMA Compliant"],
    bgImage: "/modal-bg/reefer-modal-bg.png",
  },
  {
    code: "FLATBED",
    title: "Flatbed & Heavy Haul",
    desc: "Standard flatbeds, step-decks, and specialized open-deck equipment for oversized and irregular freight.",
    longDesc:
      "Engineered for structural materials, industrial equipment, and out-of-gauge machinery. We secure site permits, pilot escorts, and route planning for safe nationwide execution.",
    specs: [
      "Step-Deck & RGN Options",
      "Over-Dimensional Permits",
      "Tarping Included",
    ],
    bgImage: "/modal-bg/flatbed-mg-bg.png",
  },
  {
    code: "POWER ONLY",
    title: "Power-Only Solutions",
    desc: "Dedicated power units to move customer-owned trailing equipment when and where it is needed.",
    longDesc:
      "Scale your fleet capacity on demand. We supply vetted power units and experienced drivers to haul single-trailer or multi-trailer setups anywhere in North America.",
    specs: ["Drop & Hook Capable", "Short & Long-Haul", "Fleet Surge Support"],
    bgImage: "/modal-bg/power-only-modal-bg.jfif",
  },
  {
    code: "LIQUID BULK",
    title: "Specialized Liquid Bulk",
    desc: "Transport capabilities for crude oil, liquefied petroleum gas (LPG), and hazardous materials.",
    longDesc:
      "HAZMAT certified drivers and specialized stainless steel / aluminum tank trailers tailored for chemical processing, energy feedstocks, and industrial fluids under stringent compliance.",
    specs: [
      "HAZMAT Certified",
      "Crude & LPG Specialized",
      "Strict EPA Compliance",
    ],
    bgImage: "/modal-bg/liquid-bulk-modal-bg.png",
  },
];

type FormState = { name: string; email: string; phone: string; notes: string };
const emptyForm: FormState = { name: "", email: "", phone: "", notes: "" };

type Status = "idle" | "loading" | "success" | "error";

export default function FreightServices() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formState, setFormState] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!selectedService) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedService(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  const openService = (service: Service) => {
    setSelectedService(service);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedService) return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          serviceCode: selectedService.code,
          serviceTitle: selectedService.title,
        }),
      });
      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error ?? "Failed to send inquiry");
      }
      setStatus("success");
      setFormState(emptyForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section
      id="services"
      className="section-reveal relative overflow-hidden rounded-2xl bg-cover bg-center px-4 py-16 sm:px-8 sm:py-24 lg:px-16 xl:px-24"
      style={{ backgroundImage: "url('/fs_bg.jfif')" }}
    >
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-0.5 w-8 bg-orange-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
              What We Move
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-display)] text-4xl font-black uppercase leading-none text-orange-400 sm:text-5xl lg:text-6xl"
            style={{ WebkitTextStroke: "1px white" }}
          >
            Freight Services
          </h2>
          <p className="mt-4 text-sm font-medium text-slate-300 sm:text-base">
            Asset-backed freight brokerage providing dependable capacity for
            general, specialized, and high-consequence logistics.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <button
              type="button"
              key={service.code}
              onClick={() => openService(service)}
              className="mobile-service-card group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 p-6 text-left shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              <div className="absolute right-4 top-4 z-10 h-14 w-14 transition-transform duration-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)] group-hover:scale-105 sm:h-16 sm:w-16">
                <Image
                  src="/logo1.1.png"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="relative z-10">
                <span className="inline-block rounded-md border border-orange-500/30 bg-orange-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  {service.code}
                </span>
                <h3 className="mt-4 text-xl font-bold text-white transition-colors group-hover:text-orange-400">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {service.desc}
                </p>
              </div>
              <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-semibold text-orange-400">
                <span>Request Capacity</span>
                <span
                  aria-hidden="true"
                  className="text-base transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedService(null)}
          role="presentation"
        >
          <div
            className="relative my-8 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl lg:flex-row"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <div
              className="relative flex min-h-80 flex-col justify-between bg-cover bg-center p-6 lg:w-1/2 sm:p-8"
              style={{ backgroundImage: `url(${selectedService.bgImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/60 to-slate-950/20" />
              <div className="relative z-10">
                <span className="inline-block rounded-md border border-orange-500/30 bg-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-400">
                  {selectedService.code}
                </span>
                <h3
                  id="service-modal-title"
                  className="mt-4 text-2xl font-extrabold text-white sm:text-3xl"
                >
                  {selectedService.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {selectedService.longDesc}
                </p>
              </div>
              <div className="relative z-10 mt-6 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Capabilities
                </p>
                {selectedService.specs.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-2 text-xs font-medium text-slate-200"
                  >
                    <span className="text-orange-400">✓</span>
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative bg-slate-900 p-6 lg:w-1/2 sm:p-8">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                aria-label="Close service inquiry"
              >
                ×
              </button>
              <h4 className="text-lg font-bold text-white">
                Inquire About This Service
              </h4>
              <p className="mt-1 text-xs text-slate-400">
                Direct route request for{" "}
                <span className="font-semibold text-orange-400">
                  {selectedService.title}
                </span>
                .
              </p>
              {status === "success" ? (
                <div className="my-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center text-emerald-400">
                  <p className="text-base font-bold">
                    Inquiry Sent Successfully!
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Our freight dispatch team is reviewing your route
                    requirements and will reply via email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="mt-6 w-full rounded-lg bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-semibold uppercase text-slate-300"
                    >
                      Full Name
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-xs font-semibold uppercase text-slate-300"
                      >
                        Work Email
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="jane@company.com"
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-xs font-semibold uppercase text-slate-300"
                      >
                        Phone Number
                      </label>
                      <input
                        id="inquiry-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 000-0000"
                        className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-notes"
                      className="block text-xs font-semibold uppercase text-slate-300"
                    >
                      Route &amp; Cargo Details
                    </label>
                    <textarea
                      id="inquiry-notes"
                      name="notes"
                      rows={3}
                      value={formState.notes}
                      onChange={handleInputChange}
                      placeholder="Origin, destination, estimated weight, temperature constraints..."
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-xs font-semibold text-red-400">
                      {errorMessage ||
                        "Something went wrong. Please check your connection and try again."}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-lg bg-orange-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-orange-500 disabled:opacity-50"
                  >
                    {status === "loading"
                      ? "Sending Dispatch Request..."
                      : "Send Freight Request →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
