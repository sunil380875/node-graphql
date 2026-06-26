import { userService } from './user.service.js';

export const userResolvers = {
    Query: {
        book: () => userService.getBook(),
    },
};
