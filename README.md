# Catálogo Drogaria Espírito Santo

Catálogo online profissional para produtos hospitalares da Drogaria Espírito Santo, criado com Next.js 16, TypeScript, Tailwind CSS e App Router.

O projeto importa a planilha `Catalogo_para_filtrar_fotos.xlsx`, gera `src/data/produtos.json` e publica rotas estáticas para home, categorias e produtos.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- App Router
- Geração estática para deploy na Vercel

## Funcionalidades

- Página inicial com banner da Drogaria Espírito Santo
- Busca instantânea por código interno e nome do produto
- Categorias em destaque
- Filtro por categoria e subtipo
- Página de categoria em `/categoria/[slug]`
- Página de produto em `/produto/[codigo]`
- SEO com metadata por página
- Layout mobile first em modo claro
- Botão de WhatsApp com mensagem automática
- Imagem padrão por subtipo quando não houver foto específica

## Categorias

- Mobilidade e Ortopedia
- Curativo e Enfermagem
- Incontinência e Cuidado ao Leito
- Aferição e Diagnóstico
- Respiratório
- Diabetes e Testes
- Termoterapia e Conforto
- Meias de Compressão

## Estrutura

```text
src/
  app/
    categoria/[slug]/page.tsx
    produto/[codigo]/page.tsx
    globals.css
    layout.tsx
    page.tsx
  components/
    CategoryCard.tsx
    ProductCard.tsx
    SearchCatalog.tsx
  data/
    produtos.json
  lib/
    catalog.ts
    types.ts
public/
  images/
    logo-drogaria-espirito-santo.png
  placeholders/
    *.png
  produtos/
    fotos reais importadas por nome
scripts/
  import_catalog.py
```

## Instalação

```bash
npm install
```

## Importar a planilha

O importador lê a planilha em:

```text
C:\Users\Acer\Downloads\Catalogo_para_filtrar_fotos.xlsx
```

Para regenerar o catálogo:

```bash
npm run import:catalog
```

Esse comando recria:

- `src/data/produtos.json`
- imagens padrão em `public/placeholders/`
- fotos reais copiadas para `public/produtos/`, quando existirem em `C:\Users\Acer\Desktop\Fotos drogaria`

## Executar localmente

Ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

Build de produção:

```bash
npm run build
```

Executar build local:

```bash
npm run start
```

## Validação

Comandos recomendados antes do deploy:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

O build gera páginas estáticas para:

- `/`
- `/categoria/[slug]`
- `/produto/[codigo]`

## WhatsApp

Número configurado:

```text
5527995050105
```

Mensagem automática:

```text
Olá!

Tenho interesse no produto:

Código: {codigo}

Produto: {produto}

Poderia me informar disponibilidade?
```

## Deploy na Vercel

### 1. Enviar o projeto para um repositório Git

Crie um repositório no GitHub, GitLab ou Bitbucket e envie os arquivos do projeto.

### 2. Importar na Vercel

1. Acesse [vercel.com](https://vercel.com).
2. Clique em `Add New...` e depois em `Project`.
3. Escolha o repositório do catálogo.
4. Confirme que a Vercel detectou Next.js automaticamente.

### 3. Configurações de build

Use as configurações padrão:

```text
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

Não é necessário configurar variáveis de ambiente para este projeto.

### 4. Publicar

Clique em `Deploy`.

Após o deploy, a Vercel criará uma URL temporária. Para usar domínio próprio, acesse `Settings > Domains` no projeto da Vercel.

## Atualizar produtos depois do deploy

1. Atualize a planilha.
2. Rode:

```bash
npm run import:catalog
npm run build
```

3. Faça commit das alterações em `src/data/produtos.json`, `public/placeholders/` e `public/produtos/`.
4. Envie para o repositório.
5. A Vercel fará novo deploy automaticamente.

## Observações sobre fotos

O projeto não pesquisa imagens por EAN. Para usar fotos reais, coloque os arquivos em `C:\Users\Acer\Desktop\Fotos drogaria` com o nome igual ou muito próximo ao nome do produto na planilha, por exemplo `ACH ANDADOR DESMONTAVEL (BC1546) MERCUR FAR.jpeg`. Ao rodar `npm run import:catalog`, o script copia as imagens para `public/produtos/` e vincula automaticamente no catálogo.

Quando uma foto específica não está disponível, o catálogo usa uma imagem padrão em PNG do subtipo do produto, como andadores, bengalas, cadeiras de rodas, curativos, gazes, respiratório e nebulizadores.
