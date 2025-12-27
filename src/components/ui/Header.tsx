'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/case-studies', label: 'Work' },
  { href: '/assets', label: 'Assets' },
  { href: '/design-system', label: 'System' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[var(--jwus-bg)]/80 backdrop-blur-[var(--blur-md)]" />
      
      <Container className="relative">
        <nav className="flex items-center justify-between h-[80px]">
          <Link 
            href="/" 
            className="text-[var(--jwus-ink)] font-medium text-[20px] tracking-tight hover:text-[var(--jwus-accent)] transition-colors duration-[var(--dur)]"
          >
            JUST WHY US
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-[24px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--jwus-deep)] hover:text-[var(--jwus-ink)] transition-colors duration-[var(--dur)] text-[14px]"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/contact">
              <Button variant="primary">Request Consult</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={cn(
                'w-6 h-px bg-[var(--jwus-ink)] transition-all duration-[var(--dur)]',
                isOpen && 'rotate-45 translate-y-[7px]'
              )} />
              <span className={cn(
                'w-6 h-px bg-[var(--jwus-ink)] transition-all duration-[var(--dur)]',
                isOpen && 'opacity-0'
              )} />
              <span className={cn(
                'w-6 h-px bg-[var(--jwus-ink)] transition-all duration-[var(--dur)]',
                isOpen && '-rotate-45 -translate-y-[7px]'
              )} />
            </div>
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="md:hidden bg-[var(--jwus-surface)] border-t border-white/10"
          >
            <Container>
              <div className="py-[var(--space-6)] flex flex-col gap-[var(--space-4)]">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[var(--jwus-ink)] text-h3 font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact" className="mt-[24px]">
                  <Button variant="primary" className="w-full">Request Consult</Button>
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
