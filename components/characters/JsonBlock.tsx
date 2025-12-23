"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type Props = {
  title?: string;
  data: unknown;
};

export function JsonBlock({ title = "Raw API Response", data }: Props) {
  const [copied, setCopied] = useState(false);

  const pretty = useMemo(() => JSON.stringify(data, null, 2), [data]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(pretty);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback muy simple
      const textarea = document.createElement("textarea");
      textarea.value = pretty;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }

  return (
    <section className="rounded-2xl border bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900 p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        <Button
          type="button"
          variant="secondary"
          onClick={onCopy}
          className="w-fit"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy to clipboard
            </>
          )}
        </Button>
      </div>

      <div className="mt-6 rounded-xl bg-black/40 p-5">
        <pre className="max-h-[420px] overflow-auto text-sm leading-relaxed text-emerald-200">
          {pretty}
        </pre>
      </div>

      <p className="mt-4 text-sm text-white/60">
        This is the raw JSON response from the Rick and Morty API endpoint.
      </p>
    </section>
  );
}
