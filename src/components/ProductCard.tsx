import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Tag } from "lucide-react";
import type { Produto } from "@/lib/types";
import { whatsappUrl } from "@/lib/catalog";

type ProductCardProps = {
  produto: Produto;
};

export function ProductCard({ produto }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-red-300 hover:shadow-catalog">
      <Link href={`/produto/${produto.codigo}`} className="block">
        <div className="aspect-square bg-white p-4">
          <Image
            src={produto.imagem}
            alt={produto.produto}
            width={900}
            height={900}
            className="h-full w-full rounded-md object-contain transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 border-t border-slate-100 p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-black text-slate-700">
            <Tag size={13} /> {produto.codigo}
          </span>
          <span className="line-clamp-1 rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700">
            {produto.subtipo}
          </span>
        </div>
        <Link
          href={`/produto/${produto.codigo}`}
          className="line-clamp-2 min-h-12 text-sm font-black leading-6 text-ink transition group-hover:text-red-700"
        >
          {produto.produto}
        </Link>
        <p className="text-xs font-semibold text-slate-500">{produto.categoria}</p>
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2">
          <Link
            href={`/produto/${produto.codigo}`}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 px-3 text-sm font-black text-slate-700 transition hover:border-red-300 hover:text-red-700"
          >
            Ver produto
          </Link>
          <a
            href={whatsappUrl(produto)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Consultar ${produto.produto} no WhatsApp`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-700"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </article>
  );
}
