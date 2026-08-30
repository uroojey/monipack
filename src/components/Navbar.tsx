'use client';

import React, { useState } from 'react';
import { translations, Language } from '@/data/translations';

interface NavbarProps {
  mode: 'b2b' | 'b2c';
  setMode: (mode: 'b2b' | 'b2c') => void;
  onScrollTo: (id: string) => void;
  activeSection: string;
  lang: Language;
  onToggleLang: () => void;
  onOpenSearch: () => void;
  onOpenAdvisor: () => void;
}

export default function Navbar({
  mode,
  setMode,
  onScrollTo,
  activeSection,
  lang,
  onToggleLang,
  onOpenSearch,
  onOpenAdvisor,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="nav-container">
      <nav className="nav-pill">
        {/* Brand */}
        <div className="brand" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <div className="mark">
            <img
              src="https://www.monipack.com/gallery_gen/1fcdde1763e767179df5c598beabde31_629x508.91818181818.png"
              alt="Monipack logo"
            />
          </div>
          <span className="brand-name">Monipack</span>
        </div>

        {/* Clean Center Nav Links */}
        <div className="nav-links">
          <button
            className={`navlink ${activeSection === 'products' ? 'current' : ''}`}
            onClick={() => handleNavClick('products')}
            type="button"
          >
            {t.products}
          </button>
          <button
            className={`navlink ${activeSection === 'tools' ? 'current' : ''}`}
            onClick={() => handleNavClick('tools')}
            type="button"
          >
            {t.tools}
          </button>
          <button
            className="navlink advisor-link"
            onClick={onOpenAdvisor}
            type="button"
          >
            <span className="sparkle-icon">✨</span>
            <span>{t.advisor}</span>
          </button>
          <button
            className={`navlink ${activeSection === 'about' ? 'current' : ''}`}
            onClick={() => handleNavClick('about')}
            type="button"
          >
            {t.about}
          </button>
          <button
            className={`navlink ${activeSection === 'contact' ? 'current' : ''}`}
            onClick={() => handleNavClick('contact')}
            type="button"
          >
            {t.contact}
          </button>
        </div>

        {/* Right Actions */}
        <div className="nav-right">
          {/* Minimal Search Button */}
          <button
            onClick={onOpenSearch}
            type="button"
            className="nav-search-btn"
            title={lang === 'ar' ? 'بحث (Cmd+K)' : 'Search (Cmd+K)'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <kbd className="search-kbd">⌘K</kbd>
          </button>

          {/* Minimal Language Switch */}
          <button
            onClick={onToggleLang}
            type="button"
            className="nav-lang-btn"
          >
            {t.langToggle}
          </button>

          {/* Minimal B2B / B2C Toggle */}
          <div className="mode-toggle" id="modeToggle">
            <div className="pill" />
            <button
              className={mode === 'b2b' ? 'active' : ''}
              onClick={() => setMode('b2b')}
              type="button"
            >
              {t.business}
            </button>
            <button
              className={mode === 'b2c' ? 'active' : ''}
              onClick={() => setMode('b2c')}
              type="button"
            >
              {t.retail}
            </button>
          </div>

          {/* Clean Primary CTA */}
          <button
            className="nav-cta"
            onClick={() => handleNavClick('tools')}
            type="button"
          >
            {t.getQuote}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="hamburger"
            id="hamburger"
            type="button"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button onClick={() => handleNavClick('products')}>{t.products}</button>
        <button onClick={() => handleNavClick('tools')}>{t.tools}</button>
        <button onClick={onOpenAdvisor} style={{ color: 'var(--accent)' }}>✨ {t.advisor}</button>
        <button onClick={() => handleNavClick('about')}>{t.about}</button>
        <button onClick={() => handleNavClick('contact')}>{t.contact}</button>
        <div style={{ display: 'flex', gap: '8px', paddingTop: '10px' }}>
          <button
            onClick={onToggleLang}
            style={{ flex: 1, textAlign: 'center', border: '1px solid var(--line)', borderRadius: '8px', padding: '8px' }}
          >
            🌐 {t.langToggle}
          </button>
          <button
            onClick={onOpenSearch}
            style={{ flex: 1, textAlign: 'center', border: '1px solid var(--line)', borderRadius: '8px', padding: '8px' }}
          >
            🔍 {lang === 'ar' ? 'بحث' : 'Search'}
          </button>
        </div>
      </div>
    </header>
  );
}
