import type { Metadata } from "next"
import { body } from "@/app/fonts"
import { dict } from "@/i18n"
import "@/styles/globals.css"

/**
 * A 404 do site inteiro (17/10, auditoria de SEO: era a padrão do Next,
 * em inglês e sem `lang`). Com dois layouts raiz (en e pt), uma URL que não
 * existe não cai em nenhum deles — por isso uma 404 global, nas duas
 * línguas, com o caminho de volta pras duas vitrines. Fora do Google.
 */
export const metadata: Metadata = {
  title: "404 — Rodrigo Bondioli",
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  const en = dict.en.notFound
  const pt = dict.pt.notFound
  return (
    <html lang="en" className={body.variable} data-theme="dark">
      <body>
        <main style={{ minHeight: "100svh", display: "grid", placeContent: "center", gap: "var(--s4)", padding: "var(--gutter)", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "var(--t-small)", color: "var(--ink-60)" }}>404</p>
          <h1 className="h3" style={{ margin: 0, textTransform: "none" }}>{en.title}</h1>
          <p lang="pt-BR" style={{ margin: 0, color: "var(--ink-60)" }}>{pt.title}</p>
          <p style={{ margin: 0, display: "flex", gap: "var(--s4)", justifyContent: "center", fontSize: "var(--t-small)" }}>
            <a href="/work">{en.back}</a>
            <a href="/pt/work" lang="pt-BR">{pt.back}</a>
          </p>
        </main>
      </body>
    </html>
  )
}
