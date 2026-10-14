import Link from "next/link"
import CopyEmail from "./CopyEmail"
import ThemeToggle from "./ThemeToggle"
import NavMeio from "./NavMeio"
import styles from "./SiteNav.module.css"

/**
 * Navegação do topo — quatro blocos (14/10, desenho do Rodrigo):
 *
 *   Rodrigo Bondioli      Creative Director      Get in touch      EN BR | ☼
 *   Selected Work 15'—26' São Paulo, Brazil      hello@…
 *
 * Um encostado em cada canto e os dois do meio distribuídos, com o mesmo
 * espaço entre todos (space-between). O idioma e o tema moram aqui, em
 * linha, só texto — era uma cápsula de vidro na lateral, "informação
 * demais na tela". A linha de apoio do herói começa onde o "Creative
 * Director" cair (NavMeio publica essa posição).
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
}: {
  /* o nome sobe um nível: da /work vai pra capa; de um projeto ou do
     media kit, volta pra /work */
  brandHref?: string
}) {
  return (
    <header className={styles.nav}>
      <div className={styles.block}>
        <Link href={brandHref} className={`no-underline ${styles.label}`}>
          Rodrigo Bondioli
        </Link>
        <Link href="/work#projects" className={`no-underline ${styles.value} ${styles.muted}`}>
          Selected Work 15&rsquo; &mdash; {ATE}&rsquo;
        </Link>
      </div>

      <div className={styles.half}>
        <div className={`${styles.block} ${styles.middle}`} data-nav-meio="">
          <p className={styles.label}>Creative Director</p>
          <p className={`${styles.value} ${styles.muted}`}>São Paulo, Brazil</p>
        </div>

        <div className={styles.block}>
          <p className={styles.label}>Get in touch</p>
          <CopyEmail
            email="hello@rodrigobondioli.com"
            copiedLabel="Email copied"
            color="currentColor"
            className={styles.value}
          />
        </div>
      </div>

      <div className={`${styles.block} ${styles.prefs}`}>
        <ThemeToggle />
      </div>
      <NavMeio />
    </header>
  )
}
