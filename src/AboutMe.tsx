'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrbitingSkills from './components/ui/orbiting';

import paa_1 from './images/About/paa_1.jpg';
import paa_2 from './images/About/paa_2.jpg';
import paa_3 from './images/About/paa_3.jpg';
import paa_4 from './images/About/paa_4.jpg';
import paa_5 from './images/About/paa_5.jpg';

import ra_1 from './images/About/ra_1.png';
import ra_2 from './images/About/ra_2.jpg';

import sase1_25 from './images/About/sase1_25.jpeg';
import sase2_25 from './images/About/sase2_25.jpg';
import sase3_25 from './images/About/sase3_25.jpg';
import sase4_25 from './images/About/sase4_25.jpg';

import sase1_26 from './images/About/sase1_26.jpg';
import sase2_26 from './images/About/sase2_26.jpeg';
import sase3_26 from './images/About/sase3_26.jpg';
import sase4_26 from './images/About/sase4_26.jpg';




// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE DATA — edit this to customise each experience
// images: array of imported image/video URLs shown in the left slider
// ─────────────────────────────────────────────────────────────────────────────
interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  org: string;
  description: string;
  skills: string[];
  color: string;
  images: string[]; // import your images at top of file and reference here
}

// Placeholder gradient "images" — replace with real imports like:
// import SasePhoto from './images/sase_event.jpg';
// then set images: [SasePhoto, SasePhoto2, ...]
const PLACEHOLDER = (color: string) =>
  `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='600' height='400' fill='${encodeURIComponent(color)}' opacity='0.15'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='${encodeURIComponent(color)}' font-size='14' font-family='monospace'>TBD</text></svg>`;

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'sase-ec',
    year: '2025',
    title: 'Events Coordinator',
    org: 'SASE — WPI',
    description:
      'Planned and executed 50+ professional development, community service, and cultural events for the WPI SASE chapter. Grew active membership by 63% through consistent programming and outreach initiatives. Through these efforts, our chapter won the 2025 Overall Strongest Chapter and the WPI 2025 Social Program of the Year.',
    skills: ['Event Planning', 'Community Outreach', 'Leadership', 'Budgeting'],
    color: '#ef4444',
    images: [sase1_25, sase2_25, sase3_25, sase4_25],
  },
  {
    id: 'paa',
    year: '2025-26',
    title: 'Volunteer Manager',
    org: 'Pan Asian Association',
    description:
      'Coordinated logistics for a 1000+ attendee, six-figure cultural festival managing 100+ unique volunteers across 10+ student organisations. Responsible for scheduling, volunteer training, and day-of operations.',
    skills: ['Volunteer Management', 'Logistics', 'Cross-org Collaboration', 'Operations'],
    color: '#f59e0b',
    images: [paa_1, paa_2, paa_3, paa_4, paa_5],
  },
  {
    id: 'global-lab',
    year: '2025-Present',
    title: 'Web Developer',
    org: 'WPI Global Lab',
    description:
      'Spearheaded a full visual and thematic overhaul of the WPI Global Lab website, modernising the design system and restructuring content architecture to better showcase evolving student initiatives and faculty research programs.',
    skills: ['WordPress', 'Divi 5', 'UI/UX', 'Figma'],
    color: '#3b82f6',
    images: [PLACEHOLDER('#3b82f6'), PLACEHOLDER('#3b82f6')],
  },
  {
    id: 'ra',
    year: '2025-Present',
    title: 'Resident Advisor',
    org: 'WPI Residential Life',
    description:
      'Providing mentorship and community support to incoming freshmen for the 2025–26 academic year, collaborating with Housing staff on programming, policy enforcement, and community building.',
    skills: ['Mentorship', 'Conflict Resolution', 'Community Building', 'Crisis Response'],
    color: '#10b981',
    images: [ra_1, ra_2],
  },
  {
    id: 'sase-pres',
    year: '2026 - Present',
    title: 'President',
    org: 'SASE — WPI',
    description:
      'Led chapter operations as President, overseeing 50+ yearly events, two professional conferences (Northeast Regional Conference and SASE Stem Connect), and a board of 8+ officers, 3 commitees, and 3 interns. Under this leadership the chapter won the WPI 2026 Diversity Program of the Year Award.',
    skills: ['Leadership', 'Strategic Planning', 'Public Speaking', 'Mentorship', 'Officer Management'],
    color: '#ef4444',
    images: [sase1_26, sase2_26, sase3_26, sase4_26],
  },
  {
    id: 'elvate-intern',
    year: 'Present',
    title: 'Automation & MES Intern',
    org: 'ElevateBio',
    description:
      'Wait and see ;)',
    skills: ['Leadership', 'Strategic Planning', 'Public Speaking', 'Mentorship', 'Officer Management'],
    color: '#114a3e',
    images: [PLACEHOLDER('#114a3e'), PLACEHOLDER('#114a3e'), PLACEHOLDER('#114a3e'), PLACEHOLDER('#114a3e')],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE SLIDER
// ─────────────────────────────────────────────────────────────────────────────
function ImageSlider({ images, color }: { images: string[]; color: string }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  function go(next: number) {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={images[idx]}
            alt={`slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot nav */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? '20px' : '6px',
                height: '6px',
                background: i === idx ? color : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      )}

      {/* Arrow buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => go(idx === 0 ? images.length - 1 : idx - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          >
            ‹
          </button>
          <button
            onClick={() => go(idx === images.length - 1 ? 0 : idx + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          >
            ›
          </button>
        </>
      )}

      {/* Counter */}
      <div
        className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded z-10"
        style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.5)' }}
      >
        {String(idx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEFT PANEL — shows either bio text or selected experience detail
// ─────────────────────────────────────────────────────────────────────────────
function LeftPanel({
  active,
  view,
}: {
  active: TimelineEvent | null;
  view: 'skills' | 'timeline';
}) {
  return (
    <div className="w-[85%] h-full flex flex-col justify-center mx-auto px-10 lg:px-14 py-12 gap-6 overflow-hidden ">
      <AnimatePresence mode="wait">
        {/* Default bio — shown when no node selected OR in skills view */}
        {(view === 'skills' || !active) && (
          <motion.div
            key="bio"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5 my-auto"
          >
            <div>
              <p className="text-s uppercase tracking-[0.25em] font-mono mb-2 text-start"
                style={{ color: 'rgb(255,118,237)' }}>
                {view === 'skills' ? 'Tech Stack' : 'About Me'}
              </p>
              <h2 className="text-4xl md:text-5xl text-[rgb(255,118,237)] leading-tight text-start"
                style={{ fontFamily: "'JetBrains Mono', monospace", textShadow: '0 0 3ch rgba(255,202,248,1), 0 0 40px rgba(255,202,248,1)', filter: 'brightness(1.5)',}}>
                {view === 'skills' ? 'Tools I build with' : 'A Few Words'}
              </h2>
            </div>
            <p className="text-gray-400 text-xl leading-relaxed text-start">
              Over the last three years I have been honing my leadership skills through
              projects and programs where I can have an impact on my surrounding communities.
            </p>
            <p className="text-gray-400 text-xl leading-relaxed text-start">
              I have been working at the WPI Global Lab, spearheading a full visual and
              thematic overhaul of the website to show the evolving student initiatives
              and faculty research.
            </p>
            <p className="text-gray-400 text-xl leading-relaxed text-start">
              As President and Events Coordinator for SASE, I increased active-membership
              by 63% through 50+ yearly events, winning National Overall Strongest Chapter
              of 2025.
            </p>
            {view === 'timeline' && (
              <p className="text-xs font-mono mt-2 flex items-center gap-2 text-[rgb(255,118,237)]"
                style={{ color: 'rgb(255,118,237)]' }}>
                <span className="w-4 h-px inline-block" style={{ background: 'rgba(255,118,237,0.35)' }} />
                select a node to explore
              </p>
            )}
          </motion.div>
        )}

        {/* Experience detail — shown when a timeline node is active */}
        {view === 'timeline' && active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-content gap-5 h-full"
          >
            {/* Header */}
            <div>
              <p className="text-s text-start font-mono uppercase tracking-widest pb-4"
                style={{ color: active.color }}>
                {active.year} · {active.org}
              </p>
              <h3 className="text-l md:text-xl text-start text-white mt-1 leading-tight"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {active.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-s text-start leading-relaxed overflow-y-auto">
              {active.description}
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5">
              {active.skills.map((sk) => (
                <span
                  key={sk}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono border"
                  style={{
                    color: active.color,
                    borderColor: `${active.color}35`,
                    background: `${active.color}12`,
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>

            {/* Image slider */}
            <div className="rounded-2xl overflow-hidden flex-shrink-1 min-h-[300px]"
              style={{ height: '200px', border: `1px solid ${active.color}25` }}>
              <ImageSlider images={active.images} color={active.color} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VERTICAL TIMELINE (right panel, timeline view)
// ─────────────────────────────────────────────────────────────────────────────
function VerticalTimeline({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center py-8 overflow-y-auto">
      {/* Centre line */}
      <div
        className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(237,207,122,0.2) 12%, rgba(237,207,122,0.2) 88%, transparent)',
        }}
      />

      <div className="relative flex flex-col">
        {timelineEvents.map((ev, i) => {
          const isActive = activeId === ev.id;
          const isLeft = i % 2 === 0;

          return (
            <div key={ev.id} className="relative flex items-center" style={{ minHeight: '90px' }}>

              {/* Left slot */}
              <div className="w-[calc(50%-13px)] flex justify-end pr-5">
                {isLeft && (
                  <NodeLabel ev={ev} isActive={isActive} align="right"
                    onClick={() => onSelect(ev.id)} />
                )}
              </div>

              {/* Centre dot */}
              <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '26px' }}>
                <button
                  onClick={() => onSelect(ev.id)}
                  className="relative focus:outline-none group"
                >
                  {/* Pulse ring on active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${ev.color}`, margin: '-6px' }}
                      animate={{ opacity: [0.6, 0], scale: [1, 1.6] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      boxShadow: isActive
                        ? `0 0 0 3px ${ev.color}30, 0 0 18px ${ev.color}50`
                        : 'none',
                    }}
                    transition={{ duration: 0.22 }}
                    className="w-4 h-4 rounded-full border-2 transition-colors"
                    style={{
                      borderColor: ev.color,
                      backgroundColor: isActive ? ev.color : 'rgba(0,0,0,0.6)',
                    }}
                  />
                </button>
              </div>

              {/* Right slot */}
              <div className="w-[calc(50%-28px)] flex justify-start pl-5">
                {!isLeft && (
                  <NodeLabel ev={ev} isActive={isActive} align="left"
                    onClick={() => onSelect(ev.id)} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NodeLabel({
  ev, isActive, align, onClick,
}: {
  ev: TimelineEvent;
  isActive: boolean;
  align: 'left' | 'right';
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-${align} focus:outline-none max-w-[200px] group`}
    >
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-[.35rem] font-mono uppercase tracking-widest transition-colors"
          style={{ color: isActive ? ev.color : `${ev.color}80` }}>
          {ev.year}
        </p>
        <p className="text-white text-xs font-mono leading-snug mt-0.5 group-hover:text-white/90">
          {ev.title}
        </p>
        <p className="text-[.35rem] font-mono leading-tight mt-0.5 transition-colors"
          style={{ color: isActive ? ev.color : 'rgba(255,255,255,0.25)' }}>
          {ev.org}
        </p>
      </motion.div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
type View = 'skills' | 'timeline';

export default function AboutSection() {
  const [view, setView] = useState<View>('skills');
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = timelineEvents.find((e) => e.id === activeId) ?? null;

  function handleSelect(id: string) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  return (
    <div>
      <div className="flex-shrink-0 flex items-center justify-center pt-12 pb-4">
          <div
            className="inline-flex rounded-xl p-1 gap-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {(['skills', 'timeline'] as View[]).map((v) => {
              const isActive = view === v;
              return (
                <button
                  key={v}
                  onClick={() => {
                    setView(v);
                    if (v === 'skills') setActiveId(null);
                  }}
                  className="relative px-5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider focus:outline-none transition-colors"
                  style={{ color: isActive ? 'rgb(255,118,237)' : 'rgba(255,255,255,0.35)' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="right-tab-pill"
                      className="absolute inset-0 rounded-lg -z-10"
                      style={{ background: 'rgba(237,207,122,1)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  {v === 'skills' ? '⚙ Tech Stack' : '◎ Timeline'}
                </button>
              );
            })}
          </div>
        </div>
    <div className="w-full flex flex-col lg:flex-row ">

      
      {/* ── LEFT: reactive display panel ── */}
      <div className="w-full lg:w-[58%] flex-shrink-0 relative border-r border-white/5 h-full my-auto">
        <LeftPanel active={active} view={view} />
      </div>

      {/* ── RIGHT: orbital or timeline ── */}
      <div className="flex-1 relative min-h-[500px] lg:min-h-[600px] flex flex-col">


        {/* Panel content */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {view === 'skills' ? (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <OrbitingSkills />
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <VerticalTimeline activeId={activeId} onSelect={handleSelect} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
    </div>
  );
}
