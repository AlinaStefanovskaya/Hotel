import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Clock,
  CreditCard,
  Package,
  Utensils,
  CheckCircle2,
  BellRing,
  Truck,
  ArrowRight,
} from "lucide-react";

import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Доставка в номер — ресторан «Воля»",
  description:
    "Замовлення страв ресторану «Воля» прямо у ваш номер. Доставка 30–45 хвилин, щодня 07:00–23:00.",
};

const steps = [
  {
    n: "01",
    icon: BellRing,
    title: "Зателефонуйте на reception",
    description:
      "Натисніть «9» на готельному телефоні або зателефонуйте +380 66 192 71 67.",
  },
  {
    n: "02",
    icon: Utensils,
    title: "Оберіть страви з меню",
    description:
      "Наш персонал допоможе підібрати страви та порекомендує сезонні позиції.",
  },
  {
    n: "03",
    icon: Truck,
    title: "Очікуйте доставку",
    description: "Замовлення прибуде до вашого номера протягом 30–45 хвилин.",
  },
];

const features = [
  { icon: Clock, title: "30–45 хв", description: "середній час доставки" },
  { icon: Package, title: "Термопак", description: "упаковка зберігає тепло" },
  {
    icon: CreditCard,
    title: "Картка / готівка",
    description: "оплата на місці",
  },
  { icon: Truck, title: "07:00 — 23:00", description: "доставка щодня" },
];

const benefits = [
  "Без націнки за доставку для гостей готелю",
  "Сніданок у ліжко — замовлення з вечора",
  "Дитяче меню та спецдієти за запитом",
  "Винна карта доступна для замовлення в номер",
  "Сервірування столу та свічки на романтичну вечерю",
];

export default function DeliveryPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Головна", href: "/" },
          { label: "Ресторан", href: "/restaurant" },
          { label: "Доставка" },
        ]}
        description="Замовляйте страви ресторану прямо до номера."
        image="/images/room-service.jpg"
        title="Доставка"
      />

      {/* Steps */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            description="Від замовлення до сервірованого столу у вашому номері — менше години."
            eyebrow="Як це працює"
            title="Чотири прості кроки"
          />

          <div className="grid gap-7 lg:grid-cols-3 mt-12">
            {steps.slice(0, 3).map(({ n, icon: Icon, title, description }) => (
              <article
                key={n}
                className="relative rounded-[22px] border border-[#EFEAE0] bg-white p-8 shadow-[0_18px_48px_rgba(26,26,46,0.04)]"
              >
                <div className="mb-8 flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1A2E] text-[#C9A96E]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>

                  <span className="font-display text-3xl text-[#C9A96E]/35">
                    {n}
                  </span>
                </div>

                <h3 className="text-xl font-semibold leading-snug text-[#1A1A2E]">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[#9090AA]">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[22px] bg-[#1A1A2E] p-8 text-white md:p-10 lg:flex lg:items-center lg:justify-between">
            <div className="flex items-start gap-6">
              <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-[#C9A96E]/15 text-[#C9A96E]">
                <BellRing className="h-6 w-6" strokeWidth={1.7} />
              </span>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[#C9A96E]">
                  Контактний номер
                </p>

                <a
                  className="mt-3 block font-display text-3xl text-white transition hover:text-[#E8C98A] md:text-4xl"
                  href="tel:+380661927167"
                >
                  +380 66 192 71 67
                </a>

                <p className="mt-2 text-sm text-white/60">
                  Або наберіть «9» з готельного телефону
                </p>
              </div>
            </div>

            <a
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C9A96E] px-8 py-4 text-sm font-semibold text-[#1A1A2E] transition hover:bg-[#E8C98A] lg:mt-0"
              href="tel:+380661927167"
            >
              Зателефонувати
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Feature cards under call block */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-[22px] border border-[#EFEAE0] bg-white p-6 shadow-[0_18px_48px_rgba(26,26,46,0.04)] transition-all hover:-translate-y-1 hover:border-[#C9A96E]/50 hover:shadow-[0_24px_60px_rgba(26,26,46,0.08)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1A2E] text-[#C9A96E] transition-colors group-hover:bg-[#C9A96E] group-hover:text-[#1A1A2E]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>

                  <span className="font-display text-2xl text-[#C9A96E]/30">
                    •
                  </span>
                </div>

                <h3 className="font-display text-[24px] leading-tight text-[#1A1A2E]">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#9090AA]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                fill
                alt="Доставка страв у номер"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                src="/images/room-service.jpg"
              />
            </div>

            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
                Переваги
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl mt-4 mb-6 leading-tight">
                Чому гості замовляють у номер
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Ми створили сервіс так, щоб ви не виходили з кімнати без
                потреби. Сніданок у ліжко, романтична вечеря на двох чи робоча
                кава під час дзвінка — все можливо.
              </p>

              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-2xl p-10 lg:p-16 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl mb-4">
              Готові замовити?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
              Перегляньте меню або зателефонуйте на ресепшн — приймемо
              замовлення з 07:00 до 23:00.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                className="px-8 py-4 bg-primary-foreground text-primary rounded-full hover:bg-primary-foreground/90 transition-colors font-medium"
                href="/restaurant/menu"
              >
                Дивитись меню
              </Link>
              <a
                className="inline-flex items-center gap-2 px-8 py-4 border border-primary-foreground/30 rounded-full hover:bg-primary-foreground/10 transition-colors font-medium"
                href="tel:+380661927167"
              >
                <Phone className="w-5 h-5" />
                +38 (066) 192-71-67
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
