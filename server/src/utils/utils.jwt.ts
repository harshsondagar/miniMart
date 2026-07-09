import "dotenv/config"
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export interface UserTokenPayload {
    userId: number;
    email: string;
}

export class JwtUtils {

    private static readonly ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_access_secret';
    private static readonly REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret';

    static generateAccessToken(payload: UserTokenPayload): string {
        const expiresIn = (process.env.ACCESS_TOKEN_EXPIRY || '15m') as NonNullable<SignOptions['expiresIn']>;
        return jwt.sign(payload, this.ACCESS_SECRET, { expiresIn });
    }


    static generateRefreshToken(payload: UserTokenPayload): string {
        const expiresIn = (process.env.REFRESH_TOKEN_EXPIRY || '7d') as NonNullable<SignOptions['expiresIn']>;

        return jwt.sign(payload, this.REFRESH_SECRET, { expiresIn });
    }


    static verifyAccessToken(token: string): UserTokenPayload | null {
        try {
            const decoded = jwt.verify(token, this.ACCESS_SECRET) as JwtPayload & UserTokenPayload;

            return {
                userId: decoded.userId,
                email: decoded.email
            };
        } catch (error) {
            return null;
        }
    }


    static verifyRefreshToken(token: string): UserTokenPayload | null {
        try {
            const decoded = jwt.verify(token, this.REFRESH_SECRET) as JwtPayload & UserTokenPayload;

            return {
                userId: decoded.userId,
                email: decoded.email
            };
        } catch (error) {
            return null;
        }
    }
}

