import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Heart,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";

import PageHero from "@/components/PageHero";
import { designImages } from "@/lib/design-images";

export const metadata: Metadata = {
  title: "Про нас — Volya Hotel Odesa",
  description:
    "Історія готелю Volya в серці Аркадії: філософія гостинності, команда та атмосфера приморської Одеси.",
};

const STATS = [
  { value: "15+", label: "років досвіду" },
  { value: "12", label: "авторських номерів" },
  { value: "2K+", label: "гостей щороку" },
  { value: "4.9", label: "середній рейтинг", icon: Star },
];

const TIMELINE = [
  {
    year: "2010",
    title: "Початок історії",
    text: "Родина Воля придбала старовинну садибу та почала реставрацію — три роки роботи з протиаварійною документацією.",
  },
  {
    year: "2013",
    title: "Перші 6 номерів",
    text: "Готель запрацював. Камерний рівень обслуговування і персональний сервіс — ключове наше завдання.",
  },
  {
    year: "2018",
    title: "Ресторан і SPA",
    text: "Розширились до 12 номерів, відкрили ресторан з авторською кухнею та SPA-зону.",
  },
  {
    year: "2024",
    title: "Boutique Award",
    text: "Здобули перше «Boutique Hotel of the Year» від Української Готельної Асоціації. Тримаємо рейтинг 4.9.",
  },
];

const VALUES = [
  {
    icon: Heart,
    title: "Гостинність",
    text: "Кожен гість — частина нашої історії. Ми пам'ятаємо імена й деталі.",
  },
  {
    icon: Sparkles,
    title: "Увага до дрібниць",
    text: "Від м'якості рушників до температури кави на сніданок.",
  },
  {
    icon: MapPin,
    title: "Локація",
    text: "Ліве крило Аркадії — 3 хвилини до моря й серця нічного життя.",
  },
  {
    icon: Award,
    title: "Якість",
    text: "Європейський рівень сервісу з душею одеського дому.",
  },
];

