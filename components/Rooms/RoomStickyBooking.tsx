// components/Rooms/RoomStickyBooking.tsx
"use client";

import Link from "next/link";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { uk } from "date-fns/locale";
import {
  ArrowRight,
  Sparkles,
  Calendar,
  Users,
  Baby,
  ChevronDown,
} from "lucide-react";
import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { useState, useRef, useEffect } from "react";
import { Tooltip } from "@heroui/tooltip";

import CustomCalendar from "@/components/CustomCalendar";
import { calculatePrice } from "@/lib/pricing";

/* ── Дані для селекторів ─────────────────────────────── */
const adultsOpts = [
  { key: "1", label: "1 дорослий" },
  { key: "2", label: "2 дорослих" },
  { key: "3", label: "3 дорослих" },
  { key: "4", label: "4 дорослих" },
];
const childrenOpts = [
  { key: "0", label: "0 дітей" },
  { key: "1", label: "1 дитина" },
  { key: "2", label: "2 дитини" },
];

/* ── ISO → CalendarDateTime ─────────────────────────────── */
const toCDT = (iso?: string): CalendarDateTime | null => {
  if (!iso) return null;
  try {
    const d = parseISO(iso);

    return new CalendarDateTime(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate(),
      0,
      0
    );
  } catch {
    return null;
  }
};

