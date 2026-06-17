import type { MetadataRoute } from "next";

import { CATEGORIES } from "@/data/categories";
import { TOOLS } from "@/data/tools";
import { routes } from "@/lib/routes";

const SITE_URL = "https://getaitoolshub.com";

/**
 * Mapa del sitio para los buscadores. Lista las páginas indexables: la landing,
 * el listado de herramientas, cada herramienta (SSG) y cada categoría. Next lo
 * sirve automáticamente en /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${routes.tools}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE_URL}${routes.tool(tool.slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${SITE_URL}${routes.category(category.id)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...categoryPages];
}
