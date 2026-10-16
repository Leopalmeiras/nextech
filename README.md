# NEXO TECH — Copiloto Técnico-Comercial

Starter de aplicação para pesquisa técnica de produtos, compatibilidade documentada e comparação de preços com fontes rastreáveis.

## Importante
Este repositório inicial **não contém catálogo real Intelbras nem preços reais**. O sistema não deve ser usado como fonte técnica até que datasheets, catálogo verificado e integrações sejam configurados. O modo inicial informa quando não há dados suficientes.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- API server-side para consultas
- Estrutura preparada para Supabase e provedor de IA
- GitHub Actions para validação de build

## Requisitos
- Node.js 20+
- npm
- Conta Supabase (necessária para catálogo e documentos)
- Chave de API de um provedor de IA (opcional; necessária para IA generativa)

## Executar localmente
```bash
npm install
cp .env.example .env.local
npm run dev
```
Abra http://localhost:3000.

## Variáveis de ambiente
Configure `.env.local` somente no computador e as mesmas variáveis no painel de hospedagem:
- `AI_PROVIDER`: `openai` ou `anthropic`
- `OPENAI_API_KEY` ou `ANTHROPIC_API_KEY`
- `AI_MODEL`: modelo disponível na sua conta
- `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`: backend Supabase (necessárias para catálogo e documentos)

Nunca coloque segredos em variáveis `NEXT_PUBLIC_*` nem faça commit do `.env.local`.

## GitHub
1. Envie todos os arquivos deste projeto para a raiz do repositório.
2. No Supabase, abra **SQL Editor**, cole `supabase/schema.sql` e execute. Isso cria as tabelas, mas **não insere produtos nem documentos**.
3. No Supabase, copie a Project URL e a chave `service_role` para `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` no `.env.local`. Cadastre as mesmas variáveis em **Vercel → Project → Settings → Environment Variables**. A chave `service_role` deve permanecer apenas no servidor; nunca use `NEXT_PUBLIC_`.
4. No **Table Editor** do Supabase, cadastre primeiro uma linha em `products` (fabricante, modelo, nome, categoria, especificações, URL e título da fonte); depois uma linha em `documents` associada ao produto; por fim, adicione os trechos pesquisáveis em `document_chunks`, usando o `id` do documento, o texto fiel, número da página e URL da fonte. Use somente informações verificadas do fabricante. Sem esses registros, o banco pode estar conectado enquanto o catálogo continua vazio.
5. Configure `AI_PROVIDER`, `AI_MODEL` e a chave correspondente do provedor no `.env.local` e na Vercel.
6. Faça um novo deploy na Vercel.

## Verificação rápida
- `GET /api/health`: mostra se a aplicação está online, se a tabela de produtos responde e quantos produtos existem.
- `GET /api/catalog`: lista até 50 produtos cadastrados.
- Os atalhos de consulta enviam a pergunta diretamente. A API só chama a IA quando recupera trechos da tabela `document_chunks`; sem evidências, retorna “Não confirmado”.

## Estado das funcionalidades
- Interface responsiva e atalhos de consulta: implementados.
- Chat com recuperação de trechos documentais: depende de configurar as APIs e cadastrar documentos.
- Catálogo oficial: ainda precisa ser importado e validado.
- Compatibilidade: sem dados de produtos não emite veredito.
- Comparador de preços: interface e modelo de dados preparados; conectores reais ainda precisam ser configurados.
- Importação e indexação de PDFs: etapa seguinte de desenvolvimento.

## Regras de integridade
- Não tratar dados demonstrativos como fatos.
- Não inventar preço, estoque, modelo ou compatibilidade.
- Toda especificação precisa estar associada a fonte documental.
- Respostas sem evidência devem ser marcadas como "Não confirmado".
