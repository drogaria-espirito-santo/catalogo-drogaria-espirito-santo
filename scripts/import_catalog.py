from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\Acer\Downloads\Catalogo_para_filtrar_fotos.xlsx")
DATA_DIR = ROOT / "src" / "data"
PUBLIC_PLACEHOLDERS = ROOT / "public" / "placeholders"

CATEGORY_ORDER = [
    "Mobilidade e Ortopedia",
    "Curativo e Enfermagem",
    "Incontinência e Cuidado ao Leito",
    "Aferição e Diagnóstico",
    "Respiratório",
    "Diabetes e Testes",
    "Termoterapia e Conforto",
    "Meias de Compressão",
]

PALETTE = [
    ("#0f766e", "#ccfbf1", "#f8fafc"),
    ("#0369a1", "#dbeafe", "#f8fafc"),
    ("#be123c", "#ffe4e6", "#fff7ed"),
    ("#7c3aed", "#ede9fe", "#f8fafc"),
    ("#15803d", "#dcfce7", "#f8fafc"),
    ("#c2410c", "#ffedd5", "#fff7ed"),
    ("#0e7490", "#cffafe", "#f8fafc"),
    ("#4338ca", "#e0e7ff", "#f8fafc"),
]


def slugify(value: object) -> str:
    text = str(value or "").strip().lower()
    text = unicodedata.normalize("NFD", text)
    text = "".join(char for char in text if unicodedata.category(char) != "Mn")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "item"


def clean(value: object) -> str:
    text = str(value or "").strip()
    if "Ã" in text or "Â" in text:
        try:
            text = text.encode("latin1").decode("utf-8")
        except UnicodeError:
            pass
    return "" if text in {"—", "-", "None"} else text


def title_case_product(name: str) -> str:
    small = {"c", "d", "de", "do", "da", "das", "dos", "em", "p", "s"}
    out = []
    for token in name.split():
        raw = token.strip()
        base = raw.lower()
        if base in small or any(ch.isdigit() for ch in raw):
            out.append(raw)
        elif len(raw) <= 3 and raw.isalpha():
            out.append(raw)
        else:
            out.append(raw[:1].upper() + raw[1:].lower())
    return " ".join(out)


def placeholder_svg(label: str, index: int) -> str:
    dark, soft, bg = PALETTE[index % len(PALETTE)]
    label_lines = label.replace("&", "e").split()
    line1 = " ".join(label_lines[:2])
    line2 = " ".join(label_lines[2:5])
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900" role="img" aria-label="{label}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="{bg}"/>
      <stop offset="100%" stop-color="{soft}"/>
    </linearGradient>
  </defs>
  <rect width="900" height="900" rx="52" fill="url(#bg)"/>
  <circle cx="690" cy="182" r="118" fill="{dark}" opacity=".10"/>
  <circle cx="192" cy="690" r="146" fill="{dark}" opacity=".08"/>
  <g transform="translate(248 212)" fill="none" stroke="{dark}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round">
    <path d="M202 40v392"/>
    <path d="M48 196h308"/>
    <path d="M92 84h220a52 52 0 0 1 52 52v220a52 52 0 0 1-52 52H92a52 52 0 0 1-52-52V136a52 52 0 0 1 52-52z"/>
    <path d="M142 304h120"/>
  </g>
  <text x="450" y="690" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="800" fill="{dark}">{line1}</text>
  <text x="450" y="756" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#334155">{line2}</text>
</svg>
"""


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(f"Planilha não encontrada: {SOURCE}")

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_PLACEHOLDERS.mkdir(parents=True, exist_ok=True)

    wb = openpyxl.load_workbook(SOURCE, data_only=True)
    ws = wb["Catálogo"]
    rows = list(ws.iter_rows(values_only=True))
    header = [str(value or "").strip() for value in rows[0]]
    products = []
    seen_codes = set()
    subtypes = []

    for row_number, row in enumerate(rows[1:], start=2):
        item = dict(zip(header, row))
        categoria = clean(item.get("Categoria"))
        subtipo = clean(item.get("Subtipo"))
        codigo = clean(item.get("Códigos Internos"))
        produto_raw = clean(item.get("Produto"))
        if not categoria or not subtipo or not codigo or not produto_raw:
            continue

        codigo = re.sub(r"\.0$", "", codigo)
        base_code = codigo
        suffix = 2
        while codigo in seen_codes:
            codigo = f"{base_code}-{suffix}"
            suffix += 1
        seen_codes.add(codigo)

        subtype_slug = slugify(subtipo)
        if subtipo not in subtypes:
            subtypes.append(subtipo)

        product = {
            "id": f"{codigo}-{slugify(produto_raw)}",
            "codigo": codigo,
            "produto": title_case_product(produto_raw),
            "produtoOriginal": produto_raw,
            "categoria": categoria,
            "categoriaSlug": slugify(categoria),
            "subtipo": subtipo,
            "subtipoSlug": subtype_slug,
            "variante": clean(item.get("Variante")),
            "temFotoHoje": clean(item.get("Tem foto hoje?")).lower() == "sim",
            "imagem": f"/placeholders/{subtype_slug}.svg",
            "whatsapp": "5527995050105",
        }
        products.append(product)

    categories = []
    for category in CATEGORY_ORDER:
        category_products = [p for p in products if p["categoria"] == category]
        if not category_products:
            continue
        category_subtypes = sorted({p["subtipo"] for p in category_products})
        categories.append(
            {
                "nome": category,
                "slug": slugify(category),
                "total": len(category_products),
                "subtipos": [
                    {
                        "nome": subtype,
                        "slug": slugify(subtype),
                        "total": sum(1 for p in category_products if p["subtipo"] == subtype),
                        "imagem": f"/placeholders/{slugify(subtype)}.svg",
                    }
                    for subtype in category_subtypes
                ],
                "imagem": f"/placeholders/{slugify(category_subtypes[0])}.svg",
            }
        )

    for index, subtype in enumerate(subtypes):
        (PUBLIC_PLACEHOLDERS / f"{slugify(subtype)}.svg").write_text(
            placeholder_svg(subtype, index),
            encoding="utf-8",
        )

    payload = {
        "geradoEm": "2026-06-23",
        "total": len(products),
        "categorias": categories,
        "produtos": products,
    }
    (DATA_DIR / "produtos.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Importados {len(products)} produtos em {len(categories)} categorias.")


if __name__ == "__main__":
    main()
