"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { uk } from "date-fns/locale";
import { parseISO } from "date-fns";

import "react-day-picker/dist/style.css";
import { getDateType, isRestaurantDiscountDay } from "@/lib/calendar-utils";

interface CustomCalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date | undefined) => void;
  disabled?: Date | Date[];
  /** Конкретнi заблокованi дiапазони (наприклад, бронювання конкретного номера) */
  disabledRanges?: { from: string; to: string }[];
  className?: string;
  mode?: "single" | "range";
  fromDate?: Date; // Мінімальна доступна дата
  toDate?: Date;
  compact?: boolean; // Компактний режим для форм
}

export default function CustomCalendar({
  selected,
  onSelect,
  disabled,
  disabledRanges,
  className = "",
  mode = "single",
  fromDate,
  toDate,
  compact = false,
}: CustomCalendarProps) {
  const [calendarData, setCalendarData] = useState<{
    totalRooms: number;
    unavailableRanges: { from: string; to: string }[];
  } | null>(null);

  useEffect(() => {
    fetch("/api/bookings-calendar")
      .then((res) => res.json())
      .then((data) => setCalendarData(data))
      .catch(() => {
        setCalendarData({ totalRooms: 0, unavailableRanges: [] });
      });
  }, []);

  // Функция для определения disabled дат
  const isDateDisabled = (date: Date) => {
    const dateToCheck = new Date(date);

    dateToCheck.setHours(0, 0, 0, 0);

    // 1. Блокуємо минулі дати
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (dateToCheck < today) return true;

    // 2. Блокуємо дати < fromDate (якщо fromDate задано)
    if (fromDate) {
      const minDate = new Date(fromDate);

      minDate.setHours(0, 0, 0, 0);
      if (dateToCheck < minDate) return true;
    }

    // 3. Якщо передані конкретнi дiапазони (для конкретного номера) — використовуємо їх
    if (disabledRanges && disabledRanges.length > 0) {
      for (const range of disabledRanges) {
        const from = parseISO(range.from);
        const to = parseISO(range.to);

        from.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        // Блокуємо дати [from, to) — дата to є можливою датою виселення
        if (dateToCheck >= from && dateToCheck < to) return true;
      }

      return false;
    }

    // 4. Fallback: блокуємо повністю заброньовані дати (глобально)
    if (!calendarData) return false;

    return (
      getDateType(
        date,
        calendarData.totalRooms,
        calendarData.unavailableRanges
      ) === "fully-booked"
    );
  };

  // Модификаторы для стилизации дней
  const modifiers = {
    fullyBooked: (date: Date) => {
      if (!calendarData) return false;

      return (
        getDateType(
          date,
          calendarData.totalRooms,
          calendarData.unavailableRanges
        ) === "fully-booked"
      );
    },
    highSeason: (date: Date) => {
      if (!calendarData) return false;

      return (
        getDateType(
          date,
          calendarData.totalRooms,
          calendarData.unavailableRanges
        ) === "high-season"
      );
    },
    restaurantDiscount: (date: Date) => {
      return isRestaurantDiscountDay(date);
    },
  };

  const disabledDays = [
    ...(Array.isArray(disabled) ? disabled : disabled ? [disabled] : []),
    isDateDisabled,
  ];

  return (
    <div
      className={`custom-calendar-wrapper ${compact ? "compact-mode" : ""} ${className}`}
    >
      <DayPicker
        className="rdp-custom"
        disabled={disabledDays}
        fromDate={fromDate}
        locale={uk}
        mode={mode as any}
        modifiers={modifiers}
        modifiersClassNames={{
          fullyBooked: "fully-booked-day",
          highSeason: "high-season-day",
          restaurantDiscount: "restaurant-discount-day",
          selected: "rdp-day_selected",
          today: "rdp-day_today",
          disabled: "rdp-day_disabled",
        }}
        selected={selected || undefined}
        toDate={toDate}
        onSelect={onSelect}
      />
      {/* Легенда */}
      <div
        className={`calendar-legend ${compact ? "mt-3" : "mt-5"} flex flex-col gap-2 border-t border-[#EFEAE0] ${compact ? "pt-2 text-xs" : "pt-4 text-[12px]"}`}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#fee2e2", fontSize: "6px" }}
          >
            🚫
          </div>
          <span className="text-[#9090AA]">Зайнято</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded shrink-0"
            style={{ backgroundColor: "rgba(201,169,110,0.25)" }}
          />
          <span className="text-[#9090AA]">
            Високий сезон{" "}
            <span className="text-[#C9A96E] font-medium">+15%</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded shrink-0"
            style={{ backgroundColor: "rgba(15,52,96,0.10)" }}
          />
          <span className="text-[#9090AA]">Знижка на меню ресторану</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded shrink-0 border border-[#EFEAE0]" />
          <span className="text-[#9090AA]">Звичайна ціна</span>
        </div>
      </div>
    </div>
  );
}
