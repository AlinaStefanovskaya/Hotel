// components/Home/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Sparkles } from "lucide-react";

import { HERO_IMAGE } from "@/lib/design-images";

export default function HeroSection() {
  return (
    <section className="relative bg-[#1A1A2E] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,169,110,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(15,52,96,0.6),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      <div className="relative max-w-[1320px] mx-auto px-6 md:px-16 pt-32 pb-24 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="text-white">
          <h1 className="text-[52px] md:text-[64px] font-semibold leading-[1.05] tracking-[-0.02em]">
            Відчуйте
            <br />
            <span className="font-display italic font-normal text-[#E8C98A]">
              особливий
            </span>
            <br />
            комфорт
          </h1>

          <p className="text-[15px] text-white/65 mt-7 leading-relaxed max-w-[440px]">
            Сучасний дизайн, домашній затишок та щира гостинність — у самому
            серці Аркадії. Кожен номер створено для вашого спокою та повного
            перезавантаження.
          </p>

          <div className="flex flex-wrap gap-3 mt-9">
            <Link
              className="text-[13px] px-7 py-4 bg-[#C9A96E] text-[#1A1A2E] rounded-full font-semibold hover:bg-[#E8C98A] transition-colors flex items-center gap-2 group"
              href="/rooms"
            >
              Переглянути номери
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2}
              />
            </Link>
            <Link
              className="text-[13px] px-7 py-4 border border-white/25 text-white rounded-full hover:bg-white/5 hover:border-white/40 transition-colors"
              href="/about"
            >
              Дізнатись більше
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-14 pt-10 border-t border-white/10">
            <div>
              <div className="text-[32px] text-[#E8C98A] font-semibold leading-none font-display">
                15+
              </div>
              <div className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-2">
                Років досвіду
              </div>
            </div>
            <div>
              <div className="text-[32px] text-[#E8C98A] font-semibold leading-none font-display flex items-center gap-1.5">
                4.9
                <Star
                  className="w-5 h-5 fill-[#E8C98A] text-[#E8C98A]"
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-2">
                Наш рейтинг
              </div>
            </div>
            <div>
              <div className="text-[32px] text-[#E8C98A] font-semibold leading-none font-display">
                2K+
              </div>
              <div className="text-[10px] text-white/50 tracking-[0.2em] uppercase mt-2">
                Гостей
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <Image
              fill
              priority
              alt="Преміум номер Volya Boutique Hotel"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              src={HERO_IMAGE}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/40 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/15 flex items-center justify-center shrink-0">
                <Sparkles
                  className="w-4 h-4 text-[#C9A96E]"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-[#C9A96E] tracking-[0.2em] uppercase font-semibold">
                  Покращений сімейний номер
                </div>
                <div className="text-[13px] text-[#1A1A2E] mt-0.5 truncate">
                  2 спальні • 1 ванна кімната • До 4 гостей
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute -top-6 -right-6 w-28 h-28 rounded-full border border-[#C9A96E]/40" />
        </div>
      </div>
    </section>
  );
}
