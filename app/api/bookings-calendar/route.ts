import { NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity";

export async function GET() {
  try {
    const [totalRooms, rooms, liveBookings] = await Promise.all([
      sanityClient.fetch<number>(`count(*[_type=="room"])`),

      sanityClient.fetch<{ ranges: { from: string; to: string }[] }[]>(
        `*[_type=="room"]{ "ranges": room_unavailable_ranges[]{from, to} }`
      ),

      // Лайв бронювання (підтверджені + на модерації)
      sanityClient.fetch<
        { rent_from: string; rent_to: string; roomId: string }[]
      >(
        `*[_type=="booking" && status in ["confirmed","pending"]]{
          rent_from, rent_to, "roomId": room._ref
        }`
      ),
    ]);

    // Об'єднуємо room_unavailable_ranges + активні бронювання
    const staticRanges = rooms.flatMap((r) => r.ranges || []);
    const dynamicRanges = liveBookings.map((b) => ({
      from: b.rent_from,
      to: b.rent_to,
    }));
    const unavailableRanges = [...staticRanges, ...dynamicRanges];

    return NextResponse.json(
      { totalRooms, unavailableRanges },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        {
          error: "Server error",
          details: e.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown server error" },
      { status: 500 }
    );
  }
}
