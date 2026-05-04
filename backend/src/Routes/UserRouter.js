import { Router } from "express";
import UserController from "../Controllers/UserController.js"
const UserRouter = Router();


UserRouter.get("/", UserController.getHelloWorld);


export default UserRouter;
