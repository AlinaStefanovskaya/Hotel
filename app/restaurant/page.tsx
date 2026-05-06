import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import { Phone, Clock, MapPin, Star, Wine, Leaf, Utensils } from "lucide-react";

import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Ресторан Воля — карпатська кухня з душею",
  description:
    "Ресторан готелю «Воля» — сезонна карпатська кухня, локальні продукти, понад 80 позицій винної карти. Бронювання столика та доставка в номер.",
};

const stats = [
  { value: "15", label: "локальних ферм-постачальників" },
  { value: "4.8", label: "рейтинг Google" },
  { value: "80+", label: "позицій у винній карті" },
];

const dishes = [
  {
    badge: "Сезонне",
    name: "Бограч по-закарпатськи",
    description:
      "Густий гуляш на відкритому вогні з телятиною, паприкою та домашніми галушками.",
    price: "320 ₴",
    image: "/images/restorant_2.jpg",
  },
  {
    badge: "Хіт шефа",
    name: "Форель з гірського потоку",
    description:
      "Запечена ціла форель з лимоном, тим’яном і картоплею-бейбі на грилі.",
    price: "480 ₴",
    image: "/images/restorant_3.jpg",
  },
  {
    badge: "Локальне",
    name: "Деруни з білими грибами",
    description:
      "Картопляні деруни з карпатськими білими грибами та сметаною з домашнього сиру.",
    price: "260 ₴",
    image: "/images/restorant_4.jpg",
  },
  {
    badge: "Десерт",
    name: "Медівник «Воля»",
    description:
      "Багатошаровий медовий торт за родинним рецептом з кремом маскарпоне.",
    price: "180 ₴",
    image: "/images/restorant_5.jpg",
  },
];

export default function RestaurantPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Головна", href: "/" }, { label: "Ресторан" }]}
        description="Сезонна кухня, локальні продукти та атмосфера приморської гостинності."
        image="/images/restorant_1.jpg"
        title="Ресторан Volya"
      />

      {/* Intro */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
                Наша філософія
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl mt-4 mb-6 leading-tight">
                Кухня, що розповідає історію місця
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Ми готуємо з того, що росте поруч. Овочі — з городів сусідніх
                сіл, сир — з полонин, форель — з гірських потоків. Кожна страва
                — це про Карпати, про сезон і про людей, які вклали в неї працю.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Меню змінюється чотири рази на рік — слідом за тим, що дозріло
                на полі чи в лісі.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif text-3xl lg:text-4xl text-primary mb-2">
                      {s.value}
                    </div>
                    <div className="text-sm text-muted-foreground leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  fill
                  alt="Інтер'єр ресторану Воля"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src="/images/restorant_2.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dishes */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            description="Чотири позиції, що найкраще розповідають про нашу кухню. Повне меню — понад 80 позицій."
            eyebrow="Меню"
            title="Страви, заради яких повертаються"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {dishes.map((dish) => (
              <article
                key={dish.name}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    fill
                    alt={dish.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    src={dish.image}
                  />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                    {dish.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl mb-2">{dish.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[60px]">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-serif text-2xl text-primary">
                      {dish.price}
                    </span>
                    <Utensils className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
              href="/restaurant/menu"
            >
              Дивитись повне меню
            </Link>
          </div>
        </div>
      </section>

      {/* Wine + booking */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Wine card */}
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-foreground text-background p-10 lg:p-14 min-h-[400px] flex flex-col justify-end">
              <div className="absolute inset-0 opacity-30">
                <Image
                  fill
                  alt=""
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  src="/images/restorant_4.jpg"
                />
              </div>
              <div className="relative z-10 max-w-xl">
                <Wine className="w-10 h-10 text-primary mb-6" />
                <h3 className="font-serif text-3xl lg:text-4xl mb-4 leading-tight">
                  Винна кімната на 80+ позицій
                </h3>
                <p className="text-background/80 leading-relaxed mb-6">
                  Українські, грузинські, італійські та французькі вина. Сомельє
                  підбере пару до кожної страви — від легкого білого до
                  витриманого червоного.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full text-sm">
                    <Leaf className="w-4 h-4" /> Органічні
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full text-sm">
                    <Star className="w-4 h-4" /> Колекційні
                  </span>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-8">
                <Clock className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-serif text-xl mb-4">Години роботи</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Сніданок</span>
                    <span className="text-foreground">07:00 — 11:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Обід</span>
                    <span className="text-foreground">12:00 — 16:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Вечеря</span>
                    <span className="text-foreground">17:00 — 23:00</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary text-primary-foreground rounded-2xl p-8">
                <Phone className="w-8 h-8 mb-4" />
                <h4 className="font-serif text-xl mb-2">Бронь столика</h4>
                <p className="text-primary-foreground/80 text-sm mb-5">
                  Радимо бронювати на вечір та вихідні заздалегідь.
                </p>
                <Link
                  className="block w-full text-center px-6 py-3 bg-primary-foreground text-primary rounded-full hover:bg-primary-foreground/90 transition-colors font-medium mb-3"
                  href="/restaurant/booking"
                >
                  Забронювати онлайн
                </Link>
                <a
                  className="block w-full text-center px-6 py-3 border border-primary-foreground/30 rounded-full hover:bg-primary-foreground/10 transition-colors text-sm"
                  href="tel:+380661927167"
                >
                  +38 (066) 192-71-67
                </a>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-serif text-xl mb-2">Адреса</h4>
                <p className="text-sm text-muted-foreground">
                  с. Поляна, Свалявський р-н,
                  <br />
                  Закарпатська область
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
