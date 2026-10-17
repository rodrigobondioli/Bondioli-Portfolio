import type { MetadataRoute } from "next"
import { SITE } from "@/i18n"

/** O robots.txt (17/10, auditoria de SEO: o site não tinha). Tudo liberado,
 *  menos a rota do formulário; aponta pro sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE}/sitemap.xml`,
  }
}
