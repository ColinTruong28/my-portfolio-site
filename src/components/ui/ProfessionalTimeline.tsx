'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TimelineEvent {
  id: string;
  year: string;
  /** Short title shown on the timeline node */
  title: string;
  /** Organization / company */
  org: string;
  /** Full description shown on hover expand */
  description: string;
  /** Skill tags gained */
  skills: string[];
  /** Optional accent color for the node dot */
  color?: string;
}

// ── Edit your events here ────────────────────────────────────────────────────
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'sase-ec',
    year: '2023',
    title: 'Events Coordinator',
    org: 'SASE — WPI',
    description:
      'Planned and executed weekly professional development, community service, and cultural events for the Society of Asian Scientists and Engineers chapter. Grew active membership by 63% across the academic year through consistent programming and outreach.',
    skills: ['Event Planning', 'Community Outreach', 'Leadership'],
    color: '#ef4444',
  },
  {
    id: 'global-lab',
    year: '2024',
    title: 'Web Developer',
    org: 'WPI Global Lab',
    description:
      'Spearheaded a full visual and thematic overhaul of the Global Lab website, modernising the design system and restructuring content architecture to better showcase evolving student initiatives and faculty research programs.',
    skills: ['React', 'TypeScript', 'UI/UX', 'Figma'],
    color: '#3b82f6',
  },
  {
    id: 'sase-president',
    year: '2024',
    title: 'President',
    org: 'SASE — WPI',
    description:
      'Led chapter operations as President, overseeing 50+ yearly events and a board of 10+ officers. Under this leadership the chapter won the 2025 National Overall Strongest Chapter award.',
    skills: ['Leadership', 'Strategy', 'Public Speaking', 'Mentorship'],
    color: '#ef4444',
  },
  {
    id: 'paa',
    year: '2024',
    title: 'Volunteer Manager',
    org: 'Pan Asian Association',
    description:
      'Coordinated logistics for a 1000+ attendee, six-figure cultural festival, managing 100+ unique volunteers and aligning 10+ student organisations. Responsible for scheduling, training, and day-of operations.',
    skills: ['Volunteer Management', 'Logistics', 'Cross-org Collaboration'],
    color: '#f59e0b',
  },
  {
    id: 'ra',
    year: '2025',
    title: 'Resident Advisor',
    org: 'WPI Residential Life',
    description:
      'Serving as RA for the 2025–26 academic year, providing mentorship and community support to incoming freshmen while collaborating with Housing staff on programming and policy enforcement.',
    skills: ['Mentorship', 'Conflict Resolution', 'Community Building'],
    color: '#10b981',
  },
];
// ────────────────────────────────────────────────────────────────────────────

export default function ProfessionalTimeline() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = timelineEvents.find((e) => e.id === activeId) ?? null;

  return (
    <div className="w-full mt-10 select-none">
      {/* Section label */}
      <p
        className="text-xs uppercase tracking-[0.25em] mb-6 font-mono"
        style={{ color: 'rgba(237,207,122,0.6)' }}
      >
        Professional Timeline
      </p>

      {/* ── Horizontal track ── */}
      <div className="relative w-full overflow-x-auto pb-4">
        {/* Connecting line */}
        <div
          className="absolute top-[22px] left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(237,207,122,0.3) 10%, rgba(237,207,122,0.3) 90%, transparent)' }}
        />

        <div className="flex items-start gap-0 min-w-max px-4">
          {timelineEvents.map((event) => {
            const isActive = activeId === event.id;
            const dotColor = event.color ?? 'rgba(237,207,122,1)';

            return (
              <div
                key={event.id}
                className="flex flex-col items-center"
                style={{ width: '180px' }}
              >
                {/* Node button */}
                <button
                  onClick={() => setActiveId(isActive ? null : event.id)}
                  className="relative flex flex-col items-center focus:outline-none group"
                  aria-expanded={isActive}
                >
                  {/* Dot */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.35 : 1,
                      boxShadow: isActive
                        ? `0 0 0 3px ${dotColor}40, 0 0 16px ${dotColor}60`
                        : `0 0 0 2px ${dotColor}20`,
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-[18px] h-[18px] rounded-full border-2 z-10 relative"
                    style={{
                      backgroundColor: isActive ? dotColor : 'transparent',
                      borderColor: dotColor,
                    }}
                  />

                  {/* Year label */}
                  <span
                    className="text-[11px] font-mono mt-2 transition-colors"
                    style={{ color: isActive ? 'rgba(237,207,122,1)' : 'rgba(237,207,122,0.45)' }}
                  >
                    {event.year}
                  </span>

                  {/* Short title */}
                  <span
                    className="text-[11px] font-mono text-center leading-tight mt-0.5 max-w-[130px] transition-colors"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.45)' }}
                  >
                    {event.title}
                  </span>

                  {/* Org */}
                  <span
                    className="text-[10px] font-mono text-center mt-0.5 transition-colors"
                    style={{ color: isActive ? dotColor : `${dotColor}60` }}
                  >
                    {event.org}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Expanded detail card ── */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden mt-4"
          >
            <div
              className="rounded-xl border p-5 space-y-3"
              style={{
                borderColor: `${active.color ?? 'rgba(237,207,122,1)'}30`,
                background: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, ${active.color ?? 'rgba(237,207,122,0.06)'}10 100%)`,
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-xs font-mono uppercase tracking-widest"
                    style={{ color: active.color ?? 'rgba(237,207,122,0.7)' }}
                  >
                    {active.year} · {active.org}
                  </p>
                  <h3
                    className="text-lg text-white mt-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {active.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveId(null)}
                  className="text-gray-600 hover:text-white transition-colors text-xl leading-none flex-shrink-0 mt-0.5"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {active.description}
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {active.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md text-xs font-mono border"
                    style={{
                      color: active.color ?? 'rgba(237,207,122,1)',
                      borderColor: `${active.color ?? 'rgba(237,207,122,1)'}30`,
                      background: `${active.color ?? 'rgba(237,207,122,1)'}10`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeId && (
        <p className="text-[11px] font-mono mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
          click a node to expand
        </p>
      )}
    </div>
  );
}
