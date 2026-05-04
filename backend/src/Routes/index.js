import { Router } from "express";
import UserRouter from "./UserRouter.js";
import LoginRouter from "./LoginRouter.js";
const router = Router();


router.use("/users", UserRouter);
router.use("/login", LoginRouter);

export default router;  