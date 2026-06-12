import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

// Paleta de acentos para los monogramas. El índice se deriva del slug de forma
// determinista, así cada herramienta tiene siempre el mismo color.
const PALETTE = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#14b8a6",
  "#a855f7",
];

function colorForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

function monogram(name: string): string {
  const clean = name.replace(/[^\p{L}\p{N} ]/gu, "").trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

/**
 * Logo provisional: monograma sobre un cuadrado con color de marca derivado
 * del slug. Cuando se disponga de logos reales, este componente es el único
 * punto que habría que cambiar.
 */
export function ToolLogo({
  tool,
  size = "md",
  className,
}: {
  tool: Tool;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const color = colorForSlug(tool.slug);
  const sizes = {
    sm: "h-9 w-9 text-xs rounded-lg",
    md: "h-11 w-11 text-sm rounded-xl",
    lg: "h-16 w-16 text-lg rounded-2xl",
  } as const;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-semibold text-white shadow-sm",
        sizes[size],
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      }}
      aria-hidden
    >
      {monogram(tool.name)}
    </div>
  );
}
