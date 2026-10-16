import { NextResponse } from "next/server";
import { answerTechnicalQuestion } from "@/lib/ai";

export const runtime = "nodejs";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    if (!question || question.length > 3000) return NextResponse.json({ error: "Informe uma pergunta de até 3.000 caracteres." }, { status: 400 });
    // Não há catálogo conectado ainda. Não passe dados inventados à IA.
    const result = await answerTechnicalQuestion(question, "");
    if (result.evidence.length === 0 && result.status === "confirmado") {
      result.status = "nao_confirmado";
      result.answer = "Não encontrei evidências documentais conectadas para confirmar essa resposta.";
      result.caveats.push("O catálogo e a biblioteca de datasheets ainda precisam ser configurados.");
    }
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro interno.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
