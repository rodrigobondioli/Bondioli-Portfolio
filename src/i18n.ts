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
const EM_PT = new Set(["/", "/work", "/thanks", "/projects/tattoaria"])

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
    soon: "Coming soon",
    email: "Email",
  },
  social: "Social",
  langLabel: "Language",
  themeTo: (tema: "light" | "dark") => `Switch to ${tema} mode`,

  home: {
    title: "Rodrigo Bondioli · Creative Director",
    bio: "20+ years working across advertising, branding and digital products. Today I work at the intersection of strategy, design and technology, helping turn complex ideas into clear, relevant and future-ready products and brands.",
    getInTouch: "Get in touch:",
  },

  work: {
    title: "Work",
    description:
      "Selected work: brand, product and interface for startups and global brands. Work that started with a problem, not a prompt.",
    manifestoLabel: "No point of view, no project.",
    manifesto:
      "Everyone is a prompt designer now. The result? Work that looks like it came from the same machine—because it did. I use the same tools. The difference is what I bring to them: a point of view, a problem worth solving, and the craft to make the answer feel inevitable. If you want fast and forgettable, plenty of people are waiting for your brief.",
    selectedWork: "Selected work",
    contentCreator: "Content creator",
    subscribers: "31K subscribers",
    noBullshit: "No bullshit",
  },

  showcase: {
    services: "Services",
    caseTag: "(case study)",
    viewCase: "View case study",
  },

  about: {
    title: "I’m Rodrigo Bondioli",
    body: "Big projects rarely fail because of execution. They fail because someone chose to build the wrong thing, and no one in the room had the nerve to say so. I’ve been in that room. I was Head of Creative at Netshoes and Americanas.com, two of Brazil’s largest digital businesses. Before that, I spent years at agencies including Wunderman Thompson and McCann. You’re hiring my judgment. I join the conversation where decisions are made, speak up before the wrong call becomes an expensive problem, and stay through launch—until the brand, product, and experience work as one.",
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
    submit: "Start with the problem",
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

  footer: {
    signature: "Always made with love",
    home: "Rodrigo Bondioli — home",
    md: "Download portfolio as Markdown (.md)",
    mdTitle: "Download portfolio (.md)",
  },

  pill: "See if we’re a fit",
  loading: "Loading",
  soundOn: "Sound on",
  soundOff: "Sound off",

  thanks: {
    title: "Thanks",
    a: "Thanks for getting in touch.",
    b: "I’ll get back to you soon.",
  },

  caseUi: {
    allProjects: "All projects",
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
    soon: "Em breve",
    email: "E-mail",
  },
  social: "Redes",
  langLabel: "Idioma",
  themeTo: (tema) => `Mudar pro modo ${tema === "light" ? "claro" : "escuro"}`,

  home: {
    title: "Rodrigo Bondioli · Diretor de Criação",
    bio: "Mais de 20 anos entre publicidade, branding e produtos digitais. Hoje eu trabalho no encontro entre estratégia, design e tecnologia, ajudando a transformar ideias complexas em produtos e marcas claros, relevantes e prontos pro futuro.",
    getInTouch: "Fale comigo:",
  },

  work: {
    title: "Portfólio",
    description:
      "Trabalhos selecionados: marca, produto e interface pra startups e marcas globais. Trabalho que começou com um problema, não com um prompt.",
    manifestoLabel: "Sem ponto de vista, sem projeto.",
    manifesto:
      "Todo mundo virou designer de prompt. O resultado? Trabalho que parece ter saído da mesma máquina—porque saiu. Eu uso as mesmas ferramentas. A diferença é o que eu levo pra elas: um ponto de vista, um problema que vale a pena resolver e o ofício pra fazer a resposta parecer inevitável. Se você quer rápido e esquecível, tem muita gente esperando o seu briefing.",
    selectedWork: "Selected work",
    contentCreator: "Criador de conteúdo",
    subscribers: "31 mil inscritos",
    noBullshit: "No bullshit",
  },

  showcase: {
    services: "Serviços",
    caseTag: "(case)",
    viewCase: "Ver o case",
  },

  about: {
    title: "Eu sou o Rodrigo Bondioli",
    body: "Projeto grande raramente dá errado na execução. Dá errado porque alguém escolheu construir a coisa errada, e ninguém na sala teve coragem de dizer. Eu já estive nessa sala. Fui Head de Criação da Netshoes e da Americanas.com, dois dos maiores negócios digitais do Brasil. Antes disso, passei anos em agências como Wunderman Thompson e McCann. Você está contratando o meu critério. Eu entro na conversa onde as decisões são tomadas, falo antes que a escolha errada vire um problema caro e fico até o lançamento—até a marca, o produto e a experiência funcionarem como uma coisa só.",
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
    submit: "Comece pelo problema",
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

  footer: {
    signature: "Sempre feito com amor",
    home: "Rodrigo Bondioli — início",
    md: "Baixar o portfólio em Markdown (.md)",
    mdTitle: "Baixar o portfólio (.md)",
  },

  pill: "Vamos ver se combina",
  loading: "Carregando",
  soundOn: "Som ligado",
  soundOff: "Som desligado",

  thanks: {
    title: "Obrigado",
    a: "Obrigado pelo contato.",
    b: "Eu te respondo em breve.",
  },

  caseUi: {
    allProjects: "Todos os projetos",
    objective: "Objetivo",
    numbers: "Números",
    closing: "Fecho",
    newTab: " (abre em nova aba)",
  },
}

export const dict: Record<Lang, Dict> = { en, pt }
