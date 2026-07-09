import { Router } from "express";
import { userMiddleware } from "../../middleware/usermiddleware";
import { userController } from "../../controllers/user.contoller";

const userRouter = Router()

userRouter.post("/me", userMiddleware, userController.me)

export default userRouter

