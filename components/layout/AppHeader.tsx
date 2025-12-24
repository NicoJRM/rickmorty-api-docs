// components/layout/AppHeader.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/Container";

export function AppHeader() {
  const router = useRouter();
  const [id, setId] = useState("");

  // Normalizamos: quitamos espacios y validamos que sea número entero positivo
  const cleaned = useMemo(() => id.trim(), [id]);
  const isValidId = useMemo(() => /^\d+$/.test(cleaned) && Number(cleaned) > 0, [cleaned]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <Link href="/" className="text-sm font-medium text-slate-700">
            Rick & Morty API Docs
          </Link>
        </div>

        <form
          className="flex w-full max-w-sm items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isValidId) return;

            router.push(`/character/${cleaned}`);
            setId("");
          }}
        >
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Search character by ID"
            className="bg-white"
            inputMode="numeric"
          />

          <Button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600"
            disabled={!isValidId}
          >
            Go
          </Button>
        </form>
      </Container>
    </header>
  );
}
