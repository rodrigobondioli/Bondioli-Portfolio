/**
 * As mídias da colagem do Selected work, por projeto, NA ORDEM em que o
 * Rodrigo mandou — quando o projeto tem uma lista aqui, ela manda (no lugar
 * da galeria do CMS). Fotos (.webp/.jpg/.png) e vídeos curtos (.mp4, tocam
 * sozinhos, mudos, em loop).
 *
 * Até 8 por projeto: as 4 primeiras na linha de cima, as 4 seguintes na de
 * baixo, espelhada (como no brandbeet.com). `null` guarda a vaga de uma
 * mídia que ainda não chegou — as outras ficam no lugar delas; quando o
 * arquivo chegar, é só trocar o null pelo caminho.
 */
export const SHOWCASE: Record<string, (string | null)[]> = {
  // 14/10: a 7 (o notebook com o "ElectroNanoSpray (ENS)") ainda não veio
  "flex-pharma": [
    "/projects/flex-pharma/flex-pharma-1.mp4",
    "/projects/flex-pharma/flex-pharma-2.webp",
    "/projects/flex-pharma/flex-pharma-3.mp4",
    "/projects/flex-pharma/flex-pharma-4.mp4",
    "/projects/flex-pharma/flex-pharma-5.webp",
    "/projects/flex-pharma/flex-pharma-6-960w.webp",
    null,
    "/projects/flex-pharma/flex-pharma-8.webp",
  ],
}
