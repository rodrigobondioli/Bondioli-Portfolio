/**
 * Case completo da Tattoaria (12/10/2026, pedido do Rodrigo): o mesmo case
 * do tumulto.ai (/en/projects/tattoaria, código em ~/Developer/Tumulto/site,
 * content/en/tattoaria.ts), trazido pro portfólio. Só a Tattoaria tem um
 * case deste tamanho — os outros projetos seguem no template do CMS.
 *
 * O que muda em relação ao da Tumulto: a voz. Lá "we" é a agência e o
 * Rodrigo aparece uma vez, de passagem; aqui o site é dele, então o texto
 * inteiro fala em primeira pessoa — "I" no lugar do "we" da agência
 * (pedido do Rodrigo, 12/10) —, os créditos são dele e o convite leva pro
 * contato da página. Os fatos e a ordem são os mesmos de lá.
 *
 * Desde 16/10/2026 o case existe em português também (tattoaria.pt.ts,
 * em /pt/projects/tattoaria), a partir do texto em português da Tumulto,
 * na mesma primeira pessoa. Mexeu num, mexe no outro.
 *
 * Fotos em public/projects/tattoaria/case/ (webp, a partir de site/img da
 * Tumulto). `ratio` é o formato do recorte; `focus`, o ponto que o recorte
 * preserva.
 */

export type Media = {
  src: string
  alt: string
  caption: string
  ratio: string
  focus?: string
}

export type Chapter = {
  id: string
  n: string
  title: string
  body: string[]
  /** frase solta, acende com o scroll */
  quote?: string
  /** "side": uma foto embaixo do título, com o texto ao lado · "pair" duas
   *  lado a lado · "trio" três em linha · "tour" passeio que prende a tela */
  media?: { layout: "side" | "pair" | "trio" | "tour"; items: Media[] }[]
  youtube?: { id: string; title: string; start?: number }
  list?: { title: string; text: string }[]
  press?: { outlet: string; title: string; href: string }[]
}

import { tattoariaPt } from "./tattoaria.pt"

const img = (name: string) => `/projects/tattoaria/case/${name}.webp`

