import db from "../Database/models/index.js";

const UserService = {

    async createUser(data) {
        try {
            // Criptografar a senha antes de salvar
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
}


export default UserService;