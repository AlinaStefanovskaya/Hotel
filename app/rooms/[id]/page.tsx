// app/rooms/[id]/page.tsx
import { format, parseISO } from "date-fns";
import { uk } from "date-fns/locale";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Maximize2,
  BedDouble,
  Users,
  Baby,
  Sparkles,
  Check,
} from "lucide-react";

import RoomGallery from "@/components/Rooms/RoomGallery";
import RoomStickyBooking from "@/components/Rooms/RoomStickyBooking";
import { roomByIdQuery, roomBookingsQuery } from "@/lib/queries";
import { sanityClient, urlFor } from "@/lib/sanity";
import { Room } from "@/types/sanity";

interface RoomBooking {
  rent_from: string;
  rent_to: string;
}

function getOverlap(
  ranges: { from: string; to: string }[],
  start: Date,
  end: Date
) {
  for (const r of ranges) {
    const f = parseISO(r.from);
    const t = parseISO(r.to);

    if (t > start && f < end) return { from: f, to: t };
  }

  return null;
}

export default async function RoomDetailPage(props: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string>>;
}) {
  const params = await props.params;
  const query = await props.searchParams;
  const { id } = params;
  const { checkIn, checkOut, adults, children } = query ?? {};

  const [room, roomBookings]: [Room | null, RoomBooking[]] = await Promise.all([
    sanityClient.fetch(roomByIdQuery, { id }),
    sanityClient.fetch(roomBookingsQuery, { roomId: id }),
  ]);

  if (!room) notFound();

  // Об'єднуємо room_unavailable_ranges + активні бронювання
  const unavailableRanges: { from: string; to: string }[] = [
    ...(room.room_unavailable_ranges ?? []).map((r) => ({
      from: r.from,
      to: r.to,
    })),
    ...roomBookings.map((b) => ({ from: b.rent_from, to: b.rent_to })),
  ];

  const start = checkIn ? parseISO(checkIn) : null;
  const end = checkOut ? parseISO(checkOut) : null;

  // Перевірка доступності за URL-параметрами (для повідомлення вгорі сторінки)
  let isFree = true;
  let tooltip = "";

  if (start && end) {
    const overlap = getOverlap(unavailableRanges, start, end);

    if (overlap) {
      isFree = false;
      tooltip = `Зайнятий з ${format(overlap.from, "dd MMM yyyy", { locale: uk })} по ${format(overlap.to, "dd MMM yyyy", { locale: uk })}. Доступний з ${format(overlap.to, "dd MMM yyyy", { locale: uk })}`;
    }
  }

  const photos = room.room_photos ?? [];
  const photoUrls = photos.map((p) => urlFor(p).width(1600).height(1000).url());

  return (
    <main className="min-h-dvh bg-[#FAF8F4]">
      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-16 pt-28 pb-4 flex items-center gap-2 text-[12px] text-[#9090AA]">
        <Link className="hover:text-[#1A1A2E] transition-colors" href="/">
          Головна
        </Link>
        <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
        <Link className="hover:text-[#1A1A2E] transition-colors" href="/rooms">
          Номери
        </Link>
        <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
        <span className="text-[#1A1A2E]">{room.room_name}</span>
      </div>

      {/* Title */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-16 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full bg-[#C9A96E] text-[#1A1A2E] font-semibold">
              до {room.room_max_people} гостей
            </span>
          </div>
          <h1 className="text-[44px] md:text-[52px] text-[#1A1A2E] font-semibold leading-[1.05] tracking-[-0.02em]">
            {room.room_name}
          </h1>
          {!isFree && tooltip && (
            <p className="text-[13px] text-red-500 mt-3 max-w-[540px] leading-relaxed">
              {tooltip}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="text-[11px] text-[#9090AA] uppercase tracking-[0.15em]">
            від
          </div>
          <div className="text-[36px] text-[#1A1A2E] font-semibold leading-none mt-1 font-display">
            ₴{room.room_price.toLocaleString("uk-UA")}
            <span className="text-[14px] text-[#9090AA] font-normal ml-1">
              / ніч
            </span>
          </div>
        </div>
      </div>

      {/* Gallery — твій Swiper */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-16 pb-14">
        <RoomGallery photoUrls={photoUrls} roomName={room.room_name} />
      </div>

      {/* Two-column info + sticky booking */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-16 pb-24 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          {/* Stats row */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 pb-8 border-b border-[#EFEAE0]">
            <Stat
              icon={
                <Maximize2
                  className="w-4 h-4 text-[#C9A96E]"
                  strokeWidth={1.5}
                />
              }
              label="Площа"
              value={`${room.room_size} м²`}
            />
            <Stat
              icon={
                <BedDouble
                  className="w-4 h-4 text-[#C9A96E]"
                  strokeWidth={1.5}
                />
              }
              label="Конфігурація"
              value={`${room.room_beds} ${room.room_beds === 1 ? "ліжко" : "ліжка"}`}
            />
            <Stat
              icon={
                <Users className="w-4 h-4 text-[#C9A96E]" strokeWidth={1.5} />
              }
              label="Гості"
              value={`до ${room.room_max_people}`}
            />
            {room.room_max_child > 0 && (
              <Stat
                icon={
                  <Baby className="w-4 h-4 text-[#C9A96E]" strokeWidth={1.5} />
                }
                label="Діти"
                value={`до ${room.room_max_child}`}
              />
            )}
          </div>

          {/* Description */}
          <div className="pt-10">
            <div className="text-[11px] tracking-[0.3em] text-[#C9A96E] uppercase font-medium mb-4">
              Про номер
            </div>
            <p className="text-[16px] text-[#1A1A2E]/85 leading-[1.75] max-w-[640px] whitespace-pre-line">
              {room.room_description}
            </p>
          </div>

          {/* Amenities — room_additions */}
          {room.room_additions && room.room_additions.length > 0 && (
            <div className="pt-12">
              <div className="text-[11px] tracking-[0.3em] text-[#C9A96E] uppercase font-medium mb-5">
                У номері
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {room.room_additions.map((a, i) => (
                  <div
                    key={`${a}-${i}`}
                    className="flex items-start gap-3 text-[14px] text-[#1A1A2E]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#1A1A2E] flex items-center justify-center shrink-0 mt-0.5">
                      <Check
                        className="w-3 h-3 text-[#C9A96E]"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span>{typeof a === "string" ? a : a.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-12 flex items-start gap-3 text-[12px] text-[#9090AA] leading-relaxed">
            <Sparkles
              className="w-3.5 h-3.5 text-[#C9A96E] shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
            <span>
              Заселення з 14:00, виселення до 12:00. Можливе раннє/пізнє
              заселення за попередньою домовленістю.
            </span>
          </div>
        </div>

        <RoomStickyBooking
          initialAdults={adults}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialChildren={children}
          pricePerNight={room.room_price}
          roomId={room._id}
          roomMaxChild={room.room_max_child}
          roomMaxPeople={room.room_max_people}
          roomName={room.room_name}
          unavailableRanges={unavailableRanges}
        />
      </div>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-[10px] text-[#9090AA] tracking-[0.15em] uppercase">
          {label}
        </div>
        <div className="text-[15px] text-[#1A1A2E] font-medium">{value}</div>
      </div>
    </div>
  );
}
