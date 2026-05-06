export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F4]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-[#C9A96E]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#C9A96E] animate-spin" />
        </div>
        <p className="font-display text-[#1A1A2E] text-lg tracking-[0.3em] uppercase">
          Volya
        </p>
      </div>
    </div>
  );
}
