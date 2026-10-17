/**
 * O conteúdo da /info (16/10/2026): o texto é do Rodrigo, em português; o
 * inglês é a tradução, na mesma voz (primeira pessoa, frase curta). A
 * estrutura segue o torgo.work/info (sem a faixa de saudação): a foto
 * à esquerda com listas que abrem e fecham, o texto longo à direita.
 *
 * O inglês é britânico contemporâneo (judgement, jewellery), direto e
 * conversado — revisão de naturalidade de 16/10. Não misturar com o
 * americano.
 *
 * Na história, um link se escreve como no Markdown: [texto](/caminho). O
 * caminho é o da versão em inglês; a página põe o /pt quando precisa.
 *
 * REGRA: mexeu num idioma, mexe no outro.
 */
import type { Lang } from "@/i18n"

export type InfoContent = {
  aboutLabel: string
  photoAlt: string
  lead: string
  storyTitle: string
  story: string[]
  closing: string
  workTitle: string
  work: string
  lists: { title: string; groups: { label?: string; items: string[] }[] }[]
  brandsTitle: string
}

const AGENCIAS = [
  "Paintbox",
  "Neogama",
  "J. Walter Thompson",
  "McCann",
  "Tenda Digital",
  "AgênciaClick",
  "Chleba",
  "Fabra Quinteiro",
  "W/Brasil",
  "Ciplex",
  "Think4",
  "A1 Brasil",
  "A2C",
  "Repense",
  "D’Araujo",
  "Tribo Interactive (Grupo Ogilvy)",
  "Van Gogh Creative (Itália)",
]
const VAREJO = ["Americanas.com", "Shoptime", "Netshoes"]