/* ── DateField ─────────────────────────────────────────── */
function DateField({
  label,
  value,
  onChange,
  minDate,
}: {
  label: string;
  value: CalendarDateTime | null;
  onChange: (v: CalendarDateTime | null) => void;
  minDate?: Date;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);

    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectedDate = value
    ? new Date(value.year, value.month - 1, value.day)
    : null;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  const fromDate = minDate && minDate > today ? minDate : today;

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(null);
      setIsOpen(false);

      return;
    }
    onChange(
      new CalendarDateTime(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        0,
        0
      )
    );
    setIsOpen(false);
  };

  const display = selectedDate
    ? format(selectedDate, "dd MMM yyyy", { locale: uk })
    : null;

  return (
    <div ref={ref} className="relative p-3.5">
      <button
        className="w-full text-left"
        type="button"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="text-[9px] text-[#C9A96E] tracking-[0.2em] uppercase font-semibold flex items-center gap-1.5">
          <Calendar className="w-3 h-3" strokeWidth={2} />
          {label}
        </div>
        <div className="text-[13px] mt-1 flex items-center justify-between gap-2">
          <span className={display ? "text-[#1A1A2E]" : "text-[#9090AA]"}>
            {display ?? "Оберіть дату"}
          </span>
          <ChevronDown
            className={`w-3 h-3 transition-all shrink-0 ${
              isOpen ? "rotate-180 text-[#C9A96E]" : "text-[#9090AA]"
            }`}
            strokeWidth={1.5}
          />
        </div>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-2xl border border-[#EFEAE0] shadow-[0_16px_48px_-12px_rgba(15,52,96,0.20)]">
          <CustomCalendar
            compact
            fromDate={fromDate}
            selected={selectedDate}
            toDate={new Date(2030, 11, 31)}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

/* ── SelectField ────────────────────────────────────────── */
function SelectField({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: { key: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);

    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = options.find((o) => o.key === value);

  return (
    <div ref={ref} className="relative p-3.5">
      <button
        className="w-full text-left"
        type="button"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="text-[9px] text-[#C9A96E] tracking-[0.2em] uppercase font-semibold flex items-center gap-1.5">
          <span className="w-3 h-3 inline-flex">{icon}</span>
          {label}
        </div>
        <div className="text-[13px] mt-1 flex items-center justify-between gap-2">
          <span className="text-[#1A1A2E]">{selected?.label}</span>
          <ChevronDown
            className={`w-3 h-3 transition-all shrink-0 ${
              isOpen ? "rotate-180 text-[#C9A96E]" : "text-[#9090AA]"
            }`}
            strokeWidth={1.5}
          />
        </div>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-xl border border-[#EFEAE0] shadow-[0_12px_40px_-10px_rgba(15,52,96,0.18)] overflow-hidden min-w-[160px]">
          {options.map((opt) => (
            <button
              key={opt.key}
              className={`w-full text-left px-4 py-3 text-[13px] transition-colors ${
                opt.key === value
                  ? "bg-[#FAF8F4] text-[#C9A96E] font-semibold"
                  : "text-[#1A1A2E] hover:bg-[#FAF8F4]"
              }`}
              type="button"
              onClick={() => {
                onChange(opt.key);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Основний компонент ───────────────────────────────── */
interface Props {
  pricePerNight: number;
  roomId: string;
  roomName: string;
  roomMaxPeople: number;
  roomMaxChild: number;
  /** Об'єднані room_unavailable_ranges + активні бронювання */
  unavailableRanges: { from: string; to: string }[];
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: string;
  initialChildren?: string;
}

export default function RoomStickyBooking({
  pricePerNight,
  roomId,
  roomName,
  roomMaxPeople,
  roomMaxChild,
  unavailableRanges,
  initialCheckIn,
  initialCheckOut,
  initialAdults = "2",
  initialChildren = "0",
}: Props) {
  const [checkIn, setIn] = useState<CalendarDateTime | null>(
    toCDT(initialCheckIn)
  );
  const [checkOut, setOut] = useState<CalendarDateTime | null>(
    toCDT(initialCheckOut)
  );
  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);

  /* ── Обчислення ─────────────────────────────────────── */
  const checkInDate = checkIn
    ? new Date(checkIn.year, checkIn.month - 1, checkIn.day)
    : null;
  const checkOutDate = checkOut
    ? new Date(checkOut.year, checkOut.month - 1, checkOut.day)
    : null;
  const nights =
    checkInDate && checkOutDate
      ? Math.max(1, differenceInCalendarDays(checkOutDate, checkInDate))
      : 1;

  const pricing =
    checkInDate && checkOutDate
      ? calculatePrice(pricePerNight, checkInDate, checkOutDate, nights)
      : null;
  const total = pricing?.finalPrice ?? pricePerNight;

  const checkOutMin = checkIn
    ? (() => {
        const d = new Date(checkIn.year, checkIn.month - 1, checkIn.day);

        d.setDate(d.getDate() + 1);

        return d;
      })()
    : undefined;

  /* ── Валідація ───────────────────────────────────────── */
  const reasons: string[] = [];

  if (checkInDate && checkOutDate) {
    for (const r of unavailableRanges) {
      const f = parseISO(r.from);
      const t = parseISO(r.to);

      if (t > checkInDate && f < checkOutDate) {
        reasons.push(
          `Зайнятий з ${format(f, "dd MMM yyyy", { locale: uk })} ` +
            `по ${format(t, "dd MMM yyyy", { locale: uk })}. ` +
            `Доступний з ${format(t, "dd MMM yyyy", { locale: uk })}`
        );
        break;
      }
    }
  }

  const totalGuests = parseInt(adults) + parseInt(children);

  if (totalGuests > roomMaxPeople) {
    reasons.push(
      `Розрахований максимум на ${roomMaxPeople} гост${
        roomMaxPeople === 1 ? "я" : "ей"
      }`
    );
  } else if (parseInt(children) > roomMaxChild) {
    reasons.push(
      `Приймає максимум ${roomMaxChild} ${
        roomMaxChild === 0 ? "дітей" : roomMaxChild === 1 ? "дитину" : "дітей"
      }`
    );
  }

  const hasDates = !!checkIn && !!checkOut;
  const isDisabled = !hasDates || reasons.length > 0;
  const tooltipText = !hasDates
    ? "Оберіть дати заселення та виселення"
    : reasons.join(" • ");

  /* ── URL для бронювання ────────────────────────────────── */
  const sp = new URLSearchParams();

  if (checkIn)
    sp.set("checkIn", format(checkIn.toDate(getLocalTimeZone()), "yyyy-MM-dd"));
  if (checkOut)
    sp.set(
      "checkOut",
      format(checkOut.toDate(getLocalTimeZone()), "yyyy-MM-dd")
    );
  sp.set("adults", adults);
  sp.set("children", children);
  const qs = sp.toString() ? `?${sp}` : "";
  const delim = qs ? "&" : "?";
  const bookUrl =
    `/booking${qs}${delim}room=${roomId}` +
    `&roomName=${encodeURIComponent(roomName)}` +
    `&price=${total}`;

  /* ── Рендер ───────────────────────────────────────────── */
  return (
    <aside className="md:sticky md:top-28 self-start">
      <div className="bg-white rounded-2xl border border-[#EFEAE0] p-7 shadow-[0_24px_60px_-30px_rgba(15,52,96,0.30)]">
        <div className="text-[11px] tracking-[0.3em] text-[#C9A96E] uppercase font-medium">
          Забронювати номер
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[34px] font-semibold font-display text-[#1A1A2E] leading-none">
            ₴{pricePerNight.toLocaleString("uk-UA")}
          </span>
          <span className="text-[13px] text-[#9090AA]">/ ніч</span>
        </div>

        {/* Сітка: дати + гості */}
        <div className="mt-6 grid grid-cols-2 border border-[#EFEAE0] rounded-xl">
          {/* Заселення */}
          <div className="border-r border-b border-[#EFEAE0]">
            <DateField
              label="Заселення"
              value={checkIn}
              onChange={(val) => {
                setIn(val);
                if (val && checkOut) {
                  const ci = new Date(val.year, val.month - 1, val.day);
                  const co = new Date(
                    checkOut.year,
                    checkOut.month - 1,
                    checkOut.day
                  );

                  if (ci >= co) setOut(null);
                }
              }}
            />
          </div>
          {/* Виселення */}
          <div className="border-b border-[#EFEAE0]">
            <DateField
              label="Виселення"
              minDate={checkOutMin}
              value={checkOut}
              onChange={setOut}
            />
          </div>
          {/* Дорослі */}
          <div className="border-r border-[#EFEAE0]">
            <SelectField
              icon={<Users className="w-3 h-3" strokeWidth={2} />}
              label="Дорослі"
              options={adultsOpts}
              value={adults}
              onChange={setAdults}
            />
          </div>
          {/* Діти */}
          <div>
            <SelectField
              icon={<Baby className="w-3 h-3" strokeWidth={2} />}
              label="Діти"
              options={childrenOpts}
              value={children}
              onChange={setChildren}
            />
          </div>
        </div>

        {/* Розрахунок вартості */}
        <div className="mt-5 flex flex-col gap-2 text-[13px]">
          {/* Базова вартість */}
          <div className="flex justify-between text-[#1A1A2E]/75">
            <span>
              ₴{pricePerNight.toLocaleString("uk-UA")} × {nights}{" "}
              {nights === 1 ? "ніч" : "ночей"}
            </span>
            <span>₴{(pricePerNight * nights).toLocaleString("uk-UA")}</span>
          </div>

          {/* Сезонне підвищення */}
          {pricing && pricing.seasonalMultiplier > 1 && (
            <div className="flex justify-between text-[#C9A96E]">
              <span>
                Високий сезон (+
                {Math.round((pricing.seasonalMultiplier - 1) * 100)}%)
              </span>
              <span>
                +₴
                {Math.round(
                  pricing.priceWithSeason - pricePerNight * nights
                ).toLocaleString("uk-UA")}
              </span>
            </div>
          )}

          {/* Знижка за тривалість */}
          {pricing && pricing.durationDiscount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>
                Знижка за тривалість (-{pricing.durationDiscount * 100} %)
              </span>
              <span>
                -₴{Math.round(pricing.discountAmount).toLocaleString("uk-UA")}
              </span>
            </div>
          )}

          {/* Підсумок */}
          <div className="flex justify-between text-[#1A1A2E] pt-2.5 mt-0.5 border-t border-[#EFEAE0] font-semibold text-[15px]">
            <span>Загалом</span>
            <span className="font-display">
              ₴{total.toLocaleString("uk-UA")}
            </span>
          </div>
        </div>

        {/* Кнопка бронювання */}
        {isDisabled ? (
          <Tooltip content={tooltipText} placement="top">
            <div className="w-full mt-6 px-7 py-4 bg-[#1A1A2E]/30 text-white/70 rounded-2xl font-medium text-[14px] flex items-center justify-center gap-2 cursor-not-allowed select-none">
              Забронювати
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </div>
          </Tooltip>
        ) : (
          <Link
            className="w-full mt-6 px-7 py-4 bg-[#1A1A2E] text-white rounded-2xl font-medium hover:bg-[#16213E] transition-colors flex items-center justify-center gap-2 group text-[14px]"
            href={bookUrl}
          >
            Забронювати
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={2}
            />
          </Link>
        )}

        <a
          className="w-full mt-2 px-7 py-3.5 border border-[#EFEAE0] text-[#1A1A2E] rounded-2xl hover:border-[#C9A96E] transition-colors text-[13px] flex items-center justify-center"
          href="tel:+380661927167"
        >
          Зв&apos;язатись із готелем
        </a>

        <div className="mt-5 pt-5 border-t border-[#EFEAE0] flex items-start gap-3 text-[11px] text-[#9090AA] leading-relaxed">
          <Sparkles
            className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <span>
            Безкоштовне скасування до 48 годин до заселення. Заселення з 14:00.
          </span>
        </div>
      </div>
    </aside>
  );
}
