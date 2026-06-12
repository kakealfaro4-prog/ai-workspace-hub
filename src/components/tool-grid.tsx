import { ToolCard } from "@/components/tool-card";
import type { Tool } from "@/types/tool";

export function ToolGrid({ tools }: { tools: readonly Tool[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-bg-subtle/50 px-6 py-16 text-center">
      <p className="font-medium text-fg">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-fg-muted">{description}</p>
    </div>
  );
}
