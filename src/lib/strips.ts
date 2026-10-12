/**
 * Faixas verticais da revelação das imagens (StripReveal), portadas do
 * tumulto.ai (lib/grid.ts de lá). As faixas caem numa grade da página
 * inteira — não da imagem —, então duas imagens lado a lado se abrem nas
 * mesmas linhas.
 *
 * A grade é a do tumulto — 6 colunas no celular, 12, depois 24, cada
 * coluna partida ao meio ("dense") — com os degraus do portfólio (640 e
 * 1100, não os 768/1200 de lá). Dá faixas de ~25–35px em qualquer tela. A
 * margem é a do portfólio (--gutter).
 */

let probe: HTMLDivElement | null = null

/** --gutter em px. É uma curva em `calc`, então só dá pra ler medindo. */
function gutterPx(): number {
  if (!probe) {
    probe = document.createElement("div")
    probe.style.cssText =
      "position:absolute;visibility:hidden;pointer-events:none;width:0;height:0;padding-left:var(--gutter)"
    document.body.appendChild(probe)
  }
  return parseFloat(getComputedStyle(probe).paddingLeft) || 16
}

function gridLineXs(pageWidth: number): number[] {
  const cols = pageWidth > 1100 ? 24 : pageWidth > 640 ? 12 : 6
  const colGap = pageWidth > 640 ? 16 : 12
  const margin = gutterPx()
  const pitch = (pageWidth - 2 * margin + colGap) / cols
  const step = pitch / 2
  const count = cols * 2 - 1
  return [
    ...Array.from({ length: count }, (_, i) => margin + i * step),
    pageWidth - margin,
  ]
}

export type Strip = { left: number; width: number }

/** Faixas de um elemento que começa em `left` e tem `width` px. */
export function stripsWithin(left: number, width: number): Strip[] {
  const pageWidth = document.documentElement.clientWidth
  const cuts = gridLineXs(pageWidth)
    .map((x) => x - left)
    .filter((x) => x > 0.5 && x < width - 0.5)
  const edges = [0, ...cuts, width]
  return edges
    .slice(0, -1)
    .map((x, i) => ({ left: x, width: (edges[i + 1] ?? width) - x }))
}

/** expo.inOut, a mesma curva do GSAP que o tumulto usa. */
export function expoInOut(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2
}
