import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Drogaria Espírito Santo | Catálogo Hospitalar",
    template: "%s | Drogaria Espírito Santo",
  },
  description:
    "Catálogo online de produtos hospitalares, ortopédicos, curativos, respiratórios, diabetes, termoterapia e meias de compressão.",
  metadataBase: new URL("https://catalogo-drogaria-espirito-santo.vercel.app"),
  openGraph: {
    title: "Drogaria Espírito Santo | Catálogo Hospitalar",
    description: "Produtos hospitalares com atendimento rápido pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/92 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-600 text-xl font-black text-white">
                ES
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-black text-ink sm:text-lg">
                  Drogaria Espírito Santo
                </span>
                <span className="hidden text-xs font-semibold uppercase tracking-wide text-emerald-700 sm:block">
                  Catálogo hospitalar
                </span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800 md:flex">
                <ShieldCheck size={17} /> Atendimento especializado
              </span>
              <a
                href="https://wa.me/5527995050105"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700"
              >
                <Phone size={17} />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
