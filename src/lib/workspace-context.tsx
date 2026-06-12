"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { LocalStorageProvider } from "@/lib/storage/local-storage-provider";
import type {
  RecentEntry,
  StorageProvider,
} from "@/lib/storage/storage-provider";

interface WorkspaceContextValue {
  favorites: string[];
  recents: RecentEntry[];
  /** True hasta que se hidrata el estado desde el provider (evita parpadeos). */
  ready: boolean;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  /** Registra un acceso a la herramienta (para "Recientes"). */
  recordAccess: (slug: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

/**
 * Proveedor de estado del Workspace.
 *
 * Recibe el `StorageProvider` por inyección (por defecto, localStorage). En la
 * fase cloud bastará con pasar otra implementación —p. ej. desde un layout
 * autenticado— sin tocar ningún componente consumidor.
 */
export function WorkspaceProvider({
  children,
  provider,
}: {
  children: ReactNode;
  provider?: StorageProvider;
}) {
  // Singleton estable durante el ciclo de vida del componente.
  const storage = useMemo(
    () => provider ?? new LocalStorageProvider(),
    [provider],
  );

  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<RecentEntry[]>([]);
  const [ready, setReady] = useState(false);

  // Hidratación inicial: solo en cliente, tras el montaje.
  useEffect(() => {
    let active = true;
    void Promise.all([storage.getFavorites(), storage.getRecents()]).then(
      ([favs, recs]) => {
        if (!active) return;
        setFavorites(favs);
        setRecents(recs);
        setReady(true);
      },
    );
    return () => {
      active = false;
    };
  }, [storage]);

  const toggleFavorite = useCallback(
    (slug: string) => {
      // Actualización optimista para una UI instantánea.
      setFavorites((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev],
      );
      void storage.toggleFavorite(slug).then(setFavorites);
    },
    [storage],
  );

  const recordAccess = useCallback(
    (slug: string) => {
      void storage.recordAccess(slug).then(setRecents);
    },
    [storage],
  );

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      favorites,
      recents,
      ready,
      isFavorite,
      toggleFavorite,
      recordAccess,
    }),
    [favorites, recents, ready, isFavorite, toggleFavorite, recordAccess],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace debe usarse dentro de <WorkspaceProvider>.");
  }
  return ctx;
}
