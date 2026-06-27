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

import jwt from "jsonwebtoken";

app.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req }) => {
            const token = req.headers.token || "";
            let user = null;
            if (token) {
                try {
                    // Extract the token (handles both raw token and "Bearer <token>")
                    const actualToken = token
                    user = jwt.verify(actualToken, process.env.JWT_SECRET);
                } catch (e) {
                    console.log("Token verification failed", e.message);
                }
            }
            return { user };
        }
    })
);

app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
});