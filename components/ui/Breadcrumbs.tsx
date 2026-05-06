import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#9090AA]"
    >
      <Link className="hover:text-[#E8C98A] flex items-center gap-1" href="/">
        <Home className="w-3 h-3" />
        <span>Головна</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-[#C9A96E]/60" />
          {item.href && i < items.length - 1 ? (
            <Link className="hover:text-[#E8C98A]" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="text-[#E8C98A]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
