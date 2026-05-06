"use client";

import type {
  RoomDetail,
  RoomOpt,
  PricingResult,
} from "./BookingClientWrapper";

import {
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
  RadioGroup,
  Radio,
  Tooltip,
} from "@heroui/react";
import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { parseISO, format as fmt, format } from "date-fns";
import { uk } from "date-fns/locale";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import PaymentModal from "./PaymentModal";

import CustomDatePicker from "@/components/CustomDatePicker";

/* ── константи дорослі / діти ─────────────────────── */
const ADULTS = [
  { key: "1", label: "1 дорослий" },
  { key: "2", label: "2 дорослих" },
  { key: "3", label: "3 дорослих" },
  { key: "4", label: "4 дорослих" },
];
const KIDS = [
  { key: "0", label: "0 дітей" },
  { key: "1", label: "1 дитина" },
  { key: "2", label: "2 дитини" },
];

/* ── схема валідації ─────────────────────────────── */
const phoneRe = /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$|^\+?[0-9\s\-()]{10,20}$/;
const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(phoneRe, "Невірний номер"),
  checkIn: z.date(),
  checkOut: z.date(),
  adults: z.number().min(1),
  children: z.number().min(0),
  roomId: z.string().min(1, "Оберіть номер"),
  price: z.number().positive(),
  paymentType: z.enum(["cash", "online"], {
    errorMap: () => ({ message: "Оберіть тип оплати" }),
  }),
  agree: z.literal(true, {
    errorMap: () => ({ message: "Погодьтесь з умовами" }),
  }),
});

/* ── Props ───────────────────────────────────────── */
interface BookingFormProps {
  /* Shared state (from BookingClientWrapper) */
  checkIn: CalendarDateTime | null;
  checkOut: CalendarDateTime | null;
  adults: string;
  kidsCount: string;
  roomId: string;
  rooms: RoomOpt[];
  roomDetail: RoomDetail | null;
  pricing: PricingResult | null;
  /* Setters */
  onCheckInChange: (v: CalendarDateTime | null) => void;
  onCheckOutChange: (v: CalendarDateTime | null) => void;
  onAdultsChange: (v: string) => void;
  onChildrenChange: (v: string) => void;
  onRoomIdChange: (v: string) => void;
}

