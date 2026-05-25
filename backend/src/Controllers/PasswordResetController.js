import PasswordResetService from "../Services/PasswordResetService.js";

const PasswordResetController = {

    async requestReset(req, res) {
        const { email } = req.body;
        try {
            if (!email) {
                return res.status(400).json({ error: "E-mail é obrigatório." });
            }
            // Sempre retorna sucesso (sem revelar se o e-mail existe)
            await PasswordResetService.requestReset(email);
            return res.status(200).json({
                success: true,
                message: "Se o e-mail estiver cadastrado, você receberá as instruções em breve."
            });
        } catch (error) {
            console.error("Erro em requestReset:", error);
            // Mesmo em caso de erro interno, retorna sucesso para não revelar informações
            return res.status(200).json({
                success: true,
                message: "Se o e-mail estiver cadastrado, você receberá as instruções em breve."
            });
        }
    },

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;
        try {
            if (!token || !newPassword) {
                return res.status(400).json({ error: "Token e nova senha são obrigatórios." });
            }
            if (newPassword.length < 8) {
                return res.status(400).json({ error: "A senha deve ter pelo menos 8 caracteres." });
            }
            await PasswordResetService.resetPassword(token, newPassword);
            return res.status(200).json({
                success: true,
                message: "Senha redefinida com sucesso."
            });
        } catch (error) {
            console.error("Erro em resetPassword:", error);
            return res.status(400).json({ error: error.message || "Erro ao redefinir a senha." });
        }
    },
};

export default PasswordResetController;
