import catalogo from "@/data/produtos.json";
import type { Catalogo, Produto } from "@/lib/types";

export const catalog = catalogo as Catalogo;

export const whatsappNumber = "5527995050105";

export function findCategoria(slug: string) {
  return catalog.categorias.find((categoria) => categoria.slug === slug);
}

export function produtosPorCategoria(slug: string) {
  return catalog.produtos.filter((produto) => produto.categoriaSlug === slug);
}

export function findProduto(codigo: string) {
  return catalog.produtos.find((produto) => produto.codigo === codigo);
}

export function whatsappUrl(produto: Produto) {
  const message = `Olá!\n\nTenho interesse no produto:\n\nCódigo: ${produto.codigo}\n\nProduto: ${produto.produto}\n\nPoderia me informar disponibilidade?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
