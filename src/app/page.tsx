import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Search } from "lucide-react";
import { catalog } from "@/lib/catalog";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchCatalog } from "@/components/SearchCatalog";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-catalogo.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl content-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
              <CheckCircle2 size={17} /> Catálogo online
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-ink sm:text-6xl">
              Drogaria Espírito Santo
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-slate-600">
              Produtos hospitalares, ortopédicos e de cuidado diário reunidos em uma experiência rápida, clara e pronta para atendimento via WhatsApp.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#catalogo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-700"
              >
                <Search size={18} /> Buscar produtos
              </a>
              <a
                href="https://wa.me/5527995050105"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm">
                <strong className="block text-2xl font-black text-emerald-700">{catalog.total}</strong>
                <span className="text-xs font-bold text-slate-500">Produtos</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm">
                <strong className="block text-2xl font-black text-emerald-700">{catalog.categorias.length}</strong>
                <span className="text-xs font-bold text-slate-500">Categorias</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm">
                <strong className="block text-2xl font-black text-emerald-700">
                  {catalog.categorias.reduce((total, item) => total + item.subtipos.length, 0)}
                </strong>
                <span className="text-xs font-bold text-slate-500">Subtipos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Categorias</p>
            <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">Encontre pelo tipo de cuidado</h2>
          </div>
          <Link href="#catalogo" className="inline-flex items-center gap-1 text-sm font-black text-emerald-700">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {catalog.categorias.map((categoria) => (
            <CategoryCard key={categoria.slug} categoria={categoria} />
          ))}
        </div>
      </section>

      <SearchCatalog produtos={catalog.produtos} categorias={catalog.categorias} />
    </main>
  );
}
