/**
 * As peças da /playground (16/10/2026): mistura de foto e vídeo, em
 * formatos diferentes. Vaga sem `src` aparece vazia, com o número.
 * Vídeo entra comprimido (sem áudio, na largura que a vaga pede); o
 * original pesado vai pra _originais/playground/. Cada peça tem só o formato
 * (`ratio`); quando houver material, ganha `src` (imagem ou .mp4) e
 * `title`.
 *
 * A ordem importa: a grade é masonry de 4 colunas, preenchida coluna por
 * coluna (CSS columns), de 3 em 3 — e cada trio soma uma altura parecida
 * (altura ≈ 1/proporção: ~3,1 a 3,2), pra as colunas fecharem juntas.
 */
export type PecaPlayground = {
  ratio: string
  src?: string
  title?: string
}

export const PLAYGROUND: PecaPlayground[] = [
  // coluna 1
  // 01: balanço de parquinho, em Remotion (16/10; projeto em
  // _originais/roadr-remotion, composição "Balanco", 864×1080 → 640×800)
  { ratio: "4 / 5", src: "/playground/balanco.mp4", title: "Swing" },
  // 02: vídeo horizontal (16/10; original de 11MB em _originais/playground/,
  // aqui sem áudio, 960×540, ~1MB)
  { ratio: "16 / 9", src: "/playground/play01.mp4" },
  { ratio: "3 / 4" },
  // coluna 2
  { ratio: "1 / 1" },
  { ratio: "2 / 3" },
  { ratio: "3 / 2" },
  // coluna 3
  { ratio: "3 / 4" },
  { ratio: "4 / 3" },
  { ratio: "1 / 1" },
  // coluna 4
  { ratio: "16 / 9" },
  { ratio: "4 / 5" },
  { ratio: "3 / 4" },
]
