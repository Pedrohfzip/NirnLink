import { Router } from "express";
import PasswordResetController from "../Controllers/PasswordResetController.js";

const PasswordResetRouter = Router();

PasswordResetRouter.post("/forgot-password", PasswordResetController.requestReset);
PasswordResetRouter.post("/reset-password", PasswordResetController.resetPassword);

export default PasswordResetRouter;
