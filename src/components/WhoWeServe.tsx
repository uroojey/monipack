'use client';

import React, { useState } from 'react';
import { Language } from '@/data/translations';

interface WhoWeServeProps {
  lang: Language;
}

interface SectorCard {
  id: string;
  category: 'all' | 'hospitality' | 'clinical' | 'aviation' | 'processing' | 'retail';
  nameEn: string;
  nameAr: string;
  badgeEn: string;
  badgeAr: string;
  descEn: string;
  descAr: string;
  specsEn: string[];
  specsAr: string[];
  img: string;
  span?: boolean;
}

const sectors: SectorCard[] = [
  {
    id: 's1',
    category: 'hospitality',
    nameEn: 'Hotels, Resorts & 5-Star Hospitality',
    nameAr: 'الفنادق، المنتجعات والضيافة الفاخرة',
    badgeEn: '✨ 5-Star Luxury Standards',
    badgeAr: '✨ معايير الضيافة الفاخرة',
    descEn: 'Premium banquet packaging, room service presentations, eco wooden cutlery, and luxury disposable tableware.',
    descAr: 'مستلزمات البوفيه الفاخرة، خدمة الغرف، أدوات المائدة الخشبية الصديقة للبيئة، وأطقم الولائم الراقية.',
    specsEn: ['Banquet Tableware', 'Greaseproof Trays', 'Custom Logo Printing'],
    specsAr: ['أدوات سفرة للمناسبات', 'صواني مانعة للتسرب', 'طباعة شعار مخصصة'],
    img: '/images/industry_hospitality.jpg',
    span: true,
  },
  {
    id: 's2',
    category: 'clinical',
    nameEn: 'Hospitals & Medical Centers',
    nameAr: 'المستشفيات والمراكز الطبية',
    badgeEn: '🏥 100% Sterile & Sealed',
    badgeAr: '🏥 معقم ومحكم 100%',
    descEn: 'Hygienic sealed meal trays, individually sanitized cutlery sets, and tamper-evident patient food delivery.',
    descAr: 'صواني وجبات محكمة الإغلاق، أدوات مائدة معقمة ومغلفة فردياً، وتغليف آمن للمرضى.',
    specsEn: ['HACCP Certified', 'Tamper-Evident Lids'],
    specsAr: ['معتمد HACCP', 'أغطية مانعة للعبث'],
    img: '/images/industry_healthcare.jpg',
  },
  {
    id: 's3',
    category: 'aviation',
    nameEn: 'Airlines & In-Flight Dining',
    nameAr: 'خطوط الطيران والتموين الجوي',
    badgeEn: '✈️ Blast-Chiller & Oven Ready',
    badgeAr: '✈️ للتبريد السريع والتسخين',
    descEn: 'Ultralight stackable aluminium casseroles and crystal PET containers engineered for aviation logistics.',
    descAr: 'صواني ألمنيوم خفيفة الوزن قابلة للرص وحافظات PET فائقة النقاء مصممة للشحن الجوي.',
    specsEn: ['Space-Saving Stacks', 'Oven Safe 220°C'],
    specsAr: ['توفير مساحة التخزين', 'آمن للفرن 220°م'],
    img: '/images/industry_airlines.jpg',
  },
  {
    id: 's4',
    category: 'hospitality',
    nameEn: 'Bakeries, Cafés & Cloud Kitchens',
    nameAr: 'المخابز، المقاهي والمطابخ السحابية',
    badgeEn: '🥐 Siliconized & Heat Retention',
    badgeAr: '🥐 مقاوم للزيوت وحافظ للحرارة',
    descEn: 'Siliconized paper baking moulds, double-wall hot cups, kraft delivery bags, and secure takeaway boxes.',
    descAr: 'قوالب كيك ورقية سيليكونية، أكواب قهوة بجدار مزدوج عازل، وأكياس كرافت شديدة التحمل.',
    specsEn: ['FSC Kraft Paper', 'Leakproof Locking'],
    specsAr: ['ورق كرافت معتمد', 'أقفال محكمة لمنع التسرب'],
    img: '/images/industry_bakery.jpg',
  },
  {
    id: 's5',
    category: 'processing',
    nameEn: 'Meat, Poultry & Seafood Processing',
    nameAr: 'مصانع تجهيز اللحوم والدواجن والأسماك',
    badgeEn: '🥩 High-Barrier Vacuum & Foam',
    badgeAr: '🥩 عازل هوائي وأطباق فوم ماصة',
    descEn: 'Food-grade absorbent foam trays, barrier stretch wrap films, and hygienic packaging for fresh food lines.',
    descAr: 'أطباق فوم عالية الامتصاص، رولات نايلون غذائي عازل، وحلول تغليف صحية للمصانع والمسالخ.',
    specsEn: ['Liquid Absorbent', 'Freezer Safe -40°C'],
    specsAr: ['امتصاص فائق للسوائل', 'تجميد حتى -40°م'],
    img: '/images/industry_meat.jpg',
  },
  {
    id: 's6',
    category: 'retail',
    nameEn: 'Hypermarkets & Wholesale Supply',
    nameAr: 'الهايبرماركت وموزعو الجملة',
    badgeEn: '🛒 Bulk Pallets & Homepacks',
    badgeAr: '🛒 توريد باليتات ومجموعات هوم باك',
    descEn: 'Retail-sized Homepack packaging lines, master cartons, and container-load supply across Oman and the GCC.',
    descAr: 'سلسلة هوم باك المخصصة لرفوف التجزئة والمنازل، وطلبيات الحاويات المباشرة من المصنع.',
    specsEn: ['Retail Barcoded', 'Direct Nizwa Supply'],
    specsAr: ['باركود تجزئة دولي', 'توريد مباشر من نزوى'],
    img: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=600&auto=format&fit=crop',
  },
];

