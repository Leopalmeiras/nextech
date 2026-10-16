import type { TechnicalAnswer } from "./types";

const systemPrompt = `Você é o NEXO TECH, assistente técnico-comercial para equipamentos Intelbras.
Regras invioláveis:
- Use somente evidências fornecidas no contexto recuperado.
- Não invente modelos, especificações, compatibilidades, preços, estoque ou URLs.
- Se não houver evidência suficiente, status deve ser "nao_confirmado" e diga o que falta.
- Diferencie informação do fabricante e informação comercial de distribuidor.
- Não declare compatibilidade com base apenas em uma tecnologia compartilhada.
- Responda em português brasileiro, com clareza e objetividade.
- Retorne JSON com answer (string), status (confirmado|condicional|nao_confirmado|incompativel), evidence (array de {title,url,detail,page,sourceType}) e caveats (array de strings).
O contexto de catálogo/documentos fornecido pela aplicação é a única base factual.`;

export async function answerTechnicalQuestion(question: string, context: string): Promise<TechnicalAnswer> {
  const provider = process.env.AI_PROVIDER?.toLowerCase();
  const model = process.env.AI_MODEL;
  if (!provider || !model) throw new Error("IA não configurada. Defina AI_PROVIDER e AI_MODEL nas variáveis do servidor.");
  const prompt = `Pergunta do vendedor:\n${question}\n\nEvidências recuperadas (podem estar vazias):\n${context || "Nenhuma evidência documental recuperada."}`;
  let raw = "";
  if (provider === "openai") {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY não configurada no servidor.");
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, temperature: 0, response_format: { type: "json_object" }, messages: [{ role: "system", content: systemPrompt }, { role: "user", content: prompt }] }),
    });
    if (!res.ok) throw new Error(`Provedor de IA retornou HTTP ${res.status}.`);
    const data = await res.json(); raw = data.choices?.[0]?.message?.content ?? "";
  } else if (provider === "anthropic") {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("ANTHROPIC_API_KEY não configurada no servidor.");
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model, max_tokens: 1200, temperature: 0, system: systemPrompt, messages: [{ role: "user", content: prompt }] }),
    });
    if (!res.ok) throw new Error(`Provedor de IA retornou HTTP ${res.status}.`);
    const data = await res.json(); raw = data.content?.find((x: {type:string}) => x.type === "text")?.text ?? "";
  } else throw new Error("AI_PROVIDER deve ser openai ou anthropic.");
  try {
    const parsed = JSON.parse(raw) as TechnicalAnswer;
    if (!["confirmado","condicional","nao_confirmado","incompativel"].includes(parsed.status)) throw new Error("Status inválido");
    if (!Array.isArray(parsed.evidence) || !Array.isArray(parsed.caveats)) throw new Error("Formato inválido");
    return parsed;
  } catch {
    return { answer: "Não foi possível validar a resposta estruturada do modelo. Tente novamente ou confira a documentação manualmente.", status: "nao_confirmado", evidence: [], caveats: ["A saída da IA não passou pela validação de formato."] };
  }
}
