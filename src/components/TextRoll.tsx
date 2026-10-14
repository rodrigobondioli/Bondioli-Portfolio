import styles from "./TextRoll.module.css"

/**
 * O hover dos links de texto do site (14/10, pedido do Rodrigo: a
 * cambalhota 3D dos links "parecia bugada"). Substitui o cubo do CubeLink,
 * do CopyEmail e do RollLabel nos links — o PillButton segue com a
 * cambalhota, que é dele.
 *
 * O que era o problema: o cubo girava numa mola (damping 18), que passa do
 * ponto e volta, e a letra pequena borrava no meio da rotação 3D; o
 * sublinhado girava junto com a face. Agora é 2D: o texto sobe e uma cópia
 * entra por baixo, numa curva que só desacelera (sem repique), e o
 * sublinhado fica fora do texto — parado — e faz uma passada: some pela
 * direita e volta pela esquerda.
 *
 * Quem dá o hover é o elemento que tem `data-roll-host` (o link inteiro),
 * não este invólucro. `back` troca o texto da cópia (o CopyEmail usa pra
 * "Email copied"); `show` segura a cópia à vista sem hover.
 *
 * Sem JS: é só CSS. A cópia é `aria-hidden`: leitor de tela lê uma vez.
 */
export default function TextRoll({
  text,
  back,
  show = false,
  underline = true,
}: {
  text: string
  back?: string
  show?: boolean
  underline?: boolean
}) {
  return (
    <span
      className={`${styles.root} ${underline ? styles.underlined : ""}`}
      data-show={show || undefined}
    >
      <span className={styles.mask}>
        <span className={styles.face}>{text}</span>
        <span className={`${styles.face} ${styles.back}`} aria-hidden="true">
          {back ?? text}
        </span>
      </span>
    </span>
  )
}
