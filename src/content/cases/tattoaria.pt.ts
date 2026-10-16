/**
 * O case da Tattoaria em português (16/10/2026), pra /pt/projects/tattoaria.
 * O texto é o português da Tumulto (~/Developer/Tumulto/site/content/
 * tattoaria.ts), passado pra primeira pessoa como o inglês daqui: lá "a
 * gente" é a agência; aqui é o Rodrigo, "eu". A estrutura, as fotos e a
 * ordem são as do tattoaria.ts — mexeu num, mexe no outro.
 *
 * Só `import type` do inglês: os dois arquivos se importam, e um import de
 * valor aqui faria um ciclo na inicialização.
 */
import type { CaseTattoaria, Chapter, Media } from "./tattoaria"

const img = (name: string) => `/projects/tattoaria/case/${name}.webp`

export const tattoariaPt: CaseTattoaria = {
  meta: {
    title: "Tattoaria",
    description:
      "O que começou como um blog de tatuagem virou um estúdio tão desejado que foi parar no Lollapalooza e atraiu marcas como Chevrolet, Budweiser e Vans.",
  },
  place: "Tattoaria · São Paulo",
  title: "O estúdio que não tinha tatuador.",
  summary:
    "O que começou como um blog de tatuagem virou um estúdio tão desejado que foi parar no Lollapalooza e atraiu marcas como Chevrolet, Budweiser e Vans.",
  film: { id: "oHxfuNjpOuo", title: "Tattoaria House: festa de inauguração" },
  facts: [
    { label: "Papel", value: "Fundação e direção criativa" },
    { label: "Onde", value: "Moema, São Paulo, e mais de 10 estados com o truck" },
    {
      label: "Frentes",
      value: "Modelo de negócio, espaço, marca, produto, mídia própria, ativações e parcerias",
    },
    { label: "Quando", value: "A partir de março de 2016" },
  ],
  objective:
    "O objetivo lá no começo era um só: parar de dar audiência de graça e transformar desejo em negócio.",
  numbers: [
    { value: "200 mil", label: "seguidores no Instagram em cerca de 3 meses, antes de existir estúdio" },
    { value: "R$ 400 mil", label: "de faturamento médio por mês" },
    {
      value: "300+",
      label: "tatuadores do Brasil e de várias partes do mundo passaram por lá",
      text: "tatuadores do Brasil e de fora passaram por lá. Nenhum fixo: toda semana chegava uma turma nova de oito, do russo ao carioca.",
      photo: {
        src: img("convidado-luva"),
        caption: "Tatuadores convidados",
        alt: "Tatuador convidado de boné e camiseta da Tattoaria calçando a luva preta antes de tatuar.",
        ratio: "4 / 5",
      },
    },
    {
      value: "3",
      label: "edições no Lollapalooza,\ncom a Chevrolet",
      text: "edições no Lollapalooza com a Chevrolet: um estúdio dentro do lounge do festival e 200 tatuagens pagas adiantado.",
      photo: {
        src: img("lolla-fila"),
        caption: "Lollapalooza · com a Chevrolet",
        alt: "Fila na porta do estúdio da Tattoaria no Lollapalooza, com as placas da Tattoaria e da Chevrolet lado a lado.",
        ratio: "4 / 5",
        focus: "45% 50%",
      },
    },
    {
      value: "10+",
      label: "estados e o Uruguai rodados com o Tattoo Truck",
      text: "estados e o Uruguai rodados com o Tattoo Truck, um estúdio de vidro de 13 m² feito pra todo mundo ver a tatuagem acontecer.",
      photo: {
        src: img("truck"),
        caption: "Tattoo Truck",
        alt: "O Tattoo Truck da Tattoaria estacionado num parque, com a lateral de vidro e a escada aberta.",
        ratio: "4 / 5",
        focus: "69% 50%",
      },
    },
  ] as { value: string; label: string; text?: string; photo?: Media }[],

  chapters: [
    {
      id: "todo-estudio-era-igual",
      n: "01",
      title: "Todo estúdio era igual.",
      body: [
        "Naquela época, o mercado de tatuagem funcionava todo do mesmo jeito. Você entrava num estúdio de parede preta, com uns quadros pendurados e um sofazinho velho, sentava, folheava uma pasta, escolhia um desenho e subia uma escadinha pra tatuar trancado numa sala. Quase todo dono de estúdio era tatuador e pensava só em tatuagem, então ninguém questionava o formato, só tentava fazer ele um pouco melhor que o vizinho.",
        "Abrir mais um estúdio desses seria entrar numa briga\nem que todo mundo é igual e só o preço muda.",
      ],
      quote: "Todo estúdio tinha a sua pastinha.",
    },
    {
      id: "o-que-nenhum-estudio-tinha",
      n: "02",
      title: "A Tattoaria tinha o que nenhum estúdio tinha.",
      body: [
        "A Tattoaria começou como um blog, numa época em que quase não existia conteúdo bom sobre tatuagem no Brasil. A ideia era achar tatuadores incríveis pelo mundo e mostrar o trabalho de cada um, e quando o Instagram começou a crescer, o blog foi junto e chegou a 200 mil seguidores em uns três meses.",
        "Aí todo tatuador passou a querer sair na Tattoaria, e quem saía voltava pra contar que a agenda tinha enchido depois. Sem perceber, a Tattoaria tinha juntado o que nenhum dono de estúdio tinha: desejo, autoridade e contato direto com os melhores tatuadores do país. Só que a marca divulgava todo mundo e não ganhava nada com isso, e foi daí que veio a vontade de sair do digital.",
      ],
      media: [
        {
          layout: "side",
          items: [
            {
              src: img("escritorio"),
              caption: "",
              alt: "A equipe da Tattoaria trabalhando no escritório envidraçado do galpão, com o logo da Tattoaria House no vidro.",
              ratio: "3 / 2",
            },
          ],
        },
      ],
    },
    {
      id: "nenhum-tatuador-fixo",
      n: "03",
      title: "Nenhum tatuador fixo.",
      body: [
        "Um estúdio comum chama uns cinco tatuadores, dá comissão e eles ficam ali. Eu fiz o contrário: a Tattoaria não tinha ninguém fixo. Como a Tattoaria já tinha contato com tatuador do Brasil inteiro, eu passei a convidar esses caras pra virem tatuar em São Paulo por uma temporada, e toda semana chegava uma turma nova de oito.",
        "Imagina a segunda-feira: chega russo, carioca, mineiro, cada um com um estilo. Pro cliente de São Paulo, era a chance de tatuar com gente que ele dificilmente teria acesso. Pro mercado, era um formato que simplesmente não existia, e foi isso que botou a marca no radar de todo mundo.",
      ],
      media: [
        {
          layout: "pair",
          items: [
            {
              src: img("convidados-3"),
              caption: "Tatuadores convidados",
              alt: "Foto em preto e branco: tatuadores convidados conversando numa mesa na calçada, na porta da Tattoaria.",
              ratio: "4 / 5",
              focus: "40% 50%",
            },
            {
              src: img("convidados-2"),
              caption: "Tatuador convidado desenhando",
              alt: "Foto em preto e branco: tatuador de camiseta da Tattoaria desenhando numa mesa, com outros dois em primeiro plano.",
              ratio: "4 / 5",
            },
          ],
        },
      ],
    },
    {
      id: "um-galpao-pra-viver",
      n: "04",
      title: "Um galpão pra viver, não uma sala pra tatuar.",
      body: [
        "A Tattoaria House abriu em 3 de março de 2016, num galpão de 240 m² em Moema. A pastinha deixou de existir. No lugar da salinha fechada, eu montei baias abertas, uma do lado da outra, pra galera ver o trampo acontecendo, o cliente trocar ideia com quem estava do lado e um tatuador aprender com o outro, sempre dentro das normas da Anvisa.",
        "Dentro do galpão tinha barbearia, um bar grande de coquetelaria de verdade e uma sinuca profissional. Numa segunda fase a Tattoaria alugou o galpão do lado, o espaço quase dobrou, e entrou até uma lan house, porque eu sempre curti Counter-Strike. O cara de uns 30 anos chegava ali e podia tomar uma breja, pedir um drink, fazer uma tattoo, jogar uma sinuca e bater um game no mesmo lugar.",
        "O projeto de arquitetura foi do Studio dLux, sob a minha direção. Depois esse formato foi muito copiado, mas naquela época não existia nada parecido.",
      ],
      media: [
        {
          layout: "tour",
          items: [
            {
              src: img("galpao-baias"),
              caption: "As baias abertas",
              alt: "Galpão da Tattoaria: paredes pretas com mural de linhas brancas, baias de tatuagem abertas entre cortinas, vitrine de madeira e um tatuador atendendo uma cliente.",
              ratio: "16 / 9",
            },
            {
              src: img("galpao-sinuca"),
              caption: "A sinuca e a loja",
              alt: "A sinuca amarela no meio do galpão, com as motos customizadas e as araras da loja ao fundo.",
              ratio: "16 / 9",
            },
            {
              src: img("galpao-barbearia"),
              caption: "A barbearia",
              alt: "A sinuca amarela em primeiro plano, com a barbearia, os bonés da marca e a porta de vidro pra rua ao fundo.",
              ratio: "16 / 9",
            },
          ],
        },
      ],
    },
    {
      id: "ideia-nova-nao-se-vende-sozinha",
      n: "05",
      title: "Ideia nova não se vende sozinha.",
      body: [
        "O modelo rotativo tinha um risco enorme. Quando a Tattoaria traz um cara da Rússia ou um tatuador renomado do Rio, ele larga uma semana de agenda no estúdio dele pra vir pra cá, e se não aparecer cliente, deu ruim. Isso chegou a acontecer com alguns, porque era um produto novo e difícil de explicar. Então lotar a agenda desses caras virou a prioridade, e eu comecei a fazer tráfego pago, que na época era bem barato.",
        "Eu também peguei formatos que todo mundo fazia e reinventei. Flash day, um dia de tatuagens menores e mais baratas, todo estúdio fazia. Eu comecei a fazer flash day temático. O de terror teve só tatuagem de terror, rodou 24 horas, atravessou a madrugada, teve gente fazendo pirofagia na rua e um Jason fantasiado andando dentro do estúdio.",
      ],
      media: [
        {
          layout: "side",
          items: [
            {
              src: img("flashday-fila"),
              caption: "Flash day · fila dobrando o quarteirão",
              alt: "Fila de gente dobrando o quarteirão na porta da Tattoaria num dia de sol, ao longo da calçada.",
              ratio: "3 / 2",
              focus: "55% 60%",
            },
          ],
        },
      ],
    },
    {
      id: "a-marca-virou-roupa",
      n: "06",
      title: "A marca virou roupa.",
      body: [
        "Dono de estúdio não cuidava de marca, e eu me preocupei com isso desde o primeiro dia. Criei um logo forte e chamava fotógrafo profissional pra registrar o dia a dia, pra imagem da marca estar à altura do que acontecia lá dentro.",
        "A camiseta ficou tão bonita que os tatuadores de fora levavam quatro, cinco de uma vez. Eu vi a oportunidade e expandi pra boné, avental de tatuador e vários modelos de camiseta, e a Tattoaria virou também uma marca de roupa.",
      ],
      media: [
        {
          layout: "trio",
          items: [
            {
              src: img("produtos-1"),
              caption: "Produto · as camisetas na arara",
              alt: "Camisetas pretas e vermelhas da Tattoaria penduradas numa arara de madeira, dentro do galpão.",
              ratio: "4 / 5",
            },
            {
              src: img("roupa-1"),
              caption: "Produto · os aventais de tatuador",
              alt: "Duas tatuadoras no bar da Tattoaria vestindo os aventais jeans e preto com o logo da marca.",
              ratio: "4 / 5",
            },
            {
              src: img("roupa-2"),
              caption: "Produto · o moletom",
              alt: "Foto em preto e branco: uma mulher de moletom branco da Tattoaria com capuz, sentada no galpão.",
              ratio: "4 / 5",
              focus: "30% 50%",
            },
          ],
        },
        {
          layout: "trio",
          items: [
            {
              src: img("tatuadores-convidados"),
              caption: "Produto · boné e camiseta no tatuador",
              alt: "Tatuador de boné e camiseta da Tattoaria trabalhando.",
              ratio: "4 / 5",
            },
            {
              src: img("produto-3"),
              caption: "Produto · o detalhe da etiqueta",
              alt: "Detalhe da camiseta azul-marinho da Tattoaria com estampa rosa e a etiqueta Get inspired. Get inked. na manga, num braço tatuado.",
              ratio: "4 / 5",
            },
            {
              src: img("produto-2"),
              caption: "Produto · a regata",
              alt: "Foto em preto e branco: mulher tatuada vestindo a regata preta da Tattoaria caída no ombro.",
              ratio: "4 / 5",
            },
          ],
        },
      ],
    },
    {
      id: "um-estudio-de-vidro",
      n: "07",
      title: "Um estúdio de vidro rodando o país.",
      body: [
        "O Tattoo Truck foi uma decisão de branding, não de faturamento. Era um caminhão de 13 m², produzido pela Truckvan, com só dois lugares pra tatuar, então num evento de cinco mil pessoas eu sabia que ele não ia dar muito dinheiro, mas que ia reforçar a marca. A lateral do caminhão era de vidro, iluminada por dentro, e todo mundo via a tatuagem acontecendo.",
        "Todo evento passou a querer o truck. Ele rodou mais de 10 estados além do Uruguai, passou pela Oktoberfest de Blumenau, pela festa de 115 anos da Harley-Davidson, por eventos da Warner e pelo Campeonato Mundial de Skate da Vans, um dos eventos mais irados que eu já fiz.",
      ],
      // os primeiros segundos do vídeo têm imagem fraca: começa aos 5 s
      youtube: { id: "O1vFbCZ8j3A", title: "Tattoo Truck Tattoaria no Vans Park Series", start: 5 },
    },
    {
      id: "as-marcas-vieram-atras",
      n: "08",
      title: "As marcas vieram atrás.",
      body: [
        "Quando a Tattoaria começou a sair na Veja e no Estadão e a trazer tatuador muito bom, as marcas começaram a procurar o estúdio. Eu nunca liguei pra nenhuma delas pedindo espaço, foi o posicionamento que fez elas virem.",
      ],
      list: [
        {
          title: "Lollapalooza, com a Chevrolet.",
          text: "A Chevrolet chamou a Tattoaria pra montar um estúdio dentro do lounge do festival, onde o público tinha pago três mil pra estar, e quem estava ali tatuava de graça. Ela montou a estrutura e pagou adiantado um pacote de 200 tatuagens. Foram três edições.",
        },
        {
          title: "Lollapalooza, com a Budweiser.",
          text: "No mesmo festival, a Budweiser levou a barbearia da Tattoaria, que ficou com estúdio e barbearia lá dentro ao mesmo tempo.",
        },
        {
          title: "Reinauguração, com Jack Daniel's, Posca e Royal Enfield.",
          text: "Na abertura do espaço maior, eu fechei com a Jack Daniel's e outras marcas grandes. O crossover foi ideia minha: eu chamei a Royal Enfield e a Posca, os dois toparam na hora, e no dia dois tatuadores customizaram ao vivo, com caneta Posca, o tanque branco de uma moto.",
        },
        {
          title: "Libertadores, com o Palmeiras e a Brahma.",
          text: "Em clima de Libertadores, eu fiz uma ação com o Palmeiras e a Brahma dentro do estúdio.",
        },
        {
          title: "Dia do Caminhoneiro, com a Ford Caminhões e a JWT.",
          text: "Um estúdio montado num posto de gasolina abandonado no meio da estrada, tatuando motoristas de caminhão. Virou um vídeo em formato de documentário.",
        },
      ],
      media: [
        {
          layout: "side",
          items: [
            {
              src: img("lolla-estudio"),
              caption: "Lollapalooza · o estúdio no lounge da Chevrolet",
              alt: "Estúdio da Tattoaria montado no lounge do Lollapalooza: macas de tatuagem, estrutura amarela e luzes de LED no teto.",
              ratio: "4 / 5",
              focus: "42% 50%",
            },
          ],
        },
      ],
    },
    {
      id: "todo-mundo-quis-contar-essa-historia",
      n: "09",
      title: "Todo mundo quis contar essa história.",
      body: [
        "Veja, Estadão, Pequenas Empresas Grandes Negócios, Catraca Livre, Guia da Semana e outros. Nenhuma matéria foi comprada.",
      ],
      // os títulos originais das matérias
      press: [
        {
          outlet: "Veja São Paulo",
          title: "Novo estúdio recebe tatuadores badalados em sistema rotativo",
          href: "https://vejasp.abril.com.br/cidades/tattoaria-house-tatuagem-estudio-moema/",
        },
        {
          outlet: "Folha de S.Paulo · Fotografia",
          title: "Tattoaria é um espaço de coworking destinado a tatuadores",
          href: "https://fotografia.folha.uol.com.br/galerias/43012-tattoaria",
        },
        {
          outlet: "Pequenas Empresas & Grandes Negócios · TV Globo",
          title: "Tattoo truck é aposta de empresários para ampliar estúdio de tatuagem",
          href: "https://globoplay.globo.com/v/6008107/",
        },
        {
          outlet: "Pequenas Empresas & Grandes Negócios",
          title: "Empreendedor fatura alto com “tattoo truck”",
          href: "https://revistapegn.globo.com/Banco-de-ideias/Estetica-e-bem-estar/noticia/2019/06/empreendedor-fatura-alto-com-tattoo-truck.html",
        },
        {
          outlet: "Guia da Semana",
          title: "Tattoaria House, primeiro estúdio de tatuagem rotativo do Brasil, abre suas portas em SP",
          href: "https://www.guiadasemana.com.br/comportamento/noticia/tattoaria-house-primeiro-estudio-de-tatuagem-rotativo-do-brasil-abre-suas-portas-em-sp",
        },
        {
          outlet: "Guia da Semana",
          title:
            "Tattoo Truck, primeiro estúdio de tatuagem itinerante do mundo, roda pelo país com artistas renomados",
          href: "https://www.guiadasemana.com.br/turismo/noticia/tattoo-truck-primeiro-estudio-de-tatuagem-itinerante-do-mundo-roda-pelo-pais-com-artistas-renomados",
        },
        {
          outlet: "Tribuna PR",
          title: "Tattoaria inaugura Tattoo Truck para rodar por todo o país",
          href: "https://www.tribunapr.com.br/noticias/curitiba-regiao/tattoaria-inaugura-tattoo-truck-para-rodar-por-todo-pais/",
        },
        {
          outlet: "BaresSP",
          title: "Tattoaria House",
          href: "https://baressp.com.br/casas-de-show/tattoaria-house",
        },
      ],
    },
  ] as Chapter[],

  result: {
    title: "O que a Tattoaria virou",
    text: "A audiência que a Tattoaria dava de graça virou negócio. Em menos de dois anos, o blog virou um estúdio faturando em média R$ 400 mil por mês, uma marca de roupa, um caminhão rodando o país e um nome que as marcas grandes iam procurar, e a Tattoaria se consolidou entre os três maiores estúdios de tatuagem da América Latina.",
  },
  closing: {
    quote: "Todo mercado tem a sua pastinha.",
    text: "É aquela coisa que todo mundo faz igual, há anos, sem perguntar por quê. No bar é uma, na barbearia é outra, na marca de roupa é outra. Eu não vou fazer outra Tattoaria com a sua marca, porque cada negócio tem o seu próprio movimento e ele quase nunca é igual ao de outro. O que eu faço é olhar fundo até achar a pastinha do seu mercado e descobrir o que a sua marca pode ser no lugar dela.",
    cta: { label: "Bora conversar", href: "#contact" },
  },
  credits: {
    title: "Créditos",
    items: [
      { role: "Fundação, conceito e direção criativa", who: "Rodrigo Bondioli" },
      { role: "Arquitetura", who: "Studio dLux" },
      { role: "Tattoo Truck", who: "Truckvan" },
      { role: "Fotografia", who: "Caco Parise" },
      { role: "Assessoria de imprensa", who: "Tudo em Pauta" },
    ],
  },
}
