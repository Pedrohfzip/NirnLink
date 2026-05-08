import TokenService from '../Services/TokenService.js';
import db from '../Database/models/index.js';

const authMiddleware = async (req, res, next) => {
    try {
        // Extrair token do cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido'
            });
        }

        // Verificar e decodificar o token
        const decoded = await TokenService.verifyToken(token);

        // Verificar se o usuário existe
        const user = await db.User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        // Adicionar informações do usuário à requisição
        req.user = {
            id: user.id,
            email: user.email,
            // Adicione outros campos conforme necessário
        };

        next();
    } catch (error) {
        console.error('Erro no middleware de autenticação:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
};

export default authMiddleware;