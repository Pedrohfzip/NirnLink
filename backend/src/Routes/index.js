import { Router } from "express";
import UserRouter from "./UserRouter.js";
import LoginRouter from "./LoginRouter.js";
import TokenRouter from "./TokenRouter.js";
const router = Router();


router.use("/users", UserRouter);
router.use("/login", LoginRouter);
router.use("/token", TokenRouter);

export default router;  