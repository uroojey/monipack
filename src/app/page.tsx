'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import IndustryCategories from '@/components/IndustryCategories';
import ProductGrid from '@/components/ProductGrid';
import TradeTools from '@/components/TradeTools';
import WhoWeServe from '@/components/WhoWeServe';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import CommandPalette from '@/components/CommandPalette';
import PackagingAdvisor from '@/components/PackagingAdvisor';
import { Language, ProductItem } from '@/data/translations';

export default function Home() {
  const [mode, setMode] = useState<'b2b' | 'b2c'>('b2b');
  const [lang, setLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  // Quote Pre-fills
  const [quotePrefill, setQuotePrefill] = useState<{
    material: string;
    qty: number;
    note: string;
  }>({
    material: 'Paper',
    qty: 10,
    note: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    showToast(nextLang === 'ar' ? 'تم تحويل اللغة إلى العربية (RTL)' : 'Switched to English');
  };

  // Sync mode and language with body & html attributes
  useEffect(() => {
    document.body.setAttribute('data-mode', mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Global Keyboard Shortcut for Command+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // ScrollSpy for Active Nav Section
  useEffect(() => {
    const sectionIds = ['home', 'products', 'tools', 'about', 'contact'];
    const handleScroll = () => {
      const pos = window.scrollY + 140;
      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [mode, lang]);

  const handleSelectProductFromSearch = (product: ProductItem) => {
    setQuotePrefill({
      material: product.mat,
      qty: 15,
      note: `Selected via Search: ${product.nameEn} (${product.sku})`,
    });
    scrollToId('tools');
    showToast(
      lang === 'ar'
        ? `تم تحميل ${product.nameAr} في حاسبة عروض الأسعار`
        : `Loaded ${product.nameEn} into Quote Builder`
    );
  };

  const handleApplyAdvisorBundle = (material: string, qty: number, note: string) => {
    setQuotePrefill({ material, qty, note });
    scrollToId('tools');
    showToast(
      lang === 'ar'
        ? 'تم تحميل حزمة المستشار الذكي في حاسبة عروض الأسعار'
        : 'Advisor bundle loaded into Quote Builder'
    );
  };

  return (
    <main>
      <Navbar
        mode={mode}
        setMode={setMode}
        onScrollTo={scrollToId}
        activeSection={activeSection}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      <Hero mode={mode} onScrollTo={scrollToId} lang={lang} />
      <InfiniteMarquee lang={lang} />
      <IndustryCategories mode={mode} lang={lang} />
      <ProductGrid
        onScrollTo={scrollToId}
        lang={lang}
        onSelectProductForQuote={(p) =>
          setQuotePrefill({
            material: p.mat,
            qty: 15,
            note: `${p.nameEn} (${p.sku})`,
          })
        }
      />
      <TradeTools
        showToast={showToast}
        lang={lang}
        prefillMaterial={quotePrefill.material}
        prefillQty={quotePrefill.qty}
        prefillNote={quotePrefill.note}
      />
      <WhoWeServe lang={lang} />
      <AboutSection lang={lang} />
      <ContactSection showToast={showToast} lang={lang} />
      <Footer onScrollTo={scrollToId} lang={lang} />
      <Toast message={toastMessage} />

      {/* 10x Modals */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        onSelectProduct={handleSelectProductFromSearch}
      />

      <PackagingAdvisor
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        lang={lang}
        onApplyBundle={handleApplyAdvisorBundle}
      />
    </main>
  );
}
