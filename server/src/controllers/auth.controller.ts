import { Request, Response } from 'express';


class AuthController {
    async register(req: Request, res: Response) {
        const { username, email, password, } = req.body

        if (!username || !email || !password)
    }
}

export const authController = new AuthController()