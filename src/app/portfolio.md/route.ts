import { orderedProjects, hasText, COM_CASE } from "@/lib/projects"
import order from "@/content/order.json"

/**
 * /portfolio.md — o portfólio inteiro num arquivo Markdown, pra baixar
 * (ícone na barra lateral). Ideia do Rodrigo, de um portfólio que ele viu
 * (12/10): quem quiser leva o trabalho em texto puro — pra ler offline,
 * colar numa IA, mandar pra alguém.
 *
 * Sai dos mesmos dados do site, gerado no build (estático): se um case
 * muda no projects.json, muda aqui. Os textos fixos (cargo, bio, contato)
 * são os mesmos da capa e da barra do topo — se mudarem lá, mudar aqui.
 */
export const dynamic = "force-static"

const SITE = "https://rodrigobondioli.com"

const semHtml = (html?: string | null) =>
  (html ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim()

export function GET() {
  const linhas: string[] = []
  const add = (...l: string[]) => linhas.push(...l)

  add(
    "# Rodrigo Bondioli",
    "",
    "**Creative Director** · São Paulo, Brazil",
    "",
    "20+ years working across advertising, branding and digital products. Today I work at the intersection of strategy, design and technology, helping turn complex ideas into clear, relevant and future-ready products and brands.",
    "",
    `- Site: ${SITE}`,
    "- Email: hello@rodrigobondioli.com",
    "- LinkedIn: https://www.linkedin.com/in/bondioli/",
    "- YouTube: https://www.youtube.com/@falabondioli",
    "- Instagram: https://www.instagram.com/falabondioli/",
    "- Substack: https://falabondioli.substack.com/",
    "",
    "---",
    "",
    "## Selected work",
    ""
  )

  for (const p of orderedProjects(order as string[])) {
    const nome = p.projectName ?? p.slug
    add(`### ${nome}`, "")
    const meta = [p.what, p.year].filter(Boolean).join(" · ")
    if (meta) add(`*${meta}*`, "")
    if (p.headline) add(`> ${p.headline}`, "")
    if (p.type) add(`**Disciplines:** ${p.type}`, "")
    if (hasText(p.description)) add(semHtml(p.description), "")
    if (hasText(p.challenge)) add("**The challenge**", "", semHtml(p.challenge), "")
    if (hasText(p.solution)) add("**The solution**", "", semHtml(p.solution), "")
    if (hasText(p.outcome)) add("**Outcome**", "", semHtml(p.outcome), "")
    if (hasText(p.press)) add("**Press**", "", semHtml(p.press), "")
    if (p.linkUrl) add(`Live: ${p.linkUrl}`, "")
    // só quem tem case ganha o link da página interna (as outras não são linkadas)
    if (COM_CASE.has(p.slug)) add(`Case: ${SITE}/projects/${p.slug}`, "")
    add("---", "")
  }

  add(`*Downloaded from ${SITE}*`, "")

  return new Response(linhas.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="rodrigo-bondioli-portfolio.md"',
    },
  })
}
