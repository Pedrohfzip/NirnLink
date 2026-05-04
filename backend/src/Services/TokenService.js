import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../Database/models/index.js";
import dotenv from "dotenv";
dotenv.config();
const TokenService = {

    async generateToken(user) {
        try {
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
            return token;
        } catch (error) {
            console.error("Erro ao gerar token:", error);
            throw new Error("Erro ao gerar token", { cause: error });
        }
    },
    async generateRefreshToken(user) {
        try {
            const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            await db.RefreshToken.create({ token: refreshToken, user_id: user.id });
            return refreshToken;
        } catch (error) {
            console.error("Erro ao gerar refresh token:", error);
            throw new Error("Erro ao gerar refresh token", { cause: error });
        }
    },
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            console.error("Erro ao verificar token:", error);
            throw new Error("Erro ao verificar token", { cause: error });
        }
    },
    async refreshToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const user = await db.User.findByPk(decoded.id);
            const token = await this.generateToken(user);
            return token;
        } catch (error) {
            console.error("Erro ao atualizar token:", error);
            throw new Error("Erro ao atualizar token", { cause: error });
        }
    }

};

export default TokenService;