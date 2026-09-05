"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

const initialCarrierData = {
  companyName: "",
  mcNumber: "",
  dotNumber: "",
  contactName: "",
  email: "",
  phone: "",
};

const inputClassName =
  "mt-1 w-full rounded-lg border border-white/15 bg-white/[0.07] p-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-[#F4B395] focus:ring-2 focus:ring-[#F4B395]/20";
const labelClassName =
  "block text-xs font-semibold uppercase tracking-wider text-[#F4B395]";

export default function CarriersDriversSection() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [carrierData, setCarrierData] = useState(initialCarrierData);

  const closeModal = () => {
    setIsUploadModalOpen(false);
    setUploadSuccess(false);
    setSelectedFile(null);
    setFileError("");
    setCarrierData(initialCarrierData);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCarrierData((previous) => ({ ...previous, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setSelectedFile(null);
      setFileError("Please choose a file smaller than 10 MB.");
      return;
    }
    setSelectedFile(file);
    setFileError("");
  };

  const handleCoiSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("coiFile", selectedFile);
      payload.append("carrierData", JSON.stringify(carrierData));
      console.log("COI Upload Submitted:", {
        carrierData,
        file: selectedFile.name,
      });
      setUploadSuccess(true);
      window.setTimeout(closeModal, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="carriers-drivers"
      className="section-reveal relative my-12 overflow-hidden rounded-2xl bg-cover bg-center px-5 py-16 text-white shadow-[0_24px_60px_rgba(17,30,56,0.18)] sm:px-8 lg:px-12"
      style={{ backgroundImage: "url('/carrier-bg.jfif')" }}
    >
      <div
        className="absolute inset-0 bg-[var(--brand-navy)]/65"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F4B395]/45 bg-[var(--brand-orange)]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#F4B395] sm:text-sm">
            Carrier Network Onboarding
          </div>
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
            Carriers &amp; Drivers Portal
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/70">
            Join our approved carrier network. Download the setup agreement and
            upload your Certificate of Insurance to qualify for open loads.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.08] p-7 shadow-lg backdrop-blur-sm transition-colors hover:border-[#F4B395]/60 hover:bg-white/[0.12]">
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-orange)]/20 text-sm font-black text-[#F4B395]">
                01
              </div>
              <h3 className="text-2xl font-bold">Broker-Carrier Agreement</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Download the complete onboarding packet with the broker-carrier
                agreement, W-9, authority copy, and direct deposit setup form.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/65">
                <li>✓ Standard Broker-Carrier Agreement</li>
                <li>✓ W-9 and banking details</li>
                <li>✓ Quick-pay terms and options</li>
              </ul>
            </div>
            <a
              href="/documents/Broker_Carrier_Agreement_Packet.pdf"
              download="Broker_Carrier_Agreement_Packet.pdf"
              className="mt-8 flex w-full items-center justify-center rounded-lg bg-[var(--brand-orange)] py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[var(--brand-orange-dark)]"
            >
              Download Onboarding Packet
            </a>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.08] p-7 shadow-lg backdrop-blur-sm transition-colors hover:border-[#F4B395]/60 hover:bg-white/[0.12]">
            <div>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-orange)]/20 text-sm font-black text-[#F4B395]">
                02
              </div>
              <h3 className="text-2xl font-bold">
                Upload Certificate of Insurance
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Submit an active COI naming RCS as certificate holder. Required
                coverage: $100,000 cargo and $1,000,000 auto liability.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/65">
                <li>✓ Document processing</li>
                <li>✓ Qualification status review</li>
                <li>✓ Secure file transfer</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-8 flex w-full items-center justify-center rounded-lg bg-[var(--brand-orange)] py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[var(--brand-orange-dark)]"
            >
              Upload COI Document
            </button>
          </div>
        </div>
      </div>

      {isUploadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-navy)]/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coi-modal-title"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[var(--brand-navy)] p-6 text-left shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close COI upload form"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-md p-1 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              X
            </button>
            <h3 id="coi-modal-title" className="text-2xl font-black">
              Submit Certificate of Insurance
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Provide your carrier credentials and attach an active COI
              document.
            </p>
            {uploadSuccess ? (
              <div className="my-8 rounded-lg border border-[#F4B395]/35 bg-[#F4B395]/10 p-6 text-center text-[#F4B395]">
                <p className="text-lg font-bold">COI Upload Received</p>
                <p className="mt-2 text-sm text-white/70">
                  Our compliance team will verify the certificate and confirm
                  activation by email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCoiSubmit} className="mt-6 space-y-4">
                <div>
                  <label className={labelClassName} htmlFor="carrier-company">
                    Carrier / Company Legal Name
                  </label>
                  <input
                    id="carrier-company"
                    name="companyName"
                    type="text"
                    required
                    value={carrierData.companyName}
                    onChange={handleInputChange}
                    placeholder="Express Trucking LLC"
                    className={inputClassName}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName} htmlFor="mc-number">
                      MC Number
                    </label>
                    <input
                      id="mc-number"
                      name="mcNumber"
                      type="text"
                      required
                      value={carrierData.mcNumber}
                      onChange={handleInputChange}
                      placeholder="MC-123456"
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="dot-number">
                      USDOT Number
                    </label>
                    <input
                      id="dot-number"
                      name="dotNumber"
                      type="text"
                      required
                      value={carrierData.dotNumber}
                      onChange={handleInputChange}
                      placeholder="3456789"
                      className={inputClassName}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName} htmlFor="carrier-contact">
                      Dispatch Contact Name
                    </label>
                    <input
                      id="carrier-contact"
                      name="contactName"
                      type="text"
                      required
                      value={carrierData.contactName}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="carrier-email">
                      Dispatch Email
                    </label>
                    <input
                      id="carrier-email"
                      name="email"
                      type="email"
                      required
                      value={carrierData.email}
                      onChange={handleInputChange}
                      placeholder="dispatch@example.com"
                      className={inputClassName}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClassName} htmlFor="carrier-phone">
                    Dispatch Phone
                  </label>
                  <input
                    id="carrier-phone"
                    name="phone"
                    type="tel"
                    required
                    value={carrierData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 000-0000"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className={labelClassName} htmlFor="coi-file">
                    Upload COI File (PDF, PNG, JPG)
                  </label>
                  <div className="relative mt-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/[0.05] p-6 text-center transition-colors hover:border-[#F4B395]/70">
                    <input
                      id="coi-file"
                      type="file"
                      required
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="absolute inset-0 z-10 cursor-pointer opacity-0"
                    />
                    {selectedFile ? (
                      <p className="text-sm font-semibold text-[#F4B395]">
                        Selected: {selectedFile.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-white/80">
                          Click or drag and drop your COI here
                        </p>
                        <p className="mt-1 text-xs text-white/45">
                          Maximum file size: 10 MB
                        </p>
                      </>
                    )}
                  </div>
                  {fileError && (
                    <p className="mt-2 text-sm text-red-300" role="alert">
                      {fileError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedFile}
                  className="mt-2 w-full rounded-lg bg-[var(--brand-orange)] py-3.5 font-bold text-white shadow-md transition-colors hover:bg-[var(--brand-orange-dark)] disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Uploading and Verifying..."
                    : "Submit COI Certificate"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
