import { Request, Response } from "express"
class UserController {
    async me(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            userId: req.user?.userId,
            email: req.user?.email,
        })
    }
}
export const userController = new UserController()