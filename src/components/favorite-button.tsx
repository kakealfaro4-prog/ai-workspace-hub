"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWorkspace } from "@/lib/workspace-context";

export function FavoriteButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { isFavorite, toggleFavorite, ready } = useWorkspace();
  const active = isFavorite(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        // Evita navegar si el botón vive dentro de una tarjeta enlazada.
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      aria-pressed={active}
      aria-label={active ? "Quitar de favoritos" : "Añadir a favoritos"}
      title={active ? "Quitar de favoritos" : "Añadir a favoritos"}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-subtle transition-colors hover:bg-bg-muted hover:text-fg",
        active && "text-amber-400 hover:text-amber-400",
        !ready && "opacity-50",
        className,
      )}
    >
      <Star
        className="h-4 w-4"
        fill={active ? "currentColor" : "none"}
        aria-hidden
      />
    </button>
  );
}
