import type { Metadata } from "next";

import Link from "next/link";
import { Check, ArrowRight, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Дякуємо за бронювання — Volya Hotel Odesa",
  description:
    "Ми отримали ваш запит. Менеджер підтвердить бронювання протягом години.",
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#FAF8F4] px-6 py-24 text-[#1A1A2E]">
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center border border-[#C9A96E] text-[#C9A96E]">
          <Check className="h-9 w-9" strokeWidth={1.5} />
        </div>

        <div className="mt-10 text-xs font-medium uppercase tracking-[0.3em] text-[#C9A96E]">
          Заявку прийнято
        </div>
        <h1 className="font-display mt-5 text-4xl leading-tight md:text-5xl">
          Дякуємо за ваше бронювання
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-[#1A1A2E]/70">
          Ми отримали ваш запит і вже готуємо підтвердження. Менеджер
          зателефонує вам протягом години, щоб узгодити деталі заїзду.
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
            Переглянути номери
          </Link>
        </div>

        <div className="mt-14 border-t border-[#EFEAE0] pt-8">
          <div className="text-xs font-medium uppercase tracking-[0.3em] text-[#9090AA]">
            Потрібна допомога?
          </div>
          <div className="mt-5 flex flex-col items-center justify-center gap-4 text-sm sm:flex-row sm:gap-8">
            <a
              className="inline-flex items-center gap-2 text-[#1A1A2E] transition hover:text-[#C9A96E]"
              href="tel:+380661927167"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              +380 66 192 71 67
            </a>
            <a
              className="inline-flex items-center gap-2 text-[#1A1A2E] transition hover:text-[#C9A96E]"
              href="mailto:reception@volyahotel.com"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              reception@volyahotel.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