export const tattoaria = {
  meta: {
    title: "Tattoaria case study",
    description:
      "What started as a tattoo blog became a studio so wanted it landed at Lollapalooza and pulled in brands like Chevrolet, Budweiser and Vans.",
  },
  place: "Tattoaria · São Paulo",
  title: "The studio with no tattoo artist.",
  summary:
    "What started as a tattoo blog became a studio so wanted it landed at Lollapalooza and pulled in brands like Chevrolet, Budweiser and Vans.",
  film: { id: "oHxfuNjpOuo", title: "Tattoaria House: opening party" },
  facts: [
    { label: "Role", value: "Founding and creative direction" },
    { label: "Where", value: "Moema, São Paulo, plus 10+ states with the truck" },
    // Scope antes de When (14/10): é o mais longo e fica com a coluna larga
    {
      label: "Scope",
      value: "Business model, space, brand, product, owned media, activations and partnerships",
    },
    { label: "Studio opened", value: "March 2016" },
  ],
  objective:
    "At the start, the goal was just one: stop giving attention away for free and turn desire into business.",
  numbers: [
    { value: "200K", label: "Instagram followers in about 3 months, before there was a studio" },
    { value: "R$ 400K", label: "average monthly revenue" },
    {
      value: "300+",
      label: "tattoo artists from Brazil and around the world came through",
      text: "tattoo artists from Brazil and abroad came through. None of them resident: every week a new crew of eight rolled in, from Russia to Rio.",
      photo: {
        src: img("convidado-luva"),
        caption: "Guest artists",
        alt: "Guest artist in a Tattoaria cap and tee pulling on a black glove before tattooing.",
        ratio: "4 / 5",
      },
    },
    {
      value: "3",
      label: "editions at Lollapalooza,\nwith Chevrolet",
      text: "editions at Lollapalooza with Chevrolet: a studio inside the festival lounge and 200 tattoos paid up front.",
      photo: {
        src: img("lolla-fila"),
        caption: "Lollapalooza · with Chevrolet",
        alt: "Line at the door of the Tattoaria studio at Lollapalooza, with the Tattoaria and Chevrolet signs side by side.",
        ratio: "4 / 5",
        focus: "45% 50%",
      },
    },
    {
      value: "10+",
      label: "states plus Uruguay on the road with the Tattoo Truck",
      text: "states plus Uruguay on the road with the Tattoo Truck, a 13 m² glass studio built so everyone could watch the tattoo happen.",
      photo: {
        src: img("truck"),
        caption: "Tattoo Truck",
        alt: "The Tattoaria Tattoo Truck parked in a park, glass side out and steps down.",
        ratio: "4 / 5",
        focus: "69% 50%",
      },
    },
  ] as { value: string; label: string; text?: string; photo?: Media }[],

  chapters: [
    {
      id: "every-studio-was-the-same",
      n: "01",
      title: "Every studio was the same.",
      body: [
        "Back then, the whole tattoo market ran the same way. You walked into a black-walled studio with a few frames on the wall and a beat-up little couch, sat down and flipped through the flash book, the same binder of ready-made designs every studio copied from. You picked one and climbed some stairs to get tattooed shut away in a room. Almost every studio owner was a tattoo artist who only thought about tattoos, so nobody questioned the format. They just tried to do it a little better than the shop next door.",
        "Opening one more studio like that meant stepping into a fight\nwhere everyone's the same and only the price changes.",
      ],
      quote: "Every studio had its flash book.",
    },
    {
      id: "what-no-studio-had",
      n: "02",
      title: "Tattoaria had what no studio had.",
      body: [
        "Tattoaria started as a blog, back when there was barely any good tattoo content in Brazil. The idea was to find incredible artists around the world and show off their work, and when Instagram took off, the blog went with it and hit 200K followers in about three months.",
        "Then every artist wanted to be on Tattoaria, and the ones who were came back to say their books had filled up. Without even noticing, Tattoaria had pulled together what no studio owner had: desire, authority and a direct line to the best tattoo artists in the country. But the brand was promoting everyone and getting nothing back, and that's where the urge to go offline came from.",
      ],
      media: [
        {
          layout: "side",
          items: [
            {
              src: img("escritorio"),
              caption: "",
              alt: "The Tattoaria team at work in the warehouse's glass-walled office, with the Tattoaria House logo on the glass.",
              ratio: "3 / 2",
            },
          ],
        },
      ],
    },
    {
      id: "no-resident-artists",
      n: "03",
      title: "No resident artists.",
      body: [
        "A regular studio brings in five or so artists, pays them a commission and they stay put. I did the opposite: Tattoaria had no resident artists at all. Since Tattoaria already knew artists all over Brazil, I started inviting them to tattoo in São Paulo for a stint, and every week a new crew of eight rolled in.",
        "Picture a Monday: in walk a Russian, a guy from Rio, a guy from Minas, each with their own style. For clients in São Paulo, it was a shot at getting tattooed by people they'd hardly ever get near. For the market, it was a format that simply didn't exist, and that's what put the brand on everyone's radar.",
      ],
      media: [
        {
          layout: "pair",
          items: [
            {
              src: img("convidados-3"),
              caption: "Guest artists",
              alt: "Black and white photo: guest artists talking at a sidewalk table outside Tattoaria.",
              ratio: "4 / 5",
              focus: "40% 50%",
            },
            {
              src: img("convidados-2"),
              caption: "Guest artist drawing",
              alt: "Black and white photo: an artist in a Tattoaria tee drawing at a table, with two others in the foreground.",
              ratio: "4 / 5",
            },
          ],
        },
      ],
    },
    {
      id: "a-warehouse-to-live-in",
      n: "04",
      title: "A warehouse to live in, not a room to get tattooed in.",
      body: [
        "Tattoaria House opened on March 3, 2016, in a 240 m² warehouse in Moema. The flash book was gone. Instead of a closed-off little room, I built open booths side by side, so people could watch the work happen, clients could chat with whoever was next to them and artists could learn from each other, always within Brazil's health regulations.",
        "Inside there was a barbershop, a big, proper cocktail bar and a pro pool table. In a second phase Tattoaria rented the warehouse next door, the space almost doubled, and a LAN house went in too, because I've always loved Counter-Strike. A guy in his thirties could walk in, grab a beer, order a drink, get a tattoo, shoot some pool and play a few rounds, all in the same place.",
        "The architecture was by Studio dLux, under my direction. The format got copied a lot later, but back then nothing like it existed.",
      ],
      media: [
        {
          layout: "tour",
          items: [
            {
              src: img("galpao-baias"),
              caption: "The open booths",
              alt: "Tattoaria's warehouse: black walls with a white line mural, open tattoo booths between curtains, a wooden display case and an artist working on a client.",
              ratio: "16 / 9",
            },
            {
              src: img("galpao-sinuca"),
              caption: "The pool table and the shop",
              alt: "The yellow pool table in the middle of the warehouse, with custom motorcycles and the shop's clothing racks in the back.",
              ratio: "16 / 9",
            },
            {
              src: img("galpao-barbearia"),
              caption: "The barbershop",
              alt: "The yellow pool table up front, with the barbershop, the brand's caps and the glass door to the street in the back.",
              ratio: "16 / 9",
            },
          ],
        },
      ],
    },
    {
      id: "a-new-idea-doesnt-sell-itself",
      n: "05",
      title: "A new idea doesn't sell itself.",
      body: [
        "The rotating model came with a huge risk. When Tattoaria brings in a guy from Russia or a big-name artist from Rio, he clears a week of bookings at his own studio to come here, and if no clients show up, it's a disaster. It actually happened with a few, because it was a new product and hard to explain. So filling those artists' books became the priority, and I started running paid ads, which were dirt cheap back then.",
        "I also took formats everyone was doing and reinvented them. Flash day, a day of smaller, cheaper tattoos, every studio did that. I started doing themed flash days. The horror one was horror tattoos only, ran 24 hours straight through the night, had fire breathers out on the street and a guy dressed as Jason wandering around the studio.",
      ],
      media: [
        {
          layout: "side",
          items: [
            {
              src: img("flashday-fila"),
              caption: "Flash day · line around the block",
              alt: "A line of people wrapping around the block outside Tattoaria on a sunny day, all along the sidewalk.",
              ratio: "3 / 2",
              focus: "55% 60%",
            },
          ],
        },
      ],
    },
    {
      id: "the-brand-became-clothing",
      n: "06",
      title: "The brand became clothing.",
      body: [
        "Studio owners didn't care about branding, and I cared about it from day one. I built a strong logo and brought in professional photographers to shoot the day to day, so the brand's image lived up to what was happening inside.",
        "The tee came out so good that visiting artists took home four or five at a time. I saw the opportunity and expanded into caps, tattoo aprons and a whole range of tees, and Tattoaria became a clothing brand too.",
      ],
      media: [
        {
          layout: "trio",
          items: [
            {
              src: img("produtos-1"),
              caption: "Product · tees on the rack",
              alt: "Black and red Tattoaria tees hanging on a wooden rack inside the warehouse.",
              ratio: "4 / 5",
            },
            {
              src: img("roupa-1"),
              caption: "Product · tattoo aprons",
              alt: "Two tattoo artists at the Tattoaria bar wearing the denim and black aprons with the brand's logo.",
              ratio: "4 / 5",
            },
            {
              src: img("roupa-2"),
              caption: "Product · the hoodie",
              alt: "Black and white photo: a woman in a white Tattoaria hoodie, hood up, sitting in the warehouse.",
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
              caption: "Product · cap and tee on an artist",
              alt: "A tattoo artist in a Tattoaria cap and tee at work.",
              ratio: "4 / 5",
            },
            {
              src: img("produto-3"),
              caption: "Product · the label detail",
              alt: "Close-up of the navy Tattoaria tee with a pink print and the Get inspired. Get inked. label on the sleeve, on a tattooed arm.",
              ratio: "4 / 5",
            },
            {
              src: img("produto-2"),
              caption: "Product · the tank top",
              alt: "Black and white photo: a tattooed woman wearing the black Tattoaria tank top slipping off one shoulder.",
              ratio: "4 / 5",
            },
          ],
        },
      ],
    },
    {
      id: "a-glass-studio-touring-the-country",
      n: "07",
      title: "A glass studio touring the country.",
      body: [
        "The Tattoo Truck was a branding call, not a revenue one. It was a 13 m² truck built by Truckvan with just two tattoo stations, so at a five-thousand-person event I knew it wouldn't make much money, but it would push the brand. The side of the truck was glass, lit from inside, and everyone could watch the tattoo happen.",
        "Every event wanted the truck. It toured more than 10 states plus Uruguay, hit Oktoberfest in Blumenau, Harley-Davidson's 115th anniversary party, Warner events and the Vans Park Series world championship, one of the sickest events I ever did.",
      ],
      // os primeiros segundos do vídeo têm imagem fraca: começa aos 5 s
      youtube: { id: "O1vFbCZ8j3A", title: "Tattoaria Tattoo Truck at the Vans Park Series", start: 5 },
    },
    {
      id: "the-brands-came-to-me",
      n: "08",
      title: "The brands came to me.",
      body: [
        "Once Tattoaria started showing up in Veja and Estadão and bringing in great artists, brands started reaching out. I never called a single one asking for space. The positioning brought them in.",
      ],
      list: [
        {
          title: "Lollapalooza, with Chevrolet.",
          text: "Chevrolet asked Tattoaria to set up a studio inside the festival lounge, where people had paid three thousand reais to get in, and whoever was there got tattooed for free. Chevrolet built the setup and paid up front for a package of 200 tattoos. Three editions.",
        },
        {
          title: "Lollapalooza, with Budweiser.",
          text: "Same festival: Budweiser brought in Tattoaria's barbershop, so Tattoaria had a studio and a barbershop running inside at the same time.",
        },
        {
          title: "Reopening, with Jack Daniel's, Posca and Royal Enfield.",
          text: "For the opening of the bigger space, I closed deals with Jack Daniel's and other big brands. The crossover was my idea: I called Royal Enfield and Posca, both said yes on the spot, and on the day two artists customized a white motorcycle tank live with Posca markers.",
        },
        {
          title: "Copa Libertadores, with Palmeiras and Brahma.",
          text: "With Libertadores fever in the air, I ran an activation with Palmeiras and Brahma inside the studio.",
        },
        {
          title: "Truckers' Day, with Ford Trucks and JWT.",
          text: "A studio set up at an abandoned gas station in the middle of the highway, tattooing truck drivers. It became a documentary-style film.",
        },
      ],
      media: [
        {
          layout: "side",
          items: [
            {
              src: img("lolla-estudio"),
              caption: "Lollapalooza · the studio in the Chevrolet lounge",
              alt: "Tattoaria's studio set up in the Lollapalooza lounge: tattoo beds, a yellow frame and LED lights on the ceiling.",
              ratio: "4 / 5",
              focus: "42% 50%",
            },
          ],
        },
      ],
    },
    {
      id: "everyone-wanted-to-tell-this-story",
      n: "09",
      title: "Everyone wanted to tell this story.",
      body: [
        "Veja, Estadão, Pequenas Empresas Grandes Negócios, Catraca Livre, Guia da Semana and more. Not a single story was paid for.",
      ],
      // títulos traduzidos; os links abrem as matérias originais, em português
      press: [
        {
          outlet: "Veja São Paulo",
          title: "New studio hosts big-name tattoo artists on a rotating basis (in Portuguese)",
          href: "https://vejasp.abril.com.br/cidades/tattoaria-house-tatuagem-estudio-moema/",
        },
        {
          outlet: "Folha de S.Paulo · Photography",
          title: "Tattoaria is a coworking space for tattoo artists (in Portuguese)",
          href: "https://fotografia.folha.uol.com.br/galerias/43012-tattoaria",
        },
        {
          outlet: "Pequenas Empresas & Grandes Negócios · TV Globo",
          title: "Entrepreneurs bet on a tattoo truck to grow their studio (in Portuguese)",
          href: "https://globoplay.globo.com/v/6008107/",
        },
        {
          outlet: "Pequenas Empresas & Grandes Negócios",
          title: "Entrepreneur cashes in with a “tattoo truck” (in Portuguese)",
          href: "https://revistapegn.globo.com/Banco-de-ideias/Estetica-e-bem-estar/noticia/2019/06/empreendedor-fatura-alto-com-tattoo-truck.html",
        },
        {
          outlet: "Guia da Semana",
          title: "Tattoaria House, Brazil's first rotating tattoo studio, opens in São Paulo (in Portuguese)",
          href: "https://www.guiadasemana.com.br/comportamento/noticia/tattoaria-house-primeiro-estudio-de-tatuagem-rotativo-do-brasil-abre-suas-portas-em-sp",
        },
        {
          outlet: "Guia da Semana",
          title:
            "Tattoo Truck, the world's first traveling tattoo studio, tours the country with renowned artists (in Portuguese)",
          href: "https://www.guiadasemana.com.br/turismo/noticia/tattoo-truck-primeiro-estudio-de-tatuagem-itinerante-do-mundo-roda-pelo-pais-com-artistas-renomados",
        },
        {
          outlet: "Tribuna PR",
          title: "Tattoaria launches a Tattoo Truck to tour the whole country (in Portuguese)",
          href: "https://www.tribunapr.com.br/noticias/curitiba-regiao/tattoaria-inaugura-tattoo-truck-para-rodar-por-todo-pais/",
        },
        {
          outlet: "BaresSP",
          title: "Tattoaria House (in Portuguese)",
          href: "https://baressp.com.br/casas-de-show/tattoaria-house",
        },
      ],
    },
  ] as Chapter[],

  result: {
    title: "What Tattoaria became",
    text: "The attention Tattoaria used to give away for free became a business. In under two years, the blog turned into a studio averaging R$ 400K a month, a clothing brand, a truck touring the country and a name big brands came looking for, and Tattoaria became one of the three biggest tattoo studios in Latin America.",
  },
  closing: {
    quote: "Every market has its flash book.",
    text: "It's that thing everyone's been doing the same way for years without asking why. At a bar it's one thing, at a barbershop it's another, at a clothing brand it's another. I'm not going to turn your brand into another Tattoaria, because every business has its own momentum, and it's almost never the same as anyone else's. What I do is dig deep until I find your market's flash book, and figure out what your brand can be instead.",
    cta: { label: "Let's talk", href: "#contact" },
  },
  credits: {
    title: "Credits",
    items: [
      { role: "Founding, concept and creative direction", who: "Rodrigo Bondioli" },
      { role: "Architecture", who: "Studio dLux" },
      { role: "Tattoo Truck", who: "Truckvan" },
      { role: "Photography", who: "Caco Parise" },
      { role: "Press relations", who: "Tudo em Pauta" },
    ],
  },
}

export type CaseTattoaria = typeof tattoaria

/** O case na língua pedida. */
export function caseTattoaria(lang: "en" | "pt"): CaseTattoaria {
  return lang === "pt" ? tattoariaPt : tattoaria
}
