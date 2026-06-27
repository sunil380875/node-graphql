import { userResolvers } from "../modules/user/user.resolver.js";
import { authResolver } from "../modules/auth/auth.resolver.js";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...authResolver.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...authResolver.Mutation
  },
};
