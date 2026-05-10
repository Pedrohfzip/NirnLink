"use client";

import { useEffect, useRef, useState } from "react";
import {
  Image,
  Calendar,
  Hash,
  MapPin,
  Smile,
  MoreHorizontal,
  Pin,
  Heart,
  MessageCircle,
  Repeat2,
  Share,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
type Post = {
  id: number;
  author: string;
  handle: string;
  role: string;
  badge?: "GUILDMASTER" | "MODERADOR" | "MEMBRO";
  avatar: string;
  avatarColor: string;
  time: string;
  pinned?: boolean;
  content: string;
  tags?: string[];
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
};

// ── Mock data ─────────────────────────────────────────────────
const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    author: "Velmoryn",
    handle: "@velmoryn",
    role: "Templar",
    badge: "GUILDMASTER",
    avatar: "VM",
    avatarColor: "#2d7a6e",
    time: "fixado",
    pinned: true,
    content:
      "Bem-vindos à OneStrong, viajantes de Tamriel ⚔️ Aqui é a casa dos aventureiros mais dedicados do servidor BR. Trials semanais, dungeons diárias, mercado ativo e camaradagem de sobra. Apresente-se nos comentários!",
    tags: ["#boas-vindas", "#guilda"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    likes: 148,
    comments: 34,
    reposts: 12,
  },
  {
    id: 2,
    author: "Arkhen",
    handle: "@arkhen",
    role: "Sorcerer",
    badge: "MODERADOR",
    avatar: "AK",
    avatarColor: "#7c3aed",
    time: "12 min",
    content:
      "Trial de Sanity's Edge HM confirmado para sexta às 21h! Precisamos de 2 healers e 1 tank. Quem tiver interesse manda DM. Mínimo de CP 1200 e parse acima de 90k. 🔥",
    tags: ["#trials", "#recrutamento"],
    likes: 67,
    comments: 18,
    reposts: 5,
  },
  {
    id: 3,
    author: "Lyraniel",
    handle: "@lyraniel",
    role: "Warden",
    avatar: "LY",
    avatarColor: "#5ec45e",
    time: "1h",
    content:
      "Finalizei a build de Warden Healer pra vS. Testei ontem no trial e ficou incrível, sustain absurdo e ainda contribui com DPS. Vou postar o guia completo hoje à noite!",
    tags: ["#build", "#warden", "#healer"],
    likes: 43,
    comments: 9,
    reposts: 8,
  },
  {
    id: 4,
    author: "Drakthos",
    handle: "@drakthos",
    role: "Dragonknight",
    avatar: "DK",
    avatarColor: "#e8633a",
    time: "2h",
    content:
      "Mercado da guilda tá bombando hoje! Adicionei novos itens de Craglorn e alguns sets de trial. Confiram antes que acabe. Preços justos, sem especulação. 💰",
    tags: ["#mercado", "#itens"],
    likes: 29,
    comments: 6,
    reposts: 3,
  },
  {
    id: 5,
    author: "Sylvara",
    handle: "@sylvara",
    role: "Nightblade",
    avatar: "SY",
    avatarColor: "#4ec994",
    time: "3h",
    content:
      "Consegui o dye exclusivo do Trifecta ontem na Rockgrove! Depois de meses tentando finalmente caiu. Valeu a pena cada wipe 😂 Obrigada a todos do grupo!",
    tags: ["#conquistas", "#trifecta"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    likes: 112,
    comments: 27,
    reposts: 14,
  },
];

const generateMore = (start: number): Post[] =>
  Array.from({ length: 4 }, (_, i) => ({
    id: start + i,
    author: ["Maevyr", "Theron", "Zoriah", "Caldris"][i],
    handle: [`@maevyr`, `@theron`, `@zoriah`, `@caldris`][i],
    role: ["Templar", "Necromancer", "Sorcerer", "Dragonknight"][i],
    avatar: ["MV", "TH", "ZO", "CA"][i],
    avatarColor: ["#c9a84c", "#a0c8e0", "#9b6dff", "#e8633a"][i],
    time: `${start + i}h`,
    content: `Atualização da guilda #${start + i}: novos eventos programados para essa semana. Fiquem atentos ao calendário!`,
    tags: ["#guilda", "#eventos"],
    likes: Math.floor(Math.random() * 80) + 10,
    comments: Math.floor(Math.random() * 20),
    reposts: Math.floor(Math.random() * 10),
  }));

const TABS = ["Para você", "Seguindo", "Trials", "Mercado"];

const MOCK_USER = { initials: "VL", color: "#2d7a6e" };

// ── Component ────────────────────────────────────────────────
export function HomeFeed() {
  const [activeTab, setActiveTab] = useState("Para você");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || isLoading || !hasMore) return;
        setIsLoading(true);
        setTimeout(() => {
          const next = generateMore(posts.length + 1);
          setPosts((p) => [...p, ...next]);
          if (posts.length >= 25) setHasMore(false);
          setIsLoading(false);
        }, 900);
      },
      { rootMargin: "200px" }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, posts.length]);

  const toggleLike = (id: number) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:wght@400;600&display=swap');

        .feed-root {
          display: flex;
          flex-direction: column;
          gap: 0;
          font-family: 'Crimson Text', serif;
        }

        /* ── Composer ── */
        .feed-composer {
          background: #131520;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 16px 18px 12px;
          margin-bottom: 12px;
        }
        .feed-composer-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .feed-composer-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }
        .feed-composer-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: rgba(220,210,190,0.4);
          font-family: 'Crimson Text', serif;
          font-size: 16px;
          cursor: pointer;
        }
        .feed-composer-input::placeholder { color: rgba(220,210,190,0.35); }
        .feed-composer-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 12px 0;
        }
        .feed-composer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .feed-composer-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .feed-composer-action-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(220,210,190,0.35);
          transition: background 0.15s, color 0.15s;
        }
        .feed-composer-action-btn:hover {
          background: rgba(180,140,60,0.1);
          color: #c9a84c;
        }
        .feed-publish-btn {
          height: 34px;
          padding: 0 20px;
          border-radius: 20px;
          background: linear-gradient(135deg, #c9a84c 0%, #9d7820 100%);
          border: none;
          color: #0d0a04;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .feed-publish-btn:hover { opacity: 0.85; }

        /* ── Tabs ── */
        .feed-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 4px;
        }
        .feed-tab {
          padding: 10px 16px;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: rgba(220,210,190,0.4);
          cursor: pointer;
          border: none;
          background: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .feed-tab:hover { color: rgba(220,210,190,0.7); }
        .feed-tab.active {
          color: #c9a84c;
          border-bottom-color: #c9a84c;
        }

        /* ── Post Card ── */
        .feed-post {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 16px 4px;
          transition: background 0.15s;
        }
        .feed-post:hover { background: rgba(255,255,255,0.01); }

        /* Pinned banner */
        .feed-pinned-banner {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Cinzel', serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(180,140,60,0.55);
          margin-bottom: 10px;
          padding: 0 2px;
        }
        .feed-pinned-icon { font-size: 12px; }

        .feed-post-inner {
          display: flex;
          gap: 12px;
        }

        /* Avatar */
        .feed-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          cursor: pointer;
        }

        /* Post body */
        .feed-post-body { flex: 1; min-width: 0; }

        .feed-post-header {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .feed-post-name {
          font-family: 'Cinzel', serif;
          font-size: 13px;
          font-weight: 700;
          color: #f0ead6;
          cursor: pointer;
        }
        .feed-post-name:hover { text-decoration: underline; }
        .feed-post-badge {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 2px 7px;
          border-radius: 4px;
          background: rgba(180,140,60,0.18);
          color: #c9a84c;
          border: 1px solid rgba(180,140,60,0.3);
        }
        .feed-post-meta {
          font-size: 12px;
          color: rgba(220,210,190,0.3);
        }
        .feed-post-role {
          display: block;
          font-size: 12px;
          color: rgba(220,210,190,0.38);
          margin-bottom: 8px;
        }
        .feed-post-menu {
          margin-left: auto;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(220,210,190,0.25);
          display: flex;
          padding: 2px;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }
        .feed-post-menu:hover {
          color: rgba(220,210,190,0.6);
          background: rgba(255,255,255,0.06);
        }

        .feed-post-content {
          font-size: 15px;
          color: rgba(220,210,190,0.85);
          line-height: 1.65;
          margin-bottom: 10px;
        }
        .feed-post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }
        .feed-post-tag {
          font-size: 13px;
          color: #c9a84c;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.15s;
        }
        .feed-post-tag:hover { opacity: 1; }

        .feed-post-image {
          width: 100%;
          max-height: 280px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 12px;
          display: block;
        }

        /* Actions */
        .feed-post-actions {
          display: flex;
          gap: 4px;
        }
        .feed-action-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border-radius: 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: rgba(220,210,190,0.35);
          transition: background 0.15s, color 0.15s;
        }
        .feed-action-btn:hover {
          background: rgba(180,140,60,0.08);
          color: rgba(220,210,190,0.7);
        }
        .feed-action-btn.liked {
          color: #e8633a;
        }
        .feed-action-btn.liked:hover {
          background: rgba(232,99,58,0.1);
        }

        /* Loading */
        .feed-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: rgba(180,140,60,0.4);
        }
        .feed-loading-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a84c;
          animation: feedPulse 1.2s ease-in-out infinite;
        }
        .feed-loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .feed-loading-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes feedPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      <div className="feed-root p-5">
        {/* ── Composer ── */}
        <div className="feed-composer">
          <div className="feed-composer-top">
            <div
              className="feed-composer-avatar"
              style={{ background: MOCK_USER.color }}
            >
              {MOCK_USER.initials}
            </div>
            <input
              className="feed-composer-input"
              placeholder="O que está acontecendo em Tamriel?"
              readOnly
            />
          </div>
          <div className="feed-composer-divider" />
          <div className="feed-composer-bottom">
            <div className="feed-composer-actions">
              {[Image, Calendar, Hash, MapPin, Smile].map((Icon, i) => (
                <button key={i} className="feed-composer-action-btn">
                  <Icon size={17} />
                </button>
              ))}
            </div>
            <button className="feed-publish-btn">Publicar</button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="feed-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`feed-tab${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Posts ── */}
        {posts.map((post) => (
          <div key={post.id} className="feed-post">
            {post.pinned && (
              <div className="feed-pinned-banner">
                <Pin size={11} />
                FIXADO PELA GUILDMASTER
              </div>
            )}
            <div className="feed-post-inner">
              <div
                className="feed-avatar"
                style={{ background: post.avatarColor }}
              >
                {post.avatar}
              </div>
              <div className="feed-post-body">
                <div className="feed-post-header">
                  <span className="feed-post-name">{post.author}</span>
                  {post.badge && (
                    <span className="feed-post-badge">{post.badge}</span>
                  )}
                  <span className="feed-post-meta">
                    {post.handle} · {post.time}
                  </span>
                  <button className="feed-post-menu">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <span className="feed-post-role">{post.role}</span>
                <p className="feed-post-content">{post.content}</p>
                {post.tags && (
                  <div className="feed-post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="feed-post-tag">{tag}</span>
                    ))}
                  </div>
                )}
                {post.image && (
                  <img
                    src={post.image}
                    alt=""
                    className="feed-post-image"
                  />
                )}
                <div className="feed-post-actions">
                  <button
                    className={`feed-action-btn${liked.has(post.id) ? " liked" : ""}`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart size={14} fill={liked.has(post.id) ? "currentColor" : "none"} />
                    {post.likes + (liked.has(post.id) ? 1 : 0)}
                  </button>
                  <button className="feed-action-btn">
                    <MessageCircle size={14} />
                    {post.comments}
                  </button>
                  <button className="feed-action-btn">
                    <Repeat2 size={14} />
                    {post.reposts}
                  </button>
                  <button className="feed-action-btn">
                    <Share size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ── Sentinel ── */}
        <div ref={sentinelRef}>
          {isLoading && (
            <div className="feed-loading">
              <div className="feed-loading-dot" />
              <div className="feed-loading-dot" />
              <div className="feed-loading-dot" />
            </div>
          )}
          {!hasMore && (
            <div className="feed-loading">Você chegou ao fim do feed.</div>
          )}
        </div>
      </div>
    </>
  );
}