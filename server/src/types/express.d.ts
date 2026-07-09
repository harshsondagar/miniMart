import * as express from "express"
import { UserTokenPayload } from "../utils/utils.jwt"

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserTokenPayload
    }
}