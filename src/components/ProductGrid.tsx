'use client';

import React, { useState, useRef } from 'react';
import { productsCatalog, translations, Language, ProductItem } from '@/data/translations';

interface ProductGridProps {
  onScrollTo: (id: string) => void;
  lang: Language;
  onSelectProductForQuote?: (product: ProductItem) => void;
}

const materials = ['All', 'Paper', 'Plastic', 'Aluminium', 'Foam'] as const;

export default function ProductGrid({
  onScrollTo,
  lang,
  onSelectProductForQuote,
}: ProductGridProps) {
  const [activeMaterial, setActiveMaterial] = useState<string>('All');
  const gridRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].products;

  const [hoverStyle, setHoverStyle] = useState<{
    opacity: number;
    width: number;
    height: number;
    transform: string;
  }>({
    opacity: 0,
    width: 0,
    height: 0,
    transform: 'translate(0px, 0px)',
  });

  const filteredProducts =
    activeMaterial === 'All'
      ? productsCatalog
      : productsCatalog.filter((p) => p.mat === activeMaterial);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);

    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      setHoverStyle({
        opacity: 1,
        width: rect.width,
        height: rect.height,
        transform: `translate(${rect.left - gridRect.left}px, ${rect.top - gridRect.top}px)`,
      });
    }
  };

  const getMaterialLabel = (m: string) => {
    if (lang !== 'ar') return m;
    switch (m) {
      case 'All': return 'الكل';
      case 'Paper': return 'ورقي';
      case 'Plastic': return 'بلاستيك';
      case 'Aluminium': return 'ألمنيوم';
      case 'Foam': return 'فوم';
      default: return m;
    }
  };

  const getTopBadge = (p: ProductItem) => {
    if (p.mat === 'Aluminium') return lang === 'ar' ? 'ألمنيوم للفرن والطهي' : 'Oven & Flame Ready';
    if (p.mat === 'Paper') return lang === 'ar' ? 'صديق للبيئة معتمد' : 'Eco Certified Paper';
    if (p.mat === 'Plastic') return lang === 'ar' ? 'بلاستيك غذائي نقي' : 'Food-Grade PET';
    return lang === 'ar' ? 'عازل حراري فائق' : 'Thermal Insulated';
  };

  return (
    <section id="products">
      <div className="section-head">
        <div className="tag">{t.tag}</div>
        <h2>{t.heading}</h2>
        <p>{t.sub}</p>
      </div>

      <div className="filter-row">
        {materials.map((m) => (
          <button
            key={m}
            className={`filter-chip ${activeMaterial === m ? 'active' : ''}`}
            onClick={() => setActiveMaterial(m)}
            type="button"
          >
            {getMaterialLabel(m)}
          </button>
        ))}
      </div>

      <div
        className="product-grid"
        id="productGrid"
        ref={gridRef}
        onMouseLeave={() => setHoverStyle((prev) => ({ ...prev, opacity: 0 }))}
      >
        <div
          className="hover-bg-indicator"
          id="prodHoverBg"
          style={{
            opacity: hoverStyle.opacity,
            width: `${hoverStyle.width}px`,
            height: `${hoverStyle.height}px`,
            transform: hoverStyle.transform,
          }}
        />
        {filteredProducts.map((p) => (
          <div
            className="product-card spotlight"
            key={p.id}
            onMouseMove={handleCardMouseMove}
          >
            <div
              className="img-slot"
              style={{
                aspectRatio: '1/1',
                padding: 0,
                overflow: 'hidden',
                background: '#f6f8f5',
                position: 'relative',
              }}
            >
              <img
                src={p.img}
                alt={lang === 'ar' ? p.nameAr : p.nameEn}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s var(--ease)',
                }}
              />

              {/* Floating Material Pill on Image */}
              <div className="prod-img-tag">
                {getTopBadge(p)}
              </div>
            </div>
            <div className="body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-3)', fontWeight: 700 }}>
                  {p.sku}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--ink)', fontWeight: 700 }}>
                  OMR {p.basePrice.toFixed(2)}
                </span>
              </div>
              <h4>{lang === 'ar' ? p.nameAr : p.nameEn}</h4>
              <div className="meta">
                {p.mat} • {lang === 'ar' ? p.metaAr : p.metaEn}
              </div>

              {/* Material Spec Badges */}
              <div className="mat-badge-row">
                {p.badges.map((b, bIdx) => (
                  <span key={bIdx} className={`mat-badge ${b.type}`}>
                    {lang === 'ar' ? b.textAr : b.textEn}
                  </span>
                ))}
              </div>

              <div
                className="tier"
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => {
                  if (onSelectProductForQuote) onSelectProductForQuote(p);
                  onScrollTo('tools');
                }}
              >
                <span>{t.viewPricing}</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
