'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#collaboration', label: 'Real-time engine' },
  { href: '#features', label: 'Spec sheet' },
];

const Logo = () => (
  <span className="flex items-center gap-2">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="9.5" stroke="var(--color-line)" strokeWidth="1" />
      <path
        d="M4 14.5 L9 6.5 L13 12 L18 5"
        stroke="var(--color-accent)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="text-[1.05rem] font-semibold tracking-tight text-(--color-ink)">
      DrawSync
    </span>
  </span>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-(--color-bg)/90 backdrop-blur-md border-b border-(--color-line-soft)'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="DrawSync home">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-(--color-ink-muted) hover:text-(--color-ink) transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/signin"
              className="text-sm text-(--color-ink-muted) hover:text-(--color-ink) transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-(--color-accent) text-(--color-bg) px-4 py-2 rounded-md hover:brightness-110 transition-[filter]"
            >
              Open the canvas
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-(--color-ink-muted) hover:text-(--color-ink) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} fixed inset-x-0 top-16 bottom-0 bg-(--color-bg) border-t border-(--color-line-soft) overflow-y-auto`}
      >
        <div className="px-6 py-4 space-y-1">
          {[...NAV_LINKS, { href: '/signin', label: 'Sign in' }, { href: '/signup', label: 'Open the canvas' }].map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 rounded-md text-base text-(--color-ink-muted) hover:text-(--color-ink) hover:bg-(--color-surface)"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
