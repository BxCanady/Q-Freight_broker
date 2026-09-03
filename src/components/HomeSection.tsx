import FreightServices from "@/components/FreightServices";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ShieldCheck,
  Truck,
} from "lucide-react";

const HERO_BADGES = [
  {
    icon: ShieldCheck,
    title: "SBA Certified",
    description: "Registered for government contracts and competitive bidding.",
  },
  {
    icon: BadgeCheck,
    title: "DBE Certified",
    description: "Certified Disadvantaged Business Enterprise.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Licensed & Bonded",
    description: "Fully compliant freight brokerage operation.",
  },
  {
    icon: Truck,
    title: "Industry Veteran",
    description: "Over 10 years of hands-on transportation experience.",
  },
];

export default function HomeSection() {
  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[32rem] flex-1 items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/home_bg.jfif')" }}
      >
        <div className="absolute inset-0 bg-[#12343B]/50" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-6xl px-6 text-center">
          <h1
            className="font-[family-name:var(--font-display)] text-4xl font-black leading-[0.95] text-red-600 sm:text-5xl lg:text-6xl"
            style={{
              WebkitTextStroke: "1px white",
            }}
          >
            Welcome to Raheem Cargo Solutions LLC (RCS)
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-white [text-shadow:0_2px_3px_rgba(17,30,56,0.8)] sm:text-2xl">
            Asset-Backed Freight Brokerage &amp; Specialized Logistics
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {HERO_BADGES.map((badge) => {
              const Icon = badge.icon;

              return (
                <div
                  key={badge.title}
                  className="rounded-xl border border-white/25 bg-[var(--brand-navy)]/40 p-4 text-white shadow-lg backdrop-blur-sm"
                >
                  <Icon className="h-6 w-6 text-[#F4B395]" strokeWidth={2} />
                  <h2 className="mt-3 text-sm font-bold">{badge.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="relative z-10 -mt-4 mx-4 overflow-hidden shadow-[0_20px_42px_rgba(18,52,59,0.16)] [transform:perspective(1200px)_rotateX(1deg)] [transform-origin:top_center] sm:-mt-8 sm:mx-8 lg:-mt-12 lg:mx-16 xl:mx-24">
        <FreightServices />
      </div>
    </>
  );
}
