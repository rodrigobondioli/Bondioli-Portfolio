/**
 * As duas línguas do site (16/10/2026, pedido do Rodrigo): inglês na raiz,
 * português em /pt — uma URL cada. Todo texto que aparece na tela mora
 * aqui, nos dois idiomas lado a lado, pra nenhum ficar pra trás.
 *
 * O que é mais expressivo em inglês fica em inglês no português também
 * ("Selected work", "No bullshit") — pedido do Rodrigo (16/10).
 *
 * REGRA: toda alteração vale pras duas versões. Texto novo entra nas duas
 * chaves ao mesmo tempo; o TypeScript reclama se o português faltar.
 *
 * O media kit e as páginas de projeto sem case continuam só em inglês.
 */

export type Lang = "en" | "pt"

/** O caminho da mesma página na língua pedida: "/work" → "/pt/work". */
export function href(lang: Lang, path: string) {
  if (lang === "en") return path
  return path === "/" ? "/pt" : `/pt${path}`
}

/* As páginas que existem em português. As outras (media kit, projetos sem
   case) mandam o BR pra /pt/work, a vitrine. */
const EM_PT = new Set(["/", "/work", "/info", "/playground", "/contact", "/thanks", "/projects/tattoaria"])

/** Pro EN / BR da barra: o endereço da página atual na outra língua. */
export function trocarLingua(pathname: string, para: Lang) {
  const sem = pathname.replace(/^\/pt(?=\/|$)/, "") || "/"
  if (para === "en") return sem
  return EM_PT.has(sem.replace(/\/$/, "") || "/") ? href("pt", sem) : "/pt/work"
}

/** Os dois endereços da página, pro Google (hreflang) e pro canônico. */
export function alternates(lang: Lang, path: string) {
  return {
    canonical: href(lang, path),
    languages: { en: path, "pt-BR": href("pt", path), "x-default": path },
  }
}

export const SITE = "https://rodrigobondioli.com"

/* A imagem de prévia (WhatsApp, LinkedIn…) de cada página, 1200×630, em
   public/og/ — feitas de fotos que já estão no site (17/10, auditoria de
   SEO: só o case tinha prévia com imagem). */
const OG_IMAGEM: Record<string, string> = {
  "/": "/og/home.jpg",
  "/work": "/og/work.jpg",
  "/info": "/og/info.jpg",
  "/contact": "/og/contact.jpg",
  "/playground": "/og/playground.jpg",
  "/projects/tattoaria": "/og/tattoaria.jpg",
}

/** O Open Graph de uma página: a URL dela (antes era sempre a da capa), o
 *  idioma, o tipo e a imagem de prévia. Título e descrição o Next completa
 *  com os da página. */
export function og(lang: Lang, path: string, tipo: "website" | "article" = "website") {
  const imagem = OG_IMAGEM[path]
  return {
    type: tipo,
    url: SITE + (href(lang, path) === "/" ? "" : href(lang, path)),
    siteName: "Rodrigo Bondioli",
    locale: lang === "pt" ? "pt_BR" : "en_US",
    alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
    ...(imagem ? { images: [{ url: imagem, width: 1200, height: 630 }] } : {}),
  }
}

/* Os serviços de cada projeto vêm do projects.json, em inglês. A tradução
   é por termo; o que não estiver aqui aparece como está. */
const SERVICOS_PT: Record<string, string> = {
  Brand: "Marca",
  Interface: "Interface",
  "Framer Development": "Desenvolvimento em Framer",
  "Product Strategy": "Estratégia de produto",
  "Design Leadership": "Liderança de design",
  Positioning: "Posicionamento",
  Growth: "Crescimento",
  "Art Direction": "Direção de arte",
  "UX Architecture": "Arquitetura de UX",
  "Marketing design": "Design de marketing",
  "Visual system": "Sistema visual",
}
export const servico = (lang: Lang, termo: string) =>
  lang === "pt" ? SERVICOS_PT[termo] ?? termo : termo

