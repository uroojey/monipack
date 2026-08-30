'use client';

import React from 'react';
import { translations, Language } from '@/data/translations';

interface InfiniteMarqueeProps {
  lang: Language;
}

export default function InfiniteMarquee({ lang }: InfiniteMarqueeProps) {
  const items = translations[lang].marquee;
  const colors = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)'];

  return (
    <div className="infinite-slider-wrap">
      <div className="infinite-slider">
        {[...items, ...items, ...items].map((label, index) => (
          <div className="item" key={index}>
            <span className="dot" style={{ background: colors[index % colors.length] }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
