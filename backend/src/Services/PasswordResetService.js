import db from "../Database/models/index.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Cria o hash SHA-256 do token bruto (o banco nunca armazena o token puro)
function hashToken(rawToken) {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
}

// Cria o transporter do Nodemailer com as configurações do .env
function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

const PasswordResetService = {

    async requestReset(email) {
        // Sempre retorna sucesso para não revelar se o e-mail existe
        const user = await db.User.findOne({ where: { email } });
        if (!user) return;

        // Invalida tokens anteriores do usuário
        await db.PasswordResetToken.update(
            { used: true },
            { where: { user_id: user.id, used: false } }
        );

        // Gera token único (raw) e armazena o hash
        const rawToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = hashToken(rawToken);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        await db.PasswordResetToken.create({
            user_id: user.id,
            token: tokenHash,
            expires_at: expiresAt,
            used: false,
        });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

        const transporter = createTransporter();
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "NirnLink — Redefinição de Senha",
            html: `
                <div style="font-family: Georgia, serif; background: #080a10; color: #f0ead6; padding: 40px; max-width: 560px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(180,140,60,0.2);">
                    <h2 style="font-family: 'Georgia', serif; color: #c9a84c; letter-spacing: 0.1em; margin-bottom: 8px;">NIRNLINK</h2>
                    <p style="color: rgba(220,210,190,0.5); font-size: 12px; margin-top: 0;">ESO GUILD · BR</p>
                    <hr style="border-color: rgba(180,140,60,0.15); margin: 24px 0;" />
                    <p style="font-size: 16px; line-height: 1.7;">Olá, <strong style="color: #f0ead6;">${user.name}</strong>.</p>
                    <p style="font-size: 15px; color: rgba(220,210,190,0.75); line-height: 1.7;">
                        Recebemos uma solicitação para redefinir a senha da sua conta no NirnLink.<br/>
                        Clique no botão abaixo para criar uma nova senha. O link é válido por <strong>1 hora</strong>.
                    </p>
                    <a href="${resetUrl}"
                       style="display: inline-block; margin: 24px 0; padding: 14px 32px; background: linear-gradient(135deg, #c9a84c, #9d7820); color: #0d0a04; font-weight: bold; font-size: 13px; letter-spacing: 0.15em; text-decoration: none; border-radius: 6px; text-transform: uppercase;">
                        Redefinir Senha
                    </a>
                    <p style="font-size: 13px; color: rgba(220,210,190,0.35); line-height: 1.6;">
                        Se você não solicitou a redefinição, ignore este e-mail. Sua senha permanece a mesma.
                    </p>
                    <hr style="border-color: rgba(180,140,60,0.1); margin: 24px 0;" />
                    <p style="font-size: 11px; color: rgba(220,210,190,0.2);">© ${new Date().getFullYear()} NirnLink · Forjado em Tamriel</p>
                </div>
            `,
        });
    },

    async resetPassword(rawToken, newPassword) {
        const tokenHash = hashToken(rawToken);

        const record = await db.PasswordResetToken.findOne({
            where: {
                token: tokenHash,
                used: false,
            }
        });

        if (!record) {
            throw new Error("Token inválido ou já utilizado.");
        }

        if (new Date() > new Date(record.expires_at)) {
            await record.update({ used: true });
            throw new Error("Token expirado. Solicite um novo link de redefinição.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await db.User.update(
            { password: hashedPassword },
            { where: { id: record.user_id } }
        );

        await record.update({ used: true });
    },
};

export default PasswordResetService;
