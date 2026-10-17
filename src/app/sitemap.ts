import type { MetadataRoute } from "next"
import { SITE, href } from "@/i18n"
import { COM_CASE } from "@/lib/projects"

/**
 * O sitemap (17/10, auditoria de SEO: o site não tinha). Lista as páginas
 * indexáveis nas duas línguas, cada uma com a sua versão no outro idioma —
 * reforça o hreflang que já está no <head> e ajuda o Google a achar as de
 * /pt sem depender só dos links. Fora: /thanks (noindex), os projetos sem
 * case (noindex) e a /api.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const bilingues = ["/", "/work", "/info", "/contact", "/playground", ...[...COM_CASE].map((s) => `/projects/${s}`)]
  const url = (p: string) => SITE + (p === "/" ? "" : p)
  const entradas: MetadataRoute.Sitemap = []
  for (const p of bilingues) {
    const languages = { en: url(p), "pt-BR": url(href("pt", p)), "x-default": url(p) }
    entradas.push({ url: url(p), alternates: { languages } })
    entradas.push({ url: url(href("pt", p)), alternates: { languages } })
  }
  // só em inglês
  entradas.push({ url: url("/mediakit") })
  return entradas
}
