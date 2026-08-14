"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProjectSync() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  async function synchronize() {
    setIsSyncing(true);
    setStatus(null);
    try {
      const response = await fetch("/api/project/update", { method: "POST" });
      const result = (await response.json()) as {
        message?: string;
        error?: string;
        projectsUpdated?: number;
      };
      if (!response.ok) {
        setStatus(result.error ?? "Synchronization failed");
        return;
      }
      setStatus(`${result.message}. ${result.projectsUpdated ?? 0} repositories updated.`);
    } catch {
      setStatus("Synchronization is temporarily unavailable.");
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">Project archive sync</h2>
      <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Explicitly refresh the private database archive from GitHub. Featured and public curated projects are maintained locally and are not changed by this operation.
      </p>
      <Button type="button" onClick={synchronize} disabled={isSyncing}>
        <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} aria-hidden="true" />
        {isSyncing ? "Synchronizing…" : "Synchronize archive"}
      </Button>
      {status && <p className="mt-4 text-sm text-slate-700 dark:text-slate-300" role="status">{status}</p>}
    </div>
  );
}
