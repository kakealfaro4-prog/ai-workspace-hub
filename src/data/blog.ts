import type { CategoryId } from "@/types/tool";

/**
 * Artículos del blog. Formato "listicle" (las mejores IA para X): es el que
 * mejor posiciona en Google y, además, enlaza a las herramientas del catálogo
 * (más páginas vistas + enlazado interno bueno para SEO).
 *
 * Cada `item.slug` debe existir en src/data/tools.ts.
 */

export interface BlogItem {
  /** Slug de la herramienta del catálogo. */
  slug: string;
  /** Comentario sobre por qué entra en la lista. */
  body: string;
}

export interface BlogPost {
  slug: string;
  /** Título SEO (aparece en Google y como H1). */
  title: string;
  /** Meta description (resumen para buscadores). */
  description: string;
  /** Fecha ISO de publicación. */
  date: string;
  /** Categoría relacionada del catálogo (para el CTA final). */
  relatedCategory?: CategoryId;
  /** Párrafos de introducción. */
  intro: string[];
  /** Herramientas recomendadas, en orden. */
  items: BlogItem[];
  /** Párrafos de cierre (opcional). */
  outro?: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "mejores-ia-para-escribir",
    title: "Las 8 mejores IA para escribir en 2026",
    description:
      "Comparamos las mejores herramientas de inteligencia artificial para escribir: desde redactar artículos y emails hasta corregir y mejorar tu estilo.",
    date: "2026-06-15",
    relatedCategory: "escritura",
    intro: [
      "Escribir con ayuda de la inteligencia artificial ha dejado de ser una novedad para convertirse en parte del día a día de cualquiera que cree contenido, redacte emails o trabaje con textos. La clave está en elegir la herramienta adecuada para cada tarea.",
      "Hemos seleccionado las 8 IA para escribir que mejor funcionan ahora mismo, desde asistentes generales hasta correctores especializados. Puedes abrir cualquiera de ellas directamente desde nuestro catálogo.",
    ],
    items: [
      {
        slug: "chatgpt",
        body: "El asistente más versátil para escribir cualquier cosa: borradores, ideas, reescrituras y resúmenes. Su capa gratuita ya es suficiente para la mayoría de tareas del día a día.",
      },
      {
        slug: "claude",
        body: "Destaca por la calidad y naturalidad de sus textos largos. Ideal para artículos extensos, informes y cuando necesitas que el tono suene humano y cuidado.",
      },
      {
        slug: "jasper",
        body: "Pensado para marketing y equipos: plantillas para anuncios, landing pages y campañas. Una opción de pago orientada a la productividad profesional.",
      },
      {
        slug: "copy-ai",
        body: "Muy bueno para textos cortos de venta: titulares, descripciones de producto y copys publicitarios en segundos.",
      },
      {
        slug: "writesonic",
        body: "Combina redacción con SEO, lo que lo hace útil si escribes para posicionar artículos en Google.",
      },
      {
        slug: "grammarly",
        body: "El corrector de referencia en inglés: gramática, claridad y tono. Imprescindible si publicas en ese idioma.",
      },
      {
        slug: "quillbot",
        body: "Especialista en parafrasear y reescribir manteniendo el significado. Perfecto para variar un texto o mejorar su fluidez.",
      },
      {
        slug: "notion-ai",
        body: "Si ya trabajas en Notion, su IA integrada redacta, resume y organiza sin salir de tus documentos.",
      },
    ],
    outro: [
      "Nuestro consejo: empieza por una herramienta general como ChatGPT o Claude para el grueso de la escritura, y añade un corrector como Grammarly o QuillBot para pulir el resultado.",
    ],
  },
  {
    slug: "mejores-ia-para-crear-imagenes",
    title: "Las 7 mejores IA para crear imágenes en 2026",
    description:
      "Guía de las mejores herramientas de IA para generar imágenes: desde arte realista hasta diseños con texto, comparadas y listas para usar.",
    date: "2026-06-16",
    relatedCategory: "imagen",
    intro: [
      "Generar imágenes con inteligencia artificial es una de las aplicaciones más impresionantes y útiles de esta tecnología. Sirve para ilustraciones, conceptos, fondos, productos o simplemente para dar vida a una idea.",
      "Estas son las 7 IA para crear imágenes que mejor relación calidad/facilidad ofrecen hoy. Hay opciones gratuitas y de pago para todos los niveles.",
    ],
    items: [
      {
        slug: "midjourney",
        body: "El referente en calidad artística. Las imágenes que produce son espectaculares; es de pago, pero el resultado lo justifica para uso profesional.",
      },
      {
        slug: "dall-e",
        body: "Integrado en ChatGPT, es el más fácil de usar: describes lo que quieres con lenguaje natural y lo genera al momento.",
      },
      {
        slug: "stable-diffusion",
        body: "Open source y gratuito. Puedes ejecutarlo en tu propio ordenador y tienes control total sobre el resultado. La opción favorita de quien quiere personalizar todo.",
      },
      {
        slug: "flux",
        body: "Uno de los modelos abiertos más potentes y recientes, con un realismo excelente y totalmente gratuito.",
      },
      {
        slug: "leonardo-ai",
        body: "Muy popular para videojuegos y arte conceptual, con controles finos y una capa gratuita generosa.",
      },
      {
        slug: "ideogram",
        body: "El mejor cuando necesitas texto legible dentro de la imagen (carteles, logos, tipografía). Algo en lo que otros modelos fallan.",
      },
      {
        slug: "adobe-firefly",
        body: "La apuesta de Adobe, integrada en Photoshop. Entrenada con contenido con licencia, ideal para uso comercial sin sustos legales.",
      },
    ],
    outro: [
      "Si empiezas y no quieres pagar, prueba Flux o Stable Diffusion. Si buscas la máxima calidad y no te importa la suscripción, Midjourney sigue siendo el rey.",
    ],
  },
  {
    slug: "mejores-ia-gratis",
    title: "Las 8 mejores IA gratis que puedes usar ahora mismo",
    description:
      "Recopilación de las mejores herramientas de inteligencia artificial gratuitas: chat, imágenes, audio y más, sin pagar nada.",
    date: "2026-06-17",
    intro: [
      "No hace falta gastar dinero para aprovechar la inteligencia artificial. Muchas de las mejores herramientas tienen una capa gratuita más que suficiente, o son directamente de código abierto.",
      "Aquí tienes 8 IA gratis repartidas entre chat, imágenes, audio y programación. Todas accesibles desde nuestro catálogo.",
    ],
    items: [
      {
        slug: "chatgpt",
        body: "El asistente de IA más conocido tiene una versión gratuita potente para conversar, escribir y resolver dudas.",
      },
      {
        slug: "deepseek",
        body: "Un modelo de chat muy capaz y gratuito, excelente para razonamiento y código sin coste.",
      },
      {
        slug: "stable-diffusion",
        body: "Generación de imágenes open source y gratis, ejecutable en tu propio equipo.",
      },
      {
        slug: "flux",
        body: "Modelo de imágenes abierto y gratuito con resultados muy realistas.",
      },
      {
        slug: "whisper",
        body: "La IA de transcripción de OpenAI, gratuita y open source. Convierte audio a texto con una precisión sobresaliente.",
      },
      {
        slug: "ollama",
        body: "Te permite ejecutar modelos de lenguaje en local, gratis y sin conexión. Ideal si te preocupa la privacidad.",
      },
      {
        slug: "canva",
        body: "Su capa gratuita incluye funciones de IA para diseñar imágenes, presentaciones y redes sociales.",
      },
      {
        slug: "github-copilot",
        body: "Gratuito para estudiantes y proyectos open source, es el asistente de programación más usado del mundo.",
      },
    ],
    outro: [
      "Con estas herramientas puedes cubrir chat, imagen, audio y código sin pagar un euro. Cuando una se te quede corta, siempre puedes dar el salto a su versión de pago.",
    ],
  },
  {
    slug: "mejores-ia-para-programar",
    title: "Las 8 mejores IA para programar en 2026",
    description:
      "Las mejores herramientas de inteligencia artificial para programar: autocompletado, asistentes de código y editores con IA, comparados.",
    date: "2026-06-18",
    relatedCategory: "programacion",
    intro: [
      "La programación es, junto a la escritura, el campo donde la inteligencia artificial ha tenido un impacto más inmediato. Hoy es difícil encontrar a un desarrollador que no use al menos un asistente de IA para escribir, depurar o entender código.",
      "Hemos reunido las 8 IA para programar más potentes y populares de 2026, desde autocompletado en tu editor hasta agentes capaces de crear funciones enteras.",
    ],
    items: [
      {
        slug: "github-copilot",
        body: "El asistente de código más usado del mundo, integrado en VS Code y otros editores. Autocompleta líneas y funciones completas mientras escribes. Gratis para estudiantes y proyectos open source.",
      },
      {
        slug: "cursor",
        body: "Un editor de código construido alrededor de la IA: puedes editar y refactorizar proyectos enteros hablando con el modelo. El favorito de muchos desarrolladores profesionales.",
      },
      {
        slug: "claude-code",
        body: "El agente de programación de Anthropic, que trabaja directamente en tu terminal y entiende todo tu repositorio. Brilla en tareas complejas y multi-archivo.",
      },
      {
        slug: "windsurf",
        body: "Otro editor con IA muy pulido, con un modo agente que ejecuta tareas de varios pasos por ti. Gran alternativa a Cursor.",
      },
      {
        slug: "v0",
        body: "Especializado en interfaces: describes una pantalla y genera el código de React/Tailwind listo para usar. Ideal para prototipar UIs rápido.",
      },
      {
        slug: "bolt",
        body: "Crea aplicaciones web completas desde el navegador a partir de una descripción. Perfecto para validar una idea sin montar nada.",
      },
      {
        slug: "replit",
        body: "Un entorno de desarrollo en la nube con IA integrada (Agent) que construye y despliega apps. Muy útil para aprender y para proyectos rápidos.",
      },
      {
        slug: "tabnine",
        body: "Autocompletado de código centrado en la privacidad, con opción de ejecutarse de forma privada. Buena elección para empresas con datos sensibles.",
      },
    ],
    outro: [
      "Si empiezas, GitHub Copilot es la puerta de entrada más sencilla. Si quieres dar el salto a un flujo de trabajo totalmente con IA, prueba Cursor o Claude Code.",
    ],
  },
  {
    slug: "mejores-ia-para-crear-videos",
    title: "Las 8 mejores IA para crear vídeos en 2026",
    description:
      "Guía de las mejores herramientas de IA para generar y editar vídeos: desde clips a partir de texto hasta avatares y edición automática.",
    date: "2026-06-18",
    relatedCategory: "video",
    intro: [
      "El vídeo generado por inteligencia artificial ha dado un salto enorme: hoy puedes crear clips realistas a partir de una frase, poner a hablar a un avatar o editar un vídeo largo en minutos.",
      "Estas son las 8 IA para crear vídeos que marcan la diferencia en 2026, tanto para generar desde cero como para editar lo que ya tienes.",
    ],
    items: [
      {
        slug: "runway",
        body: "Pionero y referente en vídeo con IA. Genera y edita clips con una calidad y unos controles que lo mantienen en cabeza del sector.",
      },
      {
        slug: "sora",
        body: "El generador de vídeo de OpenAI, capaz de crear escenas sorprendentemente realistas y coherentes a partir de texto.",
      },
      {
        slug: "kling",
        body: "Uno de los modelos de vídeo más impresionantes, con movimientos muy naturales y clips de larga duración.",
      },
      {
        slug: "veo",
        body: "La apuesta de Google para vídeo generativo, con gran calidad y comprensión del lenguaje natural.",
      },
      {
        slug: "pika",
        body: "Muy fácil de usar y con efectos creativos divertidos. Perfecto para contenido de redes sociales.",
      },
      {
        slug: "heygen",
        body: "El líder en avatares con IA: crea vídeos de un presentador hablando en decenas de idiomas a partir de un guion. Ideal para formación y marketing.",
      },
      {
        slug: "descript",
        body: "Edita vídeo como si fuera un documento de texto: borras palabras y desaparecen del vídeo. Revoluciona la edición de pódcast y tutoriales.",
      },
      {
        slug: "luma-ai",
        body: "Genera vídeo y escenas 3D con gran realismo, con una capa gratuita para empezar a experimentar.",
      },
    ],
    outro: [
      "Para generar vídeo desde cero, Runway y Sora lideran. Si lo tuyo es presentar o formar, HeyGen es imbatible; y para editar rápido, Descript.",
    ],
  },
  {
    slug: "chatgpt-vs-claude-vs-gemini",
    title: "ChatGPT vs Claude vs Gemini: ¿cuál es la mejor IA en 2026?",
    description:
      "Comparativa de las grandes IA de chat: ChatGPT, Claude y Gemini, más alternativas. Cuál elegir según lo que necesites.",
    date: "2026-06-18",
    relatedCategory: "chatbots",
    intro: [
      "Si solo vas a usar un asistente de IA, lo más probable es que dudes entre ChatGPT, Claude y Gemini. Los tres son excelentes, pero cada uno destaca en cosas distintas.",
      "Te resumimos las fortalezas de cada uno (y de tres alternativas que merece la pena conocer) para que elijas con criterio. Puedes probarlos todos desde nuestro catálogo.",
    ],
    items: [
      {
        slug: "chatgpt",
        body: "El más completo y versátil. Genera texto, imágenes y código, navega por internet y tiene el mayor ecosistema de extensiones. Si dudas, es la apuesta más segura para empezar.",
      },
      {
        slug: "claude",
        body: "El mejor para escribir y para textos largos. Sus respuestas suenan más naturales y cuidadas, y destaca en análisis de documentos y programación. La opción favorita de quien trabaja con texto.",
      },
      {
        slug: "gemini",
        body: "La IA de Google, fuerte en multimodalidad e integrada con Gmail, Docs y el resto de su ecosistema. Muy cómoda si vives dentro de las herramientas de Google.",
      },
      {
        slug: "perplexity",
        body: "Más que un chat, un buscador con IA: responde citando fuentes reales y actualizadas. La mejor opción cuando necesitas información fiable y verificable.",
      },
      {
        slug: "deepseek",
        body: "Una alternativa gratuita y muy capaz, especialmente buena en razonamiento y código. Imbatible en relación calidad/precio.",
      },
      {
        slug: "grok",
        body: "La IA de xAI integrada en X (Twitter), con acceso a información en tiempo real y un tono más desenfadado.",
      },
    ],
    outro: [
      "No hay un único ganador: para uso general elige ChatGPT, para escribir Claude, para el ecosistema Google Gemini, y para investigar con fuentes Perplexity. Lo mejor es probar y quedarte con el que mejor se adapte a ti.",
    ],
  },
  {
    slug: "mejores-ia-para-automatizar-trabajo",
    title: "Las 7 mejores IA para automatizar tu trabajo en 2026",
    description:
      "Las mejores herramientas de IA para automatizar tareas, conectar apps y crear agentes: n8n, Make, Zapier y más, comparadas.",
    date: "2026-06-18",
    relatedCategory: "automatizacion",
    intro: [
      "Automatizar las tareas repetitivas es la forma más rápida de ganar horas cada semana. Con la inteligencia artificial, las plataformas de automatización ya no solo conectan apps: crean agentes que toman decisiones y ejecutan procesos por ti.",
      "Estas son las 7 mejores IA para automatizar tu trabajo en 2026, desde conectores no-code hasta plataformas de agentes.",
    ],
    items: [
      {
        slug: "zapier",
        body: "El conector de apps más popular del mundo: une miles de herramientas con flujos sencillos y ahora con pasos de IA. Ideal para empezar sin saber programar.",
      },
      {
        slug: "make",
        body: "Un editor visual muy potente para diseñar automatizaciones complejas arrastrando bloques. Más flexible que Zapier para flujos avanzados.",
      },
      {
        slug: "n8n",
        body: "Open source y orientado a quien quiere control total. Permite crear automatizaciones y agentes de IA, e incluso alojarlo en tu propio servidor.",
      },
      {
        slug: "gumloop",
        body: "Plataforma no-code centrada en la IA: encadena modelos y acciones para automatizar procesos como investigación o generación de contenido.",
      },
      {
        slug: "relevance-ai",
        body: "Te permite construir 'equipos' de agentes de IA que ejecutan tareas de negocio de principio a fin. Muy potente para ventas y operaciones.",
      },
      {
        slug: "bardeen-ai",
        body: "Automatiza tareas del navegador y flujos de ventas con un copiloto de IA. Perfecto para raspar datos, rellenar CRMs y ahorrar clics.",
      },
      {
        slug: "clay",
        body: "Especialista en prospección: enriquece datos de clientes potenciales con IA y automatiza la captación a escala.",
      },
    ],
    outro: [
      "Si empiezas, Zapier o Make son la puerta de entrada. Si buscas control total o crear agentes, n8n y Relevance AI te darán mucho más margen.",
    ],
  },
  {
    slug: "mejores-ia-para-marketing",
    title: "Las 7 mejores IA para marketing y redes sociales en 2026",
    description:
      "Herramientas de IA para marketing: crear contenido, anuncios, SEO y gestionar redes sociales de forma más rápida y efectiva.",
    date: "2026-06-14",
    relatedCategory: "marketing",
    intro: [
      "El marketing es uno de los campos donde la IA ahorra más tiempo: redactar copys, generar anuncios, optimizar SEO o programar redes sociales se hace en minutos.",
      "Estas son las 7 mejores IA para marketing y redes sociales en 2026, para cubrir desde la creación de contenido hasta la analítica.",
    ],
    items: [
      {
        slug: "jasper",
        body: "Plataforma de IA pensada para equipos de marketing: campañas, blogs y anuncios coherentes con la voz de tu marca.",
      },
      {
        slug: "copy-ai",
        body: "Genera copys de venta, emails y descripciones en segundos. Muy práctico para producir mucho contenido corto rápido.",
      },
      {
        slug: "adcreative",
        body: "Crea creatividades publicitarias optimizadas para convertir, con variantes listas para tus campañas de ads.",
      },
      {
        slug: "semrush",
        body: "La navaja suiza del SEO y el marketing, con funciones de IA para keywords, contenido y análisis de la competencia.",
      },
      {
        slug: "hubspot",
        body: "CRM y plataforma de marketing con IA integrada para automatizar emails, contenido y la relación con tus clientes.",
      },
      {
        slug: "buffer",
        body: "Programa y gestiona tus redes sociales con ayuda de IA para generar ideas y textos de publicaciones.",
      },
      {
        slug: "metricool",
        body: "Analítica y planificación de redes en un solo panel, con asistente de IA para mejorar tus publicaciones.",
      },
    ],
    outro: [
      "Combina una herramienta de contenido (Jasper o Copy.ai) con una de SEO (Semrush) y otra de gestión de redes (Buffer o Metricool) para cubrir todo tu marketing.",
    ],
  },
  {
    slug: "mejores-ia-para-estudiar",
    title: "Las 8 mejores IA para estudiar en 2026",
    description:
      "Las mejores herramientas de inteligencia artificial para estudiar: resumir, investigar, entender artículos y organizar tus apuntes.",
    date: "2026-06-13",
    relatedCategory: "investigacion",
    intro: [
      "La IA se ha convertido en un compañero de estudio excelente: resume temas, explica conceptos difíciles, te ayuda a investigar y organiza tus apuntes.",
      "Estas son las 8 mejores IA para estudiar en 2026, pensadas tanto para el instituto como para la universidad o la investigación.",
    ],
    items: [
      {
        slug: "chatgpt",
        body: "El tutor universal: explica cualquier tema a tu nivel, te hace preguntas de repaso y resuelve dudas al instante.",
      },
      {
        slug: "perplexity",
        body: "Un buscador con IA que responde citando fuentes reales. Perfecto para investigar y contrastar información fiable.",
      },
      {
        slug: "notion-ai",
        body: "Organiza apuntes, resume tus notas y crea esquemas dentro de tu espacio de estudio en Notion.",
      },
      {
        slug: "elicit",
        body: "Asistente de investigación que encuentra y resume artículos científicos. Imprescindible para trabajos académicos.",
      },
      {
        slug: "consensus",
        body: "Responde preguntas con evidencia extraída de estudios científicos. Ideal para fundamentar tus trabajos con datos.",
      },
      {
        slug: "scispace",
        body: "Te ayuda a leer y entender papers complejos, explicándote cada parte en lenguaje sencillo.",
      },
      {
        slug: "scholarcy",
        body: "Resume artículos y libros largos en fichas con los puntos clave, ahorrándote horas de lectura.",
      },
      {
        slug: "quillbot",
        body: "Parafrasea y mejora tus textos, útil para redactar trabajos con tus propias palabras y evitar el plagio.",
      },
    ],
    outro: [
      "Apóyate en ChatGPT y Perplexity para el día a día, y suma Elicit o SciSpace cuando tengas que investigar a fondo.",
    ],
  },
  {
    slug: "mejores-ia-para-editar-fotos",
    title: "Las 7 mejores IA para editar fotos en 2026",
    description:
      "Las mejores herramientas de IA para editar y mejorar fotos: retoque, restauración, eliminar fondos y aumentar la calidad.",
    date: "2026-06-12",
    relatedCategory: "fotografia",
    intro: [
      "Editar fotos con inteligencia artificial te permite conseguir resultados profesionales en segundos: mejorar la calidad, retocar retratos, quitar objetos o restaurar imágenes antiguas.",
      "Estas son las 7 mejores IA para editar fotos en 2026, para aficionados y fotógrafos profesionales.",
    ],
    items: [
      {
        slug: "adobe-lightroom",
        body: "El estándar profesional para revelado y edición de fotos, con funciones de IA para enmascarar, eliminar y mejorar.",
      },
      {
        slug: "luminar-neo",
        body: "Editor potente con herramientas de IA para cielo, retrato y eliminación de elementos en un par de clics.",
      },
      {
        slug: "topaz-photo-ai",
        body: "El mejor para maximizar la nitidez, reducir ruido y ampliar fotos sin perder calidad gracias a la IA.",
      },
      {
        slug: "evoto",
        body: "Retoque de retratos masivo con IA: piel, maquillaje y color en muchas fotos a la vez. Ideal para sesiones grandes.",
      },
      {
        slug: "remini",
        body: "Restaura y mejora fotos antiguas o borrosas, recuperando detalle y nitidez con un solo toque.",
      },
      {
        slug: "magnific",
        body: "Escalador con IA que amplía imágenes añadiendo detalle realista. Espectacular para upscaling creativo.",
      },
      {
        slug: "photoroom",
        body: "Elimina y cambia fondos al instante. Perfecto para fotos de producto y ecommerce.",
      },
    ],
    outro: [
      "Para edición seria, Lightroom y Topaz son la base. Para tareas rápidas (fondos, restaurar, ampliar), Photoroom, Remini y Magnific te resuelven en segundos.",
    ],
  },
  {
    slug: "mejores-ia-para-hacer-musica",
    title: "Las 7 mejores IA para hacer música en 2026",
    description:
      "Las mejores herramientas de IA para crear música: canciones completas, instrumentales y música libre de derechos a partir de texto.",
    date: "2026-06-11",
    relatedCategory: "musica",
    intro: [
      "Crear música con inteligencia artificial está al alcance de cualquiera: puedes generar canciones completas, instrumentales o música de fondo sin saber tocar ningún instrumento.",
      "Estas son las 7 mejores IA para hacer música en 2026, desde canciones con voz hasta música libre de derechos para tus vídeos.",
    ],
    items: [
      {
        slug: "suno",
        body: "El referente para crear canciones completas con voz e instrumentos a partir de una simple descripción. Resultados sorprendentes.",
      },
      {
        slug: "udio",
        body: "Gran rival de Suno, destaca por la calidad del sonido y el control sobre el estilo de la canción.",
      },
      {
        slug: "riffusion",
        body: "Genera canciones con voz e instrumentos desde texto, con un enfoque creativo y gratuito para empezar.",
      },
      {
        slug: "aiva",
        body: "Especializado en composición instrumental y bandas sonoras. Perfecto para música épica, cine y videojuegos.",
      },
      {
        slug: "soundraw",
        body: "Crea música libre de derechos personalizable por género y estado de ánimo. Ideal para creadores de contenido.",
      },
      {
        slug: "mubert",
        body: "Genera música royalty-free para streams, vídeos y apps a partir de texto, con un catálogo enorme.",
      },
      {
        slug: "beatoven",
        body: "Música de fondo única y libre de derechos, ajustada al tono de tu vídeo o pódcast.",
      },
    ],
    outro: [
      "Para canciones con voz, Suno y Udio lideran. Si buscas música de fondo sin problemas de derechos, Soundraw, Mubert o Beatoven son la opción segura.",
    ],
  },
  {
    slug: "mejores-ia-atencion-al-cliente",
    title: "Las 7 mejores IA para atención al cliente en 2026",
    description:
      "Las mejores herramientas de IA para atención al cliente: chatbots, automatización de tickets y soporte 24/7 para tu negocio.",
    date: "2026-06-10",
    relatedCategory: "mensajeria",
    intro: [
      "La atención al cliente es uno de los usos más rentables de la IA: chatbots que resuelven dudas al instante, automatización de tickets y soporte disponible 24/7 sin ampliar tu equipo.",
      "Estas son las 7 mejores IA para atención al cliente en 2026, para tiendas online y empresas de cualquier tamaño.",
    ],
    items: [
      {
        slug: "intercom",
        body: "Plataforma de soporte con su agente de IA (Fin) que resuelve consultas de forma autónoma. Uno de los líderes del sector.",
      },
      {
        slug: "zendesk",
        body: "Suite completa de atención al cliente con agentes y automatizaciones de IA para gestionar grandes volúmenes.",
      },
      {
        slug: "tidio",
        body: "Atención al cliente con el chatbot Lyro, ideal para pequeñas tiendas online que quieren automatizar respuestas.",
      },
      {
        slug: "ada",
        body: "Automatización del servicio al cliente con agentes de IA en múltiples canales e idiomas.",
      },
      {
        slug: "gorgias",
        body: "Especializado en ecommerce: responde y automatiza tickets conectado a tu tienda (Shopify y más).",
      },
      {
        slug: "forethought",
        body: "IA generativa que resuelve, prioriza y asiste tickets, reduciendo el tiempo de respuesta de tu equipo.",
      },
      {
        slug: "drift",
        body: "Marketing conversacional y soporte con chatbots de IA para captar y atender clientes en tiempo real.",
      },
    ],
    outro: [
      "Para ecommerce, Tidio y Gorgias encajan muy bien. Si necesitas una solución completa para empresa, Intercom y Zendesk son apuestas seguras.",
    ],
  },
];

const POST_BY_SLUG = new Map(POSTS.map((p) => [p.slug, p]));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POST_BY_SLUG.get(slug);
}

/** Posts ordenados del más reciente al más antiguo. */
export function getSortedPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}
