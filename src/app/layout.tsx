import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MessageCircle, Search } from "lucide-react";
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
        <header className="sticky top-0 z-40 bg-red-600 shadow-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
            <Link href="/" className="flex min-w-0 items-center">
              <Image
                src="/images/logo-drogaria-espirito-santo.png"
                alt="Drogaria Espírito Santo"
                width={720}
                height={144}
                priority
                className="h-9 w-auto rounded-sm sm:h-12"
              />
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/#catalogo"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/25 bg-white/12 px-3 text-sm font-black text-white transition hover:bg-white/20"
              >
                <Search size={17} />
                <span className="hidden sm:inline">Buscar</span>
              </Link>
              <a
                href="https://wa.me/5527995050105"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#25D366] px-3 text-sm font-black text-white shadow-sm transition hover:bg-[#1ebe5d]"
              >
                <MessageCircle size={17} />
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
