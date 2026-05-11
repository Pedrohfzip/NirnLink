"use client";

import { useState } from "react";
import {
  Home,
  Compass,
  Trophy,
  Users,
  ShoppingBag,
  Swords,
  Bookmark,
  Settings,
  Zap,
} from "lucide-react";

const NAV_MAIN = [
  { icon: Home,        label: "Início",       href: "/home",    badge: null },
  // { icon: Compass,     label: "Explorar",     href: "/explore", badge: null },
  // { icon: Trophy,      label: "Trials & Raids",href: "/trials",  badge: 3    },
  // { icon: Users,       label: "Membros",      href: "/members", badge: null },
  // { icon: ShoppingBag, label: "Mercado",      href: "/market",  badge: 12   },
  // { icon: Swords,      label: "Conquistas",   href: "/achievements", badge: null },
];

const NAV_SECONDARY = [
  { icon: Bookmark, label: "Salvos",        href: "/saved"    },
  { icon: Settings, label: "Configurações", href: "/settings" },
];

const STATUS = { members: 412, online: 87 };

export function LeftSideBar() {
  const [active, setActive] = useState("/home");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:wght@400;600&display=swap');

        .os-sidebar {
          width: 220px;
          min-width: 220px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 0;
          flex-shrink: 0;
          padding: 10px;
        }

        /* Nav item */
        .os-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          font-family: 'Crimson Text', serif;
          font-size: 15px;
          font-weight: 600;
          color: rgba(220, 210, 190, 0.55);
          transition: background 0.15s, color 0.15s;
          border: 1px solid transparent;
          position: relative;
          user-select: none;
        }
        .os-nav-item:hover {
          background: rgba(180, 140, 60, 0.07);
          color: rgba(220, 210, 190, 0.85);
        }
        .os-nav-item.active {
          background: rgba(180, 140, 60, 0.12);
          border-color: rgba(180, 140, 60, 0.18);
          color: #f0ead6;
        }
        .os-nav-item.active .os-nav-icon {
          color: #c9a84c;
        }
        .os-nav-icon {
          color: rgba(220, 210, 190, 0.38);
          display: flex;
          flex-shrink: 0;
          transition: color 0.15s;
        }
        .os-nav-item:hover .os-nav-icon {
          color: rgba(220, 210, 190, 0.65);
        }
        .os-nav-label { flex: 1; }
        .os-nav-badge {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 700;
          background: rgba(180, 140, 60, 0.22);
          color: #c9a84c;
          border: 1px solid rgba(180, 140, 60, 0.3);
          border-radius: 20px;
          padding: 1px 7px;
          line-height: 1.6;
        }

        /* Divider */
        .os-sidebar-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 8px 14px;
        }

        /* Status card */
        .os-status-card {
          margin: 10px 0 0;
          border-radius: 12px;
          background: rgba(180, 140, 60, 0.07);
          border: 1px solid rgba(180, 140, 60, 0.16);
          padding: 14px 16px 16px;
        }
        .os-status-title {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Cinzel', serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(180, 140, 60, 0.6);
          margin-bottom: 14px;
        }
        .os-status-title svg { color: #c9a84c; }
        .os-status-row {
          display: flex;
          gap: 0;
        }
        .os-status-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .os-status-col + .os-status-col {
          border-left: 1px solid rgba(255,255,255,0.07);
        }
        .os-status-number {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          font-weight: 700;
          color: #f0ead6;
          line-height: 1;
        }
        .os-status-number.green { color: #4ec994; }
        .os-status-label {
          font-family: 'Cinzel', serif;
          font-size: 8px;
          letter-spacing: 0.22em;
          color: rgba(220, 210, 190, 0.35);
          text-transform: uppercase;
        }
      `}</style>

      <aside className="os-sidebar">
        {/* Main nav */}
        {NAV_MAIN.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`os-nav-item${isActive ? " active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActive(item.href); }}
            >
              <span className="os-nav-icon">
                <Icon size={17} />
              </span>
              <span className="os-nav-label">{item.label}</span>
              {item.badge !== null && (
                <span className="os-nav-badge">{item.badge}</span>
              )}
            </a>
          );
        })}

        <div className="os-sidebar-divider" />

        {/* Secondary nav */}
        {NAV_SECONDARY.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`os-nav-item${isActive ? " active" : ""}`}
              onClick={(e) => { e.preventDefault(); setActive(item.href); }}
            >
              <span className="os-nav-icon">
                <Icon size={17} />
              </span>
              <span className="os-nav-label">{item.label}</span>
            </a>
          );
        })}

        {/* Status card */}
        <div className="os-status-card">
          <div className="os-status-title">
            <Zap size={12} />
            STATUS
          </div>
          <div className="os-status-row">
            <div className="os-status-col">
              <span className="os-status-number">{STATUS.members}</span>
              <span className="os-status-label">Membros</span>
            </div>
            <div className="os-status-col">
              <span className="os-status-number green">{STATUS.online}</span>
              <span className="os-status-label">Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}