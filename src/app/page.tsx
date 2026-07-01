import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Search, ShieldCheck, Truck } from "lucide-react";
import { catalog } from "@/lib/catalog";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchCatalog } from "@/components/SearchCatalog";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-red-100 bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute right-0 top-0 hidden h-full w-[44%] bg-red-600 lg:block" />
          <div className="absolute bottom-0 right-0 hidden h-28 w-[44%] bg-sky-500 lg:block" />
        </div>
        <div className="relative mx-auto grid min-h-[540px] max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-black uppercase tracking-wide text-red-700 ring-1 ring-red-100">
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
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-black text-white shadow-lg shadow-red-900/15 transition hover:bg-red-700"
              >
                <Search size={18} /> Buscar produtos
              </a>
              <a
                href="https://wa.me/5527995050105"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-red-300 hover:text-red-700"
              >
                <MessageCircle size={18} /> Falar no WhatsApp
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm">
                <ShieldCheck className="text-red-600" size={20} />
                <span className="text-sm font-bold text-slate-700">Atendimento especializado</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm">
                <Search className="text-sky-600" size={20} />
                <span className="text-sm font-bold text-slate-700">Busca por código e nome</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm">
                <Truck className="text-pink-500" size={20} />
                <span className="text-sm font-bold text-slate-700">Consulta rápida no WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-lg border border-white/40 bg-white p-4 shadow-catalog">
              <Image
                src="/images/logo-drogaria-espirito-santo.png"
                alt="Drogaria Espírito Santo"
                width={720}
                height={144}
                priority
                className="h-auto w-full rounded-md"
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {catalog.categorias.slice(0, 3).map((categoria) => (
                  <Image
                    key={categoria.slug}
                    src={categoria.imagem}
                    alt=""
                    width={180}
                    height={180}
                    className="aspect-square rounded-md border border-slate-100 bg-white object-contain p-2"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-red-700">Categorias</p>
            <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">Encontre pelo tipo de cuidado</h2>
          </div>
          <Link href="#catalogo" className="inline-flex items-center gap-1 text-sm font-black text-red-700">
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
