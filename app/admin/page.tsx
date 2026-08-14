import type { Metadata } from "next";

import { ProjectSync } from "@/components/admin/project-sync";

export const metadata: Metadata = {
  title: "Portfolio Administration",
  robots: { index: false, follow: false },
};

export default function Admin() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Portfolio administration</h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">Protected maintenance operations for the portfolio.</p>
        <ProjectSync />
      </div>
    </div>
  );
}
