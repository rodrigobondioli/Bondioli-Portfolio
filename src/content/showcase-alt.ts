import type { Lang } from "@/i18n"

/**
 * O texto alternativo de cada peça da colagem da /work, em EN e PT (17/10,
 * auditoria de SEO; textos aprovados pelo Rodrigo). Regras dele: começa
 * pelo nome do projeto, descreve o que se vê, sem vender nada, até ~120
 * caracteres e sem "imagem de"/"foto de" (o leitor de tela já anuncia).
 * Foto ganha `alt`; vídeo e flipbook, o mesmo texto como rótulo.
 *
 * A chave é o caminho da mídia (no flipbook, a primeira foto). Mídia nova
 * na colagem pede texto novo aqui, nas duas línguas.
 */
export const SHOWCASE_ALT: Record<string, Record<Lang, string>> = {
  "/projects/tattoaria/roupas/roupa-1.webp": {
    en: "Tattoaria clothing in black and white: a tank top and a cap with the script logo, worn by tattoo artists",
    pt: "Roupas da Tattoaria em preto e branco: regata e boné com o logo em letra cursiva, vestidos por tatuadores",
  },
  "/projects/tattoaria/reel.mp4": {
    en: "Tattoaria reel: custom motorcycles, an artist tattooing a client and bikes lined up seen from above",
    pt: "Reel da Tattoaria: motos customizadas, uma tatuadora trabalhando num cliente e motos enfileiradas vistas de cima",
  },
  "/projects/tattoaria/logo.webp": {
    en: "Tattoaria logo in white script on black, with the line “Get inspired. Get inked.”",
    pt: "Logo da Tattoaria em letra cursiva branca sobre preto, com a frase “Get inspired. Get inked.”",
  },
  "/projects/tattoaria/lolla-home.webp": {
    en: "Tattoaria’s space at Lollapalooza with Chevrolet: a queue of people at the glass entrance",
    pt: "Espaço da Tattoaria no Lollapalooza com a Chevrolet: uma fila de gente na entrada de vidro",
  },
  "/projects/amor-de-cao/amor-celular.mp4": {
    en: "Amor de Cão app opening on a phone held in one hand, the logo animating on lime green",
    pt: "Abertura do app Amor de Cão num celular na mão, com o logo animado sobre verde-limão",
  },
  "/projects/amor-de-cao/gallery-4.webp": {
    en: "Amor de Cão app screens on several phones laid out on concrete: dog profiles, posts and the logo",
    pt: "Telas do app Amor de Cão em vários celulares sobre concreto: perfis de cães, posts e o logo",
  },
  "/projects/amor-de-cao/amor-site.mp4": {
    en: "Amor de Cão website scrolling: the opening line, the four ways to care and the section on living with dogs",
    pt: "Site do Amor de Cão rolando: a frase de abertura, as quatro formas de cuidar e a seção sobre conviver com cães",
  },
  "/projects/amor-de-cao/amor-mockup1.webp": {
    en: "A corgi peeking out of a canvas tote bag printed with the Amor de Cão logo, on a beige background",
    pt: "Um corgi saindo de uma ecobag com o logo do Amor de Cão, sobre fundo bege",
  },
  "/projects/flex-pharma/flex-pharma-1.mp4": {
    en: "Flex Pharma ElectroNanoSpray film: a scientist’s eye behind glasses, white powder bursting and a sample in a dish",
    pt: "Filme do ElectroNanoSpray da Flex Pharma: olho de cientista atrás dos óculos, pó branco explodindo e amostra num vidro",
  },
  "/projects/flex-pharma/flex-pharma-2.webp": {
    en: "Flex Pharma backlit yellow sign in a stone office lobby, with two people walking past",
    pt: "Painel luminoso amarelo da Flex Pharma num saguão de pedra, com duas pessoas passando",
  },
  "/projects/flex-pharma/flex-pharma-8.webp": {
    en: "Flex Pharma app on a smartwatch, with the molecule symbol on the screen",
    pt: "App da Flex Pharma num relógio inteligente, com o símbolo da molécula na tela",
  },
  "/projects/flex-pharma/flex-pharma-4.mp4": {
    en: "Flex Pharma app on a phone lying on a glass table, a molecule moving on the yellow screen",
    pt: "App da Flex Pharma num celular sobre mesa de vidro, com uma molécula se mexendo na tela amarela",
  },
  "/projects/worm/worm-1.webp": {
    en: "Worm wordmark on a dark screen, with the line “We don’t follow trends, we create them with technology”",
    pt: "Logo da Worm numa tela escura, com a frase “We don’t follow trends, we create them with technology”",
  },
  "/projects/worm/worm-2.webp": {
    en: "Worm site on a phone mounted on bike handlebars: “Beyond data. Beyond limits.” on lilac",
    pt: "Site da Worm num celular preso no guidão de uma bicicleta: “Beyond data. Beyond limits.” sobre lilás",
  },
  "/projects/worm/worm-4.webp": {
    en: "Worm visual system laid out on black: boxes, cards and prints in red, lilac and green",
    pt: "Sistema visual da Worm sobre preto: caixas, cartões e impressos em vermelho, lilás e verde",
  },
  "/projects/worm/worm-3.webp": {
    en: "A hand holding a clear Worm card with the W symbol and “Beyond data. Beyond limits.” against red",
    pt: "Mão segurando um cartão transparente da Worm com o símbolo W e “Beyond data. Beyond limits.” sobre vermelho",
  },
  "/projects/go-ink/goink-logo.mp4": {
    en: "Go Ink logo animating on black: the g, the orange star and INK in white and purple",
    pt: "Logo da Go Ink animado sobre preto: o g, a estrela laranja e INK em branco e roxo",
  },
  "/projects/go-ink/goink-mockup2.webp": {
    en: "Go Ink app on a phone leaning against a perforated metal wall, home screen with featured designs",
    pt: "App da Go Ink num celular encostado numa parede de metal perfurado, na tela inicial com desenhos em destaque",
  },
  "/projects/go-ink/goink-app.mp4": {
    en: "Go Ink app scrolling: featured designs, styles such as realism and lettering, and top-rated tattoo artists",
    pt: "App da Go Ink rolando: desenhos em destaque, estilos como realismo e lettering e os tatuadores mais bem avaliados",
  },
  "/projects/go-ink/goink-trecho.mp4": {
    en: "Go Ink animation: an illustrated tattoo artist draws an octopus and photographs the design with the app",
    pt: "Animação da Go Ink: uma tatuadora ilustrada desenha um polvo e fotografa o desenho com o app",
  },
  "/projects/charlotte-de-witte/charlotte-laptop.webp": {
    en: "Charlotte de Witte website on a laptop in a dark room, a face lying sideways across the screen",
    pt: "Site da Charlotte de Witte num notebook em sala escura, com um rosto deitado atravessando a tela",
  },
  "/projects/charlotte-de-witte/charlotte1.mp4": {
    en: "Charlotte de Witte “The Resistance EP” teaser: a crowd in black leather from above, then a face with white eyes",
    pt: "Teaser do “The Resistance EP” da Charlotte de Witte: multidão de couro preto vista de cima e um rosto de olhos brancos",
  },
  "/projects/charlotte-de-witte/charlotte2.mp4": {
    en: "Charlotte de Witte Ghent pop-up shop film: merch on the walls and fans browsing, in black and white",
    pt: "Filme da pop-up shop da Charlotte de Witte em Ghent: produtos na parede e fãs, em preto e branco",
  },
  "/projects/charlotte-de-witte/gallery.webp": {
    en: "Charlotte de Witte site page with tickets and practical info for Flanders Expo, beside a face with white eyes",
    pt: "Página do site da Charlotte de Witte com ingressos e informações do Flanders Expo, ao lado de um rosto de olhos brancos",
  },
  "/projects/orbness/orbness-pois.mp4": {
    en: "Orbness logo turning and zooming into a black-and-white fashion film with polka dots and stripes",
    pt: "Logo da Orbness girando e entrando num filme de moda em preto e branco, com bolinhas e listras",
  },
  "/projects/orbness/orbness-site.mp4": {
    en: "Orbness site scrolling: boards of fashion images, type tests and the project seen as a whole",
    pt: "Site da Orbness rolando: quadros com imagens de moda, testes de tipografia e o projeto inteiro numa tela só",
  },
  "/projects/orbness/orbness-ia-video.mp4": {
    en: "A man on a sofa using the Orbness AI on his phone",
    pt: "Um homem no sofá usando a IA da Orbness no celular",
  },
  "/projects/orbness/orbness-ia-canvas.mp4": {
    en: "Orbness AI building a board for a coffee rebrand: meeting notes, a moodboard and a kraft, cream and black palette",
    pt: "IA da Orbness montando o quadro do rebrand de um café: notas da reunião, moodboard e paleta kraft, creme e preto",
  },
  "/projects/prattu/prattu-video.mp4": {
    en: "Prattu logo animation: the green symbol and wordmark appearing on green and then on black",
    pt: "Animação do logo do Prattu: o símbolo verde e o nome surgindo sobre verde e depois sobre preto",
  },
  "/projects/prattu/prattu-na-pratica.mp4": {
    en: "Prattu in use at a restaurant: a customer finds his order ready and follows it in the app",
    pt: "Prattu em uso num restaurante: um cliente encontra o pedido pronto e acompanha tudo pelo app",
  },
  "/projects/prattu/prattu-app.mp4": {
    en: "Prattu app navigating: nearby restaurants, a search for sushi and the list of restaurants",
    pt: "App do Prattu navegando: restaurantes próximos, a busca por sushi e a lista de restaurantes",
  },
  "/projects/prattu/gallery-4.webp": {
    en: "Prattu app on a phone resting on a wooden bench, a restaurant menu on screen",
    pt: "App do Prattu num celular apoiado num banco de madeira, com o cardápio de um restaurante na tela",
  },
  "/projects/roadr/app.mp4": {
    en: "Roadr app: from the home screen to booking a tyre change and choosing the front left wheel",
    pt: "App do Roadr: da tela inicial à troca de pneu e à escolha da roda dianteira esquerda",
  },
  "/projects/roadr/metrics.mp4": {
    en: "Roadr metric cards for clients, services and verified providers, with charts moving in two rows",
    pt: "Cards de métricas do Roadr com clientes, serviços e prestadores verificados, gráficos animando em duas fileiras",
  },
  "/projects/roadr/mockup-laptop.webp": {
    en: "Roadr website on a laptop on a wooden desk: “Everything your vehicle needs in one app”",
    pt: "Site do Roadr num notebook sobre mesa de madeira: “Everything your vehicle needs in one app”",
  },
  "/projects/roadr/car-wash.mp4": {
    en: "Roadr car wash film: a man washing a car with foam and cleaning the dashboard",
    pt: "Filme de lavagem do Roadr: um homem lavando o carro com espuma e limpando o painel",
  },
}
