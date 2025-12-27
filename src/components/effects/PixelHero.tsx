'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['BRANDS', 'GROWTH', 'POWER', 'LEGACY'];
const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?~`░▒▓█▀▄';

// Reduced particles with CSS animations instead of framer-motion for performance
function PixelParticles() {
  const particlesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    
    // Create particles with CSS animations
    const particles = container.children;
    for (let i = 0; i < particles.length; i++) {
      const el = particles[i] as HTMLElement;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.animationDelay = `${i * 0.3}s`;
    }
  }, []);

  return (
    <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array(8).fill(0).map((_, i) => (
        <div
          key={i}
          className="absolute w-[4px] h-[4px] bg-[var(--jwus-accent)] animate-float-up"
          style={{ opacity: 0 }}
        />
      ))}
      <style jsx>{`
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-60px); }
        }
        .animate-float-up {
          animation: float-up 3s ease-out infinite;
        }
      `}</style>
    </div>
  );
}

function GlitchText({ text, isGlitching }: { text: string; isGlitching: boolean }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isGlitching) {
      setDisplay(text);
      return;
    }

    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) =>
            Math.random() > 0.7
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : char
          )
          .join('')
      );
    }, 50);

    return () => clearInterval(interval);
  }, [text, isGlitching]);

  return <span>{display}</span>;
}

function TypeWriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < word.length) {
          setCharIndex(charIndex + 1);
        } else {
          // Glitch before deleting
          setIsGlitching(true);
          setTimeout(() => {
            setIsGlitching(false);
            setIsDeleting(true);
          }, 500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : isGlitching ? 500 : 150);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, isGlitching]);

  const currentWord = words[wordIndex].slice(0, charIndex);

  // Find longest word to reserve space and prevent CLS
  const maxLength = Math.max(...words.map(w => w.length));

  return (
    <span className="text-[var(--jwus-accent)] inline-block" style={{ minWidth: `${maxLength}ch` }}>
      <GlitchText text={currentWord} isGlitching={isGlitching} />
      <span
        className="inline-block w-[3px] h-[1em] bg-[var(--jwus-accent)] ml-[2px] align-middle animate-pulse"
      />
    </span>
  );
}

function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] bg-[var(--jwus-accent)]/20 pointer-events-none"
      initial={{ top: '0%' }}
      animate={{ top: '100%' }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

function PixelBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Corner pixels */}
      <div className="absolute top-0 left-0 w-[16px] h-[16px] border-t-2 border-l-2 border-[var(--jwus-accent)]" />
      <div className="absolute top-0 right-0 w-[16px] h-[16px] border-t-2 border-r-2 border-[var(--jwus-accent)]" />
      <div className="absolute bottom-0 left-0 w-[16px] h-[16px] border-b-2 border-l-2 border-[var(--jwus-accent)]" />
      <div className="absolute bottom-0 right-0 w-[16px] h-[16px] border-b-2 border-r-2 border-[var(--jwus-accent)]" />
      
      {/* Dashed lines */}
      <div className="absolute top-0 left-[24px] right-[24px] h-[1px] bg-gradient-to-r from-transparent via-[var(--jwus-border)] to-transparent" />
      <div className="absolute bottom-0 left-[24px] right-[24px] h-[1px] bg-gradient-to-r from-transparent via-[var(--jwus-border)] to-transparent" />
    </div>
  );
}

function DataStream() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const lines = container.children;
    let rafId: number;
    let lastTime = 0;
    const fps = 5; // Very slow update
    const interval = 1000 / fps;
    
    const animate = (time: number) => {
      if (time - lastTime >= interval) {
        for (let i = 0; i < lines.length; i++) {
          const el = lines[i] as HTMLElement;
          let stream = '';
          for (let j = 0; j < 8; j++) {
            stream += Math.random() > 0.5 ? '1' : '0';
          }
          el.textContent = stream;
        }
        lastTime = time;
      }
      rafId = requestAnimationFrame(animate);
    };
    
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={containerRef} className="absolute right-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-[4px] text-[10px] text-[var(--jwus-accent)]/30 font-mono hidden lg:flex">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="tracking-widest">00000000</div>
      ))}
    </div>
  );
}

function StatusBar() {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-[24px] left-[24px] right-[24px] flex justify-between items-center text-[10px] text-[var(--jwus-deep)] uppercase tracking-widest">
      <div className="flex items-center gap-[16px]">
        <span className="flex items-center gap-[6px]">
          <span className="w-[6px] h-[6px] bg-[var(--jwus-success)] animate-pulse" />
          SYSTEM ONLINE
        </span>
        <span>v2.4.1</span>
      </div>
      <div className="flex items-center gap-[16px]">
        <span>LAT: 40.7128</span>
        <span>LON: -74.0060</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

export function PixelHero() {
  return (
    <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background elements - optimized CSS particles */}
      <PixelParticles />
      
      <ScanLine />
      <PixelBorder />
      <DataStream />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-[24px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--jwus-deep)] mb-[16px]">
            [ INITIALIZING BRAND PROTOCOL ]
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[clamp(32px,8vw,64px)] text-[var(--jwus-ink)] leading-[1.1] mb-[24px]"
        >
          <span className="block">QUIET POWER</span>
          <span className="block">PARTNER FOR</span>
          <span className="block">
            <TypeWriter words={WORDS} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[var(--jwus-deep)] text-[14px] max-w-[500px] mx-auto mb-[40px] leading-relaxed"
        >
          Strategic positioning & identity systems for brands that prefer{' '}
          <span className="text-[var(--jwus-accent)]">proof</span> over noise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-[16px]"
        >
          <a
            href="/contact"
            className="group relative px-[24px] py-[12px] bg-[var(--jwus-accent)] text-[var(--jwus-bg)] text-[12px] uppercase tracking-wider
                       hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_var(--jwus-accent)]
                       transition-all duration-150"
          >
            <span className="relative z-10">REQUEST CONSULT</span>
            <div className="absolute inset-0 bg-[var(--jwus-ink)] translate-x-[4px] translate-y-[4px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <a
            href="/case-studies"
            className="px-[24px] py-[12px] border border-[var(--jwus-border)] text-[var(--jwus-ink)] text-[12px] uppercase tracking-wider
                       hover:border-[var(--jwus-accent)] hover:text-[var(--jwus-accent)]
                       transition-all duration-150"
          >
            VIEW WORK →
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-[80px] left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-[8px] text-[var(--jwus-deep)]"
          >
            <span className="text-[10px] uppercase tracking-widest">SCROLL</span>
            <div className="w-[1px] h-[24px] bg-gradient-to-b from-[var(--jwus-deep)] to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      <StatusBar />
    </div>
  );
}
