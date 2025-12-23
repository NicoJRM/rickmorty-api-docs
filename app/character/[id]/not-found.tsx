// app/character/[id]/not-found.tsx
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">
          ❗ Personaje no encontrado
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Intenta con otro ID desde el buscador.
        </p>

        <div className="mt-6">
          <Button asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
