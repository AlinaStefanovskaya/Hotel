import type { Metadata } from "next";

import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Сторінку не знайдено — Volya Hotel Odesa",
  description: "Сторінка не існує або була переміщена.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#FAF8F4] px-6 py-24 text-[#1A1A2E]">
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center border border-[#C9A96E] text-[#C9A96E]">
          <Compass className="h-9 w-9" strokeWidth={1.5} />
        </div>

        <div className="font-display mt-10 text-[120px] leading-none tracking-tight text-[#C9A96E] md:text-[160px]">
          404
        </div>
        <h1 className="font-display mt-2 text-3xl md:text-4xl">
          Сторінку не знайдено
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-[#1A1A2E]/70">
          Схоже, ви звернули не туди. Повертайтесь на головну або оберіть номер
          для бронювання.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            className="inline-flex items-center gap-2 border border-[#C9A96E] bg-[#C9A96E] px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#B89359]"
            href="/"
          >
            На головну
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            className="inline-flex items-center gap-2 border border-[#1A1A2E]/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-[#1A1A2E] transition hover:border-[#C9A96E] hover:text-[#C9A96E]"
            href="/rooms"
          >
            Обрати номер
          </Link>
        </div>
      </div>
    </main>
  );
}
