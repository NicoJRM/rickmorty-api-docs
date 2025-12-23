"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import type { Character } from "@/lib/rickmorty/types";

import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";


type Props = {
  character: Character;
};

export function AiSummary({ character }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [summary, setSummary] = React.useState<string>(
    "Genera el resumen con IA para saber más del personaje."
  );
  const [error, setError] = React.useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/gemini/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character }),
      });

      const json = await res.json();

    if (!res.ok) {
        setError(json?.details ?? json?.error ?? "Petición fallida.");
        return;
    }

      setSummary(json.summary ?? "No se retornó el resumen.");
    } catch {
      setError("Error de red. Intente más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Resumen del personaje Generado con IA
        </h2>

        <Button onClick={generate} disabled={loading}>
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? "Generando..." : "Generar resumen con IA"}
        </Button>
      </div>

      <div className="mt-5 rounded-lg border-l-4 border-slate-800 bg-white p-6 shadow-md prose prose-slate max-w-none">
        <div className="font-mono text-xs uppercase text-slate-400 mb-2 tracking-widest">
            Base de datos Galáctica v.2
        </div>

        <div className="leading-relaxed italic text-slate-600 prose prose-slate max-w-none">
            <ReactMarkdown>{summary}</ReactMarkdown>
        </div>

        {error && (
          <p className="mt-3 text-sm text-rose-600">{error}</p>
        )}
      </div>
    </section>
  );
}
