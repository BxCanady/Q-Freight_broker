"use client";

import React, { useState } from "react";

export default function RTSFactoringSectionWithLeadCapture() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Replace with your official RTS agent referral link
  const rtsReferralUrl = "https://www.rtsinc.com/agent-referral-placeholder";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send lead data to your API route, database, or CRM
      // await fetch('/api/leads', { method: 'POST', body: JSON.stringify(formData) });
      console.log("Lead Captured:", formData);

      // 2. Open the RTS referral link in a new tab
      window.open(rtsReferralUrl, "_blank", "noopener,noreferrer");

      // 3. Reset state & close modal
      setIsModalOpen(false);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rts-factoring"
      className="relative my-12 overflow-hidden rounded-2xl bg-[var(--brand-navy)] px-5 py-16 text-white shadow-[0_24px_60px_rgba(17,30,56,0.22)] sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 border-l border-white/10 bg-[var(--brand-navy-light)]/35" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Promotional Callout Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-orange)]/45 bg-[var(--brand-orange)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#F4B395] sm:text-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-orange)]" />
          Make Extra Income – Partner with RTS Factoring!
        </div>

        {/* Section Heading & Program Overview */}
        <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
          Fast Capital & Same-Day Freight Factoring
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-lg leading-8 text-white/70">
          Power your fleet or owner-operator business with fast funding,
          reliable cash flow, and industry-leading fuel discounts through our
          strategic partnership with RTS Financial.
        </p>

        {/* Feature Cards Grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6 transition-colors hover:border-[#F4B395]/60 hover:bg-white/10">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-orange)]/20 text-sm font-black text-[#F4B395]">
              01
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Same-Day Funding
            </h3>
            <p className="text-sm leading-6 text-white/65">
              Turn open freight invoices into cash in hours. Stop waiting 30–90
              days for broker payouts.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6 transition-colors hover:border-[#F4B395]/60 hover:bg-white/10">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-orange)]/20 text-sm font-black text-[#F4B395]">
              02
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              RTS Fuel Card Savings
            </h3>
            <p className="text-sm leading-6 text-white/65">
              Access deep discounts at thousands of fuel stations nationwide and
              optimize operating costs.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6 transition-colors hover:border-[#F4B395]/60 hover:bg-white/10">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-orange)]/20 text-sm font-black text-[#F4B395]">
              03
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              10% Agent Revenue Share
            </h3>
            <p className="text-sm leading-6 text-white/65">
              Sign up through our official referral link to unlock partner
              commission programs and driver resources.
            </p>
          </div>
        </div>

        {/* Trigger Button to Open Lead Modal */}
        <div className="pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex transform items-center justify-center rounded-xl bg-[var(--brand-orange)] px-8 py-4 text-base font-bold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-orange-dark)]"
          >
            Apply for RTS Factoring & Fuel Program
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
          <p className="mt-3 text-xs text-white/55">
            Official RTS Financial Referral Partner Link | Fast Setup &amp; No
            Hidden Fees
          </p>
        </div>
      </div>

      {/* LEAD CAPTURE MODAL OVERLAY */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-navy)]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rts-modal-title"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Box */}
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[var(--brand-navy)] p-6 text-left shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-md p-1 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>

            <h3 id="rts-modal-title" className="text-2xl font-black text-white">
              Get Started with RTS
            </h3>
            <p className="mt-1 text-sm leading-6 text-white/60">
              Enter your details to register as a lead and proceed directly to
              the official RTS application portal.
            </p>

            {/* Lead Capture Form */}
            <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F4B395]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.07] p-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#F4B395] focus:ring-2 focus:ring-[#F4B395]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F4B395]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.07] p-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#F4B395] focus:ring-2 focus:ring-[#F4B395]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F4B395]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 000-0000"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.07] p-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#F4B395] focus:ring-2 focus:ring-[#F4B395]/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-lg bg-[var(--brand-orange)] py-3.5 font-bold text-white shadow-md transition-colors hover:bg-[var(--brand-orange-dark)] disabled:opacity-50"
              >
                {isSubmitting
                  ? "Processing..."
                  : "Continue to RTS Partner Portal →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
