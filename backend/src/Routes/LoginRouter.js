import Router from 'express';
import LoginController from '../Controllers/LoginController.js';
const LoginRouter = Router();

LoginRouter.post("/", LoginController.login);

export default LoginRouter;