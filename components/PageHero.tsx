// components/PageHero.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  description?: string;
  image: string;
  crumbs?: Crumb[];
  height?: "sm" | "md";
};

export default function PageHero({
  eyebrow,
  title,
  italicWord,
  description,
  image,
  crumbs,
  height = "md",
}: PageHeroProps) {
  const heightCls = height === "sm" ? "min-h-[340px]" : "min-h-[480px]";

  function renderTitle() {
    if (!italicWord) return title;
    const idx = title.indexOf(italicWord);

    if (idx < 0) return title;

    return (
      <>
        {title.slice(0, idx)}
        <span className="font-display italic font-normal text-[#E8C98A]">
          {italicWord}
        </span>
        {title.slice(idx + italicWord.length)}
      </>
    );
  }

  const trail: Crumb[] = crumbs ?? [
    { label: "Головна", href: "/" },
    { label: title },
  ];

  return (
    <section
      className={`relative ${heightCls} bg-[#1A1A2E] overflow-hidden flex items-end`}
    >
      <Image
        fill
        priority
        alt=""
        className="object-cover opacity-55"
        sizes="100vw"
        src={image}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/55 to-[#1A1A2E]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,110,0.15),transparent_55%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      <div className="relative max-w-[1320px] mx-auto px-6 md:px-16 pt-28 pb-16 w-full">
        <div className="flex items-center gap-2 text-[12px] text-white/60 mb-7">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;

            return (
              <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                {c.href && !last ? (
                  <Link
                    className="hover:text-white transition-colors"
                    href={c.href}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? "text-white" : ""}>{c.label}</span>
                )}
                {!last && (
                  <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
                )}
              </span>
            );
          })}
        </div>

        {eyebrow && (
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[11px] tracking-[0.32em] text-[#C9A96E] uppercase font-medium">
              {eyebrow}
            </span>
          </div>
        )}

        <h1 className="text-[52px] md:text-[68px] text-white font-semibold leading-[1.02] tracking-[-0.02em] max-w-[820px]">
          {renderTitle()}
        </h1>

        {description && (
          <p className="text-[15px] text-white/65 mt-6 max-w-[560px] leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
