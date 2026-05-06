"use client";

import type { PricingResult } from "./BookingClientWrapper";

import { format as fmt } from "date-fns";
import { uk } from "date-fns/locale";
import { CalendarDays, BedDouble, Users, Tag } from "lucide-react";

interface BookingSummaryProps {
  roomName: string;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  kidsCount: number;
  nights: number;
  pricing: PricingResult | null;
}

export default function BookingSummary({
  roomName,
  checkIn,
  checkOut,
  adults,
  kidsCount: children,
  nights,
  pricing,
}: BookingSummaryProps) {
  return (
    <div className="border border-[#EFEAE0] bg-white p-7 shadow-[0_1px_0_0_rgba(26,26,46,0.04)]">
      <p className="font-serif text-xs uppercase tracking-[0.2em] text-[#B89B6A]">
        Ваше бронювання
      </p>
      <h3 className="mt-2 font-serif text-2xl text-[#1A1A2E]">
        Деталі замовлення
      </h3>

      {/* ── Інфо ── */}
      <div className="mt-6 space-y-5 border-t border-[#EFEAE0] pt-6 text-sm text-[#1A1A2E]">
        <Row
          icon={<BedDouble className="h-4 w-4" />}
          label="Номер"
          value={roomName || "—"}
        />

        <Row
          icon={<CalendarDays className="h-4 w-4" />}
          label="Заїзд / виїзд"
          value={
            checkIn && checkOut
              ? `${fmt(checkIn, "d MMM", { locale: uk })} → ${fmt(checkOut, "d MMM yyyy", { locale: uk })}`
              : "—"
          }
        />

        <Row
          icon={<Tag className="h-4 w-4" />}
          label="Ночей"
          value={nights > 0 ? String(nights) : "—"}
        />

        <Row
          icon={<Users className="h-4 w-4" />}
          label="Гостей"
          value={
            adults > 0
              ? `${adults} дорослих${children > 0 ? `, ${children} дітей` : ""}`
              : "—"
          }
        />
      </div>

      {/* ── Розрахунок ціни ── */}
      <div className="mt-6 space-y-2 border-t border-[#EFEAE0] pt-6 text-sm">
        {pricing ? (
          <>
            {/* Базова вартість */}
            <div className="flex justify-between text-[#6B6B7A]">
              <span>
                ₴{pricing.basePrice.toLocaleString("uk-UA")} × {pricing.nights}{" "}
                {pricing.nights === 1 ? "ніч" : "ночей"}
              </span>
              <span>
                ₴{(pricing.basePrice * pricing.nights).toLocaleString("uk-UA")}
              </span>
            </div>

            {/* Націнка за високий сезон */}
            {pricing.seasonalMultiplier > 1 && (
              <div className="flex justify-between text-[#C9A96E]">
                <span>
                  Високий сезон (+
                  {Math.round((pricing.seasonalMultiplier - 1) * 100)}%)
                </span>
                <span>
                  +₴
                  {Math.round(
                    pricing.priceWithSeason - pricing.basePrice * pricing.nights
                  ).toLocaleString("uk-UA")}
                </span>
              </div>
            )}

            {/* Знижка за тривалість */}
            {pricing.durationDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>
                  Знижка за тривалість (-{pricing.durationDiscount * 100}%)
                </span>
                <span>
                  -₴{Math.round(pricing.discountAmount).toLocaleString("uk-UA")}
                </span>
              </div>
            )}
          </>
        ) : (
          <p className="text-xs text-[#9090AA]">
            Оберіть номер і дати для розрахунку вартості
          </p>
        )}
      </div>

      {/* ── Фінальна сума ── */}
      <div className="mt-5 flex items-baseline justify-between border-t border-[#EFEAE0] pt-5">
        <span className="font-serif text-base text-[#1A1A2E]">До сплати</span>
        <span className="font-serif text-3xl text-[#1A1A2E]">
          {pricing ? `₴${pricing.finalPrice.toLocaleString("uk-UA")}` : "—"}
        </span>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-[#6B6B7A]">
        Ціна оновлюється автоматично після вибору номера й дат у формі. Сезонні
        коефіцієнти та знижки за тривалість вже враховано.
      </p>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2 text-[#6B6B7A]">
        <span className="text-[#B89B6A]">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="text-right font-medium text-[#1A1A2E]">{value}</span>
    </div>
  );
}
