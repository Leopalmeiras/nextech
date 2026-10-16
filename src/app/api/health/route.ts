import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ app: "NEXO TECH", status: "online", catalog: "not_configured", productCount: 0 });
  }

  const { count, error } = await supabase.from("products").select("id", { count: "exact", head: true });
  if (error && ["42P01", "PGRST205"].includes(error.code ?? "")) {
    return NextResponse.json({ app: "NEXO TECH", status: "online", catalog: "schema_missing", productCount: 0 });
  }
  if (error) return NextResponse.json({ app: "NEXO TECH", status: "online", catalog: "error", productCount: 0 });
  return NextResponse.json({ app: "NEXO TECH", status: "online", catalog: count ? "connected" : "empty", productCount: count ?? 0 });
}