const pt: InfoContent = {
  aboutLabel: "Sobre",
  photoAlt: "Rodrigo Bondioli no palco, de camisa preta e braços tatuados, falando com um controle na mão ao lado de um telão.",
  lead: "Comecei fazendo site no FrontPage, em 1997. Passei por algumas das maiores agências do país, fui head de design da Americanas.com e da Netshoes, construí um negócio que cresceu muito rápido e vi a pandemia fechar as portas dele. Tudo isso virou o que eu ofereço hoje: critério.",
  storyTitle: "Senta que lá vem história",
  story: [
    "Dinheiro nunca sobrou lá em casa, mas arte tinha em todo canto. Minha avó era artista plástica, pintava e esculpia, e junto com a minha mãe derretia bijuteria no forno do quintal para vender em feira de artesanato. Minha mãe também fazia bonecas e abajures, e tocava piano tão bem que toda festa acabava com alguém pedindo para ela tocar Pink Floyd, mesmo ela morrendo de vergonha. Entre tios e primos, cada um tocava alguma coisa, e eu cresci achando normal passar o dia criando.",
    "Só que na escola ninguém dava nota pra isso. Eu sentava no fundão desenhando o Roger Rabbit no caderno enquanto o professor passava matéria, e o boletim era um desastre. Fui expulso de cinco escolas e até hoje travo na tabuada do oito. A única coisa em que eu me destacava de verdade era o desenho, e foi isso que eu fui estudar, primeiro quadrinhos na ABRA e depois publicidade.",
    "O computador entrou na minha vida pelo meu tio Mário, que era técnico de Mac. Ganhei um 486, aprendi HTML, depois FrontPage e Flash, e foi ali que juntei as duas coisas de que eu mais gostava.",
    "Só que para pagar as contas eu trabalhava de office boy numa multinacional, e um moleque magrelo, de skate e cabelo roxo, não combinava nada com aquele lugar, muito menos com um plano de carreira que terminava numa mesa de escritório. Pedi as contas, vendi BIP, fiz bico de pintor, até que um conhecido me levou para uma agência que fazia sites. Era a Paintbox, em 1997, e eu nunca mais saí desse mercado.",
    "Entrei como diretor de arte júnior e cheguei a diretor de criação, passando por casas como McCann, W/Brasil, AgênciaClick e a Tribo, que atendia o Grupo Ogilvy. Peguei projeto para fora do país, da Alemanha ao Japão, e ganhei prêmio em Cannes e no Clio.",
    "Quando o e-commerce começou a crescer no Brasil, me mudei para o Rio para ser head de design da Americanas.com, passei pelo Shoptime e depois assumi a mesma função na Netshoes. No varejo, ninguém na reunião queria saber se a tela tinha ficado bonita. Queriam saber se vendeu mais, se diminuiu a ligação no atendimento e se o cliente voltou a comprar, e eu passei a julgar meu próprio trabalho pelas mesmas perguntas.",
    "Depois de tantos anos entre agência e varejo, a rotina me cansou. As madrugadas que eram divertidas aos vinte e poucos viraram obrigação, e o ego de muita gente da área pesava mais do que o trabalho. Tentei abrir agência de site duas vezes, uma com meu pai e outra com um amigo da família, e as duas sociedades acabaram mal.",
    "Então resolvi apostar num negócio físico e montei do zero a Tattoaria, um estúdio de tatuagem. Em menos de dois anos ela faturava em média R$ 400 mil por mês, tinha saído na Veja, no Estadão e no Pequenas Empresas & Grandes Negócios e estava com estúdio montado dentro do Lollapalooza. Eu cuidei do conceito, da marca, do posicionamento e do crescimento, e pela primeira vez cada decisão de design mexia direto no meu bolso. ([O case completo está aqui.](/projects/tattoaria))",
    "Em 2020 veio a pandemia e fechou tudo. Saí com dívidas e processos para resolver e voltei a trabalhar com design, com a sensação de que tinha ficado tempo demais fora do mercado. Precisava de dinheiro, então passei a aceitar praticamente qualquer projeto, pelo valor que aparecesse.",
    "Num desses trabalhos, um cliente que instalava redes de proteção em janelas e sacadas me pediu três sites para entregar num único fim de semana. Cobrei uns R$ 2.500 pelos três porque precisava do dinheiro. Passei o sábado e o domingo fazendo os sites e entreguei tudo.",
    "Mas aquilo ficou na minha cabeça. Eu já tinha feito projeto para Nike e Embratel, passado por grandes agências, liderado design no varejo e construído meu próprio negócio, e naquele fim de semana estava ali, recebendo um briefing e executando, como se nada dessa experiência tivesse importância.",
    "Depois disso, comecei a repensar a maneira como me apresentava e os trabalhos que aceitava, e fui estudar posicionamento. Passei a mostrar aos clientes o raciocínio por trás de cada decisão e entendi que meu trabalho não podia começar só depois que alguém já tinha decidido o que fazer. Aos poucos os clientes mudaram, e hoje escolho com quem trabalho e cobro o que o projeto vale.",
    "Agora eu entro antes de o briefing estar fechado, ajudo a decidir o que vale a pena construir e depois coloco a mão na massa até o projeto estar no ar. Já estive em reunião em que se decidiu construir a coisa errada e ninguém abriu a boca.",
  ],
  closing: "Hoje sou eu quem fala.",
  workTitle: "Vamos conversar?",
  work: "Se você tem uma decisão grande para tomar, me chama antes. Depois que tudo está decidido, eu ajudo a consertar, mas aí custa mais caro.",
  lists: [
    {
      title: "Experiência",
      groups: [
        { label: "Agências", items: AGENCIAS },
        { label: "Varejo e e-commerce", items: VAREJO },
        { label: "Negócio próprio", items: ["Tattoaria (2015–2020)"] },
        { label: "Hoje", items: ["Independente"] },
      ],
    },
    {
      title: "Prêmios e reconhecimento",
      groups: [
        {
          items: [
            "Cannes Lions 2014 · Prata · Cyber",
            "Clio Awards 2009",
            "Orpetron X3 2024",
            "Webflow Partner",
            "Framer PRO Partner",
            "Embaixador Dora",
          ],
        },
      ],
    },
    {
      title: "Ensino e conteúdo",
      groups: [
        {
          items: [
            "UI design e Framer · Pixelados",
            "Mentor de UI design · Designer Singular",
            "YouTube @falabondioli · 31 mil inscritos",
          ],
        },
      ],
    },
  ],
  brandsTitle: "Marcas",
}

