'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const WORDS = ['BRANDS', 'GROWTH', 'POWER', 'LEGACY'];
const GLITCH_CHARS = '!@#$%^&*░▒▓█';

// CSS-only particles - no JS animation overhead
function PixelParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + (i * 12),
      y: 20 + ((i % 3) * 25),
      size: 3 + (i % 2) * 2,
      delay: i * 0.4,
      duration: 3 + (i % 3),
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style jsx>{`
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          20% { opacity: 0.6; transform: translateY(-10px) scale(1); }
          80% { opacity: 0.6; transform: translateY(-40px) scale(1); }
          100% { opacity: 0; transform: translateY(-60px) scale(0); }
        }
        .pixel-particle {
          position: absolute;
          background: var(--jwus-accent);
          will-change: transform, opacity;
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="pixel-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `float-up ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function GlitchText({ text, isGlitching }: { text: string; isGlitching: boolean }) {
  const [display, setDisplay] = useState(text);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isGlitching) {
      setDisplay(text);
      return;
    }

    // Only 2 glitch frames then done
    let frame = 0;
    const doGlitch = () => {
      if (frame < 2) {
        setDisplay(
          text.split('').map((char) =>
            Math.random() > 0.6
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : char
          ).join('')
        );
        frame++;
        timeoutRef.current = setTimeout(doGlitch, 80);
      } else {
        setDisplay(text);
      }
    };
    doGlitch();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
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
          setIsGlitching(true);
          setTimeout(() => {
            setIsGlitching(false);
            setIsDeleting(true);
          }, 400);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 40 : isGlitching ? 400 : 120);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, isGlitching]);

  const currentWord = words[wordIndex].slice(0, charIndex);

  return (
    <span className="text-[var(--jwus-accent)]">
      <GlitchText text={currentWord} isGlitching={isGlitching} />
      <span className="inline-block w-[3px] h-[1em] bg-[var(--jwus-accent)] ml-[2px] align-middle animate-pulse" />
    </span>
  );
}

// Pure CSS scanline
function ScanLine() {
  return (
    <>
      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .scanline {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--jwus-accent);
          opacity: 0.15;
          animation: scan 4s linear infinite;
          will-change: top;
          pointer-events: none;
        }
      `}</style>
      <div className="scanline" />
    </>
  );
}

function PixelBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-[16px] h-[16px] border-t-2 border-l-2 border-[var(--jwus-accent)]" />
      <div className="absolute top-0 right-0 w-[16px] h-[16px] border-t-2 border-r-2 border-[var(--jwus-accent)]" />
      <div className="absolute bottom-0 left-0 w-[16px] h-[16px] border-b-2 border-l-2 border-[var(--jwus-accent)]" />
      <div className="absolute bottom-0 right-0 w-[16px] h-[16px] border-b-2 border-r-2 border-[var(--jwus-accent)]" />
      <div className="absolute top-0 left-[24px] right-[24px] h-[1px] bg-gradient-to-r from-transparent via-[var(--jwus-border)] to-transparent" />
      <div className="absolute bottom-0 left-[24px] right-[24px] h-[1px] bg-gradient-to-r from-transparent via-[var(--jwus-border)] to-transparent" />
    </div>
  );
}

// Static data stream - no JS updates
function DataStream() {
  const streams = useMemo(() => [
    '010110100101',
    '110010110011',
    '001101001100',
    '101010101010',
    '011001100110',
  ], []);

  return (
    <div className="absolute right-[40px] top-1/2 -translate-y-1/2 flex-col gap-[4px] text-[10px] text-[var(--jwus-accent)]/20 font-mono hidden lg:flex">
      {streams.map((stream, i) => (
        <div key={i} className="tracking-widest">{stream}</div>
      ))}
    </div>
  );
}

// Static status bar - time updates only every 10 seconds
function StatusBar() {
  const [time, setTime] = useState('--:--:--');
  
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000); // Every 10 seconds
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
