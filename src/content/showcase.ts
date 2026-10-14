/**
 * As mídias da colagem do Selected work, por projeto, NA ORDEM em que o
 * Rodrigo mandou — quando o projeto tem uma lista aqui, ela manda (no lugar
 * da galeria do CMS). Fotos (.webp/.jpg/.png) e vídeos curtos (.mp4, tocam
 * sozinhos, mudos, em loop).
 *
 * Até 8 por projeto: as 4 primeiras na linha de cima, as 4 seguintes na de
 * baixo, espelhada (como no brandbeet.com). `null` guarda a vaga de uma
 * mídia que ainda não chegou — as outras ficam no lugar delas; quando o
 * arquivo chegar, é só trocar o null pelo caminho. `{ flipbook: [...] }`
 * é uma vaga em que as fotos se alternam (Flipbook).
 */
/** Uma vaga: foto/vídeo, flipbook (fotos alternando) ou vaga guardada. */
export type Midia = string | { flipbook: string[] } | null

export const SHOWCASE: Record<string, Midia[]> = {
  // 14/10: 1 = o app em movimento · 2 = os cards de métricas · 3 = o mockup
  // do notebook · 4 = o vídeo do card "Car wash" do roadr.com
  roadr: [
    // o app em movimento, feito em Remotion a partir do Figma Boards
    // (_originais/roadr-remotion/, `npm run render`)
    "/projects/roadr/app.mp4",
    // os cards de métricas do "Earn with us" do roadr.com, em duas fileiras
    // passando, uma pra cada lado (Remotion, composição Metrics)
    "/projects/roadr/metrics.mp4",
    // mockup fotográfico do site (feito pelo Rodrigo; original em
    // _originais/roadr-mockups/)
    "/projects/roadr/mockup-laptop.webp",
    "/projects/roadr/car-wash.mp4",
  ],
  // 14/10, plano do Rodrigo: 1 = flipbook das roupas · 2 = reel de vídeo
  // · 3 = o logo da Tattoaria
  // · 4 = foto fixa (a sinuca, mandada pelo Rodrigo)
  tattoaria: [
    {
      flipbook: [
        "/projects/tattoaria/roupas/roupa-1.webp",
        "/projects/tattoaria/roupas/roupa-2.webp",
        "/projects/tattoaria/roupas/roupa-3.webp",
        "/projects/tattoaria/roupas/roupa-4.webp",
      ],
    },
    // reel de ~12s: os 10 takes escolhidos pelo Rodrigo, em ~1,3s cada, de
    // 5 vídeos do canal da Tattoaria (Turner/Mindnation, Vans Park,
    // reinauguração, 115 anos Harley, Monstrinhos), recortado em pé.
    // Originais e o script que monta em _originais/tattoaria-reel/
    "/projects/tattoaria/reel.mp4",
    "/projects/tattoaria/logo.webp",
    "/projects/tattoaria/tattoaria-4.webp",
  ],
  "flex-pharma": [
    "/projects/flex-pharma/flex-pharma-1.mp4",
    "/projects/flex-pharma/flex-pharma-2.webp",
    "/projects/flex-pharma/flex-pharma-3.mp4",
    "/projects/flex-pharma/flex-pharma-4.mp4",
    "/projects/flex-pharma/flex-pharma-5.webp",
    "/projects/flex-pharma/flex-pharma-6-960w.webp",
    "/projects/flex-pharma/flex-pharma-7.mp4",
    "/projects/flex-pharma/flex-pharma-8.webp",
  ],
}
