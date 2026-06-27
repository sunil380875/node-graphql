import { userResolvers } from "../modules/user/user.resolver.js";

export const resolvers = {
  Query: {
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
