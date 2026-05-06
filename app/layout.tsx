import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";

import clsx from "clsx";

import { Providers } from "@/app/providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { fontDisplay, fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F4" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A2E" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="uk">
      <body
        suppressHydrationWarning
        className={clsx(
          fontSans.variable,
          fontDisplay.variable,
          "min-h-screen bg-[#FAF8F4] font-sans text-[#1A1A2E] antialiased"
        )}
      >
        <Providers>
          <div className="flex min-h-screen w-full flex-col overflow-hidden">
            <Header />

            <main className="flex w-full flex-col overflow-hidden">
              {children}
            </main>

            <Footer />
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
