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
  // 04: o logo do Monster (17/10; original 1920×1080 em _originais/playground/,
  // aqui recortado no quadrado da vaga, 900px, com o desenho 10% menor)
  { ratio: "1 / 1", src: "/playground/logo-monster.webp", title: "Monster logo: a pale head with many eyes and three toothy mouths" },
  // 05: corrida de triciclo entre os carros (21/10; original 1080×1920
  // em _originais/playground/, aqui recortado no 2:3 da vaga, 640×960,
  // sem áudio, ~1,5MB)
  { ratio: "2 / 3", src: "/playground/triciclo.mp4", title: "Bearded man racing a red tricycle between two sports cars" },
  { ratio: "3 / 2" },
  // coluna 3
  // 07: a camiseta do Monster, no corpo (17/10; original em
  // _originais/playground/tshirt-monster2.png — a segunda foto, que ficou)
  { ratio: "3 / 4", src: "/playground/tshirt-monster.webp", title: "Black Monster T-shirt worn by a bearded, tattooed man leaning on a concrete wall" },
  { ratio: "4 / 3" },
  { ratio: "1 / 1" },
  // coluna 4
  { ratio: "16 / 9" },
  { ratio: "4 / 5" },
  { ratio: "3 / 4" },
]
