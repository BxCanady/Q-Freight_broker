"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BlogArticle {
  title: string;
  link: string;
  excerpt: string;
}

export default function DigitalStoreSection() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let isMounted = true;

    fetch("/api/scrape")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success) {
          setArticles(data.articles);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        if (isMounted) setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

      {status !== "error" && (
        <div className="mx-auto mt-14 max-w-7xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#F4B395]">
            Latest Updates
          </p>
          {status === "loading" ? (
            <div className="flex gap-4 overflow-hidden">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-64 w-72 shrink-0 animate-pulse rounded-xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <p className="text-sm text-white/60">
              No blog updates available right now.
            </p>
          ) : (
            <div className="-mx-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 pb-4 lg:-mx-16 lg:px-16 xl:-mx-24 xl:px-24">
              {articles.map((article) => (
                <a
                  key={article.link}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-72 shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-[#F4B395]/60 hover:bg-white/10"
                >
                  <div className="relative h-36 w-full bg-white/10">
                    <Image
                      src="/logo1.1.png"
                      alt=""
                      fill
                      sizes="288px"
                      className="object-contain p-8"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-white">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="mt-2 text-xs leading-5 text-white/60">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
