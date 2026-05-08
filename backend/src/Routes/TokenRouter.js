import { Router } from "express";
import TokenController from "../Controllers/TokenController.js";

const tokenRouter = Router();

tokenRouter.get("/check", TokenController.checkToken);

export default tokenRouter;