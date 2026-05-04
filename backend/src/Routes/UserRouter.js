import { Router } from "express";
import UserController from "../Controllers/UserController.js"
const UserRouter = Router();


UserRouter.post("/", UserController.createUser);


export default UserRouter;
