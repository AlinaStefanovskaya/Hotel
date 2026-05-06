// components/Home/SplitCTA.tsx
import Link from "next/link";
import Image from "next/image";

import GoldLink from "@/components/GoldLink";
import { ABOUT_IMAGE, RESTAURANT_IMAGE } from "@/lib/design-images";

export default function SplitCTA() {
  return (
    <section className="pb-28 bg-[#FAF8F4]" id="restaurant">
      <div className="max-w-[1320px] mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 gap-7">
          {/* Restaurant */}
          <Link
            className="relative rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-end p-9 group cursor-pointer"
            href="/restaurant"
          >
            <Image
              fill
              alt="Ресторан при готелі Volya"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              src={RESTAURANT_IMAGE}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/30 via-[#1A1A2E]/50 to-[#1A1A2E]/95" />
            <div className="relative">
              <span className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full bg-[#C9A96E] text-[#1A1A2E] font-semibold inline-block">
                Доступніше бронювання
              </span>
              <h3 className="text-[34px] text-white font-semibold mt-7 leading-tight">
                Ресторан{" "}
                <span className="font-display italic font-normal">
                  при готелі
                </span>
              </h3>
              <p className="text-[14px] text-white/70 mt-3 max-w-[360px] leading-relaxed">
                Авторська кухня шеф-кухаря, локальні продукти, винна карта.
                Щовечора з 18:00.
              </p>
              <div className="mt-6">
                <GoldLink light>Меню та бронь столика</GoldLink>
              </div>
            </div>
          </Link>

          {/* About */}
          <Link
            className="relative rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-end p-9 group cursor-pointer"
            href="/about"
            id="about"
          >
            <Image
              fill
              alt="Про готель Volya"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              src={ABOUT_IMAGE}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F3460]/20 via-[#0F3460]/55 to-[#0F3460]/95" />
            <div className="relative">
              <span className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full bg-white/10 text-[#E8C98A] border border-[#C9A96E] backdrop-blur-sm font-semibold inline-block">
                Наші цінності
              </span>
              <h3 className="text-[34px] text-white font-semibold mt-7 leading-tight">
                Про готель{" "}
                <span className="font-display italic font-normal">Volya</span>
              </h3>
              <p className="text-[14px] text-white/70 mt-3 max-w-[360px] leading-relaxed">
                Ми створили простір, де цінують деталі — від дизайну інтер’єру
                до сервісу.
              </p>
              <div className="mt-6">
                <GoldLink light>Дізнатись більше</GoldLink>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
