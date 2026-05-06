// components/RestaurantNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, BookOpen, CalendarDays, Truck } from "lucide-react";

const TABS = [
  { href: "/restaurant", label: "Огляд", icon: UtensilsCrossed },
  { href: "/restaurant/menu", label: "Меню", icon: BookOpen },
  { href: "/restaurant/booking", label: "Бронь столика", icon: CalendarDays },
  { href: "/restaurant/delivery", label: "Доставка", icon: Truck },
];

export default function RestaurantNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-20 z-30 border-b border-[#EFEAE0] bg-white/95 backdrop-blur-md">
      <div className="max-w-[1320px] mx-auto px-6 md:px-16 flex gap-1 md:gap-2 overflow-x-auto">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              className={`relative flex items-center gap-2 px-4 md:px-6 py-5 text-[13px] whitespace-nowrap transition-colors ${
                active
                  ? "text-[#1A1A2E] font-medium"
                  : "text-[#9090AA] hover:text-[#1A1A2E]"
              }`}
              href={href}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              {label}
              {active && (
                <span className="absolute bottom-0 left-3 right-3 h-px bg-[#C9A96E]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
