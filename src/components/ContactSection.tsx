"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";

type FormState = { name: string; email: string; message: string };
const emptyForm: FormState = { name: "", email: "", message: "" };
type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setStatus("idle");
    setErrorMessage("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormState(emptyForm);
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
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error ?? "Failed to send message");
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
      id="contact"
      className="section-reveal relative overflow-hidden bg-cover bg-center px-6 py-24 sm:px-8 lg:px-16 xl:px-24"
      style={{ backgroundImage: "url('/contact-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/70" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#B85223]">
              Direct inquiries &amp; location
            </p>
            <h2 className="max-w-3xl text-4xl font-black tracking-tight text-[#12343B] sm:text-5xl">
              Let&apos;s move your freight forward.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#53706F] lg:pb-1">
            Reach out for shipment coordination, carrier questions, or office
            information in Alabama and Louisiana.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#D8E2DF] bg-white p-6 shadow-[0_10px_25px_rgba(18,52,59,0.05)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B85223]">
              Phone
            </p>
            <p className="mt-4 font-semibold text-[#12343B]">
              Phone details coming soon
            </p>
            <p className="mt-2 text-sm text-[#53706F]">Direct inquiries</p>
          </div>
          <div className="rounded-xl border border-[#D8E2DF] bg-white p-6 shadow-[0_10px_25px_rgba(18,52,59,0.05)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B85223]">
              Email
            </p>
            <p className="mt-4 font-semibold text-[#12343B]">
              Send General Message
            </p>
            <p className="mt-2 text-sm text-[#53706F]">
              <motion.button
                type="button"
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-orange-500 bg-orange-500/10 px-3 py-1 font-semibold text-orange-600 shadow-sm transition-colors hover:border-orange-600 hover:bg-orange-500/20 hover:text-orange-700 hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                Send a message
              </motion.button>
            </p>
          </div>
          <div className="rounded-xl border border-[#D8E2DF] bg-white p-6 shadow-[0_10px_25px_rgba(18,52,59,0.05)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B85223]">
              Alabama office
            </p>
            <p className="mt-4 font-semibold text-[#12343B]">Mobile, Alabama</p>
            <p className="mt-2 text-sm text-[#53706F]">
              Office details coming soon
            </p>
          </div>
          <div className="rounded-xl border border-[#D8E2DF] bg-white p-6 shadow-[0_10px_25px_rgba(18,52,59,0.05)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B85223]">
              Louisiana office
            </p>
            <p className="mt-4 font-semibold text-[#12343B]">
              Baton Rouge, Louisiana
            </p>
            <p className="mt-2 text-sm text-[#53706F]">
              Office details coming soon
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-xl bg-[#12343B] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#F4B395]">
              Professional social media
            </p>
            <p className="mt-2 text-sm text-white/70">
              Follow RCS Logistics on LinkedIn.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/quintin-galloway-675b922b9/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#B85223] px-5 py-3 text-sm font-bold transition-colors hover:bg-[#913C14]"
          >
            View LinkedIn Profile
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#12343B]/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7FAF9] text-[#53706F] hover:bg-[#EDF2F1] hover:text-[#12343B]"
              aria-label="Close message form"
            >
              ×
            </button>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#B85223]">
              General Inquiry
            </p>
            <h3
              id="contact-modal-title"
              className="text-2xl font-black tracking-tight text-[#12343B]"
            >
              Send us a message
            </h3>

            {status === "success" ? (
              <div className="mt-6 rounded-xl border border-[#D8E2DF] bg-[#F7FAF9] p-6 text-center">
                <p className="text-base font-bold text-[#12343B]">
                  Message sent successfully!
                </p>
                <p className="mt-2 text-sm text-[#53706F]">
                  We&apos;ll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 w-full rounded-lg bg-[#B85223] py-2.5 text-sm font-bold text-white hover:bg-[#913C14]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase text-[#53706F]"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className="mt-1 w-full rounded-lg border border-[#D8E2DF] bg-white p-2.5 text-sm text-[#12343B] placeholder-[#9AAFAC] outline-none focus:border-[#B85223]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase text-[#53706F]"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="jane@example.com"
                    className="mt-1 w-full rounded-lg border border-[#D8E2DF] bg-white p-2.5 text-sm text-[#12343B] placeholder-[#9AAFAC] outline-none focus:border-[#B85223]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase text-[#53706F]"
                  >
                    Comment / Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    className="mt-1 w-full rounded-lg border border-[#D8E2DF] bg-white p-2.5 text-sm text-[#12343B] placeholder-[#9AAFAC] outline-none focus:border-[#B85223]"
                  />
                </div>
                {status === "error" && (
                  <p className="text-xs font-semibold text-red-600">
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-[#B85223] py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#913C14] disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
