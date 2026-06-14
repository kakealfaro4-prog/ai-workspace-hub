"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Link2,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { FavoriteButton } from "@/components/favorite-button";
import { OpenToolButton } from "@/components/open-tool-button";
import { ToolLogo } from "@/components/tool-logo";
import { getCategoryLabel } from "@/data/categories";
import { getPricing, PRICING_BADGE_CLASS, PRICING_LABEL } from "@/data/pricing";
import { getToolBySlug, TOOLS } from "@/data/tools";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * Panel lateral ("peek") que se abre al hacer clic en una tarjeta.
 * - Persistencia por URL: ?toolId=slug (recargar/compartir mantiene el panel).
 * - Modo sidebar (~38%) ↔ expandido (~90%) en escritorio; fullscreen en móvil.
 * - Navegación fluida: flechas ◀ ▶, teclado (Esc, ←, →) y relacionadas.
 *
 * Va montado en el layout de /app (envuelto en <Suspense> por useSearchParams).
 */
export function ToolPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();

  const slug = searchParams.get("toolId");
  const tool = slug ? getToolBySlug(slug) : undefined;
  const open = Boolean(tool);

  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const index = tool ? TOOLS.findIndex((t) => t.slug === tool.slug) : -1;
  const prev = index > 0 ? TOOLS[index - 1] : null;
  const next =
    index >= 0 && index < TOOLS.length - 1 ? TOOLS[index + 1] : null;

  const related = tool
    ? TOOLS.filter(
        (t) =>
          t.slug !== tool.slug &&
          t.categories.some((c) => tool.categories.includes(c)),
      ).slice(0, 5)
    : [];

  const goTo = useCallback(
    (s: string) => router.replace(`${pathname}?toolId=${s}`, { scroll: false }),
    [router, pathname],
  );
  const close = useCallback(
    () => router.replace(pathname, { scroll: false }),
    [router, pathname],
  );

  // Teclado: Esc cierra, ←/→ navegan por el catálogo.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft" && prev) goTo(prev.slug);
      else if (e.key === "ArrowRight" && next) goTo(next.slug);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, goTo, prev, next]);

  // Bloquea el scroll del fondo mientras el panel está abierto.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setCopied(false), [slug]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${pathname}?toolId=${slug}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // El portapapeles puede no estar disponible; lo ignoramos.
    }
  };

  const pricing = tool ? getPricing(tool.slug) : "freemium";

  return (
    <AnimatePresence>
      {open && tool && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <motion.aside
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={tool.name}
            className={cn(
              "fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-border bg-bg-base shadow-2xl transition-[width,max-width] duration-300 ease-out",
              expanded ? "lg:w-[90%]" : "lg:w-[38%] lg:min-w-[440px]",
            )}
          >
            {/* Cabecera de controles */}
            <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
              <div className="flex items-center gap-0.5">
                <IconBtn
                  label="Anterior (←)"
                  disabled={!prev}
                  onClick={() => prev && goTo(prev.slug)}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </IconBtn>
                <IconBtn
                  label="Siguiente (→)"
                  disabled={!next}
                  onClick={() => next && goTo(next.slug)}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </IconBtn>
              </div>
              <div className="flex items-center gap-0.5">
                <IconBtn
                  label={copied ? "¡Copiado!" : "Copiar enlace"}
                  onClick={copyLink}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent" aria-hidden />
                  ) : (
                    <Link2 className="h-4 w-4" aria-hidden />
                  )}
                </IconBtn>
                <IconBtn
                  label={expanded ? "Contraer" : "Expandir"}
                  onClick={() => setExpanded((e) => !e)}
                  className="hidden lg:inline-flex"
                >
                  {expanded ? (
                    <Minimize2 className="h-4 w-4" aria-hidden />
                  ) : (
                    <Maximize2 className="h-4 w-4" aria-hidden />
                  )}
                </IconBtn>
                <IconBtn label="Cerrar (Esc)" onClick={close}>
                  <X className="h-4 w-4" aria-hidden />
                </IconBtn>
              </div>
            </div>

            {/* Contenido (cross-fade al cambiar de herramienta) */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tool.slug}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="mx-auto max-w-2xl p-6 sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <ToolLogo tool={tool} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
                          {tool.name}
                        </h2>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                            PRICING_BADGE_CLASS[pricing],
                          )}
                        >
                          {PRICING_LABEL[pricing]}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {tool.categories.map((c) => (
                          <Link
                            key={c}
                            href={routes.category(c)}
                            onClick={close}
                            className="rounded-md bg-bg-muted px-2 py-1 text-xs text-fg-muted transition-colors hover:text-fg"
                          >
                            {getCategoryLabel(c)}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <FavoriteButton slug={tool.slug} />
                  </div>

                  <p className="mt-5 text-fg-muted">{tool.description}</p>

                  {tool.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tool.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2.5 py-0.5 text-xs text-fg-subtle"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <OpenToolButton tool={tool} variant="primary" />
                    <Link
                      href={routes.tool(tool.slug)}
                      onClick={close}
                      className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                    >
                      Ver ficha completa
                    </Link>
                  </div>

                  {related.length > 0 && (
                    <div className="mt-8">
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fg-subtle">
                        Relacionadas
                      </h3>
                      <div className="space-y-1">
                        {related.map((rt) => (
                          <button
                            key={rt.slug}
                            type="button"
                            onClick={() => goTo(rt.slug)}
                            className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-bg-subtle"
                          >
                            <ToolLogo tool={rt} size="sm" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm text-fg">
                                {rt.name}
                              </span>
                              <span className="block truncate text-xs text-fg-subtle">
                                {getCategoryLabel(rt.categories[0])}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function IconBtn({
  label,
  onClick,
  disabled,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent",
        className,
      )}
    >
      {children}
    </button>
  );
}
