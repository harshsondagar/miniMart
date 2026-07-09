import { Request, Response } from 'express';
import { authServices } from '../services/auth.services';
import { JwtUtils } from '../utils/utils.jwt';

class AuthController {
    async register(req: Request, res: Response) {
        const { username, email, password, } = req.body

        if (!username || !email || !password) {
            res.status(400).json({
                message: "validation failed"
            })
            return
        }

        const userExist = await authServices.findByEmail(email)

        if (userExist) {
            res.status(401).json({
                message: "user already exist"
            })
            return
        }

        const result = await authServices.createUser(req.body)

        console.log(result);

        if (!result) {
            res.status(500).json({
                message: "internal server error"
            })
            return
        }


        res.status(201).json({
            message: "successfully registered"
        })

    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    message: "validation failed"
                });
                return;
            }

            const userExist = await authServices.findByEmail(email);

            if (!userExist) {
                res.status(404).json({
                    message: "user not found"
                });
                return;
            }

            if (password !== userExist.password) {
                res.status(400).json({
                    message: "invalid password" // fixed typo from 'in valid'
                });
                return;
            }
            const tokenPayload = {
                userId: userExist.id,
                email: userExist.email
            };

            const accessToken = JwtUtils.generateAccessToken(tokenPayload);
            const refreshToken = JwtUtils.generateRefreshToken(tokenPayload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({
                message: "login successful",
                accessToken,
                user: {
                    id: userExist.id,
                    email: userExist.email
                }
            });

        } catch (error) {
            console.error("Login controller error:", error);
            res.status(500).json({
                message: "internal server error"
            });
        }

    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });

            res.status(200).json({
                message: "logged out successfully"
            });

        } catch (error) {
            console.error("Logout controller error:", error);
            res.status(500).json({
                message: "internal server error"
            });
        }
    }
}

export const authController = new AuthController()