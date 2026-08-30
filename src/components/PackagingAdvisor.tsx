'use client';

import React, { useState } from 'react';
import { Language } from '@/data/translations';

interface PackagingAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onApplyBundle: (material: string, qty: number, note: string) => void;
}

export default function PackagingAdvisor({
  isOpen,
  onClose,
  lang,
  onApplyBundle,
}: PackagingAdvisorProps) {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [volume, setVolume] = useState('');
  const [priority, setPriority] = useState('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setIndustry('');
    setVolume('');
    setPriority('');
  };

  const industries = [
    {
      id: 'bakery',
      titleEn: 'Bakery & Café',
      titleAr: 'مخبز ومقهى',
      descEn: 'Moulds, cups, pastry boxes & takeaway kraft bags',
      descAr: 'قوالب كيك، أكواب قهوة، علب حلويات وأكياس كرافت',
      recMaterial: 'Paper',
    },
    {
      id: 'kitchen',
      titleEn: 'Restaurant & Cloud Kitchen',
      titleAr: 'مطعم ومطبخ سحابي',
      descEn: 'Tamper-proof delivery trays, casseroles & meal boxes',
      descAr: 'علب توصيل محكمة، صواني ألمنيوم وحافظات طعام',
      recMaterial: 'Aluminium',
    },
    {
      id: 'hospital',
      titleEn: 'Hospital & Healthcare',
      titleAr: 'مستشفى ومركز صحي',
      descEn: 'Sealed compartment meal trays & hygienic cutlery packs',
      descAr: 'صواني مقسمة محكمة التعقيم وأطقم أدوات مائدة فردية',
      recMaterial: 'Aluminium',
    },
    {
      id: 'hotel',
      titleEn: 'Hotel & Event Catering',
      titleAr: 'فندق وخدمات تموين وحفلات',
      descEn: 'Buffet appetizers, crystal PET dessert cups & tableware',
      descAr: 'أدوات بوفيه ومقبلات، أكواب حلويات ومفارش تقديم',
      recMaterial: 'Plastic',
    },
  ];

  const volumes = [
    { id: 'low', labelEn: 'Under 100 meals / day', labelAr: 'أقل من 100 وجبة / يوم', cases: 8 },
    { id: 'mid', labelEn: '100 – 500 meals / day', labelAr: '100 إلى 500 وجبة / يوم', cases: 25 },
    { id: 'high', labelEn: '500+ meals / day (Enterprise)', labelAr: 'أكثر من 500 وجبة / يوم (توريد ضخم)', cases: 60 },
  ];

  const priorities = [
    {
      id: 'eco',
      titleEn: '100% Eco-Friendly & Recyclable',
      titleAr: 'صديق للبيئة وقابل لإعادة التدوير 100%',
      note: 'Eco-certified FSC & PLA line',
    },
    {
      id: 'heat',
      titleEn: 'Maximum Heat & Cold Retention',
      titleAr: 'أقصى درجات حفظ الحرارة والبرودة',
      note: 'Heavy gauge foil & insulated thermal packaging',
    },
    {
      id: 'cost',
      titleEn: 'Cost-Optimized Bulk Tiers',
      titleAr: 'أعلى وفر مالي للكميات الكبيرة',
      note: 'Volume tier discount optimized',
    },
    {
      id: 'tamper',
      titleEn: 'Tamper-Evident Delivery Security',
      titleAr: 'أمان فائق وأختام مانعة للعبث للتوصيل',
      note: 'Airtight sealed tamper-evident crimp lids',
    },
  ];

  const selectedIndustryObj = industries.find((i) => i.id === industry) || industries[0];
  const selectedVolumeObj = volumes.find((v) => v.id === volume) || volumes[1];
  const selectedPriorityObj = priorities.find((p) => p.id === priority) || priorities[0];

  const handleFinish = () => {
    const note = `${selectedIndustryObj.titleEn} bundle (${selectedPriorityObj.note})`;
    onApplyBundle(selectedIndustryObj.recMaterial, selectedVolumeObj.cases, note);
    onClose();
  };

  return (
    <div className="command-overlay" onClick={onClose}>
      <div className="advisor-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {lang === 'ar' ? 'المستشار الذكي' : 'Smart Advisor'}
            </span>
            <h3 style={{ fontSize: '1.3rem', marginTop: '4px' }}>
              {lang === 'ar' ? 'مستشار حزم التغليف المخصصة' : 'Packaging Solution Advisor'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="advisor-progress">
          <div className={`advisor-bar ${step >= 1 ? 'active' : ''}`} />
          <div className={`advisor-bar ${step >= 2 ? 'active' : ''}`} />
          <div className={`advisor-bar ${step >= 3 ? 'active' : ''}`} />
          <div className={`advisor-bar ${step >= 4 ? 'active' : ''}`} />
        </div>

        {/* STEP 1: Industry */}
        {step === 1 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>
              {lang === 'ar' ? 'الخطوة 1: ما هو نوع منشأتك أو نشاطك التجاري؟' : 'Step 1: What is your primary business type?'}
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--ink-dim)' }}>
              {lang === 'ar' ? 'اختر القطاع لتحديد التشكيلة المناسبة من قوالب وحافظات وأدوات التغليف.' : 'Select your sector to match container standards, sizes, and coatings.'}
            </p>
            <div className="advisor-option-grid">
              {industries.map((ind) => (
                <div
                  key={ind.id}
                  className={`advisor-option ${industry === ind.id ? 'selected' : ''}`}
                  onClick={() => {
                    setIndustry(ind.id);
                    setStep(2);
                  }}
                >
                  <h4>{lang === 'ar' ? ind.titleAr : ind.titleEn}</h4>
                  <p>{lang === 'ar' ? ind.descAr : ind.descEn}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Volume */}
        {step === 2 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>
              {lang === 'ar' ? 'الخطوة 2: ما هو معدل استهلاكك اليومي التقديري؟' : 'Step 2: What is your estimated daily volume?'}
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--ink-dim)' }}>
              {lang === 'ar' ? 'يساعدنا هذا على تحديد الكمية الشهرية المثلى للاستفادة من أعلى خصم جملة.' : 'Helps calculate optimal case order cycles to maximize volume tier discounts.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              {volumes.map((vol) => (
                <div
                  key={vol.id}
                  className={`advisor-option ${volume === vol.id ? 'selected' : ''}`}
                  onClick={() => {
                    setVolume(vol.id);
                    setStep(3);
                  }}
                >
                  <h4>{lang === 'ar' ? vol.labelAr : vol.labelEn}</h4>
                  <p>{lang === 'ar' ? `التقدير الموصى به: ${vol.cases} كرتون شهرياً` : `Recommended batch: ${vol.cases} cases / cycle`}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              style={{ marginTop: '16px', background: 'none', border: 'none', color: 'var(--ink-dim)', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              {lang === 'ar' ? '← العودة للخطوة السابقة' : '← Back to previous step'}
            </button>
          </div>
        )}

        {/* STEP 3: Priority */}
        {step === 3 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>
              {lang === 'ar' ? 'الخطوة 3: ما هي أولويتك الرئيسية للتغليف؟' : 'Step 3: What is your top packaging priority?'}
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--ink-dim)' }}>
              {lang === 'ar' ? 'سنقوم بمواءمة مواصفات العزل والمواد المعتمدة حسب رغبتك.' : 'We will tune thermal, barrier, and security certifications accordingly.'}
            </p>
            <div className="advisor-option-grid">
              {priorities.map((pri) => (
                <div
                  key={pri.id}
                  className={`advisor-option ${priority === pri.id ? 'selected' : ''}`}
                  onClick={() => {
                    setPriority(pri.id);
                    setStep(4);
                  }}
                >
                  <h4>{lang === 'ar' ? pri.titleAr : pri.titleEn}</h4>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              style={{ marginTop: '16px', background: 'none', border: 'none', color: 'var(--ink-dim)', cursor: 'pointer', fontSize: '0.82rem' }}
            >
              {lang === 'ar' ? '← العودة للخطوة السابقة' : '← Back to previous step'}
            </button>
          </div>
        )}

        {/* STEP 4: Recommendation */}
        {step === 4 && (
          <div>
            <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
              <span style={{ fontSize: '2rem' }}>✨</span>
              <h3 style={{ fontSize: '1.3rem', marginTop: '8px' }}>
                {lang === 'ar' ? 'تم تجهيز حزمة التغليف الموصى بها لك' : 'Your Recommended Packaging Bundle is Ready'}
              </h3>
            </div>

            <div className="advisor-bundle">
              <h4>{lang === 'ar' ? selectedIndustryObj.titleAr : selectedIndustryObj.titleEn}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-dim)', marginBottom: '12px' }}>
                {lang === 'ar'
                  ? `موصى بها لخطة استهلاك (${selectedVolumeObj.labelAr}) مع مواصفات (${selectedPriorityObj.titleAr}).`
                  : `Tailored for ${selectedVolumeObj.labelEn} focusing on ${selectedPriorityObj.titleEn}.`}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg)', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '8px' }}>
                <span>{lang === 'ar' ? 'المادة الأساسية الموصى بها:' : 'Core Material:'}</span>
                <b>{selectedIndustryObj.recMaterial}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg)', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '8px' }}>
                <span>{lang === 'ar' ? 'الكمية المقترحة للدفعة:' : 'Suggested Batch Size:'}</span>
                <b>{selectedVolumeObj.cases} {lang === 'ar' ? 'كرتون' : 'cases'} ({selectedVolumeObj.cases >= 20 ? '18% Off Tier' : '10% Off Tier'})</b>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={handleFinish}
              >
                {lang === 'ar' ? 'تحميل الحزمة في منشئ عروض الأسعار ←' : 'Load Bundle into Instant Quote Builder →'}
              </button>
              <button
                className="btn-secondary"
                onClick={handleReset}
              >
                {lang === 'ar' ? 'إعادة ضبط' : 'Restart'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
