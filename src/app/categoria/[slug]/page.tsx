import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Boxes } from "lucide-react";
import { catalog, findCategoria, produtosPorCategoria } from "@/lib/catalog";
import { SearchCatalog } from "@/components/SearchCatalog";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalog.categorias.map((categoria) => ({ slug: categoria.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoria = findCategoria(slug);
  if (!categoria) return {};

  return {
    title: categoria.nome,
    description: `${categoria.total} produtos em ${categoria.nome} no catálogo da Drogaria Espírito Santo.`,
    openGraph: {
      title: `${categoria.nome} | Drogaria Espírito Santo`,
      description: `${categoria.total} produtos hospitalares com atendimento pelo WhatsApp.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoria = findCategoria(slug);
  if (!categoria) notFound();

  const produtos = produtosPorCategoria(slug);

  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-emerald-700">
            <ArrowLeft size={17} /> Voltar ao início
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-black uppercase tracking-wide text-emerald-800">
                <Boxes size={17} /> Categoria
              </p>
              <h1 className="mt-4 text-3xl font-black leading-tight text-ink sm:text-5xl">
                {categoria.nome}
              </h1>
              <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-slate-600">
                {categoria.total} produtos organizados por subtipo para consulta rápida por código interno ou nome.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="rounded-lg bg-white p-4">
                <strong className="block text-2xl font-black text-emerald-700">{categoria.total}</strong>
                <span className="text-xs font-bold text-slate-500">Produtos</span>
              </div>
              <div className="rounded-lg bg-white p-4">
                <strong className="block text-2xl font-black text-emerald-700">{categoria.subtipos.length}</strong>
                <span className="text-xs font-bold text-slate-500">Subtipos</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {categoria.subtipos.map((subtipo) => (
              <span
                key={subtipo.slug}
                className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700"
              >
                {subtipo.nome} · {subtipo.total}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SearchCatalog
        produtos={produtos}
        categorias={catalog.categorias}
        initialCategory={categoria.slug}
        title={`Produtos em ${categoria.nome}`}
      />
    </main>
  );
}
