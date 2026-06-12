import type { RecentEntry, StorageProvider } from "./storage-provider";

const FAVORITES_KEY = "awh:favorites:v1";
const RECENTS_KEY = "awh:recents:v1";
const MAX_RECENTS = 12;

/**
 * Implementación de `StorageProvider` sobre `window.localStorage`.
 *
 * Defensiva por diseño: cualquier acceso a `localStorage` puede fallar
 * (modo incógnito, cuota llena, SSR donde `window` no existe). Ante un fallo
 * degradamos a un estado vacío en lugar de romper la app.
 */
export class LocalStorageProvider implements StorageProvider {
  private get available(): boolean {
    return typeof window !== "undefined" && !!window.localStorage;
  }

  private read<T>(key: string, fallback: T): T {
    if (!this.available) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  private write<T>(key: string, value: T): void {
    if (!this.available) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Cuota excedida o almacenamiento bloqueado: ignoramos en silencio.
    }
  }

  async getFavorites(): Promise<string[]> {
    return this.read<string[]>(FAVORITES_KEY, []);
  }

  async toggleFavorite(slug: string): Promise<string[]> {
    const current = await this.getFavorites();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [slug, ...current];
    this.write(FAVORITES_KEY, next);
    return next;
  }

  async getRecents(): Promise<RecentEntry[]> {
    return this.read<RecentEntry[]>(RECENTS_KEY, []);
  }

  async recordAccess(slug: string): Promise<RecentEntry[]> {
    const current = await this.getRecents();
    const filtered = current.filter((e) => e.slug !== slug);
    const next: RecentEntry[] = [
      { slug, lastAccess: Date.now() },
      ...filtered,
    ].slice(0, MAX_RECENTS);
    this.write(RECENTS_KEY, next);
    return next;
  }
}
