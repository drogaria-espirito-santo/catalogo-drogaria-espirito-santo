import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Categoria } from "@/lib/types";

type CategoryCardProps = {
  categoria: Categoria;
};

export function CategoryCard({ categoria }: CategoryCardProps) {
  return (
    <Link
      href={`/categoria/${categoria.slug}`}
      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-red-300 hover:shadow-catalog"
    >
      <div className="grid grid-cols-[104px_1fr] gap-3 p-3">
        <div className="grid h-28 w-28 place-items-center rounded-md bg-slate-50">
          <Image
            src={categoria.imagem}
            alt=""
            width={112}
            height={112}
            className="h-24 w-24 object-contain"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 py-2">
          <h3 className="text-base font-black leading-5 text-ink">{categoria.nome}</h3>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Produtos hospitalares selecionados por tipo de cuidado
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-red-700">
            Explorar <ArrowRight size={15} className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
