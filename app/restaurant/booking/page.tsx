"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, MapPin, Phone, ArrowRight, Users } from "lucide-react";
import { CalendarDateTime } from "@internationalized/date";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

import PageHero from "@/components/PageHero";
import CustomDatePicker from "@/components/CustomDatePicker";
import { designImages } from "@/lib/design-images";

const TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9+"];

const FEATURES = [
  {
    num: "01",
    title: "Авторська кухня",
    desc: "Сезонне меню від шефа з локальних продуктів.",
  },
  {
    num: "02",
    title: "Вечеря без поспіху",
    desc: "Мʼяке світло, спокійна музика та уважний сервіс.",
  },
  {
    num: "03",
    title: "Підбір напоїв",
    desc: "Допоможемо обрати вино, коктейль або каву до вашої страви.",
  },
  {
    num: "04",
    title: "Особливий привід",
    desc: "Підготуємо столик для дня народження, річниці або зустрічі.",
  },
];

/* ── Маска телефону (ідентична BookingForm) ───────────── */
function formatPhone(v: string): string {
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

  return formatted;
}

export default function RestaurantBookingPage() {
  const router = useRouter();

  /* ---------- стан форми ---------- */
  const [date, setDate] = useState<CalendarDateTime | null>(null);
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState("2");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const locationLabel = "Зал ресторану";

  /* ---------- підпис дати в сайдбарі ---------- */
  const displayDate = date
    ? format(new Date(date.year, date.month - 1, date.day), "dd MMM yyyy", {
        locale: uk,
      })
    : "—";

  /* ---------- validate ---------- */
  const phoneRe = /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$|^\+?[0-9\s\-()]{10,20}$/;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (name.trim().length < 2) errors.name = "Введіть імʼя (мін. 2 символи)";
    if (!phoneRe.test(phone))
      errors.phone = "Невірний формат номера (+38 (0XX) XXX-XX-XX)";
    if (email.trim() && !emailRe.test(email.trim()))
      errors.email = "Невірний формат email";
    if (!date) errors.date = "Оберіть дату";
    setErr(errors);

    return Object.keys(errors).length === 0;
  }

  /* ---------- submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setBusy(true);
    try {
      const guestsNum = guests === "9+" ? 9 : parseInt(guests, 10);
      const bookingDate = `${date!.year}-${String(date!.month).padStart(2, "0")}-${String(date!.day).padStart(2, "0")}`;

      const res = await fetch("/api/book-restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: name.trim(),
          user_phone: phone,
          user_email: email.trim() || undefined,
          booking_date: bookingDate,
          booking_time: time,
          guests_count: guestsNum,
          notes: notes.trim() || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        // eslint-disable-next-line no-console
        console.error("❌ Помилка API:", json);
        setErr({ general: json.error ?? "Помилка при бронюванні" });

        return;
      }

      router.replace("/thank-you");
    } catch {
      setErr({ general: "Помилка мережі. Спробуйте ще раз." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Головна", href: "/" },
          { label: "Ресторан", href: "/restaurant" },
          { label: "Бронь столика" },
        ]}
        description="Камерний зал на 14 столиків та тераса з виглядом на бухту. Бронюйте за 4+ години, у вихідні рекомендуємо за 1–2 дні."
        image={designImages.restaurantHero ?? "/images/restorant_1.jpg"}
        title="Бронь столика"
      />

      <section className="bg-[#FAF8F4] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* LEFT — FORM CARD */}
            <form
              className="rounded-[32px] border border-[#EFEAE0] bg-white p-8 shadow-[0_30px_80px_-40px_rgba(26,26,46,0.25)] lg:p-12"
              onSubmit={handleSubmit}
            >
              {/* Step 01 — Date & Time */}
              <Step number="01" title="Коли завітаєте">
                <div className="mb-6">
                  <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A2E]/60">
                    Дата
                  </div>
                  <CustomDatePicker
                    isInvalid={!!err.date}
                    label=""
                    value={date}
                    onChange={setDate}
                  />
                  {err.date && (
                    <p className="mt-1 text-xs text-red-500">{err.date}</p>
                  )}
                </div>

                <div>
                  <div className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A2E]/60">
                    Час
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TIMES.map((t) => {
                      const active = time === t;

                      return (
                        <button
                          key={t}
                          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                            active
                              ? "bg-[#1A1A2E] text-white shadow-md"
                              : "border border-[#EFEAE0] bg-white text-[#1A1A2E] hover:border-[#1A1A2E]/30"
                          }`}
                          type="button"
                          onClick={() => setTime(t)}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Step>

              {/* Step 02 — Guests */}
              <Step number="02" title="Скільки гостей">
                <div className="flex flex-wrap gap-3">
                  {GUESTS.map((g) => {
                    const active = guests === g;

                    return (
                      <button
                        key={g}
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                          active
                            ? "bg-[#1A1A2E] text-white shadow-md"
                            : "border border-[#EFEAE0] bg-white text-[#1A1A2E] hover:border-[#1A1A2E]/30"
                        }`}
                        type="button"
                        onClick={() => setGuests(g)}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </Step>

              {/* Step 03 — Contacts */}
              <Step last number="03" title="Ваші контакти">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    error={err.name}
                    label="Імʼя"
                    placeholder="Олена"
                    value={name}
                    onChange={setName}
                  />
                  <PhoneField
                    error={err.phone}
                    value={phone}
                    onChange={setPhone}
                  />
                  <Field
                    optional
                    error={err.email}
                    label="Email "
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={setEmail}
                  />
                  <Field
                    optional
                    label="Побажання "
                    placeholder="Тихий столик біля вікна"
                    value={notes}
                    onChange={setNotes}
                  />
                </div>

                {err.general && (
                  <p className="mt-4 text-sm text-red-500">{err.general}</p>
                )}

                <button
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1A1A2E] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-[#C9A96E] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={busy}
                  type="submit"
                >
                  {busy ? "Надсилаємо..." : "Підтвердити бронь"}
                  {!busy && <ArrowRight className="h-4 w-4" />}
                </button>
              </Step>
            </form>

            {/* RIGHT — SIDEBAR */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[28px] bg-[#1A1A2E] p-8 text-white">
                <div className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[#C9A96E]">
                  Ваше бронювання
                </div>
                <SummaryRow icon={Clock} label="Дата" value={displayDate} />
                <SummaryRow icon={Clock} label="Час" value={time} />
                <SummaryRow icon={Users} label="Гостей" value={guests} />
                <SummaryRow
                  last
                  icon={MapPin}
                  label="Локація"
                  value={locationLabel}
                />
              </div>

              <div className="rounded-[28px] border border-[#EFEAE0] bg-white p-8">
                <div className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-[#1A1A2E]/60">
                  Контакти
                </div>
                <ContactRow
                  icon={Phone}
                  label="Reception"
                  value="+380 66 192 71 67"
                />
                <ContactRow icon={Clock} label="Кухня" value="07:00 — 23:00" />
                <ContactRow
                  last
                  icon={MapPin}
                  label="Адреса"
                  value="вул. Аркадія, Ліве крило 2/1, Одеса"
                />

                <Link
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1A1A2E] transition-colors hover:text-[#C9A96E]"
                  href="/restaurant/menu"
                >
                  Переглянути меню
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>

          {/* FEATURES */}
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.num}
                className="rounded-[24px] border border-[#EFEAE0] bg-white p-7 transition-all hover:border-[#C9A96E]/40 hover:shadow-lg"
              >
                <div className="mb-4 font-display text-3xl text-[#C9A96E]">
                  {f.num}
                </div>
                <div className="mb-2 font-display text-xl text-[#1A1A2E]">
                  {f.title}
                </div>
                <p className="text-sm leading-relaxed text-[#1A1A2E]/60">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Step({
  number,
  title,
  children,
  last,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "mb-10 border-b border-[#EFEAE0] pb-10"}>
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-display text-2xl text-[#C9A96E]">{number}</span>
        <h3 className="font-display text-2xl text-[#1A1A2E] lg:text-3xl">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  optional,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A2E]/60">
        {label}
        {optional && (
          <span className="rounded-full bg-[#EFEAE0] px-2 py-0.5 text-[10px] normal-case tracking-normal text-[#1A1A2E]/40">
            необовʼязково
          </span>
        )}
      </span>
      <input
        className={`w-full rounded-2xl border bg-[#FAF8F4] px-5 py-4 text-base text-[#1A1A2E] outline-none transition-colors placeholder:text-[#1A1A2E]/40 focus:border-[#C9A96E] ${
          error ? "border-red-400" : "border-[#EFEAE0]"
        }`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  );
}

function PhoneField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-[#1A1A2E]/60">
        Телефон
      </span>
      <input
        className={`w-full rounded-2xl border bg-[#FAF8F4] px-5 py-4 text-base text-[#1A1A2E] outline-none transition-colors placeholder:text-[#1A1A2E]/40 focus:border-[#C9A96E] ${
          error ? "border-red-400" : "border-[#EFEAE0]"
        }`}
        inputMode="tel"
        placeholder="+38 (0__) ___-__-__"
        type="tel"
        value={value}
        onChange={(e) => onChange(formatPhone(e.target.value))}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </label>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  last,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        last ? "" : "border-b border-white/10"
      }`}
    >
      <div className="flex items-center gap-3 text-white/60">
        <Icon className="h-4 w-4 text-[#C9A96E]" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="font-display text-lg text-white">{value}</span>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  last,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 py-3 ${last ? "" : "border-b border-[#EFEAE0]"}`}
    >
      <Icon className="mt-0.5 h-4 w-4 text-[#C9A96E]" />
      <div>
        <div className="text-xs uppercase tracking-wider text-[#1A1A2E]/50">
          {label}
        </div>
        <div className="text-sm font-medium text-[#1A1A2E]">{value}</div>
      </div>
    </div>
  );
}
