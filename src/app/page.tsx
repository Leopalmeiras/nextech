"use client";
import { useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, BookOpen, Bot, CheckCircle2, ChevronDown, CircleHelp, FileSearch, GitCompareArrows, History, Layers3, Menu, MessageSquareText, Search, Send, ShieldCheck, SlidersHorizontal, Sparkles, Tags, Wifi, X } from "lucide-react";

type Answer = { answer?: string; status?: string; evidence?: {title:string;url:string;detail?:string;page?:number;sourceType:string}[]; caveats?: string[]; error?: string };
const suggestions = [
  { icon: FileSearch, title: "Encontrar um produto", text: "Câmera 4 MP com infravermelho de 30 metros", tag: "Busca técnica" },
  { icon: GitCompareArrows, title: "Verificar compatibilidade", text: "O que preciso verificar para saber se uma câmera funciona com meu gravador?", tag: "Compatibilidade" },
  { icon: Tags, title: "Comparar preços", text: "Comparar preços de um modelo entre distribuidores", tag: "Preços" },
];
const statusLabels: Record<string,string> = { confirmado:"Confirmado", condicional:"Condicional", nao_confirmado:"Não confirmado", incompativel:"Incompatível" };

export default function Home() {
  const [query,setQuery] = useState("");
  const [answer,setAnswer] = useState<Answer|null>(null);
  const [loading,setLoading] = useState(false);
  const [mobileMenu,setMobileMenu] = useState(false);
  async function ask(q = query) {
    const clean = q.trim(); if (!clean || loading) return;
    setQuery(clean); setLoading(true); setAnswer(null);
    try {
      const res = await fetch("/api/technical", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({question:clean}) });
      const data = await res.json(); setAnswer(data);
    } catch { setAnswer({error:"Não foi possível conectar ao servidor. Verifique a publicação e tente novamente."}); }
    finally { setLoading(false); }
  }
  return <main className="min-h-screen">
    <aside className={`fixed inset-y-0 left-0 z-30 flex w-[258px] flex-col border-r border-slate-200 bg-white px-5 py-6 transition-transform md:translate-x-0 ${mobileMenu?"translate-x-0":"-translate-x-full"}`}>
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white"><Layers3 size={21}/></div>
        <div><div className="text-[17px] font-bold tracking-tight">NEXO <span className="text-accent">TECH</span></div><div className="text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400">Technical intelligence</div></div>
        <button className="ml-auto md:hidden" onClick={()=>setMobileMenu(false)} aria-label="Fechar menu"><X size={19}/></button>
      </div>
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</div>
      <nav className="space-y-1">
        <a className="flex items-center gap-3 rounded-xl bg-red-50 px-3 py-3 text-sm font-semibold text-accent" href="#"><Sparkles size={17}/> Assistente técnico</a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50" href="#catalogo"><Search size={17}/> Catálogo de produtos</a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50" href="#compatibilidade"><GitCompareArrows size={17}/> Compatibilidade</a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50" href="#precos"><Tags size={17}/> Preços de mercado</a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50" href="#documentacao"><BookOpen size={17}/> Biblioteca técnica</a>
      </nav>
      <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700"><ShieldCheck size={15} className="text-accent"/> Respostas com evidências</div>
        <p className="text-xs leading-5 text-slate-500">O NEXO não deve adivinhar especificações. Dados sem fonte são sinalizados para confirmação.</p>
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">NT</div>
        <div><div className="text-sm font-semibold">Área de trabalho</div><div className="text-xs text-slate-400">Copiloto técnico-comercial</div></div>
        <ChevronDown size={15} className="ml-auto text-slate-400"/>
      </div>
    </aside>
    {mobileMenu && <button className="fixed inset-0 z-20 bg-slate-900/20 md:hidden" onClick={()=>setMobileMenu(false)} aria-label="Fechar menu"/>}
    <section className="md:pl-[258px]">
      <header className="sticky top-0 z-10 flex h-[68px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur md:px-9">
        <div className="flex items-center gap-3"><button className="md:hidden" onClick={()=>setMobileMenu(true)} aria-label="Abrir menu"><Menu size={20}/></button><div className="hidden text-sm text-slate-400 sm:block">Workspace <span className="mx-2">/</span> <span className="font-medium text-slate-700">Assistente técnico</span></div><div className="text-sm font-medium sm:hidden">Assistente técnico</div></div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5"><span className="h-2 w-2 rounded-full bg-amber-400"/><span className="text-xs font-medium text-slate-600">Base técnica não conectada</span></div>
      </header>
      <div className="mx-auto max-w-[1180px] px-5 py-9 md:px-10 md:py-12">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-3 py-1.5 text-xs font-semibold text-accent"><Sparkles size={13}/> INTELIGÊNCIA TÉCNICA</div><h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-[38px] md:leading-[1.15]">Encontre a resposta.<br/><span className="text-slate-400">Comprove cada detalhe.</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 md:text-[15px]">Seu copiloto para especificações, compatibilidade e pesquisa de produtos. Respostas técnicas precisam de fontes verificáveis.</p></div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-500"><Activity size={15} className="text-amber-500"/> <span>Modo de configuração inicial</span></div>
        </div>
        <div className="mb-9 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft md:p-4">
          <div className="flex items-start gap-3 px-2 pt-2"><div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-accent"><Bot size={20}/></div><div><div className="text-sm font-semibold text-slate-800">O que você precisa descobrir?</div><div className="mt-1 text-xs leading-5 text-slate-500">Descreva o equipamento, os requisitos ou a dúvida do cliente.</div></div></div>
          <form className="mt-4" onSubmit={e=>{e.preventDefault();ask();}}>
            <textarea value={query} onChange={e=>setQuery(e.target.value)} rows={3} placeholder="Ex.: Preciso de uma câmera Intelbras 4 MP, infravermelho de 30 metros, para ambiente externo..." className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm leading-6 outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-50"/>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 text-xs text-slate-400"><ShieldCheck size={14}/> Sem fonte, sem confirmação técnica.</div><button disabled={loading||!query.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50">{loading?"Analisando...":"Consultar assistente"} <Send size={15}/></button></div>
          </form>
          {answer && <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5">
            {answer.error ? <><div className="font-semibold text-rose-700">Consulta indisponível</div><p className="mt-2 text-sm text-slate-600">{answer.error}</p></> : <>
              <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 font-semibold"><MessageSquareText size={17}/> Resposta técnica</div><span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">{statusLabels[answer.status||"nao_confirmado"]||"Não confirmado"}</span></div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{answer.answer}</p>
              {!!answer.evidence?.length && <div className="mt-4 border-t border-slate-200 pt-4"><div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Fontes consultadas</div>{answer.evidence.map((ev,i)=><a key={i} href={ev.url} target="_blank" rel="noreferrer" className="mb-2 block rounded-lg border border-slate-200 bg-white p-3 text-sm hover:border-slate-300"><span className="font-semibold text-slate-800">{ev.title}</span><span className="mt-1 block text-xs text-slate-500">{ev.detail||ev.url}{ev.page?` · página ${ev.page}`:""}</span></a>)}</div>}
              {!!answer.caveats?.length && <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-500">{answer.caveats.map((c,i)=><li key={i}>{c}</li>)}</ul>}
            </>}
          </div>}
        </div>
        <div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold tracking-tight">Atalhos inteligentes</h2><p className="mt-1 text-sm text-slate-500">Comece por uma das tarefas mais comuns.</p></div><SlidersHorizontal size={18} className="text-slate-400"/></div>
        <div className="grid gap-4 md:grid-cols-3">{suggestions.map((s,i)=><button key={s.title} onClick={()=>{setQuery(s.text); if(i===0) window.scrollTo({top:0,behavior:"smooth"});}} className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-slate-300"><div className="mb-5 flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-red-50 group-hover:text-accent"><s.icon size={19}/></div><ArrowUpRight size={17} className="text-slate-300 transition group-hover:text-accent"/></div><div className="text-sm font-semibold">{s.title}</div><p className="mt-2 min-h-[42px] text-xs leading-5 text-slate-500">{s.text}</p><div className="mt-4 text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">{s.tag}</div></button>)}</div>
        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          <div id="catalogo" className="rounded-2xl border border-slate-200 bg-white p-5"><div className="mb-3 flex items-center gap-2"><Search size={17} className="text-accent"/><h3 className="text-sm font-semibold">Catálogo de produtos</h3></div><p className="text-xs leading-5 text-slate-500">Aguardando importação de catálogo oficial e especificações verificadas.</p><div className="mt-4 flex items-center gap-2 text-xs text-amber-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-400"/> Ainda não conectado</div></div>
          <div id="compatibilidade" className="rounded-2xl border border-slate-200 bg-white p-5"><div className="mb-3 flex items-center gap-2"><GitCompareArrows size={17} className="text-accent"/><h3 className="text-sm font-semibold">Compatibilidade</h3></div><p className="text-xs leading-5 text-slate-500">A verificação dependerá de fichas técnicas e regras específicas de cada categoria.</p><div className="mt-4 flex items-center gap-2 text-xs text-amber-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-400"/> Sem vereditos até conectar fontes</div></div>
          <div id="precos" className="rounded-2xl border border-slate-200 bg-white p-5"><div className="mb-3 flex items-center gap-2"><Tags size={17} className="text-accent"/><h3 className="text-sm font-semibold">Preços de mercado</h3></div><p className="text-xs leading-5 text-slate-500">Nenhum preço é exibido até configurar fontes comerciais reais.</p><div className="mt-4 flex items-center gap-2 text-xs text-amber-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-400"/> Fontes não conectadas</div></div>
        </div>
        <div id="documentacao" className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><BookOpen size={19}/></div><div className="flex-1"><div className="text-sm font-semibold">Biblioteca técnica</div><p className="mt-1 text-xs leading-5 text-slate-500">A etapa de ingestão de datasheets e indexação por página ainda precisa ser implementada e configurada.</p></div><span className="inline-flex items-center gap-2 self-start rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 sm:self-auto"><History size={13}/> Próxima etapa</span></div>
        <footer className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-5 text-[11px] leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>NEXO TECH · Copiloto técnico-comercial independente.</span><span>As conclusões dependem das fontes efetivamente conectadas.</span></footer>
      </div>
    </section>
  </main>;
}
