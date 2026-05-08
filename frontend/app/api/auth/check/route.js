import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    try {
        // Obter o token do cookie
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Token não encontrado' },
                { status: 401 }
            );
        }

        // Verificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Se chegou aqui, o token é válido
        return NextResponse.json({
            success: true,
            message: 'Token válido',
            user: {
                id: decoded.id,
                email: decoded.email
            }
        });

    } catch (error) {
        console.error('Erro na verificação do token:', error);

        if (error.name === 'TokenExpiredError') {
            return NextResponse.json(
                { success: false, message: 'Token expirado' },
                { status: 401 }
            );
        }

        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json(
                { success: false, message: 'Token inválido' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}