const en: InfoContent = {
  aboutLabel: "About",
  photoAlt: "Rodrigo Bondioli on stage in a black shirt, tattooed arms, speaking with a clicker in hand next to a large screen.",
  lead: "I started out building websites in FrontPage, in 1997. I worked at some of the biggest agencies in Brazil, was head of design at Americanas.com and Netshoes, built a business that grew very fast and watched the pandemic shut its doors. All of that shaped what I offer today: good judgement.",
  storyTitle: "Pull up a chair. This might take a minute.",
  story: [
    "There was never money to spare at home, but there was art in every corner. My grandmother was a visual artist who painted and sculpted, and together with my mother she melted down materials in the backyard oven to make costume jewellery to sell at craft fairs. My mother also made dolls and lamps, and played the piano so well that every party ended with someone asking her to play Pink Floyd, even though she was dying of embarrassment. Among uncles and cousins, everyone played something, and I grew up thinking it was normal to spend the whole day making things.",
    "At school, though, nobody gave grades for that. I sat in the back row drawing Roger Rabbit in my notebook while the teacher went through the lesson, and my report card was a disaster. I was expelled from five schools and to this day I stall on the eight times table. The one thing I really stood out at was drawing, and that's what I went on to study, first comics at ABRA and then advertising.",
    "Computers came into my life through my uncle Mário, who was a Mac technician. I got a 486, learned HTML, then FrontPage and Flash, and that's where I brought together the two things I loved most.",
    "But to pay the bills I worked as an office messenger at a multinational company, and a skinny kid with a skateboard and purple hair didn't fit that place at all, let alone a career plan that ended at an office desk. I quit, sold pagers, picked up jobs as a house painter, until someone I knew took me to an agency that made websites. That was Paintbox, in 1997. I've been in the industry ever since.",
    "I started as a junior art director and made it to creative director, working at shops like McCann, W/Brasil, AgênciaClick and Tribo, which served Grupo Ogilvy. I took on projects abroad, from Germany to Japan, and won awards at Cannes and the Clio.",
    "When e-commerce started to grow in Brazil, I moved to Rio to be head of design at Americanas.com, went through Shoptime and then took the same role at Netshoes. In retail, nobody in the meeting wanted to know whether the screen looked good. They wanted to know whether it drove more sales, reduced customer service calls and brought customers back. I started holding my own work to the same standard.",
    "After so many years between agencies and retail, the routine wore me out. The all-nighters that were fun in my early twenties became an obligation, and a lot of people's egos weighed more than the work. I tried to open a web agency twice, once with my father and once with a family friend, and both partnerships ended badly.",
    "So I decided to bet on a physical business and built Tattoaria, a tattoo studio, from scratch. Within two years, it was bringing in an average of R$400,000 a month in revenue, had been featured in Veja, Estadão and Pequenas Empresas & Grandes Negócios, and had a studio set up inside Lollapalooza. I took care of the concept, the brand, the positioning and the growth, and for the first time, every design decision had a direct impact on my own bottom line. ([The full case study is here.](/projects/tattoaria))",
    "In 2020 the pandemic came and shut everything down. I walked away with debts and lawsuits to sort out and went back to working in design, feeling like I'd been out of the market for too long. I needed money, so I started taking pretty much any project, for whatever it paid.",
    "On one of those jobs, a client who installed safety nets on windows and balconies asked me for three websites, delivered in a single weekend. I charged about R$2,500 for all three because I needed the money. I spent Saturday and Sunday building the sites and delivered everything.",
    "But it stuck with me. I had already done projects for Nike and Embratel, worked at big agencies, led design in retail and built my own business, and that weekend there I was, taking a brief and executing it, as if none of that experience mattered.",
    "After that, I started rethinking how I presented myself and which projects I took on. I began learning more about positioning and showing clients the thinking behind my decisions, and I understood that my work couldn't start only after someone had already decided what to do. Over time, the kind of clients I attracted changed, and today I choose who I work with and charge what the project is worth.",
    "Now I come in before the brief is closed, help decide what's worth building and then get my hands dirty until the project is live. I've sat in meetings where the wrong thing got approved and no one said a word.",
  ],
  closing: "Today I'm the one who speaks up.",
  workTitle: "Let's talk.",
  work: "If you have a big decision to make, get in touch before you make it. Once everything is decided, I can help fix it, but by then it costs more.",
  lists: [
    {
      title: "Experience",
      groups: [
        { label: "Agencies", items: AGENCIAS.map((a) => a.replace("(Itália)", "(Italy)")) },
        { label: "Retail & e-commerce", items: VAREJO },
        { label: "Own business", items: ["Tattoaria (2015–2020)"] },
        { label: "Today", items: ["Independent"] },
      ],
    },
    {
      title: "Awards & recognition",
      groups: [
        {
          items: [
            "Cannes Lions 2014 · Silver · Cyber",
            "Clio Awards 2009",
            "Orpetron X3 2024",
            "Webflow Partner",
            "Framer PRO Partner",
            "Dora Ambassador",
          ],
        },
      ],
    },
    {
      title: "Teaching & content",
      groups: [
        {
          items: [
            "UI design and Framer · Pixelados",
            "UI design mentor · Designer Singular",
            "YouTube @falabondioli · 31K subscribers",
          ],
        },
      ],
    },
  ],
  brandsTitle: "Brands",
}

export const info: Record<Lang, InfoContent> = { en, pt }
