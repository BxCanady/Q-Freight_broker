import dynamic from "next/dynamic";

const HomeSection = dynamic(() => import("@/components/HomeSection"), {
  loading: () => <SectionLoading />,
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  loading: () => <SectionLoading />,
});
const CustomersShippersSection = dynamic(
  () => import("@/components/CustomersShippersSection"),
  { loading: () => <SectionLoading /> },
);
const CarriersDriversSection = dynamic(
  () => import("@/components/CarriersDriversSection"),
  { loading: () => <SectionLoading /> },
);
const DigitalStoreSection = dynamic(
  () => import("@/components/DigitalStoreSection"),
  { loading: () => <SectionLoading /> },
);
const RtsFactoringSection = dynamic(
  () => import("@/components/RtsFactoringSection"),
  { loading: () => <SectionLoading /> },
);
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <SectionLoading />,
});

function SectionLoading() {
  return (
    <div
      className="flex min-h-[28rem] flex-col justify-center gap-4 bg-[#F7FAF9] px-8 py-24 lg:px-16 xl:px-24"
      aria-hidden="true"
    >
      <div className="h-3 w-32 animate-pulse bg-[#D8E2DF]" />
      <div className="h-10 max-w-xl animate-pulse bg-[#D8E2DF]" />
      <div className="h-4 max-w-2xl animate-pulse bg-[#E5ECEA]" />
      <div className="h-4 max-w-xl animate-pulse bg-[#E5ECEA]" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-[#F7FAF9] font-sans">
      <HomeSection />
      <AboutSection />
      <CustomersShippersSection />
      <CarriersDriversSection />
      <DigitalStoreSection />
      <RtsFactoringSection />
      <ContactSection />
    </main>
  );
}
