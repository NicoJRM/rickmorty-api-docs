import { NextResponse } from "next/server";

// Si usas @google/generative-ai:
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs"; // importante (evita problemas si algo intenta correr en edge)
export const dynamic = "force-dynamic";

type Body = {
  character: {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin?: { name: string };
    location?: { name: string };
    episode?: string[];
  };
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in environment variables." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Body;

    if (!body?.character?.name) {
      return NextResponse.json(
        { error: "Invalid body. Expected { character: {...} }" },
        { status: 400 }
      );
    }

    const c = body.character;

    const prompt = `
Actúa como una unidad de inteligencia intergaláctica de la Ciudadela de los Ricks. Tu misión es redactar un resumen corto, ingenioso y lleno de energía (4 a 7 frases) sobre el personaje de Rick & Morty que aparece en el JSON adjunto.

Directrices de estilo:

Idioma: Responde exclusivamente en español (de preferencia un español neutro o con el tono sarcástico del doblaje latino de la serie).

Tono: Utiliza humor negro, sarcasmo o un entusiasmo cínico. Debe sentirse como algo que diría un personaje de la serie.

Contenido: Utiliza los datos de name, species y status del JSON, pero no los leas como una lista; intégralos en un comentario mordaz.

Curiosidades: Puedes incluir datos curiosos o momentos icónicos que sean canon (reales en la serie). Si el personaje es muy irrelevante, haz una broma sobre lo insignificante de su existencia o su muerte prematura.

Restricción: No inventes hechos que no hayan ocurrido en el show.

Puedes utilizar negritas, espacios, emojis para el texto. 

Datos del personaje
JSON:
${JSON.stringify(
  {
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin?.name ?? "Unknown",
    location: c.location?.name ?? "Unknown",
    episodeCount: c.episode?.length ?? 0,
  },
  null,
  2
)}
`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.6,
        topP: 0.7
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ summary: text });
  } catch (err: any) {
    console.error("Gemini summary error:", err);

    return NextResponse.json(
      {
        error: "Failed to generate summary",
        details: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}
