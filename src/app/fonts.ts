import localFont from "next/font/local"

/**
 * Uma família só: Geist. Texto e títulos na Geist; a "ficha técnica"
 * (rótulos em caixa alta, metadados de projeto, números da faixa do
 * herói, idioma, a abertura) na Geist Mono — texto que se lê como dado.
 *
 * Histórico: Alpha Lyrae (títulos) + Inter (resto) desde 21/09; em 12/10
 * a Inter virou Geist + Geist Mono e, no mesmo dia, a Alpha saiu também —
 * decisão do Rodrigo. Os arquivos antigos estão em _to_delete/.
 *
 * Geist e Geist Mono: SIL Open Font License 1.1, © 2023 Vercel +
 * basement.studio. Variáveis (um arquivo cobre 100–900), auto-hospedadas
 * em public/fonts com a licença ao lado (OFL-Geist.txt). Nenhuma
 * requisição externa, nem em runtime nem no build — o build roda offline.
 * (`next/font/google` falha em rede sem acesso ao fonts.googleapis.com, e
 * um build que depende de rede é um build que um dia quebra sozinho.)
 *
 * `display: swap` + fallback métrico: o texto aparece na hora, na fonte de
 * sistema, e troca sem empurrar o layout quando a real carrega.
 *
 * `--font-display` continua existindo (globals.css), apontando pra Geist:
 * os títulos têm o seu próprio ajuste de peso e entreletra lá.
 */

export const body = localFont({
  src: [
    { path: "../../public/fonts/Geist-Variable.woff2", weight: "100 900", style: "normal" },
    // itálico de verdade (não o oblíquo falso do navegador): "Your next decision."
    { path: "../../public/fonts/Geist-Italic-Variable.woff2", weight: "100 900", style: "italic" },
  ],
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
