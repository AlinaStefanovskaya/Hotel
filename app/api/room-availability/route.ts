import { NextRequest, NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return NextResponse.json({ error: "roomId is required" }, { status: 400 });
  }

  try {
    const [room, liveBookings] = await Promise.all([
      sanityClient.fetch<{
        room_max_people: number;
        room_max_child: number;
        room_unavailable_ranges: { from: string; to: string }[] | null;
      } | null>(
        `*[_type=="room" && _id==$roomId][0]{
          room_max_people,
          room_max_child,
          "room_unavailable_ranges": coalesce(room_unavailable_ranges, [])
        }`,
        { roomId }
      ),
      sanityClient.fetch<{ rent_from: string; rent_to: string }[]>(
        `*[_type=="booking" && room._ref==$roomId && status in ["confirmed","pending"]]{
          rent_from, rent_to
        }`,
        { roomId }
      ),
    ]);

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const unavailableRanges: { from: string; to: string }[] = [
      ...(room.room_unavailable_ranges ?? []),
      ...liveBookings.map((b) => ({ from: b.rent_from, to: b.rent_to })),
    ];

    return NextResponse.json({
      roomMaxPeople: room.room_max_people,
      roomMaxChild: room.room_max_child,
      unavailableRanges,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";

    return NextResponse.json(
      { error: "Server error", details: message },
      { status: 500 }
    );
  }
}
