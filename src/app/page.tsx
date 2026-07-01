import Link from "next/link";
import { ArrowRight, MessageCircle, Search } from "lucide-react";
import { catalog } from "@/lib/catalog";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchCatalog } from "@/components/SearchCatalog";

export default function Home() {
  return (
    <main>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-red-700">
              Catálogo hospitalar
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-ink sm:text-5xl">
              Produtos hospitalares para consulta rápida
            </h1>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-lg">
              Encontre produtos por nome, código interno ou categoria e consulte disponibilidade direto pelo WhatsApp.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#catalogo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-black text-white shadow-lg shadow-red-900/15 transition hover:bg-red-700"
              >
                <Search size={18} /> Buscar produtos
              </Link>
              <a
                href="https://wa.me/5527995050105"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-red-300 hover:text-red-700"
              >
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-red-700">Categorias</p>
            <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">Todos os tipos de produtos</h2>
          </div>
          <Link href="#catalogo" className="inline-flex items-center gap-1 text-sm font-black text-red-700">
            Ver catálogo <ArrowRight size={16} />
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
