"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Plus, Shield, X } from "lucide-react";

// Troque por dados reais via context/session
const MOCK_USER = {
  initials: "VL",
  name: "Velmoryn",
  color: "#2d7a6e",
};

const MOCK_NOTIFS = [
  { text: "Velmoryn fixou um novo post na guilda.", time: "2 min atrás" },
  { text: "Sanity's Edge HM começa em 1 hora.", time: "58 min atrás" },
  { text: "Arkhen comentou na sua build.", time: "3h atrás" },
];

export function Header() {
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:wght@400;600&display=swap');

        .os-header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          height: 52px;
          background: #0d0f18;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 14px;
        }

        /* Brand */
        .os-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-shrink: 0;
          text-decoration: none;
          width: 180px;
        }
        .os-brand-icon {
          width: 32px;
          height: 32px;
          border-radius: 7px;
          background: rgba(180,140,60,0.14);
          border: 1px solid rgba(180,140,60,0.38);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .os-brand-texts { display: flex; flex-direction: column; line-height: 1; }
        .os-brand-name {
          font-family: 'Cinzel', serif;
          font-size: 12px;
          font-weight: 700;
          color: #c9a84c;
          letter-spacing: 0.16em;
        }
        .os-brand-sub {
          font-family: 'Cinzel', serif;
          font-size: 7.5px;
          color: rgba(180,140,60,0.45);
          letter-spacing: 0.2em;
          margin-top: 3px;
        }

        /* Search */
        .os-search-wrap {
          flex: 1;
          max-width: 460px;
          margin: 0 auto;
          position: relative;
        }
        .os-search-ico {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(220,210,190,0.28);
          pointer-events: none;
          display: flex;
        }
        .os-search-input {
          width: 100%;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.05);
          color: #f0ead6;
          font-family: 'Crimson Text', serif;
          font-size: 14px;
          padding: 0 34px 0 36px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .os-search-input::placeholder { color: rgba(220,210,190,0.28); font-size: 13px; }
        .os-search-input:focus {
          border-color: rgba(180,140,60,0.4);
          background: rgba(255,255,255,0.07);
        }
        .os-search-clear {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(220,210,190,0.3);
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .os-search-clear:hover { color: #c9a84c; }

        /* Actions */
        .os-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
          flex-shrink: 0;
        }

        /* Bell */
        .os-notif-wrap { position: relative; }
        .os-notif-btn {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(220,210,190,0.55);
          transition: color 0.2s;
          padding: 0;
        }
        .os-notif-btn:hover { color: #c9a84c; }
        .os-notif-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e8863a;
          border: 1.5px solid #0d0f18;
        }

        /* Postar */
        .os-post-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          height: 34px;
          padding: 0 16px;
          border-radius: 20px;
          background: linear-gradient(135deg, #c9a84c 0%, #9d7820 100%);
          border: none;
          color: #0d0a04;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.12s;
          white-space: nowrap;
        }
        .os-post-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .os-post-btn:active { transform: translateY(0); }

        /* Avatar */
        .os-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          border: 2px solid rgba(255,255,255,0.15);
          transition: border-color 0.2s;
          flex-shrink: 0;
          user-select: none;
        }
        .os-avatar:hover { border-color: #c9a84c; }

        /* Notif dropdown */
        .os-notif-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 290px;
          background: #131520;
          border: 1px solid rgba(180,140,60,0.15);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0,0,0,0.7);
          z-index: 100;
        }
        .os-notif-head {
          padding: 12px 14px 10px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(180,140,60,0.6);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .os-notif-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 11px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          cursor: pointer;
          transition: background 0.15s;
        }
        .os-notif-item:last-child { border-bottom: none; }
        .os-notif-item:hover { background: rgba(180,140,60,0.06); }
        .os-notif-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e8863a;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .os-notif-text {
          font-family: 'Crimson Text', serif;
          font-size: 13px;
          color: rgba(220,210,190,0.72);
          line-height: 1.5;
        }
        .os-notif-time {
          font-size: 11px;
          color: rgba(220,210,190,0.28);
          margin-top: 2px;
        }
      `}</style>

      <header className="os-header">
        {/* Brand */}
        <a href="/home" className="os-brand">
          <div className="os-brand-icon">
            <Shield size={15} color="#c9a84c" />
          </div>
          <div className="os-brand-texts">
            <span className="os-brand-name">ONESTRONG</span>
            <span className="os-brand-sub">ESO GUILD · BR</span>
          </div>
        </a>

        {/* Search */}
        <div className="os-search-wrap">
          <span className="os-search-ico">
            <Search size={14} />
          </span>
          <input
            className="os-search-input"
            type="text"
            placeholder="Buscar membros, builds, posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar"
          />
          {search && (
            <button
              className="os-search-clear"
              onClick={() => setSearch("")}
              aria-label="Limpar busca"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="os-actions">
          {/* Notificações */}
          <div className="os-notif-wrap" ref={notifRef}>
            <button
              className="os-notif-btn"
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Notificações"
            >
              <Bell size={18} />
              <span className="os-notif-badge" aria-hidden="true" />
            </button>

            {notifOpen && (
              <div className="os-notif-dropdown">
                <div className="os-notif-head">NOTIFICAÇÕES</div>
                {MOCK_NOTIFS.map((n, i) => (
                  <div key={i} className="os-notif-item">
                    <div className="os-notif-dot" />
                    <div>
                      <div className="os-notif-text">{n.text}</div>
                      <div className="os-notif-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Postar */}
          <button className="os-post-btn">
            <Plus size={13} />
            Postar
          </button>

          {/* Avatar */}
          <div
            className="os-avatar"
            style={{ background: MOCK_USER.color }}
            title={MOCK_USER.name}
            role="button"
            tabIndex={0}
            aria-label="Perfil do usuário"
          >
            {MOCK_USER.initials}
          </div>
        </div>
      </header>
    </>
  );
}