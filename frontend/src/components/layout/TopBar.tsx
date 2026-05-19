"use client";
import { useEffect } from "react";
import { useSessionStore } from "@/store/session.store";
import { api } from "@/lib/api";

export function TopBar() {
  const { projects, activeProject, setActiveProject, setProjects } = useSessionStore();

  useEffect(() => { api.listProjects().then(setProjects).catch(() => {}); }, [setProjects]);

  return (
    <header className="h-12 border-b border-border bg-panel/80 backdrop-blur flex items-center px-4 gap-3">
      <span className="text-xs text-mute">Projeto:</span>
      <select
        value={activeProject?.id ?? ""}
        onChange={(e) => {
          const p = projects.find((x) => x.id === e.target.value) ?? null;
          setActiveProject(p);
        }}
        className="bg-bg border border-border rounded px-2 py-1 text-sm"
      >
        <option value="">— selecionar —</option>
        {projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
      </select>

      <div className="ml-auto flex items-center gap-3 text-xs text-mute">
        <span className="px-2 py-0.5 rounded bg-ok/15 text-ok border border-ok/30">live</span>
        <span>API: {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}</span>
      </div>
    </header>
  );
}
