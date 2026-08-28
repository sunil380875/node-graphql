// email.scalar.js

import { GraphQLScalarType, Kind } from "graphql";

export const EmailScalar = new GraphQLScalarType({
  name: "Email",
  description: "Email custom scalar",

  serialize(value) {
    return value;
  },

  parseValue(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error("Invalid email address");
    }

    return value.toLowerCase();
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new Error("Email must be a string");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(ast.value)) {
      throw new Error("Invalid email address");
    }

    return ast.value.toLowerCase();
  }
});