const allSectorsList = [
  { nameEn: 'Hotels & Resorts', nameAr: 'الفنادق والمنتجعات' },
  { nameEn: 'Hospitals & Clinics', nameAr: 'المستشفيات والمراكز الطبية' },
  { nameEn: 'Aviation & In-Flight', nameAr: 'خطوط الطيران والتموين' },
  { nameEn: 'Bakeries & Patisseries', nameAr: 'المخابز والحلويات' },
  { nameEn: 'Cloud Kitchens', nameAr: 'المطابخ السحابية' },
  { nameEn: 'Meat & Seafood Plants', nameAr: 'مصانع اللحوم والأسماك' },
  { nameEn: 'Hypermarkets & Supermarkets', nameAr: 'مراكز التسوق الكبرى' },
  { nameEn: 'Wholesale Distributors', nameAr: 'تجار الجملة والموزعون' },
  { nameEn: 'Schools & Universities', nameAr: 'المدارس والجامعات' },
  { nameEn: 'Government & Institutional', nameAr: 'المؤسسات الحكومية' },
  { nameEn: 'Cold Chain Logistics', nameAr: 'الشحن والتخزين المبرد' },
  { nameEn: 'Theme Parks & Tourism', nameAr: 'المنتجعات والمرافق السياحية' },
  { nameEn: 'Catering & Banquets', nameAr: 'خدمات التموين والولائم' },
  { nameEn: 'Fast Food Chains', nameAr: 'سلاسل الوجبات السريعة' },
];

export default function WhoWeServe({ lang }: WhoWeServeProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filterTabs = [
    { id: 'all', labelEn: 'All Key Sectors', labelAr: 'كافة القطاعات' },
    { id: 'hospitality', labelEn: 'Hospitality & Dining', labelAr: 'الفنادق والضيافة' },
    { id: 'clinical', labelEn: 'Healthcare & Medical', labelAr: 'الرعاية الصحية' },
    { id: 'aviation', labelEn: 'Airlines & Logistics', labelAr: 'الطيران والشحن' },
    { id: 'processing', labelEn: 'Food Processing', labelAr: 'مصانع الأغذية' },
    { id: 'retail', labelEn: 'Supermarkets & Retail', labelAr: 'الهايبرماركت والتجزئة' },
  ];

  const filteredSectors =
    activeTab === 'all'
      ? sectors
      : sectors.filter((s) => s.category === activeTab);

  return (
    <section id="serve" className="bento-serve-section">
      <div className="section-head scroll-reveal">
        <div className="tag">{lang === 'ar' ? 'قطاعات التوريد والعملاء' : 'Industry Solutions'}</div>
        <h2>{lang === 'ar' ? 'حلول تغليف مصممة خصيصاً لقطاع أعمالك' : 'Engineered for Every Sector Across Oman & GCC'}</h2>
        <p>
          {lang === 'ar'
            ? 'من معايير الفنادق العالمية 5 نجوم إلى خطوط التعقيم الطبي والمطارات، نوفر خطوط إنتاج وتغليف معتمدة تلبي أدق المواصفات.'
            : 'From 5-star hotel banquets to certified clinical cleanrooms and in-flight catering, explore packaging engineered for your sector.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-row scroll-reveal" style={{ justifyContent: 'center', marginBottom: '32px' }}>
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            className={`filter-chip ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {lang === 'ar' ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Luxury Bento Grid */}
      <div className="bento-grid scroll-reveal">
        {filteredSectors.map((s) => (
          <div
            key={s.id}
            className={`bento-card ${s.span && activeTab === 'all' ? 'bento-card-span' : ''}`}
          >
            <div className="bento-img-wrap">
              <img
                src={s.img}
                alt={lang === 'ar' ? s.nameAr : s.nameEn}
                className="bento-bg-img"
              />
              <div className="bento-gradient-scrim" />
              
              {/* Badge on Image */}
              <div className="bento-badge">
                {lang === 'ar' ? s.badgeAr : s.badgeEn}
              </div>
            </div>

            <div className="bento-content">
              <h3>{lang === 'ar' ? s.nameAr : s.nameEn}</h3>
              <p>{lang === 'ar' ? s.descAr : s.descEn}</p>

              <div className="bento-specs">
                {(lang === 'ar' ? s.specsAr : s.specsEn).map((spec, i) => (
                  <span key={i} className="bento-spec-tag">
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Sector Strip */}
      <div className="sector-strip-wrap scroll-reveal">
        <div className="sector-strip-header">
          <span>{lang === 'ar' ? 'نخدم أكثر من 14 قطاعاً حيوياً في سلطنة عُمان:' : 'Supplying 14+ specialized sectors nationwide:'}</span>
        </div>
        <div className="sector-pills-row">
          {allSectorsList.map((item, index) => (
            <div className="sector-pill-item" key={index}>
              <span className="dot" />
              {lang === 'ar' ? item.nameAr : item.nameEn}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
