// app/rooms/page.tsx
import { differenceInCalendarDays, parseISO, format } from "date-fns";
import { uk } from "date-fns/locale";

import BookingFilters from "@/components/Rooms/BookingFilters";
import RoomCard from "@/components/Rooms/RoomCard";
import RoomsCTA from "@/components/Rooms/RoomsCTA";
import PageHero from "@/components/PageHero";
import { HERO_IMAGE } from "@/lib/design-images";
import { roomsQuery, activeBookingsQuery } from "@/lib/queries";
import { sanityClient } from "@/lib/sanity";
import { Room } from "@/types/sanity";

interface ActiveBooking {
  rent_from: string;
  rent_to: string;
  roomId: string;
}

// Перевіряє перетин з усіма джерелами: room_unavailable_ranges + активні бронювання
function getOverlap(
  room: Room,
  start: Date,
  end: Date,
  bookingRanges: { from: string; to: string }[]
): { from: Date; to: Date } | null {
  // Об'єднуємо діапазони з обох джерел
  const allRanges = [...(room.room_unavailable_ranges ?? []), ...bookingRanges];

  for (const r of allRanges) {
    const f = parseISO(r.from);
    const t = parseISO(r.to);

    if (t > start && f < end) return { from: f, to: t };
  }

  return null;
}

export default async function RoomsPage(props: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const query = await props.searchParams;
  const { checkIn, checkOut, adults, children } = query ?? {};

  const start = checkIn ? parseISO(checkIn) : null;
  const end = checkOut ? parseISO(checkOut) : null;
  const nights =
    start && end ? Math.max(1, differenceInCalendarDays(end, start)) : 1;

  // Кількість гостей з фільтра (null = не задано, фільтрація за місткістю не застосовується)
  const adultsCount = adults ? parseInt(adults, 10) : null;
  const childrenCount = children ? parseInt(children, 10) : 0;
  const totalGuests = adultsCount !== null ? adultsCount + childrenCount : null;

  const hasFilter = !!(start && end) || totalGuests !== null;

  const [rooms, activeBookings]: [Room[], ActiveBooking[]] = await Promise.all([
    sanityClient.fetch(roomsQuery),
    sanityClient.fetch(activeBookingsQuery),
  ]);

  // Групуємо бронювання по ID номера для швидкого пошуку
  const bookingsByRoom = new Map<string, { from: string; to: string }[]>();

  for (const b of activeBookings) {
    if (!bookingsByRoom.has(b.roomId)) bookingsByRoom.set(b.roomId, []);
    bookingsByRoom.get(b.roomId)!.push({ from: b.rent_from, to: b.rent_to });
  }

  // Перевіряємо доступність номера за датами та місткістю
  function isRoomAvailable(room: Room): boolean {
    const ranges = bookingsByRoom.get(room._id) ?? [];

    if (start && end && getOverlap(room, start, end, ranges)) return false;
    if (totalGuests !== null && totalGuests > room.room_max_people)
      return false;
    if (totalGuests !== null && childrenCount > room.room_max_child)
      return false;

    return true;
  }

  const availableCount = hasFilter
    ? rooms.filter(isRoomAvailable).length
    : rooms.length;

  return (
    <main className="min-h-dvh bg-[#FAF8F4]">
      <PageHero
        description="Авторські номери — від камерних studios до просторих сюїт. Кожен зі своїм характером, але з єдиною турботою про деталі."
        eyebrow="Stay with us"
        image={HERO_IMAGE}
        italicWord="апартаменти"
        title="Номери та апартаменти"
      />

      <section className="py-10 border-b border-[#EFEAE0] bg-[#FAF8F4]">
        <div className="max-w-[1320px] mx-auto px-6 md:px-16">
          <BookingFilters />
          <div className="mt-5 flex items-center gap-2 text-[12px] text-[#9090AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            {hasFilter
              ? `Доступно: ${availableCount} з ${rooms.length}`
              : `Знайдено: ${rooms.length}`}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-16 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rooms.map((room) => {
            let isFree = true;
            let tooltip = "";

            const bookingRanges = bookingsByRoom.get(room._id) ?? [];

            // Збираємо всі причини недоступності незалежно
            const reasons: string[] = [];

            // Перевірка зайнятості за датами
            if (start && end) {
              const overlap = getOverlap(room, start, end, bookingRanges);

              if (overlap) {
                isFree = false;
                reasons.push(
                  `Зайнятий з ${format(overlap.from, "dd MMM yyyy", { locale: uk })} по ${format(overlap.to, "dd MMM yyyy", { locale: uk })}. Доступний з ${format(overlap.to, "dd MMM yyyy", { locale: uk })}`
                );
              }
            }

            // Перевірка місткості (незалежно від дат)
            if (totalGuests !== null) {
              if (totalGuests > room.room_max_people) {
                isFree = false;
                reasons.push(
                  `Розрахований максимум на ${room.room_max_people} гост${room.room_max_people === 1 ? "я" : "ей"}`
                );
              } else if (childrenCount > room.room_max_child) {
                isFree = false;
                reasons.push(
                  `Приймає максимум ${room.room_max_child} ${
                    room.room_max_child === 0
                      ? "дітей"
                      : room.room_max_child === 1
                        ? "дитину"
                        : "дітей"
                  }`
                );
              }
            }

            tooltip = reasons.join(" • ");

            return (
              <RoomCard
                key={room._id}
                isFree={isFree}
                nights={nights}
                room={room}
                tooltip={tooltip}
              />
            );
          })}
        </div>
      </section>

      <RoomsCTA />
    </main>
  );
}
