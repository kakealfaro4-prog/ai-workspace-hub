import type { MetadataRoute } from "next";

const SITE_URL = "https://getaitoolshub.com";

/**
 * Indica a los buscadores que pueden rastrear todo el sitio y dónde está el
 * sitemap. Next lo sirve automáticamente en /robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
