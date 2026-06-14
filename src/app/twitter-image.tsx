// Reutiliza la misma imagen que Open Graph para la tarjeta de Twitter/X.
// `runtime` se declara aquí (Next no reconoce el campo si se re-exporta).
export const runtime = "edge";

export { default, alt, size, contentType } from "./opengraph-image";
