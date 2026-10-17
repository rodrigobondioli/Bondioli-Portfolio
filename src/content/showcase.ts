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
/** Uma vaga: foto/vídeo, flipbook (fotos alternando), print emoldurado
 *  (`framed`: a imagem pequena e centralizada sobre um fundo claro, com
 *  respiro em volta — como uma tela apresentada; com uma lista, os prints
 *  se alternam como um gif), marca girando (`spin`: o vento da capa, num
 *  fundo próprio), foto/vídeo com formato próprio (`{ src, ratio }`) ou
 *  vaga guardada. */
export type Midia =
  | string
  | { flipbook: string[] }
  | { framed: string | string[] }
  | { spin: string; bg?: string; tamanho?: string; ratio?: string; span?: number }
  /** foto ou vídeo num formato próprio, fora dos quatro da colagem; `span`
   *  troca também a largura (em colunas de 24 — a fileira tem que somar 24);
   *  `vaos` é quantos vãos a peça engole quando ocupa o lugar de duas */
  | { src: string; ratio?: string; span?: number; vaos?: number; sync?: string }
  | null

/**
 * Os projetos cuja lista foi montada pros formatos ESPELHADOS (6:5 · 1:1 ·
 * 4:5 · quase quadrada, nessa ordem) — os que estavam em posição ímpar na
 * /work quando o Rodrigo escolheu as mídias. Desde 17/10 o formato de cada
 * vaga é da mídia, não da posição: mudar a ordem dos projetos (order.json)
 * só troca o lado da colagem, nunca o recorte de cada peça.
 */
export const FORMATO_ESPELHADO = new Set(["roadr", "amor-de-cao", "prattu"])

