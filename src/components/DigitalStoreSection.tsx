export default function DigitalStoreSection() {
  return (
    <section
      id="digital-store"
      className="section-reveal bg-[#12343B] px-8 py-20 text-white lg:px-16 xl:px-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#F4B395]">
            Paycheck / Digital Store
          </p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Guides for the highway hustle.
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-white/70">
            Browse digital resources and guides in the Highway Hustle store.
          </p>
        </div>
        <a
          href="https://payhip.com/highwayhustle"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#F4B395] px-6 py-3 text-sm font-semibold text-[#F4B395] transition-colors hover:bg-[#F4B395] hover:text-[#12343B]"
        >
          Visit the store
        </a>
      </div>
    </section>
  );
}
