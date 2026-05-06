"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CalendarDateTime } from "@internationalized/date";
import { parseISO, differenceInCalendarDays } from "date-fns";

import BookingSummary from "./BookingSummary";

import BookingForm from "./index";

import { calculatePrice } from "@/lib/pricing";

/* ── Types ─────────────────────────────────────────── */
export type RoomOpt = { key: string; label: string; price?: number };

export type RoomDetail = {
  maxPeople: number;
  maxChild: number;
  unavailableRanges: { from: string; to: string }[];
};

export type PricingResult = ReturnType<typeof calculatePrice>;

/* ── Helpers ────────────────────────────────────────── */
const toCDT = (d: Date | null): CalendarDateTime | null =>
  d
    ? new CalendarDateTime(d.getFullYear(), d.getMonth() + 1, d.getDate(), 0, 0)
    : null;

/* ── Component ──────────────────────────────────────── */
export default function BookingClientWrapper() {
  const search = useSearchParams();

  /* ── Список номерів ──────────────────────────────── */
  const [rooms, setRooms] = useState<RoomOpt[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/rooms-list");
        const { rooms: list } = (await res.json()) as {
          rooms: { _id: string; room_name: string; room_price?: number }[];
        };

        setRooms(
          list.map((r) => ({
            key: r._id,
            label: r.room_name,
            price: r.room_price ?? 0,
          }))
        );
      } catch {
        setRooms([]);
      }
    })();
  }, []);

  /* ── Спільний стан форми ─────────────────────────── */
  const [checkIn, setCheckIn] = useState<CalendarDateTime | null>(
    toCDT(search.get("checkIn") ? parseISO(search.get("checkIn")!) : null)
  );
  const [checkOut, setCheckOut] = useState<CalendarDateTime | null>(
    toCDT(search.get("checkOut") ? parseISO(search.get("checkOut")!) : null)
  );
  const [adults, setAdults] = useState(search.get("adults") ?? "1");
  const [children, setChildren] = useState(search.get("children") ?? "0");
  const [roomId, setRoomId] = useState(search.get("room") ?? "");

  /* ── Деталі вибраного номера ─────────────────────── */
  const [roomDetail, setRoomDetail] = useState<RoomDetail | null>(null);

  useEffect(() => {
    if (!roomId) {
      setRoomDetail(null);

      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/room-availability?roomId=${roomId}`);

        if (res.ok) {
          const data = await res.json();

          setRoomDetail({
            maxPeople: data.roomMaxPeople,
            maxChild: data.roomMaxChild,
            unavailableRanges: data.unavailableRanges,
          });
        }
      } catch {
        setRoomDetail(null);
      }
    })();
  }, [roomId]);

  /* ── Розрахунок ціни ─────────────────────────────── */
  const checkInDate = checkIn
    ? new Date(checkIn.year, checkIn.month - 1, checkIn.day)
    : null;
  const checkOutDate = checkOut
    ? new Date(checkOut.year, checkOut.month - 1, checkOut.day)
    : null;

  const nights =
    checkInDate && checkOutDate
      ? Math.max(1, differenceInCalendarDays(checkOutDate, checkInDate))
      : 0;

  const currentRoom = rooms.find((r) => r.key === roomId);

  const pricing: PricingResult | null =
    checkInDate && checkOutDate && currentRoom?.price && nights > 0
      ? calculatePrice(currentRoom.price, checkInDate, checkOutDate, nights)
      : null;

  /* ── Render ──────────────────────────────────────── */
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
      {/* ── Форма ── */}
      <div className="border border-[#EFEAE0] bg-white p-6 shadow-[0_1px_0_0_rgba(26,26,46,0.04)] sm:p-10">
        <BookingForm
          adults={adults}
          checkIn={checkIn}
          checkOut={checkOut}
          kidsCount={children}
          pricing={pricing}
          roomDetail={roomDetail}
          roomId={roomId}
          rooms={rooms}
          onAdultsChange={setAdults}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onChildrenChange={setChildren}
          onRoomIdChange={setRoomId}
        />
      </div>

      {/* ── Summary (sticky) ── */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <BookingSummary
          adults={Number(adults)}
          checkIn={checkInDate}
          checkOut={checkOutDate}
          kidsCount={Number(children)}
          nights={nights}
          pricing={pricing}
          roomName={currentRoom?.label ?? ""}
        />
      </aside>
    </div>
  );
}
