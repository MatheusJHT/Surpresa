# 19 Anos, 19 Dias, 19 Presentes

Experiência romântica de caça ao tesouro: cada presente físico entrega uma senha que libera a mensagem e o enigma do próximo capítulo.

## Stack

- React, Vite e TypeScript
- Tailwind CSS, Framer Motion e Lucide React
- Supabase Auth, PostgreSQL, RLS, Storage e Edge Functions
- Deploy do frontend na Vercel

## Requisitos

- Node.js 20 ou superior
- Um projeto Supabase
- Supabase CLI para aplicar migrations e publicar Edge Functions

## Instalação local

```bash
npm install
copy .env.example .env
npm run dev
```

Preencha `.env` com:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

O `service_role` nunca deve ser colocado no `.env` do frontend, no repositório ou em código React.

## Comandos

```bash
npm run dev       # desenvolvimento
npm run build     # typecheck e build de produção
npm run test      # testes automatizados
npm run test:watch
npm run preview   # preview do build
```

## Supabase

1. Crie um projeto no Supabase.
2. Instale e autentique a Supabase CLI.
3. Vincule o projeto local:

```bash
supabase login
supabase link --project-ref SEU_PROJECT_REF
```

4. Aplique as migrations na ordem:

```bash
supabase db push
```

As migrations criam `presents`, `user_progress`, `site_settings`, `carousel_images`, constraints, índices, RLS, views públicas seguras e o bucket `romantic-site`.

5. Execute o seed fictício:

```bash
supabase db reset
# ou execute supabase/seed.sql no SQL Editor de um banco já existente
```

6. Crie a usuária da jornada em **Authentication > Users**.
7. Defina o administrador no SQL Editor, substituindo o UUID:

```sql
update public.site_settings
set admin_user_id = 'UUID_DO_USUARIO_ADMIN';
```

Para conferir se o UUID está correto, execute:

```sql
select auth.uid() as usuario_logado, admin_user_id
from public.site_settings;
```

`admin_user_id` precisa ser exatamente o UUID exibido em **Authentication > Users**, não o e-mail. Depois de aplicar uma migration nova, faça um novo deploy do frontend e das funções.

8. Publique as Edge Functions:

```bash
supabase functions deploy validate-present-password
supabase functions deploy get-present-content
supabase functions deploy admin-api
```

Após alterar uma Edge Function, publique-a novamente. O deploy da Vercel não publica funções Supabase:

```bash
supabase functions deploy admin-api
```

As funções usam automaticamente `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` fornecidas pelo ambiente Supabase. O último segredo só existe no backend da função.

## Fluxo de segurança

- Senhas físicas são armazenadas apenas como hashes bcrypt.
- `public_presents` expõe somente o índice dos dias.
- Mensagem e enigma são entregues por `get-present-content` somente depois de `password_verified`.
- `validate-present-password` retorna somente um booleano.
- A progressão anterior é validada no backend antes de aceitar a próxima senha.
- A usuária lê apenas seu próprio progresso por RLS.
- O admin é identificado por `site_settings.admin_user_id` no banco.
- Upload, substituição e exclusão no Storage exigem usuário autenticado e admin.

## Storage

O bucket `romantic-site` é público apenas para leitura das imagens do carrossel. Escrita e exclusão continuam protegidas por políticas RLS. O painel `/admin` faz upload, preview, substituição e exclusão.

## Vercel

1. Importe o repositório na Vercel.
2. Use `npm run build` como comando de build.
3. Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas variáveis de ambiente de Production, Preview e Development conforme necessário.
4. Publique o projeto.
5. Configure o domínio da Vercel em **Authentication > URL Configuration** no Supabase.

O arquivo `vercel.json` mantém as rotas SPA, como `/admin`, `/jornada` e `/presente/:id`, funcionando quando abertas diretamente ou atualizadas no navegador.

## Estrutura principal

```text
src/
  components/       componentes públicos, timeline e guardas de rota
  context/          sessão Supabase
  pages/            Home, login, jornada, presente e admin
  services/         Supabase, progresso, conteúdo e Storage
  types/            contratos de dados
  utils/            regras puras testáveis
supabase/
  migrations/       schema, RLS, views e Storage
  functions/        validação, conteúdo protegido e admin-api
  seed.sql          19 presentes fictícios
```

## Checklist antes do deploy

- [ ] Migrations aplicadas no projeto Supabase correto.
- [ ] Seed substituído pelos textos, hashes e enigmas reais via painel admin.
- [ ] Usuária e administrador criados no Supabase Auth.
- [ ] `admin_user_id` configurado.
- [ ] Quatro Edge Functions publicadas.
- [ ] Bucket `romantic-site` criado e políticas aplicadas.
- [ ] Variáveis `VITE_*` configuradas na Vercel.
- [ ] `npm run test` executado.
- [ ] `npm run build` executado.
- [ ] Testados mobile, login, senha errada, retomada, reset e Dia 19.