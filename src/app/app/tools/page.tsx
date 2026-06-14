import Link from "next/link";

import { ToolsExplorer } from "@/components/workspace/tools-explorer";
import { approxToolCount } from "@/data/tools";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Todas las herramientas — AI Workspace Hub",
};

export default function AllToolsPage() {
  return (
    <>
      {/* Cabecera con mesh gradient sutil (firma visual) */}
      <div className="relative -mx-4 mb-8 overflow-hidden px-4 py-8 sm:-mx-6 sm:px-6">
        <div
          className="mesh-bg pointer-events-none absolute inset-0 -z-10"
          aria-hidden
        />
        <nav className="mb-3 text-xs text-fg-subtle" aria-label="Migas de pan">
          <Link
            href={routes.dashboard}
            className="transition-colors hover:text-fg"
          >
            Inicio
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-fg-muted">Herramientas</span>
        </nav>
        <h1 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-5xl">
          Todas las herramientas
        </h1>
        <p className="mt-2 max-w-xl text-fg-muted">
          Explora {approxToolCount()} herramientas de IA. Filtra por categoría,
          precio o busca al instante.
        </p>
      </div>

      <ToolsExplorer />
    </>
  );
}
