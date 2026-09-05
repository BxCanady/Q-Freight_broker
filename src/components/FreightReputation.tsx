import { Headphones, Route, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Real people available to keep your shipments moving and your questions answered.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Carriers",
    description:
      "We work with verified carriers to help ensure reliable and secure freight delivery.",
  },
  {
    icon: Route,
    title: "Smarter Logistics",
    description:
      "Efficient freight matching and real-time coordination help reduce delays and costs.",
  },
];

export default function FreightReputation() {
  return (
    <>
      <section className="section-reveal bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#E9652D]">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#12343B] sm:text-4xl">
              Freight You Can Count On
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#53706F]">
              From pickup to delivery, we connect shippers with reliable
              transportation solutions that keep freight moving.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-lg border border-[#D8E2DF] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#F4B395] hover:shadow-lg"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#FFF0E8]">
                    <Icon className="h-5 w-5 text-[#E9652D]" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-semibold text-[#12343B]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-5 text-[#53706F]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-[#111E38] px-6 py-10 text-white sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F4B395]">
              Legal business name
            </p>
            <p className="mt-2 font-semibold">Raheem Cargo Solutions LLC</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F4B395]">
              Operating domain
            </p>
            <a
              href="https://rcs3pl.com"
              className="mt-2 inline-block text-white/80 transition-colors hover:text-white"
            >
              rcs3pl.com
            </a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F4B395]">
              Base locations
            </p>
            <p className="mt-2 text-white/80">
              Mobile, Alabama &amp; Shreveport, Louisiana
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F4B395]">
              Credentials
            </p>
            <p className="mt-2 text-white/80">
              Licensed Freight Brokerage | SBA Registered | MBE Certified
            </p>
            <a
              href="https://www.linkedin.com/in/quintin-galloway-675b922b9/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-semibold text-[#F4B395] transition-colors hover:text-white"
            >
              Quint Galloway on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