export const SHOWCASE: Record<string, Midia[]> = {
  // Go Ink (17/10): o trecho de 23s a 30s do filme do app (o polvo sendo
  // desenhado, a personagem com a caneca, a mesa de desenho e a aprovação no
  // celular), escolhido pelo Rodrigo, na vaga 4 — a maior (6:5) —,
  // recortado um pouco à direita do centro pra a personagem caber. Filme
  // inteiro (59s, 20MB) em _originais/go-ink/. Vaga 1: o logo animado em
  // Remotion (GoInkLogo, em _originais/roadr-remotion), com as cores do Figma. Vaga 2: o
  // mockup do celular (feito pelo Rodrigo, versão 2; original em _originais/go-ink/),
  // já em 4:5.
  "go-ink": [
    "/projects/go-ink/goink-logo.mp4",
    "/projects/go-ink/goink-mockup2.webp",
    // vaga 3 (17/10): o app navegando, em pé (9:16, o formato que o
    // Rodrigo desenhou em cima da colagem) — Remotion (GoInkApp, em
    // _originais/roadr-remotion), a tela "Go Ink" do Figma remontada com as
    // imagens de lá: carrosséis passando, um coração marcado, o filtro
    // trocado, e de volta pro topo. Era a camiseta (gallery-3).
    { src: "/projects/go-ink/goink-app.mp4", ratio: "9 / 16" },
    "/projects/go-ink/goink-trecho.mp4",
  ],
  // Prattu (17/10): o vídeo do projeto (o videoUpload do CMS, aqui sem
  // áudio, 960×540) na primeira vaga; as outras, as fotos da galeria. Vaga
  // 3: o app navegando — Remotion (PrattuAppSolto, em
  // _originais/roadr-remotion), as telas do Figma PRATTU-MOBILE exportadas
  // em 3x: o início, "Japonesa", os pratos, os restaurantes e de volta. A
  // tela fica solta no meio de um fundo claro, com espaço em volta, sem
  // desenho de celular, canto vivo e sem sombra, na proporção de uma tela
  // de iPhone (referência do Rodrigo, 17/10: em 9:16 ocupando a vaga toda
  // "não gostei"; arredondada e com sombra também saiu). Era a gallery-3.
  // Vaga 2 (17/10): o dono usando o app de verdade — trecho de 20s a 32s do
  // vídeo do Instagram da @prattuapp (ele entra no café, pega o pedido sem
  // fila e come), em pé (9:16) como o vídeo. Baixado do post (360×640, com
  // a legenda queimada). A legenda fica, decisão do Rodrigo (17/10): o
  // vídeo toca mudo, e é ela que conta o que está acontecendo. Original em
  // _originais/prattu-instagram/.
  prattu: [
    "/projects/prattu/prattu-video.mp4",
    { src: "/projects/prattu/prattu-na-pratica.mp4", ratio: "9 / 16" },
    "/projects/prattu/prattu-app.mp4",
    "/projects/prattu/gallery-4.webp",
  ],
  // Charlotte de Witte (17/10): o vídeo dele na vaga 2 (retrato 4:5, o
  // formato do vídeo); as outras seguem as fotos da galeria. Original em
  // _originais/charlotte/, aqui sem áudio.
  "charlotte-de-witte": [
    // mockup do notebook (feito pelo Rodrigo; original em _originais/charlotte/)
    // na vaga quase quadrada, a maior das duas pequenas: na quadrada de 4
    // colunas "não dava nem pra ver" (17/10, trocou de lugar com o vídeo 2)
    "/projects/charlotte-de-witte/charlotte-laptop.webp",
    "/projects/charlotte-de-witte/charlotte1.mp4",
    "/projects/charlotte-de-witte/charlotte2.mp4", // vídeo 4:5, recortado no quadrado da vaga
    // o print do site emoldurado, com respiro em volta (17/10, referência do
    // Rodrigo). Trocando entre quatro prints, como um gif, foi testado e
    // saiu no mesmo dia: só o primeiro, parado.
    { framed: "/projects/charlotte-de-witte/gallery.webp" },
  ],
  // Amor de Cão (17/10): vaga 1 é o celular na mão ("08 - Aplicações D",
  // do Figma AC - New Branding) com a animação dos elementos (a da vaga 2)
  // dentro da tela, no lugar do logo, menor e centrado na tela pela caixa,
  // e a frase "A vida com cão precisa de gente." embaixo, entrando como no
  // original. O fundo é o primeiro quadro do export (tela vazia) com a tela
  // alisada — o mockup tinha uma área lisa no meio e granulada em volta,
  // e aparecia um retângulo (tela-vazia-lisa.png). Elementos e frase só o
  // desenho, em verde escuro, com a transparência tirada do fundo deles. 200px de fundo a mais
  // em cima (o próprio verde, espelhado) pra o celular respirar. Originais
  // em _originais/amor-de-cao/.
  // Atenção: o Amor de Cão é ímpar na lista, a colagem espelha — a vaga 1
  // é a larga (6:5), a 2 a quadrada, a 3 a em pé (4:5), a 4 a quase
  // quadrada. Vaga 2: a da galeria. Vaga 3: o site (amordecao.com.br, feito
  // direto no Claude, sem Figma) rolando numa janela quadrada no meio da
  // vaga (5/6 da largura: com 2/3 sobrava fundo demais), com margem em volta no azul-claro dos elementos da marca
  // (#CEE8F0; era o verde #99BD05) — a referência do Rodrigo era a janela,
  // não a tela toda. Feito em 4:5, o formato da vaga (em quadrado o
  // recorte comia as laterais). Gravado quadro a quadro (Playwright, 1080²,
  // 11s, do topo até "Nosso jeito de conviver"); o script está em
  // _originais/amor-de-cao/site-frames/. Vaga 4: os celulares em mesa
  // (amor-mockup1, feito pelo Rodrigo). A animação dos elementos solta, que
  // esteve na 2, saiu: ela já passa dentro do celular da 1.
  "amor-de-cao": [
    "/projects/amor-de-cao/amor-celular.mp4",
    "/projects/amor-de-cao/gallery-4.webp",
    "/projects/amor-de-cao/amor-site.mp4",
    "/projects/amor-de-cao/amor-mockup1.webp",
  ],
  // Orbness (16/10, no lugar do Morpho): o produto dele, pela própria
  // interface. Até 17/10 eram três telas (moodboard, kanban, painel, de
  // ~/Developer/Orbness/marketing/out; os arquivos seguem na pasta).
  // Desde 17/10 (várias voltas com o Rodrigo): o logo entrando no vídeo, o
  // site, e o par da IA (o vídeo da pessoa falando e o canvas fazendo).
  // 3 + 9 + 4 + 8 = 24.
  orbness: [
    // o elemento gira e o zoom atravessa o furo dele e cai no vídeo das
    // bolinhas do herói do site (pois.mp4), e sai de novo pelo furo —
    // Remotion OrbnessPois (17/10). Era o elemento girando no vento.
    { src: "/projects/orbness/orbness-pois.mp4", ratio: "1 / 1", span: 3 },
    // o site orbness.com.br numa janela, com zoom nas partes bonitas —
    // Remotion (OrbnessSite), quadros gravados em 2x; fundo claro, margem,
    // canto vivo. Logo depois do logo: "tem mais a ver com branding".
    { src: "/projects/orbness/orbness-site.mp4", ratio: "6 / 5", span: 9 },
    // o par da IA, lado a lado e na mesma altura (um fala, o outro faz): o
    // vídeo cheio, e o canvas inteiro, cheio no card, sem fundo e sem
    // corte (a janela com margem e o zoom "cortavam"; Remotion
    // OrbnessIAVideo / OrbnessIABoardInteiro, mesma gravação, `sync`)
    { src: "/projects/orbness/orbness-ia-video.mp4", ratio: "184 / 217", span: 4, sync: "orbness-ia" },
    { src: "/projects/orbness/orbness-ia-canvas.mp4", ratio: "1040 / 612", span: 8, sync: "orbness-ia" },
  ],
  // 14/10: no lugar do Tilt Tech; as 4 imagens do Rodrigo, na ordem dele
  worm: [
    "/projects/worm/worm-1.webp",
    "/projects/worm/worm-2.webp",
    // trocadas a pedido: o kit de papelaria vai pra vaga grande, o
    // acrílico laranja pro quadradinho
    "/projects/worm/worm-4.webp",
    "/projects/worm/worm-3.webp",
  ],
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
  // Flex Pharma (17/10): era o único com duas linhas (8 peças). A de baixo
  // saiu, e o relógio (que estava nela) veio pra vaga 3, no lugar do "Our
  // Vision" (flex-pharma-3.mp4). Os arquivos que saíram continuam em
  // public/projects/flex-pharma/.
  "flex-pharma": [
    "/projects/flex-pharma/flex-pharma-1.mp4",
    "/projects/flex-pharma/flex-pharma-2.webp",
    "/projects/flex-pharma/flex-pharma-8.webp",
    "/projects/flex-pharma/flex-pharma-4.mp4",
  ],
}
