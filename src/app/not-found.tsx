import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl font-semibold text-fg">404</p>
      <p className="mt-3 text-fg-muted">
        No encontramos lo que buscabas.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
      >
        Volver al Dashboard
      </Link>
    </div>
  );
}
