import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    app: "NEXO TECH",
    status: "online",
    catalogConnected: false,
    pricingSourcesConnected: false,
    note: "A aplicação está ativa, mas catálogo técnico e fontes reais de preços ainda não foram conectados."
  });
}
