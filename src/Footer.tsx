'use client';
import { HiPencilAlt } from 'react-icons/hi';
import { PiPhoneCallFill } from 'react-icons/pi';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const contacts = [
  {
    icon: <HiPencilAlt size={20} />,
    label: 'Email',
    value: 'ColinPTruong@gmail.com',
    href: 'mailto:ColinPTruong@gmail.com',
  },
  {
    icon: <PiPhoneCallFill size={20} />,
    label: 'Phone',
    value: '+1 (617) 762 8333',
    href: 'tel:+16177628333',
  },
];

const socials = [
  {
    icon: <FaLinkedin size={18} />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/colinptruong/',
  },
  {
    icon: <FaGithub size={18} />,
    label: 'GitHub',
    href: 'https://github.com/ColinTruong28',
  },
  {
    icon: <FaInstagram size={18} />,
    label: 'Instagram',
    href: 'https://www.instagram.com/colinptruong/',
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-black border-t border-white/10 overflow-hidden">
      {/* Subtle red glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[rgb(255,118,237)] to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-48 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[85vw] mx-auto py-16 flex flex-col gap-12">

        {/* Top row: name + tagline left | socials right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2
              className="text-2xl text-white justify-self-start"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Colin Truong
            </h2>
            <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mt-1 justify-self-start">
              Software · Robotics · Creative
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/5" />

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4 hover:border-red-700/50 hover:bg-white/8 transition-all"
            >
              <span className="text-white group-hover:text-pink transition-colors flex-shrink-0">
                {c.icon}
              </span>
              <div>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                  {c.label}
                </p>
                <p className="text-sm text-gray-200 font-mono mt-0.5 group-hover:text-white transition-colors">
                  {c.value}
                </p>
              </div>
              <span className="ml-auto text-gray-700 group-hover:text-red-600 transition-colors text-lg">
                →
              </span>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-600 font-mono">
            © {new Date().getFullYear()} Colin Truong. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 font-mono">
            Built with React · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
