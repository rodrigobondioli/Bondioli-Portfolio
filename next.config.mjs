/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Sem `output: "export"`.
   *
   * O site continua pré-gerado — todas as páginas saem estáticas no build,
   * inclusive as 11 de projeto. O que muda é que agora existe UMA rota de
   * servidor: /api/contact, que manda o formulário por e-mail. Export puro
   * não compila rota nenhuma, e sem ela o formulário dependia do visitante
   * ter cliente de e-mail configurado.
   *
   * Custo disso: o deploy deixa de ser "uma pasta de arquivos" e passa a
   * ser um app Next na Vercel. Na prática, mesmo desempenho.
   */
  images: {
    // as imagens são <img> comuns e já vêm pré-otimizadas do build de assets
    unoptimized: true,
  },
  trailingSlash: false,
  // a 404 global (app/global-not-found.tsx): com dois layouts raiz, é o
  // jeito de a URL inexistente ter idioma e caminho de volta (17/10)
  experimental: { globalNotFound: true },

  /* Metadados no <head> também pro Googlebot (17/10, auditoria de SEO). O
     Next 15 manda título e descrição por streaming, no fim do HTML, pra
     quem não está nesta lista — e o Googlebot não estava: o Google lê
     assim mesmo, mas no <head> é o caminho sem risco. A lista é a padrão
     do Next (html-bots.js, 15.5) + Googlebot. */
  htmlLimitedBots:
    /Googlebot|[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight/i,

  /* Slug sem acento desde 05/10. A URL antiga pode chegar crua ("ã") ou
     codificada ("%C3%A3"), dependendo de quem a montou — as duas vão pra
     nova com 301, que é o que os buscadores leem como mudança permanente. */
  async redirects() {
    return [
      { source: "/projects/amor-de-c%C3%A3o", destination: "/projects/amor-de-cao", statusCode: 301 },
      { source: "/projects/amor-de-cão", destination: "/projects/amor-de-cao", statusCode: 301 },
      // cases tirados do ar em 12/10/2026 (ficam como rascunho no projects.json);
      // 307 e não 301, porque podem voltar
      { source: "/projects/filmboss", destination: "/work", statusCode: 307 },
      { source: "/projects/ccarbon", destination: "/work", statusCode: 307 },
      // Flashbang saiu do ar em 14/10/2026 (mesmo esquema)
      { source: "/projects/flashbang", destination: "/work", statusCode: 307 },
      { source: "/projects/tilt-tech", destination: "/work", statusCode: 307 },
      // Morpho saiu da lista em 16/10/2026 (deu lugar ao Orbness)
      { source: "/projects/morpho", destination: "/work", statusCode: 307 },
      // a página "Info" (16/10) atende pelos dois nomes; o endereço é /info
      { source: "/about", destination: "/info", statusCode: 301 },
      { source: "/pt/about", destination: "/pt/info", statusCode: 301 },
    ]
  },
}
export default nextConfig
