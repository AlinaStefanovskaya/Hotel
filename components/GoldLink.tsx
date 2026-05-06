// components/GoldLink.tsx
import { ArrowRight } from "lucide-react";

type GoldLinkProps = {
  children: React.ReactNode;
  light?: boolean;
};

export default function GoldLink({ children, light = false }: GoldLinkProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[13px] cursor-pointer group ${
        light ? "text-[#E8C98A]" : "text-[#1A1A2E]"
      }`}
    >
      <span className="border-b border-[#C9A96E] pb-1 group-hover:border-b-2 transition-all">
        {children}
      </span>
      <ArrowRight
        className="w-4 h-4 text-[#C9A96E] group-hover:translate-x-1 transition-transform"
        strokeWidth={1.5}
      />
    </span>
  );
}
