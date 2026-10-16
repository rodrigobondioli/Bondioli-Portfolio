import NavRail from "./NavRail"
import { orderedProjects } from "@/lib/projects"
import order from "@/content/order.json"
import type { Lang } from "@/i18n"

/**
 * A navegação do site (16/10/2026, a partir do torgo.work, pedido do
 * Rodrigo): uma barra fixa no alto à esquerda, só texto em mono caixa
 * alta — o nome; o cargo e a cidade; Projects (abre a lista), Info e
 * Playground; um fio; LinkedIn, YouTube, Substack, X e o e-mail. O
 * conteúdo da página fica do lado dela (--rail em globals). No canto
 * direito, só o idioma e o tema.
 *
 * Substitui a barra de quatro blocos em cima das linhas da grade (14/10).
 *
 * No celular e no tablet ela vira o que o torgo faz: o nome e um botão
 * "Menu" que abre a mesma lista por cima da página.
 *
 * Aqui é só a parte do servidor: a lista de projetos, na ordem da /work.
 */
export default function SiteNav({
  brandHref = "/",
  lang = "en",
}: {
  /* o nome sobe um nível: da /work vai pra capa; de um projeto ou do
     media kit, volta pra /work */
  brandHref?: string
  lang?: Lang
}) {
  const projects = orderedProjects(order as string[]).map((p) => ({
    slug: p.slug,
    name: p.projectName ?? p.slug,
  }))
  return <NavRail brandHref={brandHref} lang={lang} projects={projects} />
}
