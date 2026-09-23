# 19 Anos, 19 Dias, 19 Presentes

Roadmap de implementação incremental. Cada parte termina com validação, commit e uma pausa para aprovação antes da próxima etapa.

## Ordem das partes

### Parte 1 — Roadmap e fundação do repositório
- Registrar escopo, decisões técnicas e critérios de conclusão.
- Criar a estrutura inicial do projeto e configurar o fluxo de commits.
- Critério: documentação inicial versionada e repositório limpo após o commit.

### Parte 2 — Scaffold do frontend
- Inicializar React, Vite, TypeScript, Tailwind CSS, React Router, Lucide e Framer Motion.
- Criar variáveis visuais, tipografia, layout responsivo e rotas-base.
- Critério: aplicação inicia, compila e exibe uma casca navegável sem dados sensíveis.

### Parte 3 — Modelo de dados e segurança Supabase
- Criar migrations para `presents`, `user_progress`, `site_settings` e `carousel_images`.
- Adicionar constraints, índices, RLS, papéis e políticas mínimas.
- Criar seed fictício dos 19 dias e configuração inicial de Storage.
- Critério: migrations e seed executam sem erro e não expõem hashes à usuária.

### Parte 4 — Autenticação e camada de serviços
- Configurar cliente Supabase, sessão, proteção de rotas e perfis usuária/admin.
- Implementar serviços tipados para jornada, progresso, configurações e Storage.
- Critério: login, logout, recuperação de sessão e autorização funcionam no frontend.

### Parte 5 — Home e jornada visual
- Implementar Home emocional com carrossel, navegação e identidade visual.
- Implementar timeline dos 19 dias com estados bloqueado, disponível e concluído.
- Critério: layout responsivo nos tamanhos prioritários e jornada sequencial visível.

### Parte 6 — Edge Functions e fluxo de um presente
- Implementar `validate-present-password` e `validate-answer` com normalização configurável.
- Criar o fluxo senha → pergunta → resposta → mensagem → enigma.
- Persistir tentativas, retomada e conclusão sem enviar segredos ao navegador.
- Critério: um presente completo funciona ponta a ponta com senha e resposta validadas no backend.

### Parte 7 — Progressão dos 19 presentes
- Conectar todos os dias à progressão obrigatória `01 → 19`.
- Implementar desbloqueio do próximo dia e experiência especial do Dia 19.
- Adicionar animações de sucesso, conclusão e confetti com moderação.
- Critério: o ciclo completo de 19 presentes pode ser concluído sem acesso antecipado.

### Parte 8 — Painel administrativo
- Criar `/admin` com visão geral, presentes, fotos, configurações e progresso.
- Implementar edição das perguntas, senhas, mensagens, enigmas, dicas e status.
- Hashing de novos segredos no backend e reset de progresso/dados de fábrica com confirmação.
- Critério: administrador consegue operar o conteúdo sem expor segredos à usuária.

### Parte 9 — Fotos, Storage e acabamento de UX
- Implementar upload, preview, substituição e exclusão de imagens.
- Finalizar loading, erro, disabled, foco, teclado, labels e mensagens amigáveis.
- Revisar mobile, overflow, contraste e estados vazios.
- Critério: fluxos públicos e administrativos são utilizáveis e acessíveis em mobile e desktop.

### Parte 10 — Testes, documentação e deploy
- Adicionar testes do fluxo crítico, segurança de acesso e validação de dados.
- Completar README com instalação, Supabase, Edge Functions, Storage e Vercel.
- Executar build final e checklist de produção; preparar configuração de deploy.
- Critério: build passa, documentação permite reproduzir o ambiente e o checklist de aceite está atendido.

## Regra de avanço

Ao finalizar cada parte:

1. Executar a validação correspondente.
2. Atualizar este roadmap com o estado da parte.
3. Fazer um commit isolado.
4. Parar e pedir autorização para iniciar a próxima parte.

## Status

- [x] Parte 1 — Roadmap e fundação do repositório
- [x] Parte 2 — Scaffold do frontend
- [x] Parte 3 — Modelo de dados e segurança Supabase
- [x] Parte 4 — Autenticação e camada de serviços
- [x] Parte 5 — Home e jornada visual
- [ ] Parte 6 — Edge Functions e fluxo de um presente
- [ ] Parte 7 — Progressão dos 19 presentes
- [ ] Parte 8 — Painel administrativo
- [ ] Parte 9 — Fotos, Storage e acabamento de UX
- [ ] Parte 10 — Testes, documentação e deploy