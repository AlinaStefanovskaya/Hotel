import type { Metadata } from "next";

import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import BookingClientWrapper from "@/components/Contacts/BookingForm/BookingClientWrapper";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { designImages } from "@/lib/design-images";

export const metadata: Metadata = {
  title: "Бронювання номера — Volya Hotel Odesa",
  description:
    "Забронюйте номер у готелі Volya: вул. Аркадія, Ліве крило 2/1, Одеса. Телефон +380 66 192 71 67.",
};

const contacts = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+380 66 192 71 67",
    href: "tel:+380661927167",
  },
  {
    icon: Mail,
    label: "Email",
    value: "reception@volyahotel.com",
    href: "mailto:reception@volyahotel.com",
  },
  {
    icon: MapPin,
    label: "Адреса",
    value: "вул. Аркадія, Ліве крило 2/1, Одеса",
    href: "https://maps.google.com/?q=Аркадія+Одеса",
  },
  {
    icon: Clock,
    label: "Рецепція",
    value: "Цілодобово · 24/7",
  },
];

export default function BookingPage() {
  return (
    <main className="bg-[#FAF8F4] text-[#1A1A2E]">
      <PageHero
        crumbs={[{ label: "Головна", href: "/" }, { label: "Бронювання" }]}
        description="Оберіть дати, тип номера й кількість гостей. Ми підтвердимо бронювання протягом години."
        image={designImages.contactsHero}
        title="Забронювати номер"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionHeader align="left" eyebrow="Бронювання" title="Форма запиту" />

        <Suspense fallback={<div>Завантаження...</div>}>
          <BookingClientWrapper />
        </Suspense>

        {/* ── Контакти знизу ── */}
        <div className="mt-20 border-t border-[#EFEAE0] pt-16">
          <SectionHeader
            align="left"
            eyebrow="Контакти"
            title="Як з нами зв'язатися"
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li
                key={label}
                className="border border-[#EFEAE0] bg-white p-6 shadow-[0_1px_0_0_rgba(26,26,46,0.04)]"
              >
                <Icon className="h-5 w-5 text-[#B89B6A]" />
                <p className="mt-4 font-serif text-xs uppercase tracking-[0.2em] text-[#6B6B7A]">
                  {label}
                </p>
                {href ? (
                  <a
                    className="mt-2 block font-serif text-base text-[#1A1A2E] hover:text-[#B89B6A]"
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 font-serif text-base text-[#1A1A2E]">
                    {value}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
