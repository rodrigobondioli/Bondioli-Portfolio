import { dict, SITE, type Lang } from "@/i18n"

/**
 * Dados estruturados do Rodrigo (schema.org Person, 17/10, SEO): ajudam o
 * Google a juntar o site e as redes como a mesma pessoa. Vai na capa e na
 * /info, nas duas línguas, sempre com o mesmo `@id`.
 *
 * Só fatos que já estão no site. A foto é a de rosto de frente
 * (`rodrigo-rosto.jpg`, cópia leve do Profile-Quadrado): de perfil o Google
 * reconhece pior — escolha do Rodrigo. As redes são as mesmas da barra e
 * da capa; mudou lá, muda aqui.
 */
export default function PersonJsonLd({ lang }: { lang: Lang }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Rodrigo Bondioli",
    jobTitle: dict[lang].role,
    url: SITE,
    image: `${SITE}/images/rodrigo-rosto.jpg`,
    email: "mailto:hello@rodrigobondioli.com",
    address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
    sameAs: [
      "https://www.linkedin.com/in/bondioli/",
      "https://www.youtube.com/@falabondioli",
      "https://falabondioli.substack.com/",
      "https://x.com/falabondioli",
      "https://www.instagram.com/falabondioli/",
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
}
