import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

app.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(server)
);

app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
});