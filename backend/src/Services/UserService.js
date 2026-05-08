import db from "../Database/models/index.js";
import bcrypt from "bcryptjs";

const UserService = {

    async createUser(data) {
        try {
            if (data.password) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
            }
            const user = await db.User.create(data);
            return user;
        } catch (error) {
            console.log("Erro ao criar usuário:", error);
            throw new Error("Erro ao criar um usuário", { cause: error });
        }
    },

    async getAllUsers() {
        try {
            const users = await db.User.findAll();
            return users;
        } catch (error) {
            console.log("Erro ao obter usuários:", error);
            throw new Error("Erro ao obter usuários", { cause: error });
        }
    }
}

export default UserService;