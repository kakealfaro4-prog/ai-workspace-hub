/**
 * Modelo de dominio del catálogo.
 *
 * Las herramientas y categorías son CONTENIDO versionado en el repositorio
 * (no filas de base de datos). Esto es deliberado para la fase MVP: es
 * type-safe, sin coste, sin latencia y fácil de mantener vía control de
 * versiones. Cuando el catálogo necesite gestión por no-desarrolladores,
 * esta misma forma de datos se podrá servir desde una API/CMS sin cambiar
 * los componentes que la consumen.
 */

export type CategoryId =
  | "chatbots"
  | "programacion"
  | "escritura"
  | "investigacion"
  | "imagen"
  | "video"
  | "audio"
  | "musica"
  | "fotografia"
  | "diseno"
  | "creacion-web"
  | "redes-sociales"
  | "marketing"
  | "email"
  | "mensajeria"
  | "productividad"
  | "automatizacion"
  | "analitica"
  | "cloud"
  | "seguridad"
  | "recursos-humanos"
  | "negocios";

/** Nombre de un icono de `lucide-react`. Se resuelve en un mapa tipado. */
export type IconName =
  | "Bot"
  | "Code2"
  | "PenLine"
  | "Search"
  | "Image"
  | "Clapperboard"
  | "AudioLines"
  | "Music"
  | "Camera"
  | "Palette"
  | "Globe"
  | "Share2"
  | "Megaphone"
  | "Mail"
  | "MessageCircle"
  | "Zap"
  | "Workflow"
  | "BarChart3"
  | "Cloud"
  | "ShieldCheck"
  | "Users"
  | "Briefcase";

export interface Category {
  readonly id: CategoryId;
  readonly label: string;
  readonly icon: IconName;
}

export interface Tool {
  /** Identificador estable usado en URLs y persistencia. */
  readonly slug: string;
  readonly name: string;
  /** URL oficial de la herramienta (se abre en pestaña nueva). */
  readonly url: string;
  readonly description: string;
  /** Una herramienta puede pertenecer a varias categorías. */
  readonly categories: readonly CategoryId[];
  readonly tags: readonly string[];
}
