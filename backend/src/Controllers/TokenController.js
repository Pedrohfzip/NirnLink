const TokenController = {

    async checkToken(req, res) {
        try {

        } catch (error) {
            console.error("Erro ao verificar token:", error);
            res.status(500).json({
                success: false,
                message: "Erro ao verificar token"
            });
        }
    }

};

export default TokenController;