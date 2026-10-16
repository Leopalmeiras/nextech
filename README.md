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
- Conta Supabase (opcional para iniciar; necessária para persistência)
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
- `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`: backend Supabase, se habilitado

Nunca coloque segredos em variáveis `NEXT_PUBLIC_*` nem faça commit do `.env.local`.

## GitHub
1. Crie um repositório vazio chamado `nexo-tech`.
2. Descompacte este projeto e envie os arquivos para a raiz do repositório.
3. Configure a hospedagem na Vercel conectando o repositório.
4. Cadastre as variáveis de ambiente no projeto da Vercel.
5. Faça o deploy. A interface poderá abrir online, mas IA e banco só funcionarão depois de configurados.

## Estado das funcionalidades
- Interface responsiva: implementada.
- Chat com respostas fundamentadas: estrutura inicial implementada; depende de configurar a API.
- Catálogo oficial: ainda precisa ser importado e validado.
- Compatibilidade: sem dados de produtos não emite veredito.
- Comparador de preços: interface e modelo de dados preparados; conectores reais ainda precisam ser configurados.
- Importação e indexação de PDFs: etapa seguinte de desenvolvimento.

## Regras de integridade
- Não tratar dados demonstrativos como fatos.
- Não inventar preço, estoque, modelo ou compatibilidade.
- Toda especificação precisa estar associada a fonte documental.
- Respostas sem evidência devem ser marcadas como "Não confirmado".
