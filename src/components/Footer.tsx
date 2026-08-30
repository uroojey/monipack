'use client';

import React from 'react';
import { translations, Language } from '@/data/translations';

interface FooterProps {
  onScrollTo: (id: string) => void;
  lang: Language;
}

export default function Footer({ onScrollTo, lang }: FooterProps) {
  const t = translations[lang].footer;

  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="brand" style={{ marginBottom: '10px' }}>
            <div className="mark">
              <img
                src="https://www.monipack.com/gallery_gen/1fcdde1763e767179df5c598beabde31_629x508.91818181818.png"
                alt="Monipack logo"
              />
            </div>
          </div>
          <p
            style={{
              fontSize: '0.84rem',
              color: 'var(--ink-dim)',
              maxWidth: '280px',
              lineHeight: 1.6,
            }}
          >
            {t.desc}
          </p>
        </div>

        <div>
          <h5>{t.usefulLinks}</h5>
          <a onClick={() => onScrollTo('home')}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</a>
          <a onClick={() => onScrollTo('about')}>{lang === 'ar' ? 'من نحن' : 'About Us'}</a>
          <a onClick={() => onScrollTo('products')}>{lang === 'ar' ? 'المنتجات' : 'Products'}</a>
          <a onClick={() => onScrollTo('contact')}>{lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}</a>
        </div>

        <div>
          <h5>{t.ourProducts}</h5>
          <a onClick={() => onScrollTo('products')}>{lang === 'ar' ? 'المنتجات الورقية' : 'Paper Items'}</a>
          <a onClick={() => onScrollTo('products')}>{lang === 'ar' ? 'المنتجات البلاستيكية' : 'Plastic Items'}</a>
          <a onClick={() => onScrollTo('products')}>{lang === 'ar' ? 'منتجات الألمنيوم' : 'Aluminium Items'}</a>
          <a onClick={() => onScrollTo('products')}>{lang === 'ar' ? 'منتجات الفوم' : 'Foam Items'}</a>
        </div>

        <div>
          <h5>{t.contactInfo}</h5>
          <a href="tel:+96825447378">{lang === 'ar' ? 'الهاتف: 25447378 968+' : 'Phone. +968 25447378'}</a>
          <a href="tel:+96896597969">{lang === 'ar' ? 'الجوال: 96597969 968+' : 'Mobile. +968 96597969'}</a>
          <a href="mailto:info@monipack.com">info@monipack.com</a>
          <a>{lang === 'ar' ? 'نزوى، منطقة كرشاء الصناعية، ص.ب 1168، عُمان' : 'Nizwa, Karsha Industrial Area, PO Box 1168, Oman'}</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t.copyright}</span>
        <span>{t.disclaimer}</span>
      </div>
    </footer>
  );
}
