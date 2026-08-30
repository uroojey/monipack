'use client';

import React, { useState, useEffect, useRef } from 'react';
import { productsCatalog, Language, ProductItem } from '@/data/translations';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectProduct: (product: ProductItem) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  lang,
  onSelectProduct,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent if listening, or we can handle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = productsCatalog.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    const name = (lang === 'ar' ? item.nameAr : item.nameEn).toLowerCase();
    const sku = item.sku.toLowerCase();
    const mat = item.mat.toLowerCase();
    const meta = (lang === 'ar' ? item.metaAr : item.metaEn).toLowerCase();
    return name.includes(q) || sku.includes(q) || mat.includes(q) || meta.includes(q);
  });

  const handleSelect = (item: ProductItem) => {
    onSelectProduct(item);
    onClose();
  };

  return (
    <div className="command-overlay" onClick={onClose}>
      <div className="command-modal" onClick={(e) => e.stopPropagation()}>
        <div className="command-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="command-input"
            placeholder={
              lang === 'ar'
                ? 'ابحث بالاسم، الكود (SKU)، أو الخامة (ألمنيوم، ورق، بلاستيك)...'
                : 'Search by name, SKU, or material (Paper, Foil, PET)...'
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
              } else if (e.key === 'Enter' && filtered[selectedIndex]) {
                e.preventDefault();
                handleSelect(filtered[selectedIndex]);
              }
            }}
          />
          <span className="command-badge">ESC</span>
        </div>

        <div className="command-results">
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--ink-dim)', fontSize: '0.86rem' }}>
              {lang === 'ar' ? 'لا توجد منتجات مطابقة للبحث' : 'No matching packaging products found.'}
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`command-item ${selectedIndex === idx ? 'active' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="command-item-left">
                  <div
                    className="command-item-thumb"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  <div className="command-item-info">
                    <h5>{lang === 'ar' ? item.nameAr : item.nameEn}</h5>
                    <span>
                      {item.sku} • {item.mat} • OMR {item.basePrice.toFixed(2)} / case
                    </span>
                  </div>
                </div>
                <span className="command-badge">
                  {lang === 'ar' ? 'اختيار' : 'Select'}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="command-footer">
          <span>{lang === 'ar' ? `${filtered.length} منتج متوفر` : `${filtered.length} products available`}</span>
          <span>{lang === 'ar' ? 'استخدم ↑ ↓ للتنقل و Enter للاختيار' : 'Use ↑ ↓ to navigate, Enter to select'}</span>
        </div>
      </div>
    </div>
  );
}
