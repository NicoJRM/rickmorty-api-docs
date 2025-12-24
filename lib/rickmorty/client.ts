// lib/rickmorty/client.ts
import type { Character, CharacterListResponse } from "./types";

const BASE_URL = "https://rickandmortyapi.com/api";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const error = new Error(
      `API error ${res.status}: ${res.statusText} ${text ? `- ${text}` : ""}`
    );
    // @ts-expect-error add status for handling
    error.status = res.status;
    throw error;
  }

  return (await res.json()) as T;
}


//Obtiene solo los primeros persoanjes y los envía al dashdoard
export async function getCharactersFirstPage() {
  // revalidate: cache + refresh each 60s (pro para README)
  return apiFetch<CharacterListResponse>("/character", {
    next: { revalidate: 60 } as any,
  });
}

export async function getCharacterById(id: number) {
  return apiFetch<Character>(`/character/${id}`, {
    next: { revalidate: 60 } as any,
  });
}

//Función para implementar la paginación en el dashboard
/*
export async function getCharactersPage(page: number) {
  return apiFetch<CharacterListResponse>(`/character?page=${page}`, {
    next: { revalidate: 60 } as any,
  });
}
  */


export async function getCharactersPage(
  page: number,
  query?: string
) {
  const params = new URLSearchParams();
  params.set("page", String(page));

  if (query) {
    params.set("name", query);
  }

  return apiFetch<CharacterListResponse>(
    `/character/?${params.toString()}`,
    {
      next: { revalidate: 60 } as any,
    }
  );
}
