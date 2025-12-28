'use client';

import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    // Fallback: hide after 2 seconds max
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--jwus-bg)]"
      style={{
        animation: isLoading ? 'none' : 'fadeOut 0.3s ease forwards',
      }}
    >
      <div className="text-center">
        {/* Pixel logo animation */}
        <div className="mb-8">
          <pre 
            className="text-[8px] sm:text-[10px] text-[var(--jwus-accent)] font-mono leading-none"
            style={{ 
              animation: 'glitch 0.3s ease infinite',
              animationPlayState: progress < 100 ? 'running' : 'paused',
            }}
          >
{`
   ██╗██╗   ██╗███████╗
   ██║██║   ██║██╔════╝
   ██║██║   ██║███████╗
██ ██║██║   ██║╚════██║
╚███╔╝╚██████╔╝███████║
 ╚══╝  ╚═════╝ ╚══════╝
`}
          </pre>
        </div>

        {/* Progress bar */}
        <div className="w-[200px] mx-auto">
          <div className="h-[4px] bg-[var(--jwus-border)] overflow-hidden">
            <div 
              className="h-full bg-[var(--jwus-accent)] transition-none"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-2 text-[10px] text-[var(--jwus-deep)] font-mono">
            LOADING... {Math.floor(Math.min(progress, 100))}%
          </div>
        </div>

        {/* Status text */}
        <div className="mt-6 text-[8px] text-[var(--jwus-muted)] font-mono uppercase tracking-widest">
          [ INITIALIZING SYSTEM ]
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(1px, -1px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
        }
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </div>
  );
}
