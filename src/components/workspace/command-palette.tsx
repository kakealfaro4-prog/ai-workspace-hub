"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Folders,
  Grid3x3,
  LayoutDashboard,
  Search,
  Star,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { CategoryIcon } from "@/components/category-icon";
import { ToolLogo } from "@/components/tool-logo";
import { CATEGORIES, getCategoryLabel } from "@/data/categories";
import { searchTools } from "@/data/tools";
import { useCollections } from "@/lib/collections-context";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Group = "Herramientas" | "Categorías" | "Colecciones" | "Navegación";

interface CmdItem {
  key: string;
  group: Group;
  label: string;
  sublabel?: string;
  icon: ReactNode;
  onSelect: () => void;
}

const NAV = [
  { href: routes.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: routes.favorites, label: "Favoritos", icon: Star },
  { href: routes.recents, label: "Recientes", icon: Clock },
  { href: routes.tools, label: "Todas las herramientas", icon: Grid3x3 },
] as const;

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const { collections, enabled } = useCollections();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  // Atajo global Cmd/Ctrl+K + evento para abrir desde otros sitios.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen);
    };
  }, []);

  // Reinicia al abrir/cerrar.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const go = useCallback(
    (href: string) => {
      router.push(href, { scroll: false });
      setOpen(false);
    },
    [router],
  );

  const items = useMemo<CmdItem[]>(() => {
    const q = query.trim().toLowerCase();
    const out: CmdItem[] = [];

    searchTools(query)
      .slice(0, 6)
      .forEach((t) =>
        out.push({
          key: `tool-${t.slug}`,
          group: "Herramientas",
          label: t.name,
          sublabel: getCategoryLabel(t.categories[0]),
          icon: <ToolLogo tool={t} size="xs" />,
          onSelect: () => go(`${pathname}?toolId=${t.slug}`),
        }),
      );

    CATEGORIES.filter((c) => c.label.toLowerCase().includes(q))
      .slice(0, 5)
      .forEach((c) =>
        out.push({
          key: `cat-${c.id}`,
          group: "Categorías",
          label: c.label,
          icon: <CategoryIcon name={c.icon} className="h-4 w-4 text-accent" />,
          onSelect: () => go(routes.category(c.id)),
        }),
      );

    if (enabled) {
      collections
        .filter((c) => c.name.toLowerCase().includes(q))
        .slice(0, 5)
        .forEach((c) =>
          out.push({
            key: `col-${c.id}`,
            group: "Colecciones",
            label: c.name,
            sublabel: `${c.slugs.length} herramientas`,
            icon: <Folders className="h-4 w-4 text-accent" />,
            onSelect: () => go(routes.collection(c.id)),
          }),
        );
    }

    NAV.filter((n) => n.label.toLowerCase().includes(q)).forEach((n) =>
      out.push({
        key: `nav-${n.href}`,
        group: "Navegación",
        label: n.label,
        icon: <n.icon className="h-4 w-4 text-fg-muted" />,
        onSelect: () => go(n.href),
      }),
    );

    return out;
  }, [query, collections, enabled, pathname, go]);

  // Mantiene el índice activo dentro de rango y visible.
  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[active]?.onSelect();
    } else if (e.key === "Escape") {
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Buscador de comandos"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-bg-muted shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Busca herramientas, categorías, colecciones…"
                className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
                aria-label="Buscar"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-fg-subtle sm:block">
                ESC
              </kbd>
            </div>

            <ul ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
              {items.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-fg-muted">
                  Sin resultados para «{query}».
                </li>
              ) : (
                items.map((item, i) => {
                  const showHeader =
                    i === 0 || items[i - 1].group !== item.group;
                  return (
                    <li key={item.key}>
                      {showHeader && (
                        <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">
                          {item.group}
                        </p>
                      )}
                      <button
                        type="button"
                        data-idx={i}
                        onMouseMove={() => setActive(i)}
                        onClick={item.onSelect}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2 text-left transition-colors",
                          i === active ? "bg-accent-soft" : "hover:bg-bg-base",
                        )}
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                          {item.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-fg">
                            {item.label}
                          </span>
                          {item.sublabel && (
                            <span className="block truncate text-xs text-fg-subtle">
                              {item.sublabel}
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
