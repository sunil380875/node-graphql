import userRepository from './user.repository.js';

class UserService {
    async saveUser(body) {
        return await userRepository.save(body);
    }

    async getAllUser() {
        return await userRepository.getAll();
    }

    async getUserById(id) {
        return await userRepository.getUserById(id)
    }

    async updateUser(id,body){
        return await userRepository.updateUser(id,body)
    }
}

export default new UserService()