const UserController = {
    async getHelloWorld(req, res) {
        res.send("Hello World on UserRouter!");
    }
}

export default UserController;