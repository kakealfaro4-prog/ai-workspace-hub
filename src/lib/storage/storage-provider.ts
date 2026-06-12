/**
 * Contrato de persistencia del Workspace.
 *
 * Toda la app depende de ESTA interfaz, nunca de una implementación concreta.
 * - Fase 1 (MVP): `LocalStorageProvider` (sin backend, sin coste).
 * - Fase 2 (cloud): `SupabaseStorageProvider` que implemente el mismo contrato.
 *
 * Las firmas son asíncronas a propósito: aunque localStorage sea síncrono,
 * un backend remoto no lo será. Mantener la interfaz async evita reescribir
 * los consumidores al migrar (Open/Closed + Dependency Inversion).
 */

/** Una entrada de historial: qué herramienta y cuándo se accedió por última vez. */
export interface RecentEntry {
  readonly slug: string;
  /** Epoch en milisegundos del último acceso. */
  readonly lastAccess: number;
}

export interface StorageProvider {
  getFavorites(): Promise<string[]>;
  /** Alterna el favorito y devuelve la lista resultante. */
  toggleFavorite(slug: string): Promise<string[]>;

  getRecents(): Promise<RecentEntry[]>;
  /** Registra un acceso (mueve la herramienta al principio) y devuelve el historial. */
  recordAccess(slug: string): Promise<RecentEntry[]>;
}
