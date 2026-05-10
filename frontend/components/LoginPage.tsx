'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, Loader } from 'lucide-react';
import { useLoginStore } from '@/states/loginState';
import { login } from '@/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const router = useRouter();
  const { email, setEmail } = useLoginStore();
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = await login({ email, password });
      document.cookie = `token=${token.token}; path=/;`;
      window.location.href = '/home';
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

        .login-root {
          display: flex;
          min-height: 100vh;
          width: 100%;
          font-family: 'Crimson Text', Georgia, serif;
          background: #080a10;
        }

        /* ── Hero ── */
        .login-hero {
          position: relative;
          flex: 1;
          overflow: hidden;
          background: url('/login-hero.jpg') center/cover no-repeat;
        }
        .login-hero-ov1 {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(5, 8, 12, 0.15) 0%,
            rgba(5, 8, 12, 0.05) 50%,
            rgba(5, 8, 12, 0.92) 100%
          );
        }
        .login-hero-ov2 {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5, 8, 12, 0.65) 0%,
            transparent 55%
          );
        }
        .login-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 36px 44px;
        }

        /* Brand */
        .login-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .login-brand-icon {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: rgba(180, 140, 60, 0.15);
          border: 1px solid rgba(180, 140, 60, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-brand-name {
          font-family: 'Cinzel', serif;
          font-size: 13px;
          letter-spacing: 0.3em;
          color: #c9a84c;
          font-weight: 400;
        }

        /* Hero text */
        .login-tag {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.42em;
          color: rgba(180, 140, 60, 0.72);
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .login-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(28px, 4vw, 52px);
          line-height: 1.12;
          color: #f0ead6;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 0 4px 32px rgba(0, 0, 0, 0.8);
        }
        .login-title-gold {
          color: #c9a84c;
        }
        .login-desc {
          font-size: clamp(14px, 1.5vw, 17px);
          color: rgba(220, 210, 190, 0.62);
          line-height: 1.7;
          max-width: 400px;
        }
        .login-footer {
          font-size: 11px;
          color: rgba(220, 210, 190, 0.28);
        }

        /* ── Form Side ── */
        .login-form-side {
          width: 380px;
          min-width: 320px;
          background: rgba(8, 10, 16, 0.98);
          border-left: 1px solid rgba(180, 140, 60, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 44px 36px;
          flex-shrink: 0;
        }
        .login-form-inner {
          width: 100%;
        }

        /* Mobile brand (hidden on md+) */
        .login-mobile-brand {
          display: none;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .login-form-title {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          font-weight: 700;
          color: #f0ead6;
          margin-bottom: 8px;
          letter-spacing: 0.03em;
        }
        .login-form-sub {
          font-size: 15px;
          color: rgba(220, 210, 190, 0.42);
          margin-bottom: 30px;
          line-height: 1.55;
        }

        /* Fields */
        .login-field {
          margin-bottom: 18px;
        }
        .login-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .login-label {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: rgba(220, 210, 190, 0.7);
          letter-spacing: 0.06em;
        }
        .login-forgot {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: #c9a84c;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: opacity 0.15s;
        }
        .login-forgot:hover { 
          opacity: 0.75; 
        }

        .login-input {
          width: 100%;
          height: 46px;
          border: 1px solid rgba(180, 140, 60, 0.2);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.035);
          color: #f0ead6;
          font-size: 15px;
          padding: 0 14px;
          outline: none;
          font-family: 'Crimson Text', serif;
          transition: border-color 0.2s, background 0.2s;
        }
        .login-input::placeholder {
          color: rgba(220, 210, 190, 0.25);
        }
        .login-input:focus {
          border-color: rgba(180, 140, 60, 0.55);
          background: rgba(255, 255, 255, 0.06);
        }

        .login-pwd-wrap {
          position: relative;
        }
        .login-pwd-wrap .login-input {
          padding-right: 44px;
        }
        .login-pwd-toggle {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(220, 210, 190, 0.35);
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .login-pwd-toggle:hover { 
          color: #c9a84c; 
        }

        /* Checkbox */
        .login-check-row {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 22px;
          cursor: pointer;
        }
        .login-check-row input[type="checkbox"] {
          width: 15px;
          height: 15px;
          accent-color: #c9a84c;
          cursor: pointer;
        }
        .login-check-label {
          font-size: 14px;
          color: rgba(220, 210, 190, 0.5);
          cursor: pointer;
        }

        /* Buttons */
        .login-btn-primary {
          width: 100%;
          height: 48px;
          border-radius: 6px;
          background: linear-gradient(135deg, #c9a84c 0%, #9d7820 100%);
          border: none;
          color: #0d0a04;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.12s;
        }
        .login-btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .login-btn-primary:active { 
          transform: translateY(0); 
        }
        .login-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .login-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(180, 140, 60, 0.14);
        }
        .login-divider-text {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(220, 210, 190, 0.28);
        }

        .login-btn-discord {
          width: 100%;
          height: 48px;
          border-radius: 6px;
          background: none;
          border: 1px solid rgba(180, 140, 60, 0.2);
          color: rgba(220, 210, 190, 0.6);
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          transition: border-color 0.2s, color 0.2s;
        }
        .login-btn-discord:hover {
          border-color: rgba(180, 140, 60, 0.48);
          color: #f0ead6;
        }

        .login-error {
          background: rgba(220, 20, 60, 0.15);
          border: 1px solid rgba(220, 20, 60, 0.4);
          color: #ff6b6b;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .login-signup {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: rgba(220, 210, 190, 0.32);
        }
        .login-signup a {
          color: #c9a84c;
          text-decoration: none;
        }
        .login-signup a:hover { 
          text-decoration: underline; 
        }

        /* Responsive */
        @media (max-width: 768px) {
          .login-hero { 
            display: none; 
          }
          .login-form-side {
            width: 100%;
            min-width: unset;
            border-left: none;
            padding: 40px 24px;
          }
          .login-mobile-brand { 
            display: flex; 
          }
        }
      `}</style>

      <main className="login-root">
        {/* ── Hero ── */}
        <section className="login-hero" aria-hidden="true">
          <div className="login-hero-ov1" />
          <div className="login-hero-ov2" />

          <div className="login-hero-content">
            <div className="login-brand">
              <div className="login-brand-icon">
                <Shield size={18} color="#c9a84c" />
              </div>
              <span className="login-brand-name">NIRNLINK</span>
            </div>

            <div>
              <p className="login-tag">Tamriel · Aliança</p>
              <h1 className="login-title">
                A força de uma guilda{' '}
                <span className="login-title-gold">forjada</span>
                <br />
                em batalha.
              </h1>
              <p className="login-desc">
                Conecte-se com seus aliados, acompanhe trials, mercado e
                conquistas — tudo em um só lugar.
              </p>
            </div>

            <p className="login-footer">
              © {new Date().getFullYear()} NirnLink · Forjado em Tamriel
            </p>
          </div>
        </section>

        {/* ── Form ── */}
        <section className="login-form-side">
          <div className="login-form-inner">
            {/* Mobile brand */}
            <div className="login-mobile-brand">
              <div className="login-brand-icon">
                <Shield size={18} color="#c9a84c" />
              </div>
              <span className="login-brand-name">NIRNLINK</span>
            </div>

            <h2 className="login-form-title">Bem-vindo de volta</h2>
            <p className="login-form-sub">
              Entre com suas credenciais para acessar a guilda.
            </p>

            <form onSubmit={handleSubmit}>
              {error && <div className="login-error">{error}</div>}

              {/* Email */}
              <div className="login-field">
                <div className="login-label-row">
                  <label className="login-label" htmlFor="email">
                    E-mail ou @user
                  </label>
                </div>
                <input
                  id="email"
                  type="email"
                  className="login-input"
                  placeholder="seu.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Senha */}
              <div className="login-field">
                <div className="login-label-row">
                  <label className="login-label" htmlFor="password">
                    Senha
                  </label>
                  <button type="button" className="login-forgot">
                    Esqueceu?
                  </button>
                </div>
                <div className="login-pwd-wrap">
                  <input
                    id="password"
                    type={showPwd ? 'text' : 'password'}
                    className="login-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="login-pwd-toggle"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
                    disabled={isLoading}
                  >
                    {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Lembrar */}
              <label className="login-check-row">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="login-check-label">
                  Lembrar de mim por 30 dias
                </span>
              </label>

              {/* Submit */}
              <button 
                type="submit" 
                className="login-btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="login-divider">
                <div className="login-divider-line" />
                <span className="login-divider-text">ou</span>
                <div className="login-divider-line" />
              </div>

              <button 
                type="button" 
                className="login-btn-discord"
                disabled={isLoading}
              >
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  aria-hidden="true"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.055a19.909 19.909 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Continuar com Discord
              </button>
            </form>

            <p className="login-signup">
              Novo na guilda?{' '}
              <Link href="/register">Solicite acesso</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
