import { NextResponse } from "next/server";
import { answerTechnicalQuestion } from "@/lib/ai";
import { getSupabase } from "@/lib/supabase";
import type { Evidence } from "@/lib/types";

export const runtime = "nodejs";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    if (!question || question.length > 3000) return NextResponse.json({ error: "Informe uma pergunta de até 3.000 caracteres." }, { status: 400 });
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({
      answer: "A base técnica ainda não está conectada. Configure o Supabase e cadastre produtos e documentos para habilitar consultas.",
      status: "nao_confirmado", evidence: [], caveats: ["Nenhuma especificação foi consultada nem confirmada."],
    });

    const words = [...new Set(question.toLocaleLowerCase("pt-BR").match(/[\p{L}\p{N}.-]{3,}/gu) ?? [])].slice(0, 6);
    const evidence: Evidence[] = [];
    const contextParts: string[] = [];
    const found = new Set<string>();

    for (const word of words) {
      const pattern = `%${word.replace(/[%_,()]/g, " ")}%`;
      const { data: chunks, error: chunksError } = await supabase.from("document_chunks")
        .select("id,content,page_number,source_url,documents(title,source_url)")
        .ilike("content", pattern).limit(4);
      if (chunksError) return NextResponse.json({ error: "Não foi possível pesquisar os documentos. Verifique se o esquema do Supabase foi instalado." }, { status: 503 });
      for (const chunk of chunks ?? []) {
        if (found.has(chunk.id)) continue;
        found.add(chunk.id);
        const doc = Array.isArray(chunk.documents) ? chunk.documents[0] : chunk.documents;
        const url = chunk.source_url || doc?.source_url;
        if (!url) continue;
        contextParts.push(`Documento: ${doc?.title ?? "Fonte técnica"}; página: ${chunk.page_number ?? "não informada"}; trecho: ${chunk.content}`);
        evidence.push({ title: doc?.title ?? "Fonte técnica", url, detail: "Trecho recuperado da base técnica", page: chunk.page_number ?? undefined, sourceType: "fabricante" });
      }
    }

    if (contextParts.length === 0) return NextResponse.json({
      answer: "Não encontrei documentos da base que correspondam à pergunta. Cadastre o produto e importe a ficha técnica ou o manual antes de consultar.",
      status: "nao_confirmado", evidence: [], caveats: ["Sem trecho documental recuperado, a resposta técnica não pode ser confirmada."],
    });

    const result = await answerTechnicalQuestion(question, contextParts.join("\n\n"));
    const allowedUrls = new Set(evidence.map((item) => item.url));
    result.evidence = evidence.filter((item) => allowedUrls.has(item.url));
    if (result.evidence.length === 0) {
      result.status = "nao_confirmado";
      result.answer = "Encontrei conteúdo relacionado, mas não foi possível validar uma fonte documental para a resposta.";
      result.caveats.push("A resposta foi rebaixada porque não foi possível vincular fontes verificáveis.");
    }
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro interno.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
