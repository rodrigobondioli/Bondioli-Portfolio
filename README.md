# rodrigobondioli.com

Site pessoal e portfólio. Next.js na Vercel: todo push no `main` vai pro ar.
Detalhes técnicos e decisões de design ficam no `CLAUDE.md`.

## Onde salvar cada coisa

| o quê | pasta |
|---|---|
| **vídeo que vai aparecer no site** (já comprimido) | `public/video/` |
| **original pesado** (vídeo bruto, foto em alta) — não vai pro ar | `_originais/` |
| fotos, avatar, logos do site | `public/images/` |
| imagens da página `/work` | `public/site/` |
| imagens de um projeto | `public/projects/<slug>/` |
| logos de clientes | `public/logos/` |
| fontes | `public/fonts/` |

Tudo em `public/` é publicado. Arquivo grande demais ali pesa pra quem
visita e gasta a cota da Vercel — o original fica em `_originais/` e só a
versão comprimida entra em `public/`.

## As pastas da raiz

| pasta | o que é | vai pro ar? |
|---|---|---|
| `src/` | o código do site (páginas, componentes, textos em `src/content/`) | sim |
| `public/` | imagens, vídeos e fontes servidos pelo site | sim |
| `_originais/` | originais pesados | não (fora do git) |
| `_to_delete/` | descarte. Cada faxina tem uma pasta datada com um LEIA-ME | não (fora do git) |

O resto da raiz é configuração (`package.json`, `next.config.mjs`,
`vercel.json`, `tsconfig.json`…) e pastas geradas (`node_modules/`, `.next/`).

## Comandos

```bash
npm run dev     # localhost:3000
npm run build   # build de produção
npm run start   # serve o build em localhost:3000
```
