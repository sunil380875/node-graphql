import { userRepository } from './user.repository.js';

export const userService = {
    getBook: () => {
        return userRepository.getBook();
    }
};
