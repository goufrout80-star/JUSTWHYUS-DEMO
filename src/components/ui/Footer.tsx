'use client';

import Link from 'next/link';
import { Container } from '@/components/layout';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-[var(--space-8)]">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[var(--space-6)]">
          <div className="flex flex-col gap-[var(--space-2)]">
            <span className="text-[var(--jwus-ink)] font-medium text-[20px]">JUST WHY US</span>
            <span className="text-[var(--jwus-deep)] text-small">
              Quiet Power Partner Behind Brands
            </span>
          </div>

          <div className="flex flex-wrap gap-[var(--space-6)] text-small">
            <Link href="/case-studies" className="text-[var(--jwus-deep)] hover:text-[var(--jwus-ink)] transition-colors duration-[var(--dur)]">
              Work
            </Link>
            <Link href="/assets" className="text-[var(--jwus-deep)] hover:text-[var(--jwus-ink)] transition-colors duration-[var(--dur)]">
              Assets
            </Link>
            <Link href="/contact" className="text-[var(--jwus-deep)] hover:text-[var(--jwus-ink)] transition-colors duration-[var(--dur)]">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-[var(--space-8)] pt-[var(--space-6)] border-t border-white/5">
          <p className="text-[var(--jwus-deep)] text-small">
            © {currentYear} JUST WHY US. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
