// components/Home/BookingSection.tsx
"use client";

import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Users, Baby, ChevronDown } from "lucide-react";

import CustomCalendar from "@/components/CustomCalendar";

function Divider() {
  return <div className="hidden md:block w-px self-stretch bg-[#EFEAE0]" />;
}

/* ── Поле дати з попапом календаря ──────────────────── */
function DateField({
  label,
  value,
  onChange,
  minDate,
}: {
  label: string;
  value: CalendarDateTime | null;
  onChange: (val: CalendarDateTime | null) => void;
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
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        className="w-full text-left px-5 py-3 rounded-xl hover:bg-[#FAF8F4] transition-colors group"
        type="button"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="text-[10px] text-[#C9A96E] tracking-[0.18em] uppercase font-semibold mb-1.5 flex items-center gap-1.5">
          <Calendar className="w-3 h-3" strokeWidth={2} />
          {label}
        </div>
        <div className="text-[14px] flex items-center justify-between gap-2">
          <span className={display ? "text-[#1A1A2E]" : "text-[#9090AA]"}>
            {display ?? "Оберіть дату"}
          </span>
          <ChevronDown
            className="w-3.5 h-3.5 text-[#9090AA] group-hover:text-[#C9A96E] transition-colors shrink-0"
            strokeWidth={1.5}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl border border-[#EFEAE0] shadow-[0_16px_48px_-12px_rgba(15,52,96,0.20)]">
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

/* ── Кастомний дропдаун з Field-дизайном тригера ───── */
function SelectField({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: { key: string; label: string }[];
  onChange: (val: string) => void;
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
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        className="w-full text-left px-5 py-3 rounded-xl hover:bg-[#FAF8F4] transition-colors group"
        type="button"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="text-[10px] text-[#C9A96E] tracking-[0.18em] uppercase font-semibold mb-1.5 flex items-center gap-1.5">
          <span className="w-3 h-3 inline-flex">{icon}</span>
          {label}
        </div>
        <div className="text-[14px] flex items-center justify-between gap-2">
          <span className="text-[#1A1A2E]">{selected?.label}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#9090AA] group-hover:text-[#C9A96E] transition-all shrink-0 ${
              isOpen ? "rotate-180" : ""
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
              className={`w-full text-left px-5 py-3 text-[13px] transition-colors ${
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

/* ── Основний компонент ─────────────────────────────── */
export default function BookingSection() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState<CalendarDateTime | null>(null);
  const [checkOut, setCheckOut] = useState<CalendarDateTime | null>(null);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  /* Мінімальна дата виселення = день після заселення */
  const checkOutMin = checkIn
    ? (() => {
        const d = new Date(checkIn.year, checkIn.month - 1, checkIn.day);

        d.setDate(d.getDate() + 1);

        return d;
      })()
    : undefined;

  function handleSubmit() {
    const params = new URLSearchParams();

    if (checkIn)
      params.set(
        "checkIn",
        format(checkIn.toDate(getLocalTimeZone()), "yyyy-MM-dd")
      );
    if (checkOut)
      params.set(
        "checkOut",
        format(checkOut.toDate(getLocalTimeZone()), "yyyy-MM-dd")
      );
    params.set("adults", adults);
    params.set("children", children);
    router.push(`/rooms?${params.toString()}`);
  }

  return (
    <div className="relative -mt-12 z-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-16">
        <div className="bg-white rounded-[20px] shadow-[0_24px_60px_-20px_rgba(15,52,96,0.25)] p-2.5 flex flex-col md:flex-row items-stretch md:items-center gap-1 border border-[#EFEAE0]">
          {/* Заселення */}
          <DateField
            label="Заселення"
            value={checkIn}
            onChange={(val) => {
              setCheckIn(val);
              if (val && checkOut) {
                const ci = new Date(val.year, val.month - 1, val.day);
                const co = new Date(
                  checkOut.year,
                  checkOut.month - 1,
                  checkOut.day
                );

                if (ci >= co) setCheckOut(null);
              }
            }}
          />

          <Divider />

          {/* Виселення */}
          <DateField
            label="Виселення"
            minDate={checkOutMin}
            value={checkOut}
            onChange={setCheckOut}
          />

          <Divider />

          {/* Дорослі */}
          <SelectField
            icon={<Users className="w-3 h-3" strokeWidth={2} />}
            label="Дорослі"
            options={[
              { key: "1", label: "1 дорослий" },
              { key: "2", label: "2 дорослих" },
              { key: "3", label: "3 дорослих" },
              { key: "4", label: "4 дорослих" },
            ]}
            value={adults}
            onChange={setAdults}
          />

          <Divider />

          {/* Діти */}
          <SelectField
            icon={<Baby className="w-3 h-3" strokeWidth={2} />}
            label="Діти"
            options={[
              { key: "0", label: "0 дітей" },
              { key: "1", label: "1 дитина" },
              { key: "2", label: "2 дитини" },
            ]}
            value={children}
            onChange={setChildren}
          />

          {/* Кнопка */}
          <button
            className="ml-1 text-[13px] px-7 py-4 bg-[#1A1A2E] text-white rounded-2xl font-medium hover:bg-[#16213E] transition-colors flex items-center justify-center gap-2 group whitespace-nowrap"
            type="button"
            onClick={handleSubmit}
          >
            Перевірити наявність
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
