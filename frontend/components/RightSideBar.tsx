"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ThumbsUp, Flame } from "lucide-react";

const CLASSES = [
  {
    name: "Templar",
    color: "#e8c84a",
    builds: [
      { name: "Radiant Destroyer", votes: 342 },
      { name: "Holy Tank MK2", votes: 218 },
      { name: "Purifying Light", votes: 191 },
    ],
  },
  {
    name: "Sorcerer",
    color: "#9b6dff",
    builds: [
      { name: "Storm Caller", votes: 289 },
      { name: "Pets of Doom", votes: 204 },
      { name: "Magicka Burst", votes: 177 },
    ],
  },
  {
    name: "Dragonknight",
    color: "#e8633a",
    builds: [
      { name: "Lava Whip King", votes: 265 },
      { name: "Iron Wall Tank", votes: 198 },
      { name: "Flame Colossus", votes: 143 },
    ],
  },
  {
    name: "Nightblade",
    color: "#4ec994",
    builds: [
      { name: "Shadow Assassin", votes: 311 },
      { name: "Gank & Cloak", votes: 244 },
      { name: "Merciless Stam", votes: 162 },
    ],
  },
  {
    name: "Warden",
    color: "#5ec45e",
    builds: [
      { name: "Nature's Grasp", votes: 187 },
      { name: "Bear Lord", votes: 154 },
      { name: "Frost Sentinel", votes: 121 },
    ],
  },
  {
    name: "Necromancer",
    color: "#a0c8e0",
    builds: [
      { name: "Bone Tyrant", votes: 201 },
      { name: "Death Dealer", votes: 167 },
      { name: "Grave Lord", votes: 139 },
    ],
  },
];

export function RightSideBar() {
  const [open, setOpen] = useState<string[]>(["Templar"]);

  const toggle = (name: string) => {
    setOpen((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:wght@400;600&display=swap');

        .os-rp {
          width: 220px;
          min-width: 220px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 10px 0;
        }

        /* Header */
        .os-rp-title {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(180, 140, 60, 0.65);
          padding: 0 4px 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 2px;
        }
        .os-rp-title svg { color: #c9a84c; }

        /* Class accordion */
        .os-class-block {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
        }

        .os-class-header {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 12px;
          cursor: pointer;
          transition: background 0.15s;
          user-select: none;
        }
        .os-class-header:hover { background: rgba(255,255,255,0.03); }

        .os-class-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .os-class-name {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(220,210,190,0.75);
          flex: 1;
          letter-spacing: 0.06em;
        }
        .os-class-chevron {
          color: rgba(220,210,190,0.25);
          display: flex;
          transition: color 0.15s;
        }
        .os-class-header:hover .os-class-chevron { color: rgba(220,210,190,0.5); }

        /* Builds list */
        .os-builds-list {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 4px 0;
        }

        .os-build-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 12px 7px 29px;
          cursor: pointer;
          transition: background 0.15s;
          gap: 8px;
        }
        .os-build-item:hover { background: rgba(180,140,60,0.06); }

        .os-build-rank {
          font-family: 'Cinzel', serif;
          font-size: 9px;
          color: rgba(220,210,190,0.2);
          width: 12px;
          flex-shrink: 0;
        }
        .os-build-name {
          font-family: 'Crimson Text', serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(220,210,190,0.65);
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.15s;
        }
        .os-build-item:hover .os-build-name { color: rgba(220,210,190,0.9); }

        .os-build-votes {
          display: flex;
          align-items: center;
          gap: 3px;
          font-family: 'Cinzel', serif;
          font-size: 10px;
          font-weight: 600;
          color: rgba(180,140,60,0.55);
          flex-shrink: 0;
        }
        .os-build-votes svg { opacity: 0.7; }
      `}</style>

      <aside className="os-rp">
        {/* Title */}
        <div className="os-rp-title">
          <Flame size={12} />
          TOP BUILDS
        </div>

        {/* Classes */}
        {CLASSES.map((cls) => {
          const isOpen = open.includes(cls.name);
          return (
            <div key={cls.name} className="os-class-block">
              <div
                className="os-class-header"
                onClick={() => toggle(cls.name)}
                role="button"
                aria-expanded={isOpen}
              >
                <span
                  className="os-class-dot"
                  style={{ background: cls.color }}
                />
                <span className="os-class-name">{cls.name}</span>
                <span className="os-class-chevron">
                  {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </span>
              </div>

              {isOpen && (
                <div className="os-builds-list">
                  {cls.builds.map((build, i) => (
                    <div key={build.name} className="os-build-item">
                      <span className="os-build-rank">#{i + 1}</span>
                      <span className="os-build-name">{build.name}</span>
                      <span className="os-build-votes">
                        <ThumbsUp size={10} />
                        {build.votes}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </aside>
    </>
  );
}