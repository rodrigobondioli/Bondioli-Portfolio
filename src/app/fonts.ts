import localFont from "next/font/local"

/**
 * Alpha Lyrae nos títulos e a Geist no resto. Decisão do Rodrigo em 21/09
 * (Alpha + Inter); em 12/10 ele trocou a Inter pela Geist e a Geist Mono,
 * e vai testar se a Alpha fica ou sai depois de ver o par.
 *
 * Alpha Lyrae  → títulos.  SIL Open Font License 1.1, © 2021 Fontfabric.
 * Geist        → todo o texto corrido. OFL 1.1, © 2023 Vercel + basement.studio.
 * Geist Mono   → a "ficha técnica": rótulos em caixa alta (.overline),
 *                metadados de projeto, números da faixa do herói, idioma,
 *                a abertura. Texto que se lê como dado, não como frase.
 *
 * As duas Geist são variáveis (um arquivo cobre 100–900). Todas
 * self-hospedadas em public/fonts, cada uma com o texto da licença
 * ao lado (OFL-AlphaLyrae.txt, OFL-Geist.txt) — a OFL pede que o aviso
 * acompanhe o arquivo. A Alpha Lyrae não está no Google Fonts, e não
 * precisa: a licença vem gravada na própria fonte (Fontfabric, OFL 1.1,
 * sem restrição de uso na web). Conferido em 24/09. Nenhuma requisição externa, nem em
 * runtime nem no build — o build roda offline. (Chegamos aqui porque
 * `next/font/google` falha em rede sem acesso ao fonts.googleapis.com, e um
 * build que depende de rede é um build que um dia quebra sozinho.)
 *
 * `display: swap` + fallback métrico: o texto aparece na hora, na fonte de
 * sistema, e troca sem empurrar o layout quando a real carrega.
 */

export const display = localFont({
  src: [{ path: "../../public/fonts/AlphaLyrae-Medium.woff2", weight: "500", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
})

export const body = localFont({
  src: [{ path: "../../public/fonts/Geist-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
})

export const mono = localFont({
  src: [{ path: "../../public/fonts/GeistMono-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
})
