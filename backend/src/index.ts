import { ApolloServer } from '@apollo/server';
import express from 'express';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './resolvers/auth.resolver.js';

async function bootstrap() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  const schema = await buildSchema({
    resolvers: [AuthResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
  );

  app.listen(
    {
      port: 4000,
    },
    () => {
      console.log(`Servidor iniciado na porta 4000`);
    },
  );
}

bootstrap();
