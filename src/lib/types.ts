export type Evidence = { title: string; url: string; detail?: string; page?: number; sourceType: "fabricante" | "distribuidor" | "interno" };
export type TechnicalAnswer = {
  answer: string;
  status: "confirmado" | "condicional" | "nao_confirmado" | "incompativel";
  evidence: Evidence[];
  caveats: string[];
};
export type Product = {
  id: string; manufacturer: string; model: string; name: string; category: string;
  specs: Record<string, string | number | boolean | null>;
  sourceUrl: string; sourceTitle: string; verifiedAt?: string;
};
