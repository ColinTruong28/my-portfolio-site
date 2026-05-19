'use client';
import { motion } from 'framer-motion';
import OrbitingSkills from './components/ui/orbiting';

const categories = [
  {
    label: 'Languages',
    items: ['TypeScript', 'Python', 'C++', 'MATLAB', 'Java'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Tailwind CSS', 'HTML5', 'CSS3', 'Figma'],
  },
  {
    label: 'Backend & Tools',
    items: ['Node.js', 'Firebase', 'Linux', 'Git'],
  },
  {
    label: 'Engineering',
    items: ['SolidWorks', 'PyTorch', 'ROS', 'KiCad'],
  },
];

export default function TechStack() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center w-full">
      {/* Orbiting visual */}
      <div className="flex-shrink-0 w-full lg:w-[450px]">
        <OrbitingSkills />
      </div>

      {/* Right: text content */}
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-red-500 font-mono">
            Tech Stack
          </p>
          <h2
            className="text-2xl font-mono text-white"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Tools I build with
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            As an aspiring Software and Robotics Engineer, I work across the
            full stack — from pixel-perfect UIs to embedded motor controllers.
            Hover the icons to explore.
          </p>
        </div>

        {/* Category chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 space-y-2"
            >
              <p
                className="text-xs uppercase tracking-widest text-red-400 font-mono"
              >
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 text-xs font-mono border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
