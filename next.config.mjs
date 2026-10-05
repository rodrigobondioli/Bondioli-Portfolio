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

  /* Slug sem acento desde 05/10. A URL antiga pode chegar crua ("ã") ou
     codificada ("%C3%A3"), dependendo de quem a montou — as duas vão pra
     nova com 301, que é o que os buscadores leem como mudança permanente. */
  async redirects() {
    return [
      { source: "/projects/amor-de-c%C3%A3o", destination: "/projects/amor-de-cao", statusCode: 301 },
      { source: "/projects/amor-de-cão", destination: "/projects/amor-de-cao", statusCode: 301 },
    ]
  },
}
export default nextConfig
