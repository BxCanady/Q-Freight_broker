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
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-500">
            Why Choose Us
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Freight You Can Count On
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
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
                className="group rounded-lg border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-orange-50">
                  <Icon className="h-5 w-5 text-orange-500" strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-slate-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}