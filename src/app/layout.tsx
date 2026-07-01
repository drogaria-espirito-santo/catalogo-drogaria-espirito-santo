import type { Metadata } from "next";
import Image from "next/image";
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
        <header className="sticky top-0 z-40 border-b border-red-600/15 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex min-w-0 items-center">
              <Image
                src="/images/logo-drogaria-espirito-santo.png"
                alt="Drogaria Espírito Santo"
                width={720}
                height={144}
                priority
                className="h-11 w-auto rounded-sm sm:h-14"
              />
            </Link>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700 md:flex">
                <ShieldCheck size={17} /> Atendimento especializado
              </span>
              <a
                href="https://wa.me/5527995050105"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-3 text-sm font-black text-white shadow-sm transition hover:bg-red-700"
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
