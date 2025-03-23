import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './src/db.js';
import typeDefs from './src/schema.js';
import resolvers from './src/resolvers.js';

connectDB();

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 6000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
}

startServer();