const en = {
  role: "Creative Director",
  place: "São Paulo, Brazil",
  emailCopied: "Email copied",
  couldNotCopy: "Could not copy",
  copyEmail: "Copy email",
  nav: {
    menu: "Menu",
    close: "Close",
    projects: "Projects",
    info: "Info",
    playground: "Playground",
    contact: "Contact",
  },
  social: "Social",
  langLabel: "Language",
  themeTo: (tema: "light" | "dark") => `Switch to ${tema} mode`,

  home: {
    title: "Rodrigo Bondioli · Creative Director",
    // a descrição pro Google (17/10, texto do Rodrigo); a bio fica na tela
    description: "Creative Director with 20+ years across agencies, retail and my own business. I help decide what’s worth building, then build it.",
    bio: "20+ years working across advertising, branding and digital products. Today I work at the intersection of strategy, design and technology, helping turn complex ideas into clear, relevant and future-ready products and brands.",
    getInTouch: "Get in touch:",
  },

  work: {
    title: "Work",
    description:
      "Selected work by Rodrigo Bondioli: brand, product and interface for startups and global brands, including the Tattoaria case study.",
    selectedWork: "Selected work",
    caseStudy: "Case study",
    readCase: "Read the case study",
    /** o título da página, só pra leitor de tela e buscador (sr-only) */
    h1: "Rodrigo Bondioli — Creative Director. Work",
    /** o rótulo do topo, na linha da barra, como nas outras páginas */
    label: "Work",
  },

  info: {
    title: "Info",
    description:
      "Former head of design at Netshoes and Americanas.com. Rodrigo Bondioli, Creative Director in São Paulo, 20+ years in advertising, branding and products.",
  },

  playground: {
    title: "Playground",
    description: "Experiments, side projects and things I make for the fun of it.",
    lead: "Experiments, side projects and things I make for the fun of it. Coming soon.",
  },

  contact: {
    label: "Contact",
    title: "Tell me what you\u2019re building.",
    description:
      "Tell Rodrigo Bondioli what you\u2019re building: brand, product or website. No finished brief needed.",
    paragraphs: [
      "It could be a brand getting off the ground, a product that needs to get better, or a website that no longer keeps up with how the business is growing.",
      "You don\u2019t need to arrive with a finished brief. I\u2019d rather understand the problem before I start designing solutions.",
      "Tell me a little about what you have in mind in the form below, and we\u2019ll see if it makes sense to work together.",
    ],
    emailLabel: "Rather write an email?",
    photoAlt: "Rodrigo Bondioli at his desk, drawing on a pen tablet next to a laptop, in a bright room with plants and shelves.",
  },

  showcase: {
    services: "Services",
    caseTag: "(case study)",
    /** ao lado do projeto com case, na lista "Projects" da barra (17/10) */
    navTag: "(Case)",
    viewCase: "View case study",
  },

  about: {
    title: "I’m Rodrigo Bondioli",
    body: "Big projects rarely fail because of execution. They fail because someone chose to build the wrong thing, and no one in the room had the nerve to say so. I’ve been in that room. I was head of design at Netshoes and Americanas.com, two of Brazil’s largest digital businesses. Before that, I spent years at agencies including Wunderman Thompson and McCann. You’re hiring my judgement. I join the conversation where decisions are made, speak up before the wrong call becomes an expensive problem, and stay through launch—until the brand, product, and experience work as one.",
    brands: "Brands I've worked with",
    credentials: [
      ["Orpetron X3 / 2024", "Cannes Lion 2014 / Silver / Cyber"],
      ["Clio Awards / 2009", "UI Design mentor @ Designer Singular"],
      ["YouTube content creator", "Dora Ambassador"],
      ["Webflow Partner", "Framer PRO Partner"],
    ] as [string, string][],
  },

  closing: {
    struck: "Enough about me.",
    line: "Let’s talk about your next move.",
    titleA: "Your next",
    titleB: "decision.",
  },

  form: {
    name: "Name",
    email: "Email",
    question: "What decision are you facing?",
    situation: "Your situation",
    placeholder: "Ex: we're about to rebuild the brand and I don't want the obvious version.",
    submit: "Let\u2019s talk",
    sending: "Sending…",
    errName: "Tell me your name.",
    errEmail: "I need an address to reply to.",
    errEmailBad: "That address looks incomplete.",
    errBrief: "Even one line helps.",
    subject: (name: string) => (name ? `Decision — ${name}` : "Let's talk"),
    ok: "Got it — the message is in my inbox. I answer everything myself, usually within a day.",
    failA: "Something broke on the way out — my fault, not yours. Nothing was lost: write to",
    failB: ", or copy the message below and send it from wherever you like.",
    copied: "Copied",
    copy: "Copy message",
    retry: "Try again",
  },

  soundOn: "Sound on",
  soundOff: "Sound off",

  thanks: {
    title: "Thanks",
    a: "Thanks for getting in touch.",
    b: "I’ll get back to you soon.",
  },

  /** a página 404 (17/10, auditoria de SEO: era a padrão do Next, sem idioma) */
  notFound: { title: "Page not found.", back: "See the work" },

  caseUi: {
    objective: "Objective",
    numbers: "Numbers",
    closing: "Closing",
    newTab: " (opens in a new tab)",
  },
}

export type Dict = typeof en

