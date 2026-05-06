// API для бронювання з багаторівневим захистом
import { NextResponse } from "next/server";
import { parseISO, isValid, startOfDay, isBefore } from "date-fns";
import { z } from "zod";

import { sanityClient } from "@/lib/sanity";

// ════════════════════════════════════════════════════════════
// 🛡️ ЗАХИСТ 1: Rate Limiting (обмеження кількості запитів)
// ════════════════════════════════════════════════════════════
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 хвилина

    return true;
  }

  if (limit.count >= 5) {
    // максимум 5 запитів за хвилину
    return false;
  }

  limit.count++;

  return true;
}

// ════════════════════════════════════════════════════════════
// 🛡️ ЗАХИСТ 2: Валідація вхідних даних з Zod
// ════════════════════════════════════════════════════════════
const bookingSchema = z.object({
  roomId: z.string().min(1, "Невалідний ID номера"),
  from: z.string().datetime("Невалідна дата заїзду"),
  to: z.string().datetime("Невалідна дата виїзду"),
  payload: z.object({
    user_name: z
      .string()
      .min(2)
      .max(100)
      .regex(/^[a-zA-Zа-яА-ЯІіЇїЄєҐґ\s'-]+$/, "Невалідне ім'я"),
    user_phone: z
      .string()
      .regex(
        /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$|^\+?[0-9\s\-()]{10,20}$/,
        "Невалідний телефон"
      ),
    rent_from: z.string().min(1),
    rent_to: z.string().min(1),
    rent_price: z.number().positive().max(1000000),
    people_count: z.number().int().min(1).max(10),
    child_count: z.number().int().min(0).max(5),
    payment_type: z.enum(["cash", "online"]),
    payment_status: z.enum(["unpaid", "paid"]),
  }),
});

// ════════════════════════════════════════════════════════════
// 🛡️ ЗАХИСТ 3: Санітизація даних (захист від XSS)
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
    // 🛡️ ЗАХИСТ 4: Отримання IP для rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Занадто багато запитів. Спробуйте через хвилину" },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 🛡️ ЗАХИСТ 5: Валідація з Zod
    const validation = bookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Невалідні дані", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { roomId, from, to, payload } = validation.data;

    // 🛡️ ЗАХИСТ 6: Перевірка логіки дат
    const fromDate = parseISO(from);
    const toDate = parseISO(to);

    if (!isValid(fromDate) || !isValid(toDate)) {
      return NextResponse.json({ error: "Невалідні дати" }, { status: 400 });
    }

    if (toDate <= fromDate) {
      return NextResponse.json(
        { error: "Дата виїзду має бути пізніше дати заїзду" },
        { status: 400 }
      );
    }

    const today = startOfDay(new Date());
    const startFromDate = startOfDay(fromDate);

    if (isBefore(startFromDate, today)) {
      return NextResponse.json(
        { error: "Дата заїзду не може бути в минулому" },
        { status: 400 }
      );
    }

    /* ①  перевіряємо зайнятість */
    // 🛡️ ЗАХИСТ 7: Параметризовані запити (захист від injection)
    const ranges = (await sanityClient.fetch(
      `*[_type=="room" && _id==$id][0].room_unavailable_ranges[]{from,to}`,
      { id: roomId } // параметр передається окремо
    )) as { from: string; to: string }[] | null;

    const overlap =
      ranges?.some((r) => {
        const f = parseISO(r.from);
        const t = parseISO(r.to);

        return t > new Date(from) && f < new Date(to);
      }) ?? false;

    if (overlap) {
      return NextResponse.json({ overlap: true }, { status: 200 });
    }

    /* ②  створюємо документ booking */
    // 🛡️ ЗАХИСТ 8: Санітизація перед збереженням
    const doc = await sanityClient.create({
      _type: "booking",
      user_name: sanitizeString(payload.user_name),
      user_phone: sanitizeString(payload.user_phone),
      rent_from: payload.rent_from,
      rent_to: payload.rent_to,
      rent_price: payload.rent_price,
      people_count: payload.people_count,
      child_count: payload.child_count,
      payment_type: payload.payment_type,
      payment_status: "unpaid",
      room: { _type: "reference", _ref: roomId },
      status: "pending",
    });

    return NextResponse.json({ overlap: false, id: doc._id }, { status: 201 });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("❌ Booking error:", e);

    // 🛡️ ЗАХИСТ 9: Не показувати деталі помилок на продакшені
    if (e instanceof Error) {
      // eslint-disable-next-line no-console
      console.error("Error message:", e.message);
      // eslint-disable-next-line no-console
      console.error("Error stack:", e.stack);

      return NextResponse.json(
        {
          error: "Помилка сервера",
          // Деталі тільки в development режимі
          ...(process.env.NODE_ENV === "development" && {
            details: e.message,
            stack: e.stack,
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

// 🛡️ ЗАХИСТ 10: CORS для обмеження доступу
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
