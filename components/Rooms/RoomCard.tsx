// components/Rooms/RoomCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "@heroui/tooltip";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Maximize2, BedDouble, Users } from "lucide-react";

import { urlFor } from "@/lib/sanity";
import { calculatePrice } from "@/lib/pricing";
import { Room } from "@/types/sanity";

interface Props {
  room: Room;
  nights: number;
  isFree: boolean;
  tooltip?: string;
}

export default function RoomCard({
  room,
  nights,
  isFree,
  tooltip = "",
}: Props) {
  const cover = room.room_photos?.[0]
    ? urlFor(room.room_photos[0]).width(900).height(600).url()
    : "/placeholder.jpg";

  const search = useSearchParams();
  const checkIn = search.get("checkIn");
  const checkOut = search.get("checkOut");

  const pricing =
    checkIn && checkOut
      ? calculatePrice(
          room.room_price,
          new Date(checkIn),
          new Date(checkOut),
          nights
        )
      : null;
  const total = pricing?.finalPrice ?? room.room_price * nights;
  const hasSeasonBonus = pricing && pricing.seasonalMultiplier > 1;
  const hasDiscount = pricing && pricing.durationDiscount > 0;

  const qs = search.toString() ? `?${search}` : "";
  const roomDetailUrl = `/rooms/${room._id}${qs}`;

  const card = (
    <div
      className={`group bg-white rounded-2xl overflow-hidden border border-[#EFEAE0] transition-all duration-300 flex flex-col h-full ${
        isFree
          ? "hover:border-[#C9A96E]/60 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(15,52,96,0.20)]"
          : "opacity-50 grayscale cursor-not-allowed"
      }`}
    >
      <div className="relative h-[280px] overflow-hidden">
        <Image
          fill
          alt={room.room_name}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={cover}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/40 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full font-semibold bg-[#C9A96E] text-[#1A1A2E]">
          до {room.room_max_people} гостей
        </span>
      </div>

      <div className="p-7 flex-1 flex flex-col">
        <h3 className="text-[22px] text-[#1A1A2E] font-semibold leading-tight">
          {room.room_name}
        </h3>
        <p className="text-[13px] text-[#9090AA] mt-1.5 leading-relaxed line-clamp-2">
          {room.room_description}
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 pb-5 border-b border-[#EFEAE0] text-[12px] text-[#1A1A2E]/70">
          <span className="flex items-center gap-1.5">
            <Maximize2
              className="w-3.5 h-3.5 text-[#C9A96E]"
              strokeWidth={1.5}
            />
            {room.room_size} м²
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble
              className="w-3.5 h-3.5 text-[#C9A96E]"
              strokeWidth={1.5}
            />
            {room.room_beds} {room.room_beds === 1 ? "ліжко" : "ліжка"}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#C9A96E]" strokeWidth={1.5} />
            {room.room_max_people} гості
          </span>
        </div>

        <div className="flex items-end justify-between mt-auto pt-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-[11px] text-[#9090AA] uppercase tracking-[0.15em]">
                від
              </div>
              {hasSeasonBonus && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C9A96E]/15 text-[#C9A96E] font-semibold">
                  +{Math.round((pricing!.seasonalMultiplier - 1) * 100)}% сезон
                </span>
              )}
              {hasDiscount && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold">
                  −{pricing!.durationDiscount * 100}% знижка
                </span>
              )}
            </div>
            <div className="text-[24px] font-semibold text-[#1A1A2E] leading-none mt-1 font-display">
              ₴{total.toLocaleString("uk-UA")}
              <span className="text-[12px] text-[#9090AA] font-normal ml-1">
                / {nights} {nights === 1 ? "ніч" : "ночей"}
              </span>
            </div>
          </div>
          <span className="text-[12px] px-5 py-2.5 border border-[#1A1A2E] text-[#1A1A2E] rounded-full flex items-center gap-1.5 group-hover:bg-[#1A1A2E] group-hover:text-white transition-colors">
            Детальніше
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </div>
  );

  if (!isFree && tooltip) {
    return (
      <Tooltip content={tooltip} placement="top">
        <div>{card}</div>
      </Tooltip>
    );
  }

  return (
    <Link className="block h-full" href={isFree ? roomDetailUrl : "#"}>
      {card}
    </Link>
  );
}
