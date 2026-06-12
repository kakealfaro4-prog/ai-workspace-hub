import type { Category, CategoryId } from "@/types/tool";

/** Orden = orden de aparición en la sidebar. */
export const CATEGORIES: readonly Category[] = [
  { id: "chatbots", label: "Chatbots y Asistentes", icon: "Bot" },
  { id: "programacion", label: "Programación", icon: "Code2" },
  { id: "escritura", label: "Escritura", icon: "PenLine" },
  { id: "investigacion", label: "Investigación", icon: "Search" },
  { id: "imagen", label: "Imagen", icon: "Image" },
  { id: "video", label: "Video", icon: "Clapperboard" },
  { id: "audio", label: "Audio y Voz", icon: "AudioLines" },
  { id: "musica", label: "Música", icon: "Music" },
  { id: "fotografia", label: "Fotografía", icon: "Camera" },
  { id: "diseno", label: "Diseño", icon: "Palette" },
  { id: "creacion-web", label: "Creación Web", icon: "Globe" },
  { id: "redes-sociales", label: "Redes Sociales", icon: "Share2" },
  { id: "marketing", label: "Marketing y SEO", icon: "Megaphone" },
  { id: "email", label: "Email", icon: "Mail" },
  { id: "mensajeria", label: "Atención al Cliente", icon: "MessageCircle" },
  { id: "productividad", label: "Productividad", icon: "Zap" },
  { id: "automatizacion", label: "Automatización", icon: "Workflow" },
  { id: "analitica", label: "Analítica y Datos", icon: "BarChart3" },
  { id: "cloud", label: "Cloud y MLOps", icon: "Cloud" },
  { id: "seguridad", label: "Seguridad", icon: "ShieldCheck" },
  { id: "recursos-humanos", label: "Recursos Humanos", icon: "Users" },
  { id: "negocios", label: "Negocios", icon: "Briefcase" },
] as const;

const CATEGORY_BY_ID: ReadonlyMap<CategoryId, Category> = new Map(
  CATEGORIES.map((c) => [c.id, c]),
);

export function getCategory(id: CategoryId): Category | undefined {
  return CATEGORY_BY_ID.get(id);
}

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORY_BY_ID.get(id)?.label ?? id;
}
