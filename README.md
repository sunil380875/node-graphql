# Node.js GraphQL Express 5 API Server

A modern GraphQL API server built with **Node.js (ES Modules)**, **Express 5**, **Apollo Server**, and PostgreSQL connection capability.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Package Overview & Usage](#package-overview--usage)
- [Express 5 & Apollo Server Integration (@as-integrations/express5)](#express-5--apollo-server-integration-as-integrationsexpress5)
  - [Why `@as-integrations/express5`?](#why-as-integrationsexpress5)
  - [Step-by-Step Integration Guide](#step-by-step-integration-guide)
  - [Context Function & Authentication](#context-function--authentication)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## 🚀 Overview

This project provides a boilerplate for building a scalable GraphQL service using Node.js and Express 5. It leverages the latest **Apollo Server** setup with **Express 5 compatibility**, featuring JWT authentication middleware, PostgreSQL pooling, password hashing, and environment configuration.

---

## 📦 Package Overview & Usage

Below is a summary of the core packages installed in this project and their roles:

| Package | Purpose & Usage |
| :--- | :--- |
| **`express` (`^5.2.1`)** | The web application framework powering the HTTP server and routing layer. |
| **`@apollo/server` (`^5.5.1`)** | The core Apollo GraphQL server that parses schema definitions, executes GraphQL queries/mutations, and manages schema execution. |
| **`@as-integrations/express5` (`^1.1.2`)** | Middleware integration adapter enabling Apollo Server to run seamlessly on **Express 5**. |
| **`graphql` (`^16.14.2`)** | JavaScript reference implementation of GraphQL, required as a peer dependency by Apollo Server. |
| **`pg` (`^8.22.0`)** | Non-blocking PostgreSQL client for Node.js used to execute SQL queries and maintain connection pools. |
| **`bcrypt` (`^6.0.0`)** | Library to hash and salt user passwords securely before storing them in the database. |
| **`jsonwebtoken` (`^9.0.3`)** | Implementation of JSON Web Tokens (JWT) used for authenticating users via Authorization/Token headers. |
| **`dotenv` (`^17.4.2`)** | Loads environment variables from a `.env` file into `process.env`. |
| **`body-parser` (`^2.3.0`)** | Middleware to parse incoming JSON payload streams from HTTP request bodies. |
| **`cors` (`^2.8.6`)** | Express middleware to enable Cross-Origin Resource Sharing for API requests from web applications. |
| **`nodemon` (`^3.1.14`)** | Development utility that automatically restarts the Node server when file changes are detected. |

---

## ⚡ Express 5 & Apollo Server Integration (`@as-integrations/express5`)

### Why `@as-integrations/express5`?

Apollo Server out of the box ships with `@apollo/server/express4` which is specifically built for Express version 4. Express 5 introduced changes to middleware routing, request/response objects, and error handling mechanisms.

To attach Apollo Server to an Express 5 app, the official/community integration package **`@as-integrations/express5`** is required. It provides the `expressMiddleware` adapter compatible with Express 5 signature requirements.

### Step-by-Step Integration Guide

#### 1. Installation
Install Apollo Server, GraphQL, Express 5, and the `@as-integrations/express5` adapter:

```bash
npm install @apollo/server graphql express @as-integrations/express5 body-parser cors
```

#### 2. Server Initialization & Middleware Attachment

```javascript
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

// 1. Initialize Express application
const app = express();

// 2. Instantiate Apollo Server with schema definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 3. Start Apollo Server before binding middleware
await server.start();

// 4. Mount Apollo Middleware on your desired path (e.g., /graphql)
app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      // Extract authentication token from incoming request headers
      const token = req.headers.token || req.headers.authorization || "";
      let user = null;

      if (token) {
        try {
          const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
          user = jwt.verify(actualToken, process.env.JWT_SECRET);
        } catch (err) {
          console.log("Token verification failed:", err.message);
        }
      }

      // Returned context object becomes accessible inside all GraphQL resolvers
      return { user };
    },
  })
);

// 5. Start listening on designated port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 GraphQL Server running at http://localhost:${PORT}/graphql`);
});
```

---

## 🔑 Context Function & Authentication

The `context` callback inside `expressMiddleware` executes for every incoming GraphQL operation:

1. **Request Access**: Gives access to Express `req` and `res` objects.
2. **Token Extraction**: Inspects HTTP headers for authentication credentials (`req.headers.token` or `Authorization: Bearer <token>`).
3. **Resolver Availability**: Whatever is returned by `context` (e.g. `{ user, dbPool }`) is passed as the 3rd argument (`contextValue`) in resolver functions:

```javascript
// Example Resolver consuming context
export const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      return context.user;
    },
  },
};
```

---

## 📂 Project Structure

```text
node-graphql/
├── db/
│   └── pool.js           # PostgreSQL connection pool configuration
├── graphql/
│   ├── typeDefs.js       # GraphQL schema definitions
│   └── resolvers.js      # GraphQL resolver functions
├── modules/              # Feature modules (auth, user)
├── .env                  # Environment configuration
├── index.js              # Server entry point & Express 5 integration
└── package.json          # Dependencies & scripts
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL (if utilizing database integration)

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=4000
   JWT_SECRET=your_secret_key
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=mydb
   DB_PORT=5432
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:4000/graphql` in your browser to open Apollo Sandbox or test GraphQL operations.

---

## 📜 Available Scripts

- `npm start` - Runs the application in production mode (`node index.js`).
- `npm run dev` - Runs the application in development mode with auto-reloading (`nodemon index.js`).
- `npm test` - Runs Jest unit tests.
