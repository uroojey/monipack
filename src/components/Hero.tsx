'use client';

import React, { useEffect, useState, useRef } from 'react';
import { translations, Language } from '@/data/translations';

interface HeroProps {
  mode: 'b2b' | 'b2c';
  onScrollTo: (id: string) => void;
  lang: Language;
}

export default function Hero({ mode, onScrollTo, lang }: HeroProps) {
  const [estCount, setEstCount] = useState(0);
  const [prodCount, setProdCount] = useState(0);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);
  const t = translations[lang].hero;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroVisualRef.current) {
        heroVisualRef.current.classList.add('in-view');
      }
    }, 100);

    if (!animatedRef.current) {
      animatedRef.current = true;
      const duration = 2000;
      let startTimestamp: number | null = null;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setEstCount(Math.floor(easeOutQuart * 2009));
        setProdCount(Math.floor(easeOutQuart * 1000));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setEstCount(2009);
          setProdCount(1000);
        }
      };

      window.requestAnimationFrame(step);
    }

    return () => clearTimeout(timer);
  }, []);

  const eyebrowText = mode === 'b2b' ? t.b2bEyebrow : t.b2cEyebrow;
  const subText = mode === 'b2b' ? t.b2bSub : t.b2cSub;
  const primaryCta = mode === 'b2b' ? t.b2bPrimaryCta : t.b2cPrimaryCta;
  const secondaryCta = mode === 'b2b' ? t.b2bSecondaryCta : t.b2cSecondaryCta;

  return (
    <header className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow" id="eyebrowText">
          {eyebrowText}
        </div>
        <h1 id="heroHeading">
          {lang === 'ar' ? (
            <>
              <span className="serif-part">حلول التغليف المتطورة</span>
              <span className="sans-part">
                لكل <b>مطبخ</b>، <i>شركة</i>، و <u>مناسبة</u>.
              </span>
            </>
          ) : (
            <>
              <span className="serif-part">Packaging Solutions</span>
              <span className="sans-part">
                for Every <b>Kitchen</b>, <i>Business</i>, and <u>Event</u>.
              </span>
            </>
          )}
        </h1>
        <p id="heroSub">{subText}</p>
        <div className="hero-actions">
          <button
            className="btn-primary"
            type="button"
            onClick={() => onScrollTo('tools')}
          >
            {primaryCta}
          </button>
          <button
            className="btn-secondary"
            type="button"
            onClick={() => onScrollTo('products')}
          >
            {secondaryCta}
          </button>
        </div>
        <div className="trust-row">
          <div className="stat">
            <b>{estCount}</b>
            <span>{t.stat1}</span>
          </div>
          <div className="stat">
            <b>{prodCount}+</b>
            <span>{t.stat2}</span>
          </div>
          <div className="stat">
            <b>24/7</b>
            <span>{t.stat3}</span>
          </div>
        </div>
      </div>

      {/* Hero Visual with Floating Glassmorphic Text Badges */}
      <div className="hero-visual-wrapper">
        <div className="hero-visual" ref={heroVisualRef}>
          <img
            src="/images/hero_packaging.jpg"
            alt="Monipack packaging solutions"
            className="hero-main-img"
          />

          {/* Floating Glass Badges on Image */}
          <div className="hero-floating-badge top-right">
            <span className="badge-dot" />
            <span>{lang === 'ar' ? 'معتمد غذائياً 100%' : '100% Food-Grade Eco'}</span>
          </div>

          <div className="hero-floating-card bottom-left">
            <div className="badge-icon">🏭</div>
            <div>
              <div className="badge-title">{lang === 'ar' ? 'توريد مباشر من مصنع نزوى' : 'Direct Factory Supply'}</div>
              <div className="badge-sub">{lang === 'ar' ? 'توزيع لكافة محافظات عُمان' : 'Nizwa Industrial City, Oman'}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
