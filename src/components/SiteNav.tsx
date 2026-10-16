import Link from "next/link"
import CopyEmail from "./CopyEmail"
import ThemeToggle from "./ThemeToggle"
import { dict, href, type Lang } from "@/i18n"
import styles from "./SiteNav.module.css"

/**
 * Navegação do topo — quatro blocos (14/10, desenho do Rodrigo):
 *
 *   Rodrigo Bondioli      Creative Director      Get in touch      EN BR | ☼
 *   Selected Work 15'—26' São Paulo, Brazil      hello@…
 *
 * Nome à esquerda, idioma/tema à direita, cargo e contato nas colunas 8 e
 * 15 da grade (um ritmo de 7 em 7) — todo bloco em cima de uma linha. O
 * idioma e o tema moram aqui, em linha, só texto (era uma cápsula de vidro
 * na lateral, "informação demais na tela"). A linha de apoio do herói
 * começa na mesma coluna do contato.
 *
 * Saiu o "Say hello" (a pílula rosa): o contato agora é o e-mail, com o
 * mesmo CopyEmail da capa — clique copia, hover gira o cubo. O nome volta
 * no lugar da marca girando, e "Selected Work" leva à grade de projetos.
 *
 * O ano final é o do build: em 2027 vira 27' sem ninguém lembrar.
 */
const ATE = String(new Date().getFullYear()).slice(-2)

export default function SiteNav({
  brandHref = "/",
  lang = "en",
}: {
  lang?: Lang
  /* o nome sobe um nível: da /work vai pra capa; de um projeto ou do
     media kit, volta pra /work */
  brandHref?: string
}) {
  const t = dict[lang]
  return (
    <header className={styles.nav}>
      <div className={styles.block}>
        <Link href={href(lang, brandHref)} className={`no-underline ${styles.label}`}>
          Rodrigo Bondioli
        </Link>
        <Link href={href(lang, "/work") + "#projects"} className={`no-underline ${styles.value} ${styles.muted}`}>
          {t.selectedWorkNav} 15&rsquo; &mdash; {ATE}&rsquo;
        </Link>
      </div>

      <div className={styles.half}>
        <div className={`${styles.block} ${styles.middle}`}>
          <p className={styles.label}>{t.role}</p>
          <p className={`${styles.value} ${styles.muted}`}>{t.place}</p>
        </div>

        <div className={styles.block}>
          <p className={styles.label}>{t.getInTouch}</p>
          <CopyEmail
            email="hello@rodrigobondioli.com"
            copiedLabel={t.emailCopied}
            failLabel={t.couldNotCopy}
            ariaLabel={t.copyEmail}
            color="currentColor"
            className={styles.value}
          />
        </div>
      </div>

      <div className={`${styles.block} ${styles.prefs}`}>
        <ThemeToggle lang={lang} />
      </div>
    </header>
  )
}
