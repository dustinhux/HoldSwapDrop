'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const navItems = [
  'Rankings',
  'Trade Calculator',
  'Trade Database',
  'ADP',
  'Draft App',
  'Research',
  'My League',
  'Donate',
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const espnLink = 'https://www.espn.com/nfl/game/_/gameId/401671889/chiefs-eagles';

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`h-16 px-4 sticky top-0 z-50 transition-shadow ${
        hasScrolled ? 'shadow-md' : ''
      }`}
      style={{ backgroundColor: '#33b2ed' }}
    >
      <div className="relative max-w-7xl mx-auto flex items-center justify-center h-full">
        {/* Logo absolutely positioned in top-left */}
        <div className="absolute left-0 top-1 h-full flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={0}
            height={0}
            sizes="auto"
            priority
            style={{ height: '200%', width: 'auto' }}
          />
        </div>

        {/* Centered Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 font-bold text-sm text-white">
          {navItems.map(item => (
            <li key={item}>
              <Link href={espnLink} className="hover:underline">
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden absolute right-4 text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="lg:hidden mt-2 bg-[#33b2ed] px-4 py-3 shadow-md rounded-b">
          <ul className="flex flex-col space-y-2 text-sm font-bold text-white">
            {navItems.map(item => (
              <li key={item}>
                <Link
                  href={espnLink}
                  className="block px-4 py-2 hover:bg-blue-300 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
