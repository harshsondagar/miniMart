import { authRepositories } from "../reposetories/auth.reposetories";
import { user } from "../types/types";

class AuthServices {
    async createUser(data: user) {
        return await authRepositories.create(data)
    }

    async findByEmail(email: string) {
        return await authRepositories.findByEmail(email)
    }

    async findByUserId(userId: number) {
        return await authRepositories.findById(userId)
    }
}

export const authServices = new AuthServices()