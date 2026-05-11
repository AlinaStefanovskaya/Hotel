import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import { Utensils, Wine, Coffee, IceCream } from "lucide-react";

import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Меню ресторану «Воля» — карпатська кухня",
  description:
    "Сезонне меню ресторану «Воля»: страви з локальних продуктів, вина, десерти. Понад 80 позицій. Завантажте PDF або забронюйте столик.",
};

const dishes = [
  {
    name: "Бограч по-закарпатськи",
    description:
      "Густий гуляш на відкритому вогні з телятиною, паприкою та галушками.",
    price: "320 ₴",
    image: "/images/dish_1.jpg",
  },
  {
    name: "Форель з гірського потоку",
    description: "Запечена ціла форель з лимоном, тим’яном і картоплею-бейбі.",
    price: "480 ₴",
    image: "/images/dish_2.jpg",
  },
  {
    name: "Деруни з білими грибами",
    description:
      "Картопляні деруни з карпатськими білими грибами та домашньою сметаною.",
    price: "260 ₴",
    image: "/images/dish_3.jpg",
  },
  {
    name: "Бринзяні налисники",
    description: "Тонкі млинці з бринзою, шпинатом та горіховим соусом.",
    price: "240 ₴",
    image: "/images/dish_5.jpg",
  },
  {
    name: "Шашлик із ягнятини",
    description:
      "Маринована ягнятина на вугіллі з печеними овочами та ткемалі.",
    price: "420 ₴",
    image: "/images/dish_6.jpg",
  },
  {
    name: "Медівник «Воля»",
    description:
      "Багатошаровий медовий торт за родинним рецептом з кремом маскарпоне.",
    price: "180 ₴",
    image: "/images/dish_4.jpg",
  },
];

const categories = [
  {
    icon: Utensils,
    name: "Основне меню",
    count: "24 позиції",
    href: "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/soups.pdf",
  },
  {
    icon: Wine,
    name: "Напої",
    count: "80+ позицій",
    href: "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/cold-drinks.pdf",
  },
  {
    icon: IceCream,
    name: "Десерти",
    count: "12 позицій",
    href: "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/desserts-ice.pdf",
  },
  {
    icon: Coffee,
    name: "Сніданки",
    count: "32 позиції",
    href: "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/breakfasts.pdf",
  },
];

export default function MenuPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Головна", href: "/" },
          { label: "Ресторан", href: "/restaurant" },
          { label: "Меню" },
        ]}
        description="Сучасна одеська кухня, натхненна морем, південними смаками та локальними традиціями. Добірна винна карта й авторські страви від шефа."
        image="/images/menu.jpg"
        title="Меню"
      />

      {/* Dishes grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            description="Найпопулярніші позиції цього сезону. Повне меню — у нашому PDF або у залі ресторану."
            eyebrow="Хіти кухні"
            title="Страви, заради яких повертаються"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={dish.image}
                  />
                </div>
                <div className="p-6">
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
        </div>
      </section>

      {/* Categories + PDF */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Повне меню"
                title="Категорії та PDF"
              />
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {categories.map(({ icon: Icon, name, count, href }) => (
                  <a
                    key={name}
                    className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition-all duration-200"
                    href={href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-sm text-muted-foreground">
                        {count}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                fill
                alt="Меню ресторану Воля"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                src="/images/restorant_4.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF8F4] px-6 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-[#1A1A2E] p-10 text-white md:p-14">
            <h2 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Зарезервувати столик
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              Вечерю в залі або на терасі з виглядом на бухту — мінімум за 4
              години.
            </p>

            <Link
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#C9A96E] px-7 py-4 text-sm font-semibold text-[#1A1A2E] transition hover:bg-[#E8C98A]"
              href="/restaurant/booking"
            >
              Перейти до бронювання
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="rounded-[28px] border border-[#EFEAE0] bg-white p-10 md:p-14">
            <h2 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
              Доставка страв у номер
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#9090AA]">
              Будь-яка позиція з меню — за 30–45 хвилин до вашого номеру.
              Безкоштовно для гостей готелю.
            </p>

            <Link
              className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-[#1A1A2E] transition hover:text-[#C9A96E]"
              href="/restaurant/delivery"
            >
              Дізнатись більше
              <span aria-hidden="true" className="text-[#C9A96E]">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
