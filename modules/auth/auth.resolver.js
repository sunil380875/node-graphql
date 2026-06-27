import { GraphQLError } from "graphql";
import authService from "./auth.service.js";

export const authResolver = {
    Mutation: {
        login: async (_, { body }) => await authService.login(body),
        signup: async (_, { body }) => await authService.signup(body),
    },
    Query: {
        profile: async (_, __, context) => {
            if (!context.user) {
                throw new GraphQLError("You are not authenticated!", {
                    extensions: { code: 'UNAUTHENTICATED' },
                });
            }
            console.log(context.user,"dkcmsdjcn")
            return await authService.profile(context.user.id);
        }
    }
}