'use client';

import React, { useState, useEffect } from 'react';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  const handleAdvisorClick = () => {
    onOpenAdvisor();
    setMobileMenuOpen(false);
  };

  return (
    <header className="nav-container">
      <nav className="nav-pill" role="navigation" aria-label="Main Navigation">
        {/* Brand */}
        <div
          className="brand"
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}
        >
          <div className="mark">
            <img
              src="https://www.monipack.com/gallery_gen/1fcdde1763e767179df5c598beabde31_629x508.91818181818.png"
              alt="Monipack logo"
              width={34}
              height={28}
            />
          </div>
          <span className="brand-name">Monipack</span>
        </div>

        {/* Desktop Center Nav Links */}
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
            className="navlink"
            onClick={() => handleNavClick('serve')}
            type="button"
          >
            {lang === 'ar' ? 'من نخدم' : 'Who We Serve'}
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
          {/* Search Button (Adaptive: icon+kbd on desktop, icon-only on mobile) */}
          <button
            onClick={onOpenSearch}
            type="button"
            className="nav-search-btn"
            aria-label={lang === 'ar' ? 'بحث المنتجات' : 'Search products'}
            title={lang === 'ar' ? 'بحث (Cmd+K)' : 'Search (Cmd+K)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <kbd className="search-kbd">⌘K</kbd>
          </button>

          {/* Quick Language Switch Button */}
          <button
            onClick={onToggleLang}
            type="button"
            className="nav-lang-btn"
            aria-label={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Desktop-only B2B / B2C Toggle */}
          <div className="mode-toggle desktop-only" id="modeToggle">
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

          {/* Desktop-only Primary CTA */}
          <button
            className="nav-cta desktop-only"
            onClick={() => handleNavClick('tools')}
            type="button"
          >
            {t.getQuote}
          </button>

          {/* Modern Animated Mobile Hamburger Toggle */}
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            id="hamburger"
            type="button"
            aria-label={mobileMenuOpen ? (lang === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (lang === 'ar' ? 'فتح القائمة' : 'Open menu')}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hamburger-svg"
            >
              <line x1="4" y1="6" x2="20" y2="6" className="line-top" />
              <line x1="4" y1="12" x2="20" y2="12" className="line-middle" />
              <line x1="4" y1="18" x2="20" y2="18" className="line-bottom" />
            </svg>
          </button>

        </div>
      </nav>

      {/* Dimmed Backdrop Overlay for Mobile Drawer */}
      <div
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Modern Slide-down Mobile Drawer Sheet */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Mode Selector Segment */}
        <div className="mobile-mode-section">
          <div className="mobile-mode-label">
            {lang === 'ar' ? 'نوع الطلب والتوريد' : 'Supply & Catalog Mode'}
          </div>
          <div className="mobile-mode-pills">
            <button
              className={`mobile-mode-btn ${mode === 'b2b' ? 'active' : ''}`}
              onClick={() => setMode('b2b')}
              type="button"
            >
              <span className="mode-btn-icon">🏢</span>
              <div className="mode-btn-text">
                <b>{lang === 'ar' ? 'توريد تجاري (B2B)' : 'B2B Wholesale'}</b>
                <small>{lang === 'ar' ? 'للفنادق، المستشفيات والشركات' : 'Commercial & Bulk'}</small>
              </div>
            </button>
            <button
              className={`mobile-mode-btn ${mode === 'b2c' ? 'active' : ''}`}
              onClick={() => setMode('b2c')}
              type="button"
            >
              <span className="mode-btn-icon">🛍️</span>
              <div className="mode-btn-text">
                <b>{lang === 'ar' ? 'أفراد وحفلات (B2C)' : 'B2C Homepack'}</b>
                <small>{lang === 'ar' ? 'للمنازل والمناسبات العائلية' : 'Retail & Catering'}</small>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mobile-nav-links">
          <button className="mobile-nav-item" onClick={() => handleNavClick('products')}>
            <span className="nav-item-icon">📦</span>
            <span className="nav-item-title">{t.products}</span>
            <span className="nav-item-badge">1000+</span>
          </button>
          <button className="mobile-nav-item" onClick={() => handleNavClick('tools')}>
            <span className="nav-item-icon">⚙️</span>
            <span className="nav-item-title">{t.tools}</span>
            <span className="nav-item-arrow">→</span>
          </button>
          <button className="mobile-nav-item advisor-highlight" onClick={handleAdvisorClick}>
            <span className="nav-item-icon">✨</span>
            <div className="nav-item-title-group">
              <span className="nav-item-title">{t.advisor}</span>
              <span className="advisor-tag">{lang === 'ar' ? 'مساعد ذكي' : 'AI Assistant'}</span>
            </div>
            <span className="nav-item-arrow">→</span>
          </button>
          <button className="mobile-nav-item" onClick={() => handleNavClick('serve')}>
            <span className="nav-item-icon">🏢</span>
            <span className="nav-item-title">{lang === 'ar' ? 'من نخدم (القطاعات)' : 'Who We Serve'}</span>
            <span className="nav-item-arrow">→</span>
          </button>
          <button className="mobile-nav-item" onClick={() => handleNavClick('about')}>
            <span className="nav-item-icon">🏭</span>
            <span className="nav-item-title">{t.about}</span>
            <span className="nav-item-arrow">→</span>
          </button>
          <button className="mobile-nav-item" onClick={() => handleNavClick('contact')}>
            <span className="nav-item-icon">📞</span>
            <span className="nav-item-title">{t.contact}</span>
            <span className="nav-item-arrow">→</span>
          </button>
        </div>

        {/* Quick Action CTA Buttons */}
        <div className="mobile-actions-group">
          <button
            className="mobile-primary-cta"
            onClick={() => handleNavClick('tools')}
            type="button"
          >
            📑 {lang === 'ar' ? 'طلب عرض أسعار تجاري' : 'Request Trade Pricing'}
          </button>

          <div className="mobile-contact-row">
            <a
              href="https://wa.me/96896597969?text=Hello%20Monipack%20Sales%20Team"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-whatsapp-btn"
            >
              <span>💬</span>
              <span>{lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}</span>
            </a>
            <a href="tel:+96825447378" className="mobile-phone-btn">
              <span>📞</span>
              <span>{lang === 'ar' ? 'اتصال بالمصنع' : 'Call Factory'}</span>
            </a>
          </div>
        </div>

        {/* Mobile Drawer Footer */}
        <div className="mobile-drawer-footer">
          <span>{lang === 'ar' ? 'شركة مروج نزوى الدولية ش.م.م • نزوى، عُمان' : 'Morooj Nizwa Int. Co. LLC • Nizwa, Oman'}</span>
        </div>
      </div>
    </header>
  );
}

