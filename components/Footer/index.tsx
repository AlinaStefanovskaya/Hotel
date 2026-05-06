import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

import Logo from "@/components/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A2E] text-white pt-20 pb-8 border-t border-[#C9A96E]/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <Link className="inline-block mb-5" href="/">
              <Logo size="md" variant="light" />
            </Link>
            <p className="text-[#9090AA] text-sm leading-relaxed">
              Затишок, стиль і увага до деталей у самому серці Одеси.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-display text-[#E8C98A] text-lg mb-5">
              Навігація
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="text-white/80 hover:text-[#E8C98A]" href="/">
                  Головна
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/80 hover:text-[#E8C98A]"
                  href="/rooms"
                >
                  Номери
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/80 hover:text-[#E8C98A]"
                  href="/restaurant"
                >
                  Ресторан
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/80 hover:text-[#E8C98A]"
                  href="/about"
                >
                  Про готель
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/80 hover:text-[#E8C98A]"
                  href="/booking"
                >
                  Бронювання
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display text-[#E8C98A] text-lg mb-5">
              Контакти
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C9A96E] mt-0.5 shrink-0" />
                <a
                  className="text-white/80 hover:text-[#E8C98A]"
                  href="tel:+380661927167"
                >
                  +380 66 192 71 67
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C9A96E] mt-0.5 shrink-0" />
                <a
                  className="text-white/80 hover:text-[#E8C98A] break-all"
                  href="mailto:reception@volyahotel.com"
                >
                  reception@volyahotel.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A96E] mt-0.5 shrink-0" />
                <a
                  className="text-white/80 hover:text-[#E8C98A]"
                  href="https://www.google.com/maps?q=Аркадія,+Одеса,+Україна"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  вул. Аркадія, Ліве крило 2/1, Одеса
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-[#E8C98A] text-lg mb-5">
              Соцмережі
            </h4>
            <div className="flex gap-3">
              <a
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1A2E] transition-colors"
                href="https://instagram.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#1A1A2E] transition-colors"
                href="https://facebook.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[#9090AA] text-xs mt-6 leading-relaxed">
              Рецепція працює цілодобово.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#9090AA]">
          <p>© {year} Volya Hotel. Усі права захищені.</p>
          <p className="tracking-wider uppercase">Одеса · Україна</p>
        </div>
      </div>
    </footer>
  );
}
