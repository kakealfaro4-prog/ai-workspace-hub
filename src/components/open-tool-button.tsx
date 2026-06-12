"use client";

import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWorkspace } from "@/lib/workspace-context";
import type { Tool } from "@/types/tool";

/**
 * Abre la herramienta en una pestaña nueva y registra el acceso en el historial.
 *
 * Nota de diseño: NO usamos iframe. La mayoría de herramientas (ChatGPT,
 * Claude, Gemini...) envían `X-Frame-Options`/`frame-ancestors` que impiden
 * incrustarlas. Abrir en pestaña nueva con `noopener,noreferrer` es la opción
 * correcta y segura para la v1 web.
 */
export function OpenToolButton({
  tool,
  variant = "primary",
  className,
}: {
  tool: Tool;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const { recordAccess } = useWorkspace();

  const handleOpen = (e: React.MouseEvent) => {
    // Si el botón vive dentro de una tarjeta enlazada, no navegues a la ficha.
    e.preventDefault();
    e.stopPropagation();
    recordAccess(tool.slug);
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors",
        variant === "primary" &&
          "bg-accent px-4 py-2 text-white hover:bg-accent-hover",
        variant === "ghost" &&
          "border border-border px-3 py-1.5 text-fg-muted hover:border-border-strong hover:text-fg",
        className,
      )}
    >
      Abrir herramienta
      <ExternalLink className="h-4 w-4" aria-hidden />
    </button>
  );
}
