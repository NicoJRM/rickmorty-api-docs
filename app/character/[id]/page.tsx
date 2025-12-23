// app/character/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { getCharacterById } from "@/lib/rickmorty/client";
import { CharacterDetails } from "@/components/characters/CharacterDetails";
import { JsonBlock } from "@/components/characters/JsonBlock";
import { AiSummary } from "@/components/characters/AiSummary";


function statusClass(status: string) {
  if (status.toLowerCase() === "alive") return "bg-emerald-500 text-white";
  if (status.toLowerCase() === "dead") return "bg-rose-500 text-white";
  return "bg-slate-500 text-white";
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Next 16: params puede ser Promise
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) return notFound();

  try {
    const character = await getCharacterById(numericId);

    return (
      <main>
        <section className="border-b bg-gradient-to-r from-cyan-50 via-white to-emerald-50">
          <Container className="py-14">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full ring-4 ring-white shadow">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                  sizes="160px"
                  priority
                />
              </div>

              <div>
                <h1 className="text-4xl font-semibold text-slate-900">
                  {character.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Badge className={statusClass(character.status)}>
                    {character.status}
                  </Badge>
                  <span className="text-sm text-slate-600">
                    Species: <b>{character.species}</b>
                  </span>
                  <span className="text-sm text-slate-600">
                    Gender: <b>{character.gender}</b>
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Container className="py-10">
          <CharacterDetails
            originName={character.origin?.name}
            locationName={character.location?.name}
            episodeCount={character.episode?.length ?? 0}
          />
        </Container>

        <Container className="py-10">
          <AiSummary character={character}/>
        </Container>

        <Container className="py-10">
          <JsonBlock data={character} />
        </Container>

      </main>
    );
  } catch (e: any) {
    if (e?.status === 404) return notFound();
    throw e;
  }
}
