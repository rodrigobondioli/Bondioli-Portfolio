import SiteNav from "@/components/SiteNav"
import SmoothScroll from "@/components/SmoothScroll"
import ProjectShowcase from "@/components/ProjectShowcase"
import VideoSync from "@/components/VideoSync"
import VideoForaDaTela from "@/components/VideoForaDaTela"
import ConviteContato from "@/components/ConviteContato"
import { orderedProjects, asset, galleryUrls, COM_CASE } from "@/lib/projects"
import order from "@/content/order.json"
import { SHOWCASE } from "@/content/showcase"
import PillButton from "@/components/PillButton"
import { caseTattoaria } from "@/content/cases/tattoaria"
import { dict, href, type Lang } from "@/i18n"
import s from "./work.module.css"

export default function Work({ lang }: { lang: Lang }) {
  const t = dict[lang]
  const projects = orderedProjects(order as string[])
  // o que vale como "Case study" (COM_CASE) abre a página, em destaque; o
  // resto vem embaixo, em "Selected work" (17/10, pedido do Rodrigo: quem
  // clicava num projeto sem case e nada acontecia achava que nenhum abria)
  const fotosDe = (p: (typeof projects)[number]) => {
    // a galeria primeiro: a thumb costuma ser recorte da primeira foto
    // dela, e as duas lado a lado se repetiam
    const galeria = galleryUrls(p.gallery)
    const thumb = asset(p.thumb)
    // quem tem lista própria (content/showcase.ts) usa ela, na ordem;
    // os outros, as 4 primeiras da galeria
    return (
      SHOWCASE[p.slug] ??
      (galeria.length >= 4 || !thumb ? galeria : [thumb, ...galeria])
        .filter((u, i, a) => a.indexOf(u) === i)
        .slice(0, 4)
    )
  }
  const comCase = projects.filter((p) => COM_CASE.has(p.slug))
  const caso = caseTattoaria(lang)

  return (
    <>
      <SmoothScroll />
      <SiteNav lang={lang} />
      <VideoSync />
      <VideoForaDaTela />

      <main>
        {/* ---------- Arquivo ---------- */}
        <section className={`section page-top ${s.archive}`}>
          <div className={`container ${s.archiveInner}`}>
            {/* A apresentação (16/10, pedido do Rodrigo, a partir de uma
                referência: frase grande e texto pequeno; aqui, discreta — é
                só uma introduçãozinha). O texto é a bio da capa. Ela abre a
                página, na linha do nome da barra e do EN / BR. */}
            {/* O título da página (17/10, auditoria): a /work não tinha H1. Ele
                existe pra leitor de tela e buscador; na tela, o nome e o cargo
                já estão na barra lateral, então fica invisível (sr-only). */}
            <h1 className="sr-only">{t.work.h1}</h1>
            {/* o rótulo do topo, como "Info" e "Contact" (17/10, auditoria:
                cada página abria de um jeito) */}
            <p className={s.secao}>{t.work.label}</p>
            <p className={s.intro}>{t.home.bio}</p>

            {/* Case study (17/10): o projeto com case aberto em destaque —
                a colagem, o título e o resumo do case, três números e um
                botão que diz o que acontece no clique. Separado dos outros
                pelo lugar e pelo formato, não por um selo pequeno. */}
            {/* Títulos de seção como rótulo (17/10, auditoria: com o mesmo corpo
                dos nomes dos projetos, seção e item liam como o mesmo nível).
                O mesmo rótulo do "Contact" e do "About" das outras páginas. */}
            <h2 className={s.secao} id="case-study">{t.work.caseStudy}</h2>
            {comCase.map((p) => (
              <div key={p.slug} className={s.destaque}>
                <ProjectShowcase
                  slug={p.slug}
                  name={p.projectName ?? p.slug}
                  services={p.type}
                  linked
                  images={fotosDe(p)}
                  index={projects.indexOf(p)}
                  lang={lang}
                />
                <div className={s.destaqueInfo}>
                  <div className={s.destaqueTexto}>
                    <p className={s.destaqueTitulo}>{caso.title}</p>
                    <p className={s.destaqueResumo}>{caso.summary}</p>
                    <PillButton href={href(lang, `/projects/${p.slug}`)} className={s.destaqueBotao}>
                      {t.work.readCase}
                    </PillButton>
                  </div>
                  <ul className={s.numeros}>
                    {caso.numbers.slice(0, 3).map((n) => (
                      <li key={n.value}>
                        <b>{n.value}</b>
                        <span>{n.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <h2 className={`${s.secao} ${s.selectedTitle}`} id="projects">{t.work.selectedWork}</h2>

            {/* Os outros, no desenho do brandbeet.com (12/10): nome e
                serviços e uma colagem de quatro peças. */}
            <ul className={s.cases}>
              {projects
                .filter((p) => !COM_CASE.has(p.slug))
                .map((p) => (
                  <li key={p.slug}>
                    <ProjectShowcase
                      slug={p.slug}
                      name={p.projectName ?? p.slug}
                      services={p.type}
                      linked={false}
                      images={fotosDe(p)}
                      // a posição na lista inteira: o lado de cada colagem
                      // não muda por a Tattoaria ter subido pro destaque
                      index={projects.indexOf(p)}
                      lang={lang}
                    />
                  </li>
                ))}
            </ul>

            {/* fim da página: o convite pro contato (17/10, auditoria) */}
            <ConviteContato lang={lang} />
          </div>
        </section>
      </main>
    </>
  )
}