const pt: Dict = {
  role: "Diretor de Criação",
  place: "São Paulo, Brasil",
  emailCopied: "E-mail copiado",
  couldNotCopy: "Não deu pra copiar",
  copyEmail: "Copiar o e-mail",
  nav: {
    menu: "Menu",
    close: "Fechar",
    projects: "Projetos",
    info: "Info",
    playground: "Playground",
    contact: "Contato",
  },
  social: "Redes",
  langLabel: "Idioma",
  themeTo: (tema) => `Mudar pro modo ${tema === "light" ? "claro" : "escuro"}`,

  home: {
    title: "Rodrigo Bondioli · Diretor de Criação",
    description: "Diretor de Criação com mais de 20 anos entre agências, varejo e negócio próprio. Ajudo a decidir o que vale construir e construo.",
    bio: "Mais de 20 anos entre publicidade, branding e produtos digitais. Hoje eu trabalho no encontro entre estratégia, design e tecnologia, ajudando a transformar ideias complexas em produtos e marcas claros, relevantes e prontos pro futuro.",
    getInTouch: "Fale comigo:",
  },

  work: {
    title: "Portfólio",
    description:
      "Trabalhos selecionados de Rodrigo Bondioli: marca, produto e interface para startups e marcas globais, incluindo o case da Tattoaria.",
    selectedWork: "Selected work",
    caseStudy: "Case study",
    readCase: "Ler o case",
    h1: "Rodrigo Bondioli — Diretor de Criação. Portfólio",
    label: "Portfólio",
  },

  info: {
    title: "Info",
    description:
      "Ex-head de design da Netshoes e da Americanas.com. Rodrigo Bondioli, Diretor de Criação em São Paulo, 20+ anos em publicidade, branding e produtos.",
  },

  playground: {
    title: "Playground",
    description: "Experimentos, projetos paralelos e coisas que eu faço pelo prazer de fazer.",
    lead: "Experimentos, projetos paralelos e coisas que eu faço pelo prazer de fazer. Em breve.",
  },

  contact: {
    label: "Contato",
    title: "Me conta o que você está construindo.",
    description:
      "Conta pro Rodrigo Bondioli o que você está construindo: marca, produto ou site. Não precisa de briefing pronto.",
    paragraphs: [
      "Pode ser uma marca saindo do papel, um produto que precisa melhorar ou um site que já não acompanha o crescimento do negócio.",
      "Não precisa chegar com o briefing pronto. Prefiro entender o problema antes de sair desenhando soluções.",
      "Me conta um pouco do que você tem em mente no formulário abaixo e a gente vê se faz sentido trabalhar juntos.",
    ],
    emailLabel: "Prefere mandar e-mail?",
    photoAlt: "Rodrigo Bondioli na mesa de trabalho, desenhando numa mesa digitalizadora ao lado de um notebook, numa sala clara com plantas e estantes.",
  },

  showcase: {
    services: "Serviços",
    caseTag: "(case)",
    navTag: "(Case)",
    viewCase: "Ver o case",
  },

  about: {
    title: "Eu sou o Rodrigo Bondioli",
    body: "Projeto grande raramente dá errado na execução. Dá errado porque alguém escolheu construir a coisa errada, e ninguém na sala teve coragem de dizer. Eu já estive nessa sala. Fui head de design da Netshoes e da Americanas.com, dois dos maiores negócios digitais do Brasil. Antes disso, passei anos em agências como Wunderman Thompson e McCann. Você está contratando o meu critério. Eu entro na conversa onde as decisões são tomadas, falo antes que a escolha errada vire um problema caro e fico até o lançamento—até a marca, o produto e a experiência funcionarem como uma coisa só.",
    brands: "Marcas com quem trabalhei",
    credentials: [
      ["Orpetron X3 / 2024", "Leão de Cannes 2014 / Prata / Cyber"],
      ["Clio Awards / 2009", "Mentor de UI Design @ Designer Singular"],
      ["Criador de conteúdo no YouTube", "Embaixador Dora"],
      ["Webflow Partner", "Framer PRO Partner"],
    ],
  },

  closing: {
    struck: "Chega de falar de mim.",
    line: "Vamos falar do seu próximo passo.",
    titleA: "Sua próxima",
    titleB: "decisão.",
  },

  form: {
    name: "Nome",
    email: "E-mail",
    question: "Que decisão você tem pela frente?",
    situation: "A sua situação",
    placeholder: "Ex: vamos refazer a marca e eu não quero a versão óbvia.",
    submit: "Vamos conversar",
    sending: "Enviando…",
    errName: "Me diz o seu nome.",
    errEmail: "Preciso de um endereço pra responder.",
    errEmailBad: "Esse endereço parece incompleto.",
    errBrief: "Uma linha já ajuda.",
    subject: (name) => (name ? `Decisão — ${name}` : "Vamos conversar"),
    ok: "Recebido — a mensagem está na minha caixa. Eu mesmo respondo tudo, normalmente em um dia.",
    failA: "Algo quebrou no caminho — culpa minha, não sua. Nada se perdeu: escreve pra",
    failB: ", ou copia a mensagem abaixo e manda de onde preferir.",
    copied: "Copiado",
    copy: "Copiar a mensagem",
    retry: "Tentar de novo",
  },

  soundOn: "Som ligado",
  soundOff: "Som desligado",

  thanks: {
    title: "Obrigado",
    a: "Obrigado pelo contato.",
    b: "Eu te respondo em breve.",
  },

  notFound: { title: "Página não encontrada.", back: "Ver o portfólio" },

  caseUi: {
    objective: "Objetivo",
    numbers: "Números",
    closing: "Fecho",
    newTab: " (abre em nova aba)",
  },
}

export const dict: Record<Lang, Dict> = { en, pt }