const TEAM = [
  { name: "Олена Сергіївна", role: "Засновниця", image: "/images/Olenka.jpg" },
  {
    name: "Володимир Андрійович",
    role: "Керівник готелю",
    image: "/images/Volodymyr.png",
  },

  {
    name: "Аліна Сергіївна",
    role: "Керівник гостьового досвіду",
    image: "/images/Alina.jpg",
  },
  {
    name: "Софія Антонівна",
    role: "Керівник ресторану",
    image: "/images/Conya.jpg",
  },
  {
    name: "Марат Вікторович",
    role: "Шеф-кухар",
    image: "/images/Marat.jpg",
  },
  {
    name: "Ольга Андріївна",
    role: "Адміністратор готелю",
    image: "/images/Olya.jpg",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#FAF8F4]">
      {/* PageHero — ОРИГІНАЛЬНИЙ, не чіпаємо */}
      <PageHero
        crumbs={[{ label: "Головна", href: "/" }, { label: "Про Нас" }]}
        description="Готель у самому серці Аркадії, де приморська Одеса зустрічається з європейським комфортом."
        image={designImages.aboutHero}
        title="Про Volya Hotel"
      />

      {/* Manifesto */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl leading-relaxed text-[#1A1A2E] sm:text-3xl md:text-4xl">
            Ми не намагаємось бути{" "}
            <span className="font-display  text-[#C9A96E]">найбільшими</span>.
            Ми намагаємось бути{" "}
            <span className="font-display  text-[#C9A96E]">найуважнішими</span>{" "}
            — щоб кожен ваш приїзд відчувався як повернення додому, тільки
            кращим.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-[#1A1A2E]/60">
            <span className="h-px w-6 bg-[#1A1A2E]/20" />
            <span className="uppercase tracking-wider">
              Олена Сергіївна · засновниця
            </span>
            <span className="h-px w-6 bg-[#1A1A2E]/20" />
          </div>
        </div>
      </section>

      {/* Dark stats strip */}
      <section className="bg-[#1A1A2E] px-4 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s) => {
            const Icon = s.icon;

            return (
              <div key={s.label} className="text-center">
                <div className="flex items-center justify-center gap-2 font-display text-4xl text-[#C9A96E] sm:text-5xl">
                  {s.value}
                  {Icon && <Icon className="h-6 w-6 fill-[#C9A96E]" />}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl text-[#1A1A2E] sm:text-5xl">
              Як починалась{" "}
              <span className="font-display  text-[#C9A96E]">В.О.Л.Я.</span>
            </h2>
            <p className="mt-3 text-sm text-[#1A1A2E]/60">
              Чотирнадцять років шляху — від першого каменю до визнання
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#EFEAE0] md:block" />
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative grid gap-6 md:grid-cols-2 md:gap-16 ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className={i % 2 === 0 ? "md:text-right" : ""}>
                    <div className="font-display text-5xl text-[#C9A96E]">
                      {item.year}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-2xl text-[#1A1A2E]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#1A1A2E]/60">
                      {item.text}
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[#C9A96E] ring-4 ring-[#FAF8F4] md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="max-w-2xl font-display text-4xl text-[#1A1A2E] sm:text-5xl">
              Чотири речі, які для нас{" "}
              <span className="font-display  text-[#C9A96E]">принципові</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => {
              const Icon = v.icon;

              return (
                <div
                  key={v.title}
                  className="group rounded-2xl border border-[#EFEAE0] bg-[#FAF8F4] p-8 transition-all hover:border-[#C9A96E] hover:shadow-lg"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-[#EFEAE0] transition-colors group-hover:bg-[#C9A96E] group-hover:ring-[#C9A96E]">
                    <Icon className="h-5 w-5 text-[#C9A96E] transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mb-3 font-display text-xl text-[#1A1A2E]">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#1A1A2E]/60">
                    {v.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl text-[#1A1A2E] sm:text-5xl">
              Команда, яку ви{" "}
              <span className="font-display  text-[#C9A96E]">зустрінете</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#1A1A2E]/60">
              Невелика команда — кожен бачить себе власником справи. Тут немає
              байдужих.
            </p>
          </div>

          <div className="relative left-1/2 grid w-[min(1800px,calc(100vw-2rem))] -translate-x-1/2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {TEAM.map((m) => (
              <div key={m.name} className="group text-center">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-[#EFEAE0]">
                  <Image
                    fill
                    alt={m.name}
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    src={m.image}
                  />
                </div>
                <h3 className="font-display text-lg text-[#1A1A2E]">
                  {m.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#C9A96E]">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final: location + contact */}
      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {/* Location image card */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <Image
                fill
                alt="Одеська обл., бухта"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                src="/images/resort.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C9A96E]">
                  <MapPin className="h-3.5 w-3.5" />
                  Visit Us
                </div>
                <h3 className="mb-2 font-display text-3xl text-white">
                  Одеська обл., бухта
                </h3>
                <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/70">
                  45 хвилин від центру Одеси. Тихий приморський куточок, далеко
                  від міського шуму.
                </p>
                <a
                  className="inline-flex items-center gap-2 border-b border-white/40 pb-1 text-sm text-white transition-colors hover:border-[#C9A96E] hover:text-[#C9A96E]"
                  href="https://www.google.com/maps?q=Аркадія,+Одеса,+Україна"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Переглянути на картах
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <div className="rounded-2xl border border-[#EFEAE0] bg-white p-8 sm:p-10">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C9A96E]">
              <Clock className="h-3.5 w-3.5" />
              {"Зв'яжіться"}
            </div>
            <h3 className="mb-3 font-display text-3xl text-[#1A1A2E]">
              Reception{" "}
              <span className="font-display  text-[#C9A96E]">24/7</span>
            </h3>
            <p className="mb-8 text-sm text-[#1A1A2E]/60">
              Ви говорите з менеджером готелю напряму 24 години — і ніколи з
              ботами.
            </p>

            <div className="space-y-1">
              <ContactRow
                href="tel:+380661927167"
                icon={Phone}
                label="Телефон"
                value="+380 66 192 71 67"
              />
              <ContactRow
                href="mailto:reception@volyahotel.com"
                icon={Mail}
                label="Email"
                value="reception@volyahotel.com"
              />
              <ContactRow
                last
                icon={MapPin}
                label="Адреса"
                value="вул. Аркадія, Ліве крило 2/1, Одеса, Україна"
              />
            </div>

            <Link
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A2E] px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-[#C9A96E]"
              href="/rooms"
            >
              Забронювати номер
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  last,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  last?: boolean;
}) {
  const content = (
    <div
      className={`flex items-start gap-4 py-4 ${last ? "" : "border-b border-[#EFEAE0]"}`}
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FAF8F4]">
        <Icon className="h-4 w-4 text-[#C9A96E]" />
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider text-[#1A1A2E]/50">
          {label}
        </div>
        <div className="text-sm font-medium text-[#1A1A2E]">{value}</div>
      </div>
    </div>
  );

  return href ? (
    <a className="block transition-colors" href={href}>
      {content}
    </a>
  ) : (
    content
  );
}
