// app/page.tsx
import type { Metadata } from "next";

import HeroSection from "@/components/Home/HeroSection";
import BookingSection from "@/components/Home/BookingSection";
import FeaturedRooms from "@/components/Home/FeaturedRooms";
import SplitCTA from "@/components/Home/SplitCTA";

export const metadata: Metadata = {
  title: "Volya Boutique Hotel — преміум-готель в Аркадії, Одеса",
  description:
    "Камерний boutique-готель у самому серці Аркадії. Авторський дизайн, домашній затишок та щира гостинність. Забронюйте номер онлайн.",
};

export default function Home() {
  return (
    <main className="bg-[#FAF8F4]">
      <HeroSection />
      <BookingSection />
      <FeaturedRooms />
      <SplitCTA />
    </main>
  );
}
