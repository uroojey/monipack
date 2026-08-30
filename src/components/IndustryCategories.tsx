'use client';

import React, { useRef, useState } from 'react';
import { translations, Language } from '@/data/translations';

interface IndustryCategoriesProps {
  mode: 'b2b' | 'b2c';
  lang: Language;
}

export default function IndustryCategories({ mode, lang }: IndustryCategoriesProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const t = translations[lang].categories;
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

  const categories = {
    b2b: {
      tag: t.b2bTag,
      heading: t.b2bHeading,
      sub: t.b2bSub,
      items: [
        {
          n: '01',
          tagEn: '5-Star Banquet Sets',
          tagAr: 'أطقم ولائم فاخرة',
          nameEn: 'Hotels & Hospitality',
          nameAr: 'الفنادق والضيافة',
          descEn: 'Buffet presentation, room service & banquet sets',
          descAr: 'مستلزمات البوفيه، خدمة الغرف والولائم الفاخرة',
          img: '/images/industry_hospitality.jpg',
        },
        {
          n: '02',
          tagEn: 'Sterile Sealed Lines',
          tagAr: 'خطوط معقمة ومحكمة',
          nameEn: 'Hospitals & Healthcare',
          nameAr: 'المستشفيات والمراكز الصحية',
          descEn: 'Hygiene and clinical safety certified sealed lines',
          descAr: 'خطوط تغليف معقمة ومحكمة معتمدة طبياً',
          img: '/images/industry_healthcare.jpg',
        },
        {
          n: '03',
          tagEn: 'Cold-Chain Ready',
          tagAr: 'جاهز للتبريد السريع',
          nameEn: 'Airlines & Aviation',
          nameAr: 'خطوط الطيران والتموين الجوي',
          descEn: 'Sealed, stackable in-flight dining trays',
          descAr: 'صواني وجبات محكمة التغليف قابلة للرص والتبريد',
          img: '/images/industry_airlines.jpg',
        },
        {
          n: '04',
          tagEn: 'Takeaway & Moulds',
          tagAr: 'توصيل وقوالب خبز',
          nameEn: 'Bakeries & Restaurants',
          nameAr: 'المطاعم والمخابز',
          descEn: 'Takeaway delivery packaging and siliconized moulds',
          descAr: 'علب التوصيل وأكياس الوجبات وقوالب الخبز',
          img: '/images/industry_bakery.jpg',
        },
      ],
    },
    b2c: {
      tag: t.b2cTag,
      heading: t.b2cHeading,
      sub: t.b2cSub,
      items: [
        {
          n: '01',
          tagEn: 'Oven-Safe Moulds',
          tagAr: 'قوالب آمنة للفرن',
          nameEn: 'Home Baking',
          nameAr: 'الخبز المنزلي',
          descEn: 'Siliconized paper baking moulds & cake liners',
          descAr: 'قوالب كيك ورقية سيليكونية آمنة للفرن',
          img: '/images/b2c_baking.jpg',
        },
        {
          n: '02',
          tagEn: 'Leak-Proof Seal',
          tagAr: 'مانع للتسرب',
          nameEn: 'Meal Prep & Storage',
          nameAr: 'إعداد وحفظ الوجبات',
          descEn: 'Reusable and disposable leak-proof containers',
          descAr: 'حافظات طعام مانعة للتسرب للثلاجة والمايكرويف',
          img: '/images/b2c_mealprep.jpg',
        },
        {
          n: '03',
          tagEn: 'Party Tableware',
          tagAr: 'مستلزمات الحفلات',
          nameEn: 'Parties & Events',
          nameAr: 'الحفلات والمناسبات',
          descEn: 'Coordinated disposable sets and luxury plates',
          descAr: 'أطقم سفرة متكاملة للمناسبات والرحلات العائلية',
          img: '/images/industry_hospitality.jpg',
        },
        {
          n: '04',
          tagEn: 'Everyday Essentials',
          tagAr: 'عبوات التوفير',
          nameEn: 'Everyday Retail Packs',
          nameAr: 'العبوات اليومية',
          descEn: 'Homepack convenient sizes for daily family use',
          descAr: 'مجموعات هوم باك الاقتصادية للاستعمال اليومي',
          img: '/images/prod_paper.jpg',
        },
      ],
    },
  };

  const current = categories[mode];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const card = (e.target as HTMLElement).closest('.cat-card') as HTMLElement | null;
    if (card) {
      const itemRect = card.getBoundingClientRect();
      const gridRect = gridRef.current.getBoundingClientRect();
      setHoverStyle({
        opacity: 1,
        width: itemRect.width,
        height: itemRect.height,
        transform: `translate(${itemRect.left - gridRect.left}px, ${itemRect.top - gridRect.top}px)`,
      });
    } else {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <section id="cats">
      <div className="section-head">
        <div className="tag" id="catsTag">
          {current.tag}
        </div>
        <h2 id="catsHeading">{current.heading}</h2>
        <p id="catsSub">{current.sub}</p>
      </div>
      <div
        className="cat-grid"
        id="catGrid"
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverStyle((prev) => ({ ...prev, opacity: 0 }))}
      >
        <div
          className="hover-bg-indicator"
          id="catHoverBg"
          style={{
            opacity: hoverStyle.opacity,
            width: `${hoverStyle.width}px`,
            height: `${hoverStyle.height}px`,
            transform: hoverStyle.transform,
          }}
        />
        {current.items.map((cat, i) => (
          <div className="cat-card" key={i}>
            <div
              className="img-slot"
              style={{
                aspectRatio: '4/3',
                padding: 0,
                overflow: 'hidden',
                background: '#f6f8f5',
                position: 'relative',
              }}
            >
              <img
                src={cat.img}
                alt={lang === 'ar' ? cat.nameAr : cat.nameEn}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s var(--ease)',
                }}
              />

              {/* Floating Tag on Category Image */}
              <div className="cat-img-badge">
                {lang === 'ar' ? cat.tagAr : cat.tagEn}
              </div>
            </div>
            <div className="body">
              <span className="num">{cat.n}</span>
              <h4>{lang === 'ar' ? cat.nameAr : cat.nameEn}</h4>
              <p>{lang === 'ar' ? cat.descAr : cat.descEn}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
