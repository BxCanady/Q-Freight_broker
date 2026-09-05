"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";
import HomeSection from "@/components/HomeSection";

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: false,
});
const CustomersShippersSection = dynamic(
  () => import("@/components/CustomersShippersSection"),
  { ssr: false },
);
const CarriersDriversSection = dynamic(
  () => import("@/components/CarriersDriversSection"),
  { ssr: false },
);
const DigitalStoreSection = dynamic(
  () => import("@/components/DigitalStoreSection"),
  { ssr: false },
);
const RtsFactoringSection = dynamic(
  () => import("@/components/RtsFactoringSection"),
  { ssr: false },
);
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: false,
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

function LazySection({
  Component,
  sectionId,
  minHeight = "28rem",
}: {
  Component: ComponentType;
  sectionId: string;
  minHeight?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} data-section-id={sectionId} style={{ minHeight }}>
      {shouldLoad ? <Component /> : <SectionLoading />}
    </div>
  );
}

export default function LazySections() {
  return (
    <>
      <HomeSection />
      <LazySection sectionId="about" Component={AboutSection} />
      <LazySection
        sectionId="customers-shippers"
        Component={CustomersShippersSection}
      />
      <LazySection
        sectionId="carriers-drivers"
        Component={CarriersDriversSection}
      />
      <LazySection
        sectionId="digital-store"
        Component={DigitalStoreSection}
        minHeight="20rem"
      />
      <LazySection sectionId="rts-factoring" Component={RtsFactoringSection} />
      <LazySection sectionId="contact" Component={ContactSection} />
    </>
  );
}
