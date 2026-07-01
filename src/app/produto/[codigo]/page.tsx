import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Boxes, MessageCircle, Tag } from "lucide-react";
import { catalog, findProduto, whatsappUrl } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

type ProductPageProps = {
  params: Promise<{ codigo: string }>;
};

export function generateStaticParams() {
  return catalog.produtos.map((produto) => ({ codigo: produto.codigo }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { codigo } = await params;
  const produto = findProduto(codigo);
  if (!produto) return {};

  return {
    title: `${produto.produto} | Código ${produto.codigo}`,
    description: `Consulte disponibilidade do produto ${produto.produto}, código ${produto.codigo}, na Drogaria Espírito Santo.`,
    openGraph: {
      title: produto.produto,
      description: `Código interno ${produto.codigo}. Atendimento pelo WhatsApp.`,
      images: [produto.imagem],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { codigo } = await params;
  const produto = findProduto(codigo);
  if (!produto) notFound();

  const relacionados = catalog.produtos
    .filter((item) => item.subtipoSlug === produto.subtipoSlug && item.codigo !== produto.codigo)
    .slice(0, 5);

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href={`/categoria/${produto.categoriaSlug}`}
            className="inline-flex items-center gap-2 text-sm font-black text-red-700"
          >
            <ArrowLeft size={17} /> Voltar para {produto.categoria}
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,520px)_1fr]">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-white">
                <Image
                  src={produto.imagem}
                  alt={produto.produto}
                  width={900}
                  height={900}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">
                  <Tag size={16} /> Código {produto.codigo}
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-black text-red-700">
                  <BadgeCheck size={16} /> {produto.subtipo}
                </span>
              </div>
              <h1 className="mt-5 text-3xl font-black leading-tight text-ink sm:text-5xl">
                {produto.produto}
              </h1>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
                Produto do catálogo hospitalar da Drogaria Espírito Santo em {produto.categoria}.
                Consulte disponibilidade, prazo e condições diretamente pelo WhatsApp.
              </p>

              <div className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-4">
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">Categoria</span>
                  <strong className="mt-1 block text-base font-black text-ink">{produto.categoria}</strong>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">Subtipo</span>
                  <strong className="mt-1 block text-base font-black text-ink">{produto.subtipo}</strong>
                </div>
                {produto.variante ? (
                  <div className="rounded-lg bg-white p-4 sm:col-span-2">
                    <span className="text-xs font-black uppercase tracking-wide text-slate-500">Variante</span>
                    <strong className="mt-1 block text-base font-black text-ink">{produto.variante}</strong>
                  </div>
                ) : null}
              </div>

              <a
                href={whatsappUrl(produto)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-base font-black text-white shadow-lg shadow-red-900/15 transition hover:bg-red-700 sm:w-fit"
              >
                <MessageCircle size={20} /> Consultar disponibilidade
              </a>
            </div>
          </div>
        </div>
      </section>

      {relacionados.length ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2">
            <Boxes className="text-red-700" size={20} />
            <h2 className="text-2xl font-black text-ink">Produtos relacionados</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {relacionados.map((item) => (
              <ProductCard key={item.id} produto={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
