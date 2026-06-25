export type Subtipo = {
  nome: string;
  slug: string;
  total: number;
  imagem: string;
};

export type Categoria = {
  nome: string;
  slug: string;
  total: number;
  subtipos: Subtipo[];
  imagem: string;
};

export type Produto = {
  id: string;
  codigo: string;
  produto: string;
  produtoOriginal: string;
  categoria: string;
  categoriaSlug: string;
  subtipo: string;
  subtipoSlug: string;
  variante: string;
  temFotoHoje: boolean;
  imagem: string;
  whatsapp: string;
};

export type Catalogo = {
  geradoEm: string;
  total: number;
  categorias: Categoria[];
  produtos: Produto[];
};
