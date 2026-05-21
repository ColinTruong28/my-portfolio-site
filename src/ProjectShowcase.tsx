'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';

export interface ProjectSlide {
  label: string;
  description: string;
  mediaSrc: string;
  mediaType: 'video' | 'image';
}

export interface ProjectLink {
  label: string;
  href: string;
  icon?: 'github' | 'external';
}

export interface ProjectShowcaseProps {
  title: string;
  subtitle: string;
  tags: string[];
  links?: ProjectLink[];
  slides: ProjectSlide[];
  flip?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MediaPane({ slide, direction }: { slide: ProjectSlide; direction: number }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={slide.label}
        custom={direction}
        initial={{ opacity: 0, x: direction * 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction * -40 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black "
      >
        {slide.mediaType === 'video' ? (
          <video src={slide.mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-contain" />
        ) : (
          <img src={slide.mediaSrc} alt={slide.label} className="w-full h-full object-cover" />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function DescPane({ slide, direction }: { slide: ProjectSlide; direction: number }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.p
        key={slide.label + '-desc'}
        custom={direction}
        initial={{ opacity: 0, y: direction * 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: direction * -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-gray-400 text-xl leading-relaxed"
      >
        {slide.description}
      </motion.p>
    </AnimatePresence>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProjectShowcase({
  title,
  subtitle,
  tags,
  links = [],
  slides,
  flip = false,
}: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);

  const go = (next: number) => {
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  };
  const prev = () => go(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  const next = () => go(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  const slide = slides[activeIndex];

  // ── REST STATE: big cinematic title panel ──────────────────────────────────
  // Uses original CSS class names + gold colors, just larger
  const restState = (
    <AnimatePresence>
      {!hovered && (
        <motion.div
          key="rest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 flex flex-col justify-end pointer-events-none z-10 px-12 py-10 ${
            flip ? 'items-end text-right' : 'items-start text-left'
          }`}
        >
          {/* Ambient video at low opacity in the background */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
            {slide.mediaType === 'video' ? (
              <video
                src={slide.mediaSrc}
                autoPlay loop muted playsInline
                className="w-full h-full object-cover"
                style={{ filter: 'blur(1px) saturate(0.5)', transform: 'scale(1.04)', opacity: 0.5 }}
              />
            ) : (
              <img
                src={slide.mediaSrc}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: 'blur(1px) saturate(0.5)', transform: 'scale(1.04)', opacity: 0.5 }}
              />
            )}
            {/* Bottom vignette so text stays readable */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)' }}
            />
          </div>

          {/* Subtitle */}
          <p className="project-subtitle text-s uppercase tracking-[0.2em] font-mono mb-3"
            style={{ color: 'rgb(255,118,237)' }}>
            {subtitle}
          </p>

          {/* Giant title */}
          <h2
            className="project-title leading-none mb-5"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              color: 'rgb(255,118,237)',
              textShadow: '0 0 3ch rgba(255,202,248,1), 0 0 40px rgba(255,202,248,1)',
              filter: 'brightness(1.5)',
            }}
          >
            {title}
          </h2>

          {/* Tags */}
          <div className={`stack-tags-container flex flex-wrap gap-2 mb-6 ${flip ? 'justify-end' : 'justify-start'}`}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-white/10 text-gray-300 text-s font-mono border border-white/10 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover hint */}
          <p className="text-s font-mono flex items-center gap-2" style={{ color: 'rgb(252, 168, 241)' }}>
            <span className="inline-block w-5 h-px" style={{ background: 'rgb(252, 168, 241)' }} />
            hover to explore
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const hoverState = (
    <AnimatePresence>
      {hovered && (
        <motion.div
          key="hover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 flex flex-col lg:flex-row ${
            flip ? 'lg:flex-row-reverse' : ''
          } gap-8 lg:gap-12 items-stretch z-10 px-10 py-10`}
        >
          {/* ── Left / info panel — your original structure ── */}
          <div
            className={`${
              flip ? 'lg:justify-self-end text-right' : 'lg:justify-self-start text-left'
            } flex flex-col justify-between w-full lg:w-[38%] flex-shrink-0 gap-6 py-2`}
          >
            {/* Title block — your original class names + gold */}
            <div className="project-title-card">
              <h2
                className="project-title text-3xl md:text-4xl leading-tight"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgb(252, 168, 241)' }}
              >
                {title}
              </h2>
              <p
                className="project-subtitle text-m uppercase tracking-[0.2em] font-mono mt-1"
                style={{ color: 'rgb(252, 168, 241)' }}
              >
                {subtitle}
              </p>

              {/* Tech tags */}
              <div
                className={`stack-tags-container flex flex-wrap gap-1.5 pt-2 ${
                  flip ? 'justify-end' : 'text-start'
                }`}
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-white text-s font-mono border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Slide label + animated description */}
            <div className="space-y-2 flex-1">
              <p className="text-s uppercase tracking-widest text-[rgb(252, 168, 241)] font-mono">
                {slide.label}
              </p>
              <DescPane slide={slide} direction={direction} />
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 transition-colors"
              >
                ‹
              </button>

              <div className="flex gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => go(i)}
                    aria-label={s.label}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-6 bg-red-600' : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 transition-colors"
              >
                ›
              </button>

              <span className="ml-auto text-xs font-mono text-gray-600">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Links */}
            {links.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-gray-300 text-sm font-mono hover:border-red-600 hover:text-white transition-all"
                  >
                    {link.icon === 'github' && <FaGithub size={14} />}
                    {link.icon === 'external' && <HiExternalLink size={14} />}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── Right / media panel ── */}
          <div className="relative flex-1 min-h-[260px] w-full lg:aspect-auto aspect-video">
            <MediaPane slide={slide} direction={direction} />

            {/* Tab strip */}
            <div className="absolute bottom-0 left-0 right-0 flex bg-black/60 backdrop-blur-sm rounded-b-l overflow-hidden">
              {slides.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => go(i)}
                  className={`flex-1 py-2 text-xs font-mono transition-all ${
                    i === activeIndex
                      ? 'text-white border-t-2 border-red-600 bg-white/10'
                      : 'text-gray-500 border-t-2 border-transparent hover:text-gray-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      className="relative w-full max-w-[85vw] min-h-[80vh] mx-auto my-32 py-16 border-b border-white/5 cursor-pointer"
      style={{  }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full max-w-[85vw] mx-auto min-h-[80vh] py-16">
        {restState}
        {hoverState}
      </div>
    </div>
  );
}
