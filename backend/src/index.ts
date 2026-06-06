import 'dotenv/config'
import 'reflect-metadata'

import './graphql/enums/registerEnums.js'

import { ApolloServer } from '@apollo/server'
import express from 'express'
import cors from 'cors'
import { buildSchema } from 'type-graphql'

import { AuthResolver } from './resolvers/auth.resolver.js'
import { expressMiddleware } from '@as-integrations/express5'
import { UserResolver } from './resolvers/user.resolver.js'
import { buildContext } from './graphql/context/index.js'
import { TransactionResolver } from './resolvers/transaction.resolver.js'
import { CategoryResolver } from './resolvers/category.resolver.js'

async function bootstrap() {
  const app = express()

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      TransactionResolver,
      CategoryResolver,
    ],
    validate: false,
    emitSchemaFile: './schema.graphql',
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext,
    }),
  )

  app.listen(
    {
      port: 4000,
    },
    () => {
      console.log(`Servidor iniciado na porta http://localhost:4000`)
      console.log(
        `GraphQL Playground disponível em http://localhost:4000/graphql`,
      )
    },
  )
}

bootstrap()
