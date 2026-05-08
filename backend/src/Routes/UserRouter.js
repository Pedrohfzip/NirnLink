import { Router } from "express";
import UserController from "../Controllers/UserController.js"
const UserRouter = Router();


UserRouter.post("/", UserController.createUser);
UserRouter.get("/", UserController.getAllUsers);


export default UserRouter;