/* ── оформлення секції ────────────────────────────── */
function Section({
  num,
  title,
  subtitle,
  children,
}: {
  num: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#EFEAE0] pt-10 first:border-t-0 first:pt-0">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-serif text-2xl text-[#B89B6A]">{num}</span>
        <div>
          <h3 className="font-serif text-xl tracking-wide text-[#1A1A2E]">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-sm text-[#6B6B7A]">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── */

export default function BookingForm({
  checkIn,
  checkOut,
  adults,
  kidsCount: children,
  roomId,
  rooms,
  roomDetail,
  pricing,
  onCheckInChange,
  onCheckOutChange,
  onAdultsChange,
  onChildrenChange,
  onRoomIdChange,
}: BookingFormProps) {
  const nav = useRouter();

  /* ---------- локальний стан форми ---------- */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentType, setPaymentType] = useState<"cash" | "online">("cash");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [, setPaymentStatus] = useState<"unpaid" | "paid">("unpaid");

  /* ---------- Валідація доступності та місткості ---------- */
  const checkInDate = checkIn
    ? new Date(checkIn.year, checkIn.month - 1, checkIn.day)
    : null;
  const checkOutDate = checkOut
    ? new Date(checkOut.year, checkOut.month - 1, checkOut.day)
    : null;

  const validationReasons: string[] = [];

  // Перевірка перетину з недоступними датами
  if (checkInDate && checkOutDate && roomDetail) {
    for (const r of roomDetail.unavailableRanges) {
      const f = parseISO(r.from);
      const t = parseISO(r.to);

      if (t > checkInDate && f < checkOutDate) {
        validationReasons.push(
          `Номер зайнятий з ${format(f, "dd MMM yyyy", { locale: uk })} ` +
            `по ${format(t, "dd MMM yyyy", { locale: uk })}`
        );
        break;
      }
    }
  }

  // Перевірка місткості
  if (roomDetail) {
    const totalGuests = parseInt(adults) + parseInt(children);

    if (totalGuests > roomDetail.maxPeople) {
      validationReasons.push(
        `Номер розрахований максимум на ${roomDetail.maxPeople} гост${
          roomDetail.maxPeople === 1 ? "я" : "ей"
        }`
      );
    } else if (parseInt(children) > roomDetail.maxChild) {
      validationReasons.push(
        `Приймає максимум ${roomDetail.maxChild} ${
          roomDetail.maxChild === 0
            ? "дітей"
            : roomDetail.maxChild === 1
              ? "дитину"
              : "дітей"
        }`
      );
    }
  }

  const hasDates = !!checkIn && !!checkOut;
  const isBookingBlocked = !hasDates || validationReasons.length > 0;
  const tooltipText = !hasDates
    ? "Оберіть дати заселення та виселення"
    : validationReasons.join(" • ");

  /* ---------- submit ---------- */
  const submit = async () => {
    if (isBookingBlocked) return;

    const price = pricing?.finalPrice ?? 0;
    const data = {
      name,
      phone,
      adults: Number(adults),
      children: Number(children),
      checkIn: checkIn!.toDate(getLocalTimeZone()),
      checkOut: checkOut!.toDate(getLocalTimeZone()),
      roomId,
      price,
      paymentType,
      agree,
    };

    const v = schema.safeParse(data);

    if (!v.success) {
      const map: Record<string, string> = {};

      v.error.errors.forEach((e) => (map[e.path[0] as string] = e.message));
      setErr(map);

      return;
    }
    setErr({});

    if (paymentType === "online") {
      setShowPaymentModal(true);

      return;
    }

    setPaymentStatus("unpaid");
    await sendBooking(v.data, "unpaid");
  };

  /* ---------- відправка ---------- */
  const sendBooking = async (data: any, paymentStat: "unpaid" | "paid") => {
    setBusy(true);

    const payload = {
      roomId,
      from: data.checkIn.toISOString(),
      to: data.checkOut.toISOString(),
      payload: {
        user_name: name,
        user_phone: phone,
        rent_from: fmt(data.checkIn, "yyyy-MM-dd"),
        rent_to: fmt(data.checkOut, "yyyy-MM-dd"),
        rent_price: pricing?.finalPrice ?? 0,
        people_count: data.adults,
        child_count: data.children,
        payment_type: paymentType,
        payment_status: paymentStat,
      },
    };

    const res = await fetch("/api/book-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error("❌ Помилка API:", json);
      // eslint-disable-next-line no-console
      if (json.details) console.error("🔴 Деталі помилок:", json.details);
      setErr({ general: json.error ?? "Помилка бронювання" });
      setBusy(false);

      return;
    }
    if (json.overlap) {
      setErr({ checkIn: "Номер зайнятий у ці дати" });
      setBusy(false);

      return;
    }

    nav.replace("/thank-you");
  };

  /* ---------- маска телефону ---------- */
  const onPhoneChange = (v: string) => {
    let cleaned = v.replace(/\D/g, "");

    if (cleaned.startsWith("38")) {
      // ok
    } else if (cleaned.startsWith("0")) {
      cleaned = "38" + cleaned;
    } else if (cleaned.length > 0) {
      cleaned = "380" + cleaned;
    }
    if (cleaned.length > 12) cleaned = cleaned.slice(0, 12);

    let formatted = "";

    if (cleaned.length > 0) formatted = "+" + cleaned.slice(0, 2);
    if (cleaned.length > 2) formatted += " (" + cleaned.slice(2, 5);
    if (cleaned.length > 5) formatted += ") " + cleaned.slice(5, 8);
    if (cleaned.length > 8) formatted += "-" + cleaned.slice(8, 10);
    if (cleaned.length > 10) formatted += "-" + cleaned.slice(10, 12);

    setPhone(formatted);
  };

  /* ---------- UI ---------- */
  return (
    <div className="space-y-12">
      {/* 01 — ДАТИ */}
      <Section
        num="01"
        subtitle="Травень–вересень — високий сезон (+15%). Від 3 ночей — знижка від 5%."
        title="Дати перебування"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <CustomDatePicker
            description="Травень-вересень: високий сезон (+15%)"
            disabledRanges={roomDetail?.unavailableRanges}
            isInvalid={!!err.checkIn}
            label="Дата заїзду"
            value={checkIn}
            onChange={(v) => {
              if (v && checkOut) {
                const ci = new Date(v.year, v.month - 1, v.day);
                const co = new Date(
                  checkOut.year,
                  checkOut.month - 1,
                  checkOut.day
                );

                if (ci >= co) {
                  onCheckOutChange(null);
                }
              }
              onCheckInChange(v);
            }}
          />
          <CustomDatePicker
            description="Від 3 днів: знижка від 5%"
            disabledRanges={roomDetail?.unavailableRanges}
            isInvalid={!!err.checkOut}
            label="Дата виїзду"
            minValue={checkIn ?? undefined}
            value={checkOut}
            onChange={onCheckOutChange}
          />
        </div>
      </Section>

      {/* 02 — НОМЕР І ГОСТІ */}
      <Section
        num="02"
        subtitle="Оберіть тип номера й кількість гостей."
        title="Номер і гості"
      >
        <Select
          isInvalid={!!err.roomId}
          label="Номер"
          placeholder="Оберіть номер"
          selectedKeys={new Set([roomId])}
          onSelectionChange={(k) => onRoomIdChange(Array.from(k)[0] as string)}
        >
          {rooms.map((r) => (
            <SelectItem key={r.key}>{r.label}</SelectItem>
          ))}
        </Select>

        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            isInvalid={
              !!(
                roomDetail &&
                parseInt(adults) + parseInt(children) > roomDetail.maxPeople
              )
            }
            label="Дорослі"
            selectedKeys={new Set([adults])}
            onSelectionChange={(k) =>
              onAdultsChange(Array.from(k)[0] as string)
            }
          >
            {ADULTS.map((o) => (
              <SelectItem key={o.key}>{o.label}</SelectItem>
            ))}
          </Select>

          <Select
            isInvalid={
              !!(
                roomDetail &&
                (parseInt(adults) + parseInt(children) > roomDetail.maxPeople ||
                  parseInt(children) > roomDetail.maxChild)
              )
            }
            label="Діти"
            selectedKeys={new Set([children])}
            onSelectionChange={(k) =>
              onChildrenChange(Array.from(k)[0] as string)
            }
          >
            {KIDS.map((o) => (
              <SelectItem key={o.key}>{o.label}</SelectItem>
            ))}
          </Select>
        </div>

        {/* Попередження про місткість */}
        {validationReasons
          .filter((r) => r.includes("максимум") || r.includes("Приймає"))
          .map((reason, i) => (
            <p key={i} className="text-sm text-red-500">
              {reason}
            </p>
          ))}
      </Section>

      {/* 03 — КОНТАКТИ */}
      <Section
        num="03"
        subtitle="На цей номер зателефонуємо для підтвердження."
        title="Контакти гостя"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            errorMessage={err.name}
            isInvalid={!!err.name}
            label="Ім'я"
            value={name}
            onValueChange={setName}
          />
          <Input
            errorMessage={err.phone}
            isInvalid={!!err.phone}
            label="Контактний номер"
            placeholder="+38 (0__) ___-__-__"
            value={phone}
            onValueChange={onPhoneChange}
          />
        </div>
      </Section>

      {/* 04 — ОПЛАТА */}
      <Section
        num="04"
        subtitle="Оберіть зручний спосіб оплати."
        title="Оплата та підтвердження"
      >
        <Input
          isReadOnly
          label="Вартість, грн"
          value={
            pricing ? `${pricing.finalPrice.toLocaleString("uk-UA")} грн` : "—"
          }
        />

        <RadioGroup
          label="Тип оплати"
          value={paymentType}
          onValueChange={(v) => setPaymentType(v as "cash" | "online")}
        >
          <Radio value="cash">Готівка (розрахунок на місці)</Radio>
          <Radio value="online">Онлайн оплата</Radio>
        </RadioGroup>

        <Checkbox
          isInvalid={!!err.agree}
          isSelected={agree}
          onValueChange={setAgree}
        >
          Я погоджуюсь з умовами користування
        </Checkbox>

        {err.general && <p className="text-sm text-red-500">{err.general}</p>}

        {isBookingBlocked ? (
          <Tooltip content={tooltipText} placement="top">
            <div className="w-full cursor-not-allowed rounded-none">
              <Button
                isDisabled
                className="pointer-events-none w-full bg-[#1A1A2E]/30 text-white/60"
                radius="none"
                size="lg"
              >
                Підтвердити бронювання
              </Button>
            </div>
          </Tooltip>
        ) : (
          <Button
            className="w-full bg-[#1A1A2E] text-white hover:bg-[#1A1A2E]/90"
            isLoading={busy}
            radius="none"
            size="lg"
            onPress={submit}
          >
            Підтвердити бронювання
          </Button>
        )}
      </Section>

      <PaymentModal
        amount={pricing?.finalPrice ?? 0}
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={async (isPaid) => {
          const data = {
            name,
            phone,
            adults: Number(adults),
            children: Number(children),
            checkIn: checkIn?.toDate(getLocalTimeZone()),
            checkOut: checkOut?.toDate(getLocalTimeZone()),
            roomId,
            price: pricing?.finalPrice ?? 0,
            paymentType,
            agree,
          };
          const status = isPaid ? "paid" : "unpaid";

          setPaymentStatus(status);
          await sendBooking(data, status);
        }}
      />
    </div>
  );
}
