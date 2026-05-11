// components/Rooms/RoomsCTA.tsx
import Link from "next/link";

export default function RoomsCTA() {
  return (
    <section className="pb-28">
      <div className="max-w-[1320px] mx-auto px-6 md:px-16">
        <div className="bg-[#1A1A2E] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.12),transparent_70%)]" />
          <div className="relative">
            <span className="text-[11px] tracking-[0.32em] text-[#C9A96E] uppercase font-medium">
              Не визначились?
            </span>
            <h3 className="text-[36px] md:text-[44px] text-white font-semibold mt-4 leading-tight max-w-[560px] mx-auto">
              Допоможемо обрати <span>ідеальний</span> номер
            </h3>
            <p className="text-[14px] text-white/65 mt-4 max-w-[480px] mx-auto leading-relaxed">
              Зателефонуйте, опишіть подію — і ми підберемо номер під ваші дати,
              склад та преференції.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <Link
                className="text-[13px] px-7 py-4 bg-[#C9A96E] text-[#1A1A2E] rounded-full font-semibold hover:bg-[#E8C98A] transition-colors"
                href="/contacts"
              >
                Перейти до бронювання
              </Link>
              <a
                className="text-[13px] px-7 py-4 border border-white/25 text-white rounded-full hover:bg-white/5 transition-colors"
                href="tel:+380661927167"
              >
                +380 66 192 71 67
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
