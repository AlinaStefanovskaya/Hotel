// API для бронювання столика в ресторані
import { NextResponse } from "next/server";
import { z } from "zod";

import { sanityClient } from "@/lib/sanity";

// ════════════════════════════════════════════════════════════
// 🛡️ Rate Limiting
// ════════════════════════════════════════════════════════════
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });

    return true;
  }
  if (limit.count >= 5) return false;
  limit.count++;

  return true;
}

// ════════════════════════════════════════════════════════════
// 🛡️ Zod Schema
// ════════════════════════════════════════════════════════════
const phoneRe = /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$|^\+?[0-9\s\-()]{10,20}$/;
const dateRe = /^\d{4}-\d{2}-\d{2}$/;
const timeRe = /^\d{2}:\d{2}$/;

const restaurantBookingSchema = z.object({
  user_name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\s'-]+$/, "Невалідне імʼя"),
  user_phone: z.string().regex(phoneRe, "Невалідний телефон"),
  user_email: z.string().email("Невалідний email").optional().or(z.literal("")),
  booking_date: z.string().regex(dateRe, "Невалідна дата (YYYY-MM-DD)"),
  booking_time: z.string().regex(timeRe, "Невалідний час (HH:MM)"),
  guests_count: z.number().int().min(1).max(20),
  notes: z.string().max(500).optional(),
});

// ════════════════════════════════════════════════════════════
// 🛡️ Санітизація
// ════════════════════════════════════════════════════════════
function sanitizeString(str: string): string {
  return str
    .replace(/[<>"'&]/g, (char) => {
      const entities: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
      };

      return entities[char] || char;
    })
    .trim();
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Занадто багато запитів. Спробуйте через хвилину" },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Zod validation
    const validation = restaurantBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Невалідні дані", details: validation.error.errors },
        { status: 400 }
      );
    }

    const {
      user_name,
      user_phone,
      user_email,
      booking_date,
      booking_time,
      guests_count,
      notes,
    } = validation.data;

    // Перевірка: дата не в минулому
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    const bookingDay = new Date(booking_date + "T00:00:00");

    if (bookingDay < today) {
      return NextResponse.json(
        { error: "Дата бронювання не може бути в минулому" },
        { status: 400 }
      );
    }

    // Збереження в Sanity
    const doc = await sanityClient.create({
      _type: "restaurantBooking",
      user_name: sanitizeString(user_name),
      user_phone: sanitizeString(user_phone),
      user_email: user_email ? sanitizeString(user_email) : undefined,
      booking_date,
      booking_time,
      guests_count,
      notes: notes ? sanitizeString(notes) : undefined,
      status: "pending",
    });

    return NextResponse.json({ id: doc._id }, { status: 201 });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("❌ Restaurant booking error:", e);

    if (e instanceof Error) {
      return NextResponse.json(
        {
          error: "Помилка сервера",
          ...(process.env.NODE_ENV === "development" && {
            details: e.message,
          }),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Невідома помилка сервера" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(_req: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_APP_URL || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
