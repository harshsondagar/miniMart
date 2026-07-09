import { Request, Response, NextFunction } from "express";
import { JwtUtils, UserTokenPayload } from "../utils/utils.jwt";
import jwt, { JwtPayload } from "jsonwebtoken"

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeaders = req.headers.authorization

        if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
            res.status(401).json({
                message: "unauthorized"
            })
            return
        }

        const accessToken = authHeaders.split(" ")[1]

        if (!accessToken) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }

        if (!accessToken) {
            res.status(401).json({
                message: "unauthorized"
            })
            return
        }

        const decoded = JwtUtils.verifyAccessToken(accessToken) as JwtPayload & UserTokenPayload

        req.user = decoded
        next()

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                error: 'TokenExpired',
                message: "unauthorized, token expired"
            });
            return;
        }

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(403).json({
                error: 'InvalidToken',
                message: 'The token provided is malformed or invalid.'
            });
            return;
        }

        if (error instanceof jwt.NotBeforeError) {
            res.status(403).json({
                error: 'TokenNotActive',
                message: 'Token is not active yet.'
            });
            // Changed return syntax to use a consistent return void layout pattern
            return;
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }


}