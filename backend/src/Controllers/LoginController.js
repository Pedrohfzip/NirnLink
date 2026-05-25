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
    },

    async logout(req, res) {
        try {
            res.clearCookie("token", { path: "/" });
            res.status(200).json({ success: true, message: "Deslogado com sucesso" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao fazer logout", details: error.message });
        }
    }

}


export default LoginController;