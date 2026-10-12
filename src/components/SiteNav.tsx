import Link from "next/link"
import CopyEmail from "./CopyEmail"
import styles from "./SiteNav.module.css"

/**
 * Navegação do topo — três blocos de duas linhas (12/10, desenho do
 * Rodrigo a partir de uma referência):
 *
 *   Rodrigo Bondioli        Creative Director        Get in touch
 *   Selected Work 15'—26'   São Paulo, Brazil        hello@…
 *
 * A primeira linha de cada bloco é o rótulo (peso 600), a segunda é o
 * dado. O bloco do meio começa no meio exato da tela: a barra é uma grade
 * de duas metades, e a metade direita espalha o meio e o contato.
 *
 * Saiu o "Say hello" (a pílula rosa): o contato agora é o e-mail, com o
 * mesmo CopyEmail da capa — clique copia, hover gira o cubo. O nome volta
 * no lugar da marca girando, e "Selected Work" leva à grade de projetos.
 *
 * O ano final é o do build: em 2027 vira 27' sem ninguém lembrar.
 */
const ATE = String(new Date().getFullYear()).slice(-2)

export default function SiteNav({
  dark = false,
  brandHref = "/",
}: {
  dark?: boolean
  /* o nome sobe um nível: da /work vai pra capa; de um projeto ou do
     media kit, volta pra /work */
  brandHref?: string
}) {
  return (
    <header className={`${styles.nav} ${dark ? styles.dark : ""}`}>
      <div className={styles.block}>
        <Link href={brandHref} className={`no-underline ${styles.label}`}>
          Rodrigo Bondioli
        </Link>
        <Link href="/work#projects" className={`no-underline ${styles.value}`}>
          Selected Work 15&rsquo; &mdash; {ATE}&rsquo;
        </Link>
      </div>

      <div className={styles.half}>
        <div className={`${styles.block} ${styles.middle}`}>
          <p className={styles.label}>Creative Director</p>
          <p className={styles.value}>São Paulo, Brazil</p>
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
    </header>
  )
}
