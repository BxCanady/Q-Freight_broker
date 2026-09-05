"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

const initialQuoteData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  origin: "",
  destination: "",
  equipmentType: "Dry Van",
  weight: "",
  notes: "",
};

const inputClassName =
  "mt-1 w-full rounded-lg border border-white/15 bg-white/[0.07] p-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#F4B395] focus:ring-2 focus:ring-[#F4B395]/20";
const labelClassName =
  "block text-xs font-semibold uppercase tracking-wider text-[#F4B395]";

export default function CustomersShippersSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [quoteData, setQuoteData] = useState(initialQuoteData);

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setQuoteData((previous) => ({ ...previous, [name]: value }));
  };

  const handleQuoteSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Quote Lead Submitted:", quoteData);
      setFormSubmitted(true);
      window.setTimeout(() => {
        setIsQuoteModalOpen(false);
        setFormSubmitted(false);
        setQuoteData(initialQuoteData);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsQuoteModalOpen(false);
    setFormSubmitted(false);
  };

  return (
    <section
      id="customers-shippers"
      className="section-reveal relative my-12 overflow-hidden rounded-2xl bg-cover bg-center px-5 py-16 text-white shadow-[0_24px_60px_rgba(17,30,56,0.18)] sm:px-8 lg:px-12"
      style={{ backgroundImage: "url('/shipper_bg.jpg')" }}
    >
      <div
        className="absolute inset-0 bg-[var(--brand-navy)]/65"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F4B395]/45 bg-[var(--brand-orange)]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#F4B395] sm:text-sm">
            Customers &amp; Shippers Hub
          </div>
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            Shipper Onboarding &amp; Document Hub
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/70">
            Streamline your freight onboarding. Request a rate quote or access
            our credit application and capability statement below.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.08] p-6 shadow-lg backdrop-blur-sm transition-colors hover:border-[#F4B395]/60 hover:bg-white/[0.12]">
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-orange)]/20 text-sm font-black text-[#F4B395]">
                01
              </div>
              <h3 className="text-xl font-bold">Digital Quote Intake</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Submit origin, destination, and freight details to request a
                competitive rate quote.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="mt-7 w-full rounded-lg bg-[var(--brand-orange)] py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[var(--brand-orange-dark)]"
            >
              Request Rate Quote
            </button>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.08] p-6 shadow-lg backdrop-blur-sm transition-colors hover:border-[#F4B395]/60 hover:bg-white/[0.12]">
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-orange)]/20 text-sm font-black text-[#F4B395]">
                02
              </div>
              <h3 className="text-xl font-bold">Credit Application</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Download the credit application to establish terms for recurring
                freight shipments.
              </p>
            </div>
            <a
              href="/documents/Credit_Application_Placeholder.pdf"
              download="Shipper_Credit_Application.pdf"
              className="mt-7 inline-block w-full rounded-lg border border-[#F4B395]/55 bg-[#F4B395]/10 py-3 text-center text-sm font-bold text-[#F4B395] transition-colors hover:bg-[#F4B395] hover:text-[var(--brand-navy)]"
            >
              Download Application
            </a>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.08] p-6 shadow-lg backdrop-blur-sm transition-colors hover:border-[#F4B395]/60 hover:bg-white/[0.12]">
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-orange)]/20 text-sm font-black text-[#F4B395]">
                03
              </div>
              <h3 className="text-xl font-bold">Capability Statement</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Review our operational overview, equipment capacity, safety
                compliance, and certifications.
              </p>
            </div>
            <a
              href="/documents/Capability_Statement_Placeholder.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block w-full rounded-lg border border-[#F4B395]/55 bg-[#F4B395]/10 py-3 text-center text-sm font-bold text-[#F4B395] transition-colors hover:bg-[#F4B395] hover:text-[var(--brand-navy)]"
            >
              View Capability Statement
            </a>
          </div>
        </div>
      </div>

      {isQuoteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-navy)]/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[var(--brand-navy)] p-6 text-left shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close quote form"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-md p-1 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              X
            </button>
            <h3
              id="quote-modal-title"
              className="text-2xl font-black text-white"
            >
              Digital Freight Quote Intake
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Provide load details and our dispatch team will review your
              request.
            </p>

            {formSubmitted ? (
              <div className="my-8 rounded-lg border border-[#F4B395]/35 bg-[#F4B395]/10 p-6 text-center text-[#F4B395]">
                <p className="text-lg font-bold">Quote Request Submitted</p>
                <p className="mt-2 text-sm text-white/70">
                  Our dispatch team will review your shipment details and
                  contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName} htmlFor="companyName">
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={quoteData.companyName}
                      onChange={handleInputChange}
                      placeholder="ACME Freight Inc."
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="contactName">
                      Contact Name
                    </label>
                    <input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      value={quoteData.contactName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className={inputClassName}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName} htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={quoteData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={quoteData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 000-0000"
                      className={inputClassName}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName} htmlFor="origin">
                      Origin City, State / Zip
                    </label>
                    <input
                      id="origin"
                      name="origin"
                      type="text"
                      required
                      value={quoteData.origin}
                      onChange={handleInputChange}
                      placeholder="Atlanta, GA 30301"
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="destination">
                      Destination City, State / Zip
                    </label>
                    <input
                      id="destination"
                      name="destination"
                      type="text"
                      required
                      value={quoteData.destination}
                      onChange={handleInputChange}
                      placeholder="Dallas, TX 75201"
                      className={inputClassName}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName} htmlFor="equipmentType">
                      Equipment Type
                    </label>
                    <select
                      id="equipmentType"
                      name="equipmentType"
                      value={quoteData.equipmentType}
                      onChange={handleInputChange}
                      className={inputClassName}
                    >
                      <option value="Dry Van">Dry Van</option>
                      <option value="Reefer">Refrigerated (Reefer)</option>
                      <option value="Flatbed">Flatbed</option>
                      <option value="Power Only">Power Only</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="weight">
                      Estimated Weight (lbs)
                    </label>
                    <input
                      id="weight"
                      name="weight"
                      type="text"
                      value={quoteData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g. 42,000 lbs"
                      className={inputClassName}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClassName} htmlFor="notes">
                    Additional Notes / Commodity
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={quoteData.notes}
                    onChange={handleInputChange}
                    placeholder="Pallet count, special handling, or delivery timeframe..."
                    className={inputClassName}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-lg bg-[var(--brand-orange)] py-3.5 font-bold text-white shadow-md transition-colors hover:bg-[var(--brand-orange-dark)] disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Submitting Quote Request..."
                    : "Submit Quote Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
