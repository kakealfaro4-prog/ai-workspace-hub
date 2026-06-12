import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight text-fg">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-fg-muted">{subtitle}</p>}
    </div>
  );
}

export function Section({
  title,
  moreHref,
  children,
}: {
  title: string;
  moreHref?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-fg-subtle">
          {title}
        </h2>
        {moreHref && (
          <Link
            href={moreHref}
            className="text-xs text-fg-muted transition-colors hover:text-fg"
          >
            Ver todo →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
