// components/SectionHeader.tsx
type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  italicWord?: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  italicWord,
  description,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  const titleColor = light ? "text-white" : "text-[#1A1A2E]";
  const descColor = light ? "text-white/65" : "text-[#9090AA]";
  const alignCls = align === "center" ? "items-center text-center" : "";

  function renderTitle() {
    if (!italicWord) return title;
    const idx = title.indexOf(italicWord);

    if (idx < 0) return title;

    return (
      <>
        {title.slice(0, idx)}
        <span className="font-display italic font-normal">{italicWord}</span>
        {title.slice(idx + italicWord.length)}
      </>
    );
  }

  return (
    <div className={`flex flex-col ${alignCls}`}>
      <div
        className={`flex items-center gap-3 mb-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="w-8 h-px bg-[#C9A96E]" />
        <span className="text-[11px] tracking-[0.32em] text-[#C9A96E] uppercase font-medium">
          {eyebrow}
        </span>
        {align === "center" && <span className="w-8 h-px bg-[#C9A96E]" />}
      </div>
      <h2
        className={`text-[40px] md:text-[52px] font-semibold leading-[1.05] tracking-[-0.02em] ${titleColor}`}
      >
        {renderTitle()}
      </h2>
      {description && (
        <p
          className={`text-[14px] mt-4 max-w-[560px] leading-relaxed ${descColor}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
