import { PageHeader } from "@/components/section";
import { ToolsExplorer } from "@/components/workspace/tools-explorer";
import { approxToolCount } from "@/data/tools";

export const metadata = {
  title: "Todas las herramientas — AI Workspace Hub",
};

export default function AllToolsPage() {
  return (
    <>
      <PageHeader
        title="Todas las herramientas"
        subtitle={`Explora ${approxToolCount()} herramientas de IA. Filtra por categoría o busca al instante.`}
      />
      <ToolsExplorer />
    </>
  );
}
