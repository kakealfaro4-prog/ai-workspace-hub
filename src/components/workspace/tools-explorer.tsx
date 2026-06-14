"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState, ToolGrid } from "@/components/tool-grid";
import { CATEGORIES, getCategoryLabel } from "@/data/categories";
import { TOOLS } from "@/data/tools";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/types/tool";

type Filter = CategoryId | "all";

/**
 * Explorador de "Todas las herramientas": filtra el catálogo en vivo por texto
 * y por categoría (chips). Todo en cliente — instantáneo para 162 herramientas.
 */
export function ToolsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      if (category !== "all" && !tool.categories.includes(category)) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        tool.name,
        tool.description,
        ...tool.tags,
        ...tool.categories,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category]);

  return (
    <div>
      <div className="mb-5 space-y-4">
        {/* Buscador en página */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-bg-subtle px-3 py-2.5 transition-colors focus-within:border-border-strong">
          <Search className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por nombre, descripción o etiqueta…"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
            aria-label="Filtrar herramientas"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="text-fg-subtle transition-colors hover:text-fg"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>

        {/* Chips de categoría */}
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            Todas
          </CategoryChip>
          {CATEGORIES.map((c) => (
            <CategoryChip
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </CategoryChip>
          ))}
        </div>
      </div>

      {/* Recuento */}
      <p className="mb-4 text-sm text-fg-subtle">
        {filtered.length}{" "}
        {filtered.length === 1 ? "herramienta" : "herramientas"}
        {category !== "all" && (
          <>
            {" "}
            en <span className="text-fg-muted">{getCategoryLabel(category)}</span>
          </>
        )}
        {query && (
          <>
            {" "}
            para «<span className="text-fg-muted">{query}</span>»
          </>
        )}
      </p>

      {filtered.length > 0 ? (
        <ToolGrid tools={filtered} />
      ) : (
        <EmptyState
          title="Sin resultados"
          description="Prueba con otra búsqueda o cambia de categoría."
        />
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        active
          ? "border-accent bg-accent-soft text-fg"
          : "border-border bg-bg-subtle text-fg-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
