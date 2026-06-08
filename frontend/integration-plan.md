Eu seguiria uma ordem baseada em **destravar telas completas rapidamente**, reduzindo retrabalho.

# 1. Atualizar tipos GraphQL e camada de API

Criar:

- `DashboardSummary`
- `CategoryStatistics`
- `PaginatedTransactions`
- `ListTransactionsInput`

Atualizar:

- Queries GraphQL
- Hooks de API
- Tipos TypeScript

Objetivo: ter o contrato do backend refletido no frontend antes de alterar telas.

---

# 2. Integração da paginação de transações

Atualizar:

- Query `listTransactions`
- Hook de listagem
- Estado de página atual

Implementar:

- Página anterior
- Próxima página
- Página específica

Objetivo: trocar a listagem atual pela nova versão paginada.

---

# 3. Integração dos filtros

Adicionar ao formulário:

- descrição
- categoria
- tipo
- mês

Integrar com:

```ts
ListTransactionsInput
```

Utilizar:

```ts
useWatch()
```

para observar filtros.

Objetivo: concluir a tela de transações antes de partir para dashboard.

---

# 4. Gerar lista dinâmica dos últimos 12 meses

Substituir:

```html
Junho / 2025 Julho / 2025 ...
```

por geração automática baseada na data atual.

Criar utilitário:

```ts
getLast12Months()
```

Retornando:

```ts
;[
  {
    month: 6,
    year: 2026,
    label: 'Junho / 2026',
  },
]
```

Objetivo: finalizar o filtro de período.

---

# 5. DashboardSummary

Criar:

- query `dashboardSummary`
- hook `useDashboardSummary`

Ainda sem montar gráficos.

Objetivo: validar integração do endpoint principal.

---

# 6. Cards de indicadores

Consumir:

```ts
balance
currentMonthRevenue
currentMonthExpense
transactionCount
categoryCount
```

Criar:

- Saldo
- Receitas do mês
- Despesas do mês
- Total de transações
- Total de categorias

Objetivo: entregar rapidamente a parte mais visível do dashboard.

---

# 7. Últimas 5 transações

Consumir:

```ts
latestTransactions
```

Criar:

- tabela reduzida
- link para página completa de transações

Objetivo: concluir a área principal do dashboard.

---

# 8. Estatísticas por categoria

Criar:

```graphql
categoriesStatistics
```

Consumir:

```ts
category
transactionCount
totalAmount
```

Criar componente:

```text
Categoria
Quantidade
Valor total
```

Objetivo: disponibilizar os dados analíticos.

---

# 9. Categoria mais utilizada

Consumir:

```ts
dashboardSummary.mostUsedCategory
```

Criar card específico:

```text
Categoria mais utilizada
Nome
Quantidade de transações
Valor movimentado
```

Objetivo: reaproveitar dados já carregados pelo dashboard.

---

# Ordem final

```text
1. Tipos GraphQL + API
2. Paginação de transações
3. Filtros de transações
4. Últimos 12 meses dinâmicos
5. DashboardSummary
6. Cards (saldo, receitas, despesas, contadores)
7. Últimas 5 transações
8. Estatísticas por categoria
9. Categoria mais utilizada
```

Essa ordem deixa a tela de transações totalmente funcional primeiro e depois concentra o trabalho na construção visual do dashboard usando os dados já disponíveis.
