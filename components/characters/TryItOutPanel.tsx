// components/characters/TryItOutPanel.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Copy, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import type { Character } from "@/lib/rickmorty/types";

function statusClass(status: string) {
  const s = status?.toLowerCase();
  if (s === "alive") return "bg-emerald-500 text-white";
  if (s === "dead") return "bg-rose-500 text-white";
  return "bg-slate-500 text-white";
}

export function TryItOutPanel() {
  const [id, setId] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<Character | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setData(null);

    const numericId = Number(id);
    if (!Number.isFinite(numericId) || numericId <= 0) {
      setError("Please enter a valid character ID (e.g., 1, 2, 3...).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${numericId}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        if (res.status === 404) {
          setError("Character not found. Try another ID.");
          return;
        }
        setError(`Request failed (${res.status}).`);
        return;
      }

      const json = (await res.json()) as Character;
      setData(json);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyJson() {
    if (!data) return;
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  }

  return (
    <section className="rounded-2xl border bg-slate-950/90 p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-200">
          <span className="font-mono text-sm">{">_"}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Try the API</h2>
          <p className="mt-1 text-sm text-slate-300">
            Test the Rick &amp; Morty API by fetching a character using its ID
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 rounded-2xl bg-slate-900/60 p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label className="text-xs font-medium text-slate-300">
              Character ID
            </label>
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter character ID (e.g., 1, 2, 3...)"
              className="mt-2 bg-slate-950/40 text-slate-100 placeholder:text-slate-500"
              inputMode="numeric"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="md:w-[170px]"
          >
            <Search className="mr-2 h-4 w-4" />
            {loading ? "Consulting..." : "Consult character"}
          </Button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-rose-300">{error}</p>
        )}

        {/* Preview */}
        {data && (
          <div className="mt-6 rounded-2xl bg-slate-950/35 p-4">
            <p className="text-xs font-medium text-slate-300">
              Result preview
            </p>

            <div className="mt-3 flex items-center gap-4 rounded-xl bg-slate-950/40 p-4">
              <img
                src={data.image}
                alt={data.name}
                className="h-16 w-16 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <p className="truncate text-base font-semibold text-white">
                    {data.name}
                  </p>
                  <Badge className={statusClass(data.status)}>
                    {data.status}
                  </Badge>
                </div>

                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">
                  <span>
                    Species: <b className="text-slate-100">{data.species}</b>
                  </span>
                  <span>
                    Gender: <b className="text-slate-100">{data.gender}</b>
                  </span>
                </div>
              </div>

              <Link
                href={`/character/${data.id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/15"
              >
                Open <ExternalLink className="h-4 w-4" />
              </Link>
            </div>

            {/* JSON block */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-300">
                  JSON Response
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={copyJson}
                  className="h-8"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to clipboard
                </Button>
              </div>

              <pre className="mt-3 max-h-[320px] overflow-auto rounded-2xl bg-black/40 p-5 text-xs leading-relaxed text-emerald-200">
{JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </form>
    </section>
  );
}
