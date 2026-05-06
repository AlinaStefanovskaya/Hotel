// components/Logo.tsx
interface LogoProps {
  /** dark — ink text on cream/white bg (default);
   *  light — white text on navy/dark bg */
  variant?: "dark" | "light";
  /** size scale: "sm" | "md" (default) | "lg" */
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const wordSizes = { sm: "text-[22px]", md: "text-[28px]", lg: "text-[38px]" };

  const mainColor = variant === "light" ? "text-white" : "text-[#1A1A2E]";

  return (
    <div className="leading-none select-none">
      <div
        className={`font-display tracking-[0.28em] font-semibold ${wordSizes[size]} ${mainColor} flex items-baseline`}
      >
        <span>В</span>
        <span className="text-[#C9A96E] mx-[0.1em] font-normal">/\</span>
        <span>Я</span>
      </div>
    </div>
  );
}
