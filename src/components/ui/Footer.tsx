'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const ASCII_LOGO = `
     ██╗██╗   ██╗███████╗████████╗
     ██║██║   ██║██╔════╝╚══██╔══╝
     ██║██║   ██║███████╗   ██║   
██   ██║██║   ██║╚════██║   ██║   
╚█████╔╝╚██████╔╝███████║   ██║   
 ╚════╝  ╚═════╝ ╚══════╝   ╚═╝   
`.trim();

const GLITCH_CHARS = '█▓▒░!@#$%^&*';

function GlitchLogo() {
  const [display, setDisplay] = useState(ASCII_LOGO);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (!isGlitching) {
      setDisplay(ASCII_LOGO);
      return;
    }

    const interval = setInterval(() => {
      setDisplay(
        ASCII_LOGO.split('').map((char, i) =>
          char !== ' ' && char !== '\n' && Math.random() > 0.8
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : char
        ).join('')
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isGlitching]);

  return (
    <pre className="text-[6px] sm:text-[8px] md:text-[10px] leading-none text-[var(--jwus-accent)] font-mono select-none">
      {display}
    </pre>
  );
}

function MatrixRain() {
  // Pure CSS animation - no JS overhead
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
      {Array(8).fill(0).map((_, i) => (
        <div
          key={i}
          className="absolute text-[var(--jwus-accent)] text-[10px] font-mono"
          style={{ 
            left: `${(i / 8) * 100}%`,
            animation: `matrix-fall ${3 + i * 0.5}s linear infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {i % 2 === 0 ? '1' : '0'}
        </div>
      ))}
      <style jsx>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function PixelWave() {
  // Pure CSS animation - no JS overhead
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[30px] overflow-hidden pointer-events-none opacity-[0.15]">
      <div 
        className="flex gap-[3px]"
        style={{ animation: 'wave-scroll 8s linear infinite' }}
      >
        {Array(30).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="w-[4px] bg-[var(--jwus-accent)]" 
            style={{ height: `${Math.sin(i * 0.3) * 8 + 12}px` }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes wave-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
      `}</style>
    </div>
  );
}

function Coordinates() {
  const [coords, setCoords] = useState({ lat: '40.7128', lon: '-74.0060' });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        lat: (40.7128 + (Math.random() - 0.5) * 0.0001).toFixed(4),
        lon: (-74.0060 + (Math.random() - 0.5) * 0.0001).toFixed(4),
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-[8px] text-[9px] font-mono text-[var(--jwus-deep)]">
      <span className="w-[6px] h-[6px] bg-[var(--jwus-success)] animate-pulse" />
      <span>LAT {coords.lat}</span>
      <span>LON {coords.lon}</span>
    </div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [displayed, text, started]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[6px] h-[12px] bg-[var(--jwus-accent)] animate-pulse ml-[2px]" />
      )}
    </span>
  );
}

function NavLink({ href, children, index }: { href: string; children: React.ReactNode; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link 
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex items-center gap-[12px] py-[8px] text-[var(--jwus-deep)] hover:text-[var(--jwus-accent)] transition-colors"
      >
        <span className="text-[var(--jwus-accent)] text-[10px] font-mono opacity-50 group-hover:opacity-100">
          {isHovered ? '>' : '$'}
        </span>
        <span className="text-[12px] uppercase tracking-wider">{children}</span>
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: isHovered ? 40 : 0 }}
          className="h-[1px] bg-[var(--jwus-accent)]"
        />
      </Link>
    </motion.div>
  );
}

function SystemStatus() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-wrap gap-x-[24px] gap-y-[8px] text-[9px] font-mono text-[var(--jwus-deep)]">
      <div className="flex items-center gap-[6px]">
        <span className="text-[var(--jwus-success)]">●</span>
        <span>SYSTEM ONLINE</span>
      </div>
      <div>UPTIME: {formatUptime(uptime)}</div>
      <div>CLIENTS: PROTECTED</div>
      <div>BUILD: v2.4.1</div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end']
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <footer ref={footerRef} className="relative bg-[var(--jwus-bg)] border-t border-[var(--jwus-border)] overflow-hidden">
      <MatrixRain />
      <PixelWave />
      
      {/* Main content */}
      <motion.div style={{ opacity, y }} className="relative z-10">
        {/* Top section with ASCII logo */}
        <div className="max-w-[1200px] mx-auto px-[24px] pt-[64px] pb-[48px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-[48px] items-start">
            {/* Logo & tagline */}
            <div>
              <GlitchLogo />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-[24px] text-[11px] text-[var(--jwus-deep)] max-w-[300px]"
              >
                <TypewriterText 
                  text="> Quiet power partner behind brands that prefer proof over noise." 
                  delay={500}
                />
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="mt-[24px]"
              >
                <Coordinates />
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="min-w-[160px]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--jwus-accent)] mb-[16px]">
                [ NAVIGATION ]
              </p>
              <nav className="flex flex-col">
                <NavLink href="/" index={0}>Home</NavLink>
                <NavLink href="/case-studies" index={1}>Work</NavLink>
                <NavLink href="/assets" index={2}>Assets</NavLink>
                <NavLink href="/contact" index={3}>Contact</NavLink>
              </nav>
            </div>

            {/* Connect */}
            <div className="min-w-[200px]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--jwus-accent)] mb-[16px]">
                [ CONNECT ]
              </p>
              <motion.a
                href="/contact"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative inline-block px-[24px] py-[14px] bg-transparent border border-[var(--jwus-border)] text-[11px] uppercase tracking-wider text-[var(--jwus-ink)] overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-[var(--jwus-bg)] transition-colors duration-300">
                  Initialize Contact
                </span>
                <motion.div
                  className="absolute inset-0 bg-[var(--jwus-accent)]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <p className="mt-[16px] text-[10px] text-[var(--jwus-deep)]">
                Response time: {'<'}24h
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--jwus-border)]/30">
          <div className="max-w-[1200px] mx-auto px-[24px] py-[20px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px]">
              <SystemStatus />
              
              <div className="flex items-center gap-[8px] text-[9px] font-mono text-[var(--jwus-deep)]">
                <span>© {currentYear} JUST WHY US</span>
                <span className="text-[var(--jwus-accent)]">//</span>
                <span>ALL RIGHTS RESERVED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scanline */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--jwus-accent)]/20"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-[16px] left-[16px] w-[24px] h-[24px] border-t-2 border-l-2 border-[var(--jwus-accent)]/30" />
      <div className="absolute top-[16px] right-[16px] w-[24px] h-[24px] border-t-2 border-r-2 border-[var(--jwus-accent)]/30" />
    </footer>
  );
}
