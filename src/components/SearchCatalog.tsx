"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Categoria, Produto } from "@/lib/types";
import { normalizeSearch } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

type SearchCatalogProps = {
  produtos: Produto[];
  categorias: Categoria[];
  initialCategory?: string;
  title?: string;
};

export function SearchCatalog({
  produtos,
  categorias,
  initialCategory = "todos",
  title = "Catálogo completo",
}: SearchCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [subtype, setSubtype] = useState("todos");

  const availableSubtypes = useMemo(() => {
    const source = category === "todos" ? produtos : produtos.filter((item) => item.categoriaSlug === category);
    return Array.from(new Map(source.map((item) => [item.subtipoSlug, item.subtipo])).entries())
      .map(([slug, nome]) => ({ slug, nome }))
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }, [category, produtos]);

  const filtered = useMemo(() => {
    const term = normalizeSearch(query);
    return produtos.filter((produto) => {
      const matchesCategory = category === "todos" || produto.categoriaSlug === category;
      const matchesSubtype = subtype === "todos" || produto.subtipoSlug === subtype;
      const searchable = normalizeSearch(`${produto.codigo} ${produto.produto} ${produto.produtoBusca}`);
      return matchesCategory && matchesSubtype && (!term || searchable.includes(term));
    });
  }, [category, produtos, query, subtype]);

  function clearFilters() {
    setQuery("");
    setSubtype("todos");
    setCategory(initialCategory);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="catalogo">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-red-700">
            Busca instantânea
          </p>
          <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">{title}</h2>
        </div>
        <p className="text-sm font-bold text-slate-500">
          {filtered.length} de {produtos.length} produtos
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 border-t-red-600 bg-white p-3 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_240px_240px_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por código interno ou nome do produto"
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-semibold outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
            />
          </label>

          <label className="relative block">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setSubtype("todos");
              }}
              className="h-12 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-black text-slate-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
            >
              <option value="todos">Todas as categorias</option>
              {categorias.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.nome}
                </option>
              ))}
            </select>
          </label>

          <select
            value={subtype}
            onChange={(event) => setSubtype(event.target.value)}
            className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-black text-slate-700 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
          >
            <option value="todos">Todos os subtipos</option>
            {availableSubtypes.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.nome}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-black text-slate-700 transition hover:border-red-300 hover:text-red-700"
          >
            <X size={17} /> Limpar
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-lg font-black text-ink">Nenhum produto encontrado.</p>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            Tente buscar por outro código, nome ou subtipo.
          </p>
        </div>
      ) : null}
    </section>
  );
}
