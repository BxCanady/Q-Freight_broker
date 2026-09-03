export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-white to-[#F7FAF9] px-6 py-24 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="mx-auto max-w-7xl">
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
              Email details coming soon
            </p>
            <p className="mt-2 text-sm text-[#53706F]">Send a message</p>
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
              Shreveport, Louisiana
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
            href="https://www.linkedin.com/company/raheem-cargo-solutions-llc/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#B85223] px-5 py-3 text-sm font-bold transition-colors hover:bg-[#913C14]"
          >
            View LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
}
