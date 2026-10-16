import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ state: "not_configured", products: [], total: 0 });

  const { data, count, error } = await supabase
    .from("products")
    .select("id,manufacturer,model,name,category,specs,source_url,source_title,verified_at", { count: "exact" })
    .order("manufacturer")
    .order("model")
    .limit(50);

  if (error && ["42P01", "PGRST205"].includes(error.code ?? "")) return NextResponse.json({ state: "schema_missing", products: [], total: 0 });
  if (error) return NextResponse.json({ state: "error", products: [], total: 0 });
  return NextResponse.json({ state: count ? "connected" : "empty", products: data ?? [], total: count ?? 0 });
}
