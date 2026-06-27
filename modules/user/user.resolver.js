import userService from "./user.service.js";
export const userResolvers = {
    Query: {
        getAllUser: async () => await userService.getAllUser(),
        getUserById: async (_, { id }) => await userService.getUserById(id)
    },

    Mutation: {
        saveUser: async (_, { input }) => await userService.saveUser(input),
        updateUser: async (_, { id, body }) => await userService.updateUser(id, body)
    }
};

