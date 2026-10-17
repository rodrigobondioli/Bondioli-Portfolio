/**
 * Palavra curta não fica sozinha no fim da linha (16/10, pedido do
 * Rodrigo: um "e" e um "do" sobrando na borda direita da /info). Toda
 * palavra de uma ou duas letras — "e", "a", "do", "em", "I", "to"… — fica
 * presa à seguinte por um espaço que não quebra, e desce junto com ela.
 * O lookbehind pega as curtas em sequência ("e a casa").
 */
export function semSolta(texto: string) {
  return texto.replace(/(?<=^|[\s(])([^\s]{1,2}) /g, "$1 ")
}
