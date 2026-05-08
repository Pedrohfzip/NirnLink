import LoginService from "../Services/LoginService.js";

const LoginController = {

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const { token } = await LoginService.login(email, password);

            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ error: "Falha no login", details: error.message });
        }
    }

}


export default LoginController;