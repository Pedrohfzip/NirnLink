import db from "../Database/models/index.js";
import bcrypt from "bcryptjs";
const LoginService = {
    async login(email, password) {
        try {
            const user = await db.User.findOne({ where: { email } });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            const isPasswordValid = await this.validatePassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Senha incorreta");
            }
            return user;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw new Error("Erro ao fazer login", { cause: error });
        }
    },

        // Função para validar senha
    async validatePassword(plainPassword, hashedPassword) { 
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            console.log("Erro ao validar senha:", error);
            throw new Error("Erro ao validar senha", { cause: error });
        }
    },
}


export default LoginService;