import authRepository from "./auth.respository.js"


class AuthService {
    async login(body) {
        return await authRepository.login(body);
    }

    async signup(body) {
        return await authRepository.signup(body);
    }

    async profile(id) {
        return await authRepository.profile(id);
    }
}

export default new AuthService()