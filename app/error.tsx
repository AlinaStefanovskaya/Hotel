"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[Volya] App error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-6 py-24 text-[#1A1A2E]">
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center border border-[#C9A96E] text-[#C9A96E]">
          <AlertTriangle className="h-9 w-9" strokeWidth={1.5} />
        </div>

        <div className="mt-10 text-xs font-medium uppercase tracking-[0.3em] text-[#C9A96E]">
          Помилка
        </div>
        <h1 className="font-display mt-5 text-4xl leading-tight md:text-5xl">
          Щось пішло не так
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-[#1A1A2E]/70">
          Вибачте за незручності. Спробуйте оновити сторінку — якщо помилка
          повториться, напишіть нам на{" "}
          <a
            className="text-[#C9A96E] underline-offset-4 hover:underline"
            href="mailto:reception@volyahotel.com"
          >
            reception@volyahotel.com
          </a>
          .
        </p>

        {error?.digest && (
          <div className="mt-6 font-mono text-xs text-[#9090AA]">
            ID: {error.digest}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            className="inline-flex items-center gap-2 border border-[#C9A96E] bg-[#C9A96E] px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#B89359]"
            type="button"
            onClick={reset}
          >
            <RotateCw className="h-4 w-4" strokeWidth={1.5} />
            Спробувати знову
          </button>
          <Link
            className="inline-flex items-center gap-2 border border-[#1A1A2E]/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-[#1A1A2E] transition hover:border-[#C9A96E] hover:text-[#C9A96E]"
            href="/"
          >
            <Home className="h-4 w-4" strokeWidth={1.5} />
            На головну
          </Link>
        </div>
      </div>
    </main>
  );
}
