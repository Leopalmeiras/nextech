# Plano de implementação

## Etapa 1 — Aplicação base
- [x] Interface responsiva
- [x] Estados explícitos para integrações não configuradas
- [x] Endpoint server-side para IA
- [x] Modelo inicial de dados
- [x] Variáveis de ambiente e CI
- [ ] Instalar dependências e executar build em ambiente Node

## Etapa 2 — Base técnica confiável
- [ ] Obter catálogo e datasheets oficiais por meios autorizados
- [ ] Implementar importação PDF com extração de texto e tabelas
- [ ] Indexar trechos preservando página, URL, versão e modelo associado
- [ ] Implementar busca híbrida (texto + vetorial)
- [ ] Criar avaliação com perguntas reais e gabarito documental

## Etapa 3 — Compatibilidade
- [ ] Modelar requisitos por categoria (CFTV, rede, energia, acesso etc.)
- [ ] Implementar validações determinísticas para tensão, potência, canais e interfaces
- [ ] RAG para compatibilidades que exigem documentação
- [ ] Exigir evidência para vereditos positivos

## Etapa 4 — Preços
- [ ] Cadastrar sites de distribuidoras escolhidos pelo usuário
- [ ] Preferir APIs/feeds autorizados
- [ ] Implementar adaptador por fonte, respeitando termos e limites
- [ ] Validar SKU/modelo exato e guardar histórico de observações
- [ ] Nunca preencher preço quando a fonte não fornecer valor

## Etapa 5 — Produção
- [ ] Autenticação e autorização
- [ ] Rate limiting e monitoramento de custos
- [ ] Proteção contra abuso de endpoint
- [ ] Políticas RLS e revisão de segurança
- [ ] Testes de regressão e revisão de fontes
