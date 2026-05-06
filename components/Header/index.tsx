"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

import Logo from "@/components/Logo";

type SubLink = { href: string; title: string; subtitle: string };

const restaurantLinks: SubLink[] = [
  { href: "/restaurant", title: "Ресторан", subtitle: "Огляд ресторану" },
  { href: "/restaurant/menu", title: "Меню", subtitle: "Авторські страви" },
  {
    href: "/restaurant/booking",
    title: "Бронь столика",
    subtitle: "Резерв вечері",
  },
  {
    href: "/restaurant/delivery",
    title: "Доставка",
    subtitle: "У номер / до дверей",
  },
];

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/rooms", label: "Номери" },
  // "Ресторан" рендеримо окремо (з dropdown)
  { href: "/about", label: "Про нас" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A2E] backdrop-blur border-b border-[hsl(var(--gold))]/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Logo size="sm" variant="light" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 2).map((l) => (
            <Link
              key={l.href}
              className={`text-sm uppercase tracking-wider transition-colors ${
                isActive(l.href)
                  ? "text-[hsl(var(--gold))]"
                  : "text-white hover:text-[hsl(var(--gold))]"
              }`}
              href={l.href}
            >
              {l.label}
            </Link>
          ))}

          {/* Restaurant dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1 text-sm uppercase tracking-wider transition-colors ${
                pathname.startsWith("/restaurant")
                  ? "text-[hsl(var(--gold))]"
                  : "text-white hover:text-[hsl(var(--gold))]"
              }`}
            >
              Ресторан
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-72 bg-[hsl(var(--navy))] border border-[hsl(var(--gold))]/30 shadow-2xl rounded-sm overflow-hidden">
                {restaurantLinks.map((sub, i) => (
                  <Link
                    key={sub.href}
                    className={`block px-5 py-4 transition-colors hover:bg-[hsl(var(--gold))]/10 ${
                      i !== restaurantLinks.length - 1
                        ? "border-b border-[hsl(var(--gold))]/15"
                        : ""
                    }`}
                    href={sub.href}
                  >
                    <div className="text-[hsl(var(--gold))] text-sm font-medium uppercase tracking-wider">
                      {sub.title}
                    </div>
                    <div className="text-white/60 text-xs mt-1">
                      {sub.subtitle}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(2).map((l) => (
            <Link
              key={l.href}
              className={`text-sm uppercase tracking-wider transition-colors ${
                isActive(l.href)
                  ? "text-[hsl(var(--gold))]"
                  : "text-white hover:text-[hsl(var(--gold))]"
              }`}
              href={l.href}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA → бронювання номера */}
        <Link
          className="hidden lg:inline-flex px-6 py-2 border border-[hsl(var(--gold))] text-[hsl(var(--gold))] text-sm uppercase tracking-wider hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--navy))] transition-colors"
          href="/booking"
        >
          Бронювати
        </Link>

        {/* Mobile burger */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[hsl(var(--navy))] border-t border-[hsl(var(--gold))]/20">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.slice(0, 2).map((l) => (
              <Link
                key={l.href}
                className={`py-3 text-sm uppercase tracking-wider border-b border-[hsl(var(--gold))]/10 ${
                  isActive(l.href) ? "text-[hsl(var(--gold))]" : "text-white"
                }`}
                href={l.href}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <div className="py-3 border-b border-[hsl(var(--gold))]/10">
              <div className="text-[hsl(var(--gold))] text-sm uppercase tracking-wider mb-2">
                Ресторан
              </div>
              <div className="flex flex-col gap-2 pl-3">
                {restaurantLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    className="text-white/80 text-sm py-1"
                    href={sub.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {sub.title}
                    <span className="text-white/40 text-xs ml-2">
                      — {sub.subtitle}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(2).map((l) => (
              <Link
                key={l.href}
                className={`py-3 text-sm uppercase tracking-wider border-b border-[hsl(var(--gold))]/10 ${
                  isActive(l.href) ? "text-[hsl(var(--gold))]" : "text-white"
                }`}
                href={l.href}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <Link
              className="mt-4 px-6 py-3 border border-[hsl(var(--gold))] text-[hsl(var(--gold))] text-sm uppercase tracking-wider text-center"
              href="/booking"
              onClick={() => setMobileOpen(false)}
            >
              Бронювати
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
