import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "NEXO TECH — Copiloto Técnico-Comercial",
  description: "Assistente técnico com respostas rastreáveis e documentação verificável.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
