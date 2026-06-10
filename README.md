# Financy

Aplicação de controle financeiro pessoal com frontend em React e backend GraphQL em Node.js. Permite cadastro e login de usuário, gerenciamento de categorias e transações, e visualização de resumo financeiro.

## Funcionalidades

- Cadastro e login de usuário com autenticação JWT
- Atualização de perfil do usuário autenticado
- Criação, edição e exclusão de categorias financeiras
- Listagem de categorias do usuário autenticado
- Criação, edição e exclusão de transações
- Listagem de transações paginadas com filtros
- Painel de dashboard com resumo financeiro e estatísticas por categoria
- Frontend protegido com rotas públicas e privadas

## Tecnologias

### Frontend

- React 19
- Vite 8
- TypeScript 6
- Tailwind CSS 4
- Apollo Client 4
- React Router DOM 7
- Zustand
- Zod
- React Hook Form
- Lucide React

### Backend

- Node.js (ESM)
- TypeScript 6
- Express 5
- Apollo Server 5
- GraphQL
- type-graphql
- Prisma 7
- SQLite via `@prisma/adapter-better-sqlite3`
- JSON Web Tokens (`jsonwebtoken`)
- bcryptjs
- cors
- dotenv

## Pré-requisitos

- Node.js 18+ (recomendado)
- npm 10+ (recomendado)

> Use uma versão recente de Node/npm compatível com Vite 8 e Prisma 7. Durante o desenvolvimento foi utilizada a versão v24.0.2 para o node e 11.3.0 para o npm.

## Configuração

### Backend

1. Entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie o arquivo de exemplo de ambiente:
   ```bash
   cp .env.example .env
   ```
4. Gere o cliente Prisma:
   ```bash
   npm run prisma:generate
   ```

### Frontend

1. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie o arquivo de exemplo de ambiente:
   ```bash
   cp .env.example .env
   ```

## Variáveis de Ambiente

### Backend

Exemplo completo do arquivo `.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=development-secret
```

### Frontend

Exemplo completo do arquivo `.env`:

```env
VITE_BACKEND_URL=http://localhost:4000/graphql
```

## Executando o Projeto

### Backend

```bash
cd backend
npm run dev
```

A API GraphQL ficará disponível em `http://localhost:4000/graphql`.

### Frontend

```bash
cd frontend
npm run dev
```

O frontend padrão do Vite deverá subir em `http://localhost:5173`.

## Banco de Dados

O backend usa SQLite com Prisma. A configuração padrão está em `backend/.env.example`:

- `DATABASE_URL="file:./dev.db"`

O arquivo do banco será gerado localmente na pasta `backend` quando o Prisma for inicializado.

Migrations existentes estão em `backend/prisma/migrations`.

### Aplicar migrations

No backend:

```bash
cd backend
npx prisma migrate deploy
```

ou, em ambiente de desenvolvimento:

```bash
cd backend
npx prisma migrate dev
```

## Build

### Backend

O backend não possui um script de build dedicado; ele é executado diretamente com `tsx`. Caso seja necessário gerar artefatos, use o comando do TypeScript ou crie um script local.

```bash
cd backend
npm run prisma:generate
```

### Frontend

```bash
cd frontend
npm run build
```

## Estrutura do Projeto

- `backend/`
  - `src/` - código fonte do servidor
    - `index.ts` - ponto de entrada do servidor Express + Apollo
    - `graphql/` - contexto, decorators e enums do GraphQL
    - `resolvers/` - resolvers GraphQL para auth, usuário, transações, categorias e dashboard
    - `services/` - lógica de negócios e operação com Prisma
    - `infra/database/prisma.ts` - configuração do cliente Prisma
    - `utils/` - JWT e hash de senha
    - `config/env.ts` - leitura de variáveis de ambiente
  - `prisma/` - schema do Prisma e migrations
  - `.env.example` - modelo de variáveis de ambiente

- `frontend/`
  - `src/` - código fonte do aplicativo React
    - `pages/` - páginas do app: auth, dashboard, categorias, transações, perfil
    - `components/` - UI, layout, rotas protegidas e navegação
    - `stores/` - estado global com Zustand para auth, categorias, transações e dashboard
    - `lib/graphql/` - client Apollo e operações GraphQL
    - `types/` - tipos TypeScript compartilhados
  - `.env.example` - modelo de variáveis de ambiente para o frontend

## Observações

- O backend permite CORS apenas para `http://localhost:5173` por padrão. Caso use outra porta, atualize `backend/src/index.ts` ou ajuste o `.env` do frontend.
- O frontend consome a API GraphQL via `VITE_BACKEND_URL`, então o backend deve estar rodando antes do frontend para evitar erros de conexão.
- O ponto de entrada do backend expõe o GraphQL Playground em `http://localhost:4000/graphql`.
- A autenticação usa JWT no cabeçalho `Authorization: Bearer <token>`.
