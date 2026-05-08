import UserService from "../Services/UserService.js";

const UserController = {
    async createUser(req, res) {
        const data = req.body;
        try {
            const user = await UserService.createUser(data);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar usuário", details: error });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Erro ao obter usuários", details: error });
        }
    }
}

export default UserController;