'use client';

import React from 'react';
import { translations, Language } from '@/data/translations';

interface AboutSectionProps {
  lang: Language;
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const t = translations[lang].about;

  return (
    <section id="about">
      <div className="about-grid scroll-reveal">
        {/* Factory Image with Floating Text Badges */}
        <div className="about-visual-wrapper">
          <div className="about-img-container">
            <img
              src="/images/factory_facility.jpg"
              alt="Monipack Factory Nizwa"
              className="about-main-img"
            />
            {/* Overlay Badges on Image */}
            <div className="hero-floating-badge top-right">
              <span className="badge-dot" style={{ background: '#1b6334' }} />
              <span>{lang === 'ar' ? 'معايير ISO & HACCP' : 'ISO 22000 & HACCP Standards'}</span>
            </div>

            <div className="hero-floating-card bottom-left">
              <div className="badge-icon">🏭</div>
              <div>
                <div className="badge-title">{lang === 'ar' ? 'مرافق تصنيع مؤتمتة في نزوى' : 'Automated Production Lines'}</div>
                <div className="badge-sub">{lang === 'ar' ? 'طاقة إنتاجية كبرى بأعلى معايير النظافة' : 'High-Capacity Cleanroom Manufacturing'}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className="tag"
            style={{
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: '0.76rem',
              textTransform: 'uppercase',
              letterSpacing: '0.11em',
            }}
          >
            {t.tag}
          </div>
          <h2
            style={{
              margin: '10px 0 18px',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            }}
          >
            {t.heading}
          </h2>
          <p style={{ fontSize: '0.94rem', color: 'var(--ink-dim)', lineHeight: 1.7, marginBottom: '12px' }}>
            {t.p1}
          </p>
          <p style={{ fontSize: '0.94rem', color: 'var(--ink-dim)', lineHeight: 1.7, marginBottom: '18px' }}>
            {t.p2}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '16px' }}>
            <div style={{ padding: '14px', background: 'var(--bg-soft)', borderRadius: '12px', border: '1px solid var(--line)' }}>
              <b style={{ color: 'var(--accent)', fontSize: '0.86rem' }}>{t.visionTitle}</b>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-dim)', marginTop: '4px', lineHeight: 1.5 }}>
                {t.vision}
              </p>
            </div>
            <div style={{ padding: '14px', background: 'var(--bg-soft)', borderRadius: '12px', border: '1px solid var(--line)' }}>
              <b style={{ color: 'var(--accent-3)', fontSize: '0.86rem' }}>{t.missionTitle}</b>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-dim)', marginTop: '4px', lineHeight: 1.5 }}>
                {t.mission}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
