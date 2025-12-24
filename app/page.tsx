// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Character, CharacterListResponse } from "@/lib/rickmorty/types";
import { TryItOutPanel } from "@/components/characters/TryItOutPanel";
import { getCharactersPage } from "@/lib/rickmorty/client";
import { Pagination } from "@/components/characters/Pagination";

function statusClass(status: string) {
  if (status.toLowerCase() === "alive") return "bg-emerald-500 text-white";
  if (status.toLowerCase() === "dead") return "bg-rose-500 text-white";
  return "bg-slate-500 text-white";
}

type Props = {
  searchParams?: {
    page?: string;
    q?: string;
  };
};

//Cambios con try/catch para manejar errores en las búsquedas 
export default async function HomePage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Number(sp?.page ?? "1");
  const query = sp?.q?.trim();

  let data: CharacterListResponse | null = null;
  let notFoundQuery = false;

  try {
    data = await getCharactersPage(page, query);
  } catch (e: any) {
    if (e?.status === 404) {
      // “no results” para búsquedas por nombre
      notFoundQuery = true;
    } else {
      throw e; // cualquier otro error sí lo queremos ver
    }
  }

  const characters = data?.results ?? [];
  const totalPages = data?.info?.pages ?? 1;

  return (
    <main>
      {/* HERO */}
      <section className="border-b bg-gradient-to-r from-cyan-50 via-white to-emerald-50">
        <Container className="py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-semibold text-slate-900">
              <span className="text-cyan-600">⚡</span> Explora los personajes de{" "}
              <span className="text-emerald-600">Rick & Morty</span>{" "}
              <span className="text-emerald-600">✧</span>
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Documentación interactiva de los personajes disponibles en la API pública de Rick&Morty.
            </p>

            <form
              action="/"
              method="get"
              className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white/70 p-3 shadow-xl backdrop-blur"
            >
              <Input
                name="q"
                defaultValue={query ?? ""}
                placeholder="Search characters by name"
                className="h-12 border-0 bg-transparent focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="h-12 w-28 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-95"
              >
                Search
              </Button>
            </form>

            {notFoundQuery && (
              <p className="mt-4 text-sm text-slate-600">
                No se encontraron resultados para <b>{query}</b>.
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* GRID */}
      <section className="bg-white">
        <Container className="py-12">
          {characters.length === 0 ? (
            <div className="rounded-2xl border bg-white p-10 text-center text-slate-600">
              <p className="text-sm">
                No hay personajes para mostrar{query ? ` con "${query}"` : ""}.
              </p>

              {query && (
                <div className="mt-4">
                  <Link href="/" className="text-sm font-medium text-emerald-600 hover:underline">
                    Limpiar búsqueda
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {characters.map((c: Character) => (
                  <Link
                    key={c.id}
                    href={`/character/${c.id}`}
                    className="group cursor-pointer rounded-2xl border bg-white p-6 shadow-sm transition-all
                               hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100/60"
                  >
                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-white shadow transition group-hover:shadow-lg group-hover:shadow-emerald-200/70">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                        priority={c.id <= 4}
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <Badge className={statusClass(c.status)}>{c.status}</Badge>
                      <h3 className="mt-3 text-base font-semibold text-slate-900">{c.name}</h3>
                      <p className="mt-1 text-xs text-slate-500">{c.species}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <Pagination currentPage={page} totalPages={totalPages} q={query} />
            </>
          )}
        </Container>
      </section>

      <section className="mt-16">
        <TryItOutPanel />
      </section>
    </main>
  );
}
