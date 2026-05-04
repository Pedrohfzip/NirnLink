import LoginService from "../Services/LoginService.js";

const LoginController = {

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await LoginService.login(email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({ error: "Falha no login", details: error.message });
        }
    }

}


export default LoginController;