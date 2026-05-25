import { Router } from "express";
import UserRouter from "./UserRouter.js";
import LoginRouter from "./LoginRouter.js";
import TokenRouter from "./TokenRouter.js";
import LoginController from "../Controllers/LoginController.js";
import PasswordResetRouter from "./PasswordResetRouter.js";
const router = Router();


router.use("/users", UserRouter);
router.use("/login", LoginRouter);
router.use("/token", TokenRouter);
router.post("/logout", LoginController.logout);
router.use("/", PasswordResetRouter);

export default router;