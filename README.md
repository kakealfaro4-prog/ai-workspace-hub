# AI Tools Hub

> Un único lugar para acceder a todas las herramientas de IA sin tener que recordar decenas de páginas web.

MVP funcional construido con **Next.js 15 (App Router) + TypeScript + Tailwind CSS**.
Sin backend: el catálogo es contenido versionado y las preferencias del usuario
(favoritos / recientes) viven en `localStorage`.

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

Otros scripts:

```bash
npm run build      # build de producción
npm run start      # servir el build
npm run typecheck  # comprobación de tipos sin emitir
npm run lint       # eslint (next lint)
```

## Qué incluye esta v1

- **Dashboard** con estadísticas, "Continuar donde lo dejaste" (recientes),
  favoritos y recomendadas.
- **Sidebar** con navegación principal y las 12 categorías.
- **Buscador global instantáneo** (filtra el catálogo conforme escribes).
- **Favoritos** y **Recientes** persistidos en `localStorage`.
- **Ficha de herramienta** con logo, descripción, categorías, etiquetas,
  relacionadas y botón de acceso.
- **Apertura en pestaña nueva** (`target="_blank"` + `noopener,noreferrer`).

## Decisiones de arquitectura (las importantes)

### 1. No usamos iframe — y es a propósito
La mayoría de herramientas (ChatGPT, Claude, Gemini…) envían
`X-Frame-Options`/`frame-ancestors` que **impiden incrustarlas**. Por eso la v1
abre cada herramienta en una pestaña nueva manteniendo el Workspace visible.
Un "navegador interno" real solo es posible con una app de escritorio
(Electron/Tauri) y queda fuera del alcance de esta versión web.

### 2. El catálogo es contenido, no base de datos
Las ~38 herramientas viven en [`src/data/tools.ts`](src/data/tools.ts) con
tipado fuerte. Es más rápido, sin coste y fácil de mantener vía PRs. Cuando el
catálogo necesite gestión por no-desarrolladores, se sirve la misma forma de
datos desde una API/CMS sin tocar componentes.

### 3. Persistencia aislada tras una interfaz (clave para la fase cloud)
Toda la app depende del contrato
[`StorageProvider`](src/lib/storage/storage-provider.ts), nunca de una
implementación concreta. Hoy lo implementa
[`LocalStorageProvider`](src/lib/storage/local-storage-provider.ts). Las firmas
ya son asíncronas para que migrar a un backend no requiera reescribir
consumidores.

## Estructura

```
src/
  app/                    # rutas (App Router)
    page.tsx              # Dashboard
    tools/                # listado + ficha [slug]
    category/[id]/        # vista por categoría
    favorites/ recents/   # vistas de estado de usuario
  components/             # UI (sidebar, tarjetas, buscador, botones…)
  data/                   # catálogo: tools.ts, categories.ts
  lib/
    storage/              # contrato + implementación localStorage
    workspace-context.tsx # estado de favoritos/recientes (inyecta el provider)
  types/                  # modelo de dominio
```

## Fase 2 — Cloud (preparado, no construido)

Para añadir login y sincronización con **Supabase**:

1. Crear `SupabaseStorageProvider implements StorageProvider`.
2. Tablas `favorites(user_id, slug)` y `recents(user_id, slug, last_access)` con
   Row Level Security por `user_id`.
3. Inyectar ese provider en `<WorkspaceProvider provider={…}>` desde un layout
   autenticado. **Ningún componente de UI cambia.**

Funciones premium futuras (colecciones, biblioteca de prompts, comparador de
modelos, equipos) se apoyan sobre esta misma base.
