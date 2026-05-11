// components/Home/FeaturedRooms.tsx
import Link from "next/link";

import GoldLink from "@/components/GoldLink";
import RoomCard from "@/components/Rooms/RoomCard";
import { roomsQuery } from "@/lib/queries";
import { sanityClient } from "@/lib/sanity";
import { Room } from "@/types/sanity";

export default async function FeaturedRooms() {
  const rooms: Room[] = await sanityClient.fetch(roomsQuery);
  const featured = rooms.slice(0, 3);

  return (
    <section className="pt-28 pb-20 bg-[#FAF8F4]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#C9A96E]" />
              <span className="text-[11px] tracking-[0.32em] text-[#C9A96E] uppercase font-medium">
                Залишайтеся в нас
              </span>
            </div>
            <h2 className="text-[44px] md:text-[52px] text-[#1A1A2E] font-semibold leading-[1.05] tracking-[-0.02em]">
              Номери та <span>апартаменти</span>
            </h2>
            <p className="text-[14px] text-[#9090AA] mt-4 max-w-[480px] leading-relaxed">
              Сучасні номери та апартаменти на будь-який смак
            </p>
          </div>
          <Link className="self-start md:self-end" href="/rooms">
            <GoldLink>Усі номери</GoldLink>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featured.map((room) => (
            <RoomCard key={room._id} isFree={true} nights={1} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
