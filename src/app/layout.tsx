import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { GlobalSearch } from "@/components/global-search";
import { Sidebar } from "@/components/sidebar";
import { WorkspaceProvider } from "@/lib/workspace-context";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Workspace Hub — Todas tus herramientas de IA en un solo lugar",
  description:
    "Un único espacio para acceder, organizar y abrir las mejores herramientas de inteligencia artificial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${inter.variable}`}>
      <body className="font-sans">
        <WorkspaceProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border px-6">
                <GlobalSearch />
              </header>
              <main className="flex-1 overflow-y-auto px-6 py-8">
                <div className="mx-auto max-w-7xl">{children}</div>
              </main>
            </div>
          </div>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
