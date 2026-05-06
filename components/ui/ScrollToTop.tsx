"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Нагору"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#C9A96E] hover:bg-[#E8C98A] text-[#1A1A2E] shadow-lg flex items-center justify-center transition-all"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
