import Link from "next/link";

import { FavoriteButton } from "@/components/favorite-button";
import { ToolLogo } from "@/components/tool-logo";
import { getCategoryLabel } from "@/data/categories";
import { getPricing, PRICING_BADGE_CLASS, PRICING_LABEL } from "@/data/pricing";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

/**
 * Tarjeta de herramienta (estilo directorio). Toda la superficie enlaza a la
 * ficha; el botón de favorito detiene la propagación. Hover con elevación y
 * glow cian — la única licencia visual atrevida, usada con intención.
 */
export function ToolCard({ tool }: { tool: Tool }) {
  const pricing = getPricing(tool.slug);

  return (
    <Link
      href={routes.tool(tool.slug)}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-bg-subtle p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:bg-bg-muted hover:shadow-xl hover:shadow-accent-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <ToolLogo tool={tool} size="md" />
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-medium",
              PRICING_BADGE_CLASS[pricing],
            )}
          >
            {PRICING_LABEL[pricing]}
          </span>
          <FavoriteButton slug={tool.slug} />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
          {tool.name}
        </h3>
        <p className="mt-0.5 text-xs text-fg-subtle">
          {getCategoryLabel(tool.categories[0])}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-fg-muted">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
