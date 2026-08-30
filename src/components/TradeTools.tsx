'use client';

import React, { useState, useRef } from 'react';
import { translations, Language, productsCatalog, ProductItem } from '@/data/translations';

interface TradeToolsProps {
  showToast: (msg: string) => void;
  lang: Language;
  prefillMaterial?: string;
  prefillQty?: number;
  prefillNote?: string;
}

interface CsvRow {
  sku: string;
  name: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export default function TradeTools({
  showToast,
  lang,
  prefillMaterial = 'Paper',
  prefillQty = 10,
  prefillNote = '',
}: TradeToolsProps) {
  const t = translations[lang].tools;

  // --- Tool 1: CSV Upload with Interactive Table ---
  const [isDragging, setIsDragging] = useState(false);
  const [csvRows, setCsvRows] = useState<CsvRow[] | null>(null);
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleCsvData = [
    { sku: 'MN-PAP-801', name: 'Paper Baking Moulds', qty: 10, unitPrice: 14.5, lineTotal: 145.0 },
    { sku: 'MN-ALU-401', name: 'Aluminium Disposable Casseroles', qty: 15, unitPrice: 15.0, lineTotal: 225.0 },
    { sku: 'MN-PLS-601', name: 'Round Reusable Meal Container', qty: 8, unitPrice: 13.5, lineTotal: 108.0 },
    { sku: 'MN-PLS-603', name: 'Biodegradable Cutlery Pack', qty: 12, unitPrice: 10.5, lineTotal: 126.0 },
  ];

  const handleLoadSampleCsv = () => {
    setCsvRows(sampleCsvData);
    setCsvFileName('sample_purchase_order.csv');
    showToast(lang === 'ar' ? 'تم تحميل نموذج أمر الشراء التجريبي' : 'Sample PO CSV loaded successfully');
  };

  const handleCsvFile = (file: File | undefined) => {
    if (!file) return;
    if (!/\.csv$/i.test(file.name)) {
      showToast(lang === 'ar' ? 'يرجى اختيار ملف بصيغة .csv' : 'Please upload a valid .csv file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = String(e.target?.result || '');
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      const parsed: CsvRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.trim().replace(/^["']|["']$/g, ''));
        if (parts.length >= 2) {
          const sku = parts[0] || `SKU-${100 + i}`;
          const name = parts[1] || `Item ${i}`;
          const qty = parseInt(parts[2], 10) || 5;
          const unitPrice = parseFloat(parts[3]) || 12.5;
          parsed.push({
            sku,
            name,
            qty,
            unitPrice,
            lineTotal: qty * unitPrice,
          });
        }
      }

      if (parsed.length === 0) {
        // Fallback row if empty CSV
        parsed.push({ sku: 'MN-PO-01', name: 'Assorted Food Packaging', qty: 20, unitPrice: 12.5, lineTotal: 250.0 });
      }

      setCsvRows(parsed);
      setCsvFileName(file.name);
      showToast(
        lang === 'ar'
          ? `تمت قراءة ${parsed.length} بند بنجاح من ${file.name}`
          : `Loaded ${parsed.length} items from ${file.name}`
      );
    };
    reader.readAsText(file);
  };

  // --- Tool 2: Instant Quote & PDF Exporter ---
  const [qMaterial, setQMaterial] = useState(prefillMaterial);
  const [qQty, setQQty] = useState<number>(prefillQty);
  const [qNote, setQNote] = useState(prefillNote);
  const [quoteResult, setQuoteResult] = useState<{
    id: string;
    material: string;
    qty: number;
    notes?: string;
    discountPercent: number;
    subtotal: number;
    discountAmount: number;
    total: number;
    date: string;
  } | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Sync props when advisor sends bundle
  React.useEffect(() => {
    if (prefillMaterial) setQMaterial(prefillMaterial);
    if (prefillQty) setQQty(prefillQty);
    if (prefillNote) setQNote(prefillNote);
  }, [prefillMaterial, prefillQty, prefillNote]);

  const handleGenerateQuote = () => {
    if (qQty <= 0) return;
    const discount = qQty >= 20 ? 0.18 : qQty >= 5 ? 0.1 : 0;
    const basePerCase = 12.5;
    const subtotal = qQty * basePerCase;
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;
    const quoteId = 'MNQ-' + Math.floor(1000 + Math.random() * 9000);

    setQuoteResult({
      id: quoteId,
      material: qMaterial,
      qty: qQty,
      notes: qNote.trim() || undefined,
      discountPercent: Math.round(discount * 100),
      subtotal,
      discountAmount,
      total,
      date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-OM' : 'en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    });
    showToast(lang === 'ar' ? `تم إنشاء عرض السعر ${quoteId}` : `Quote ${quoteId} generated`);
  };

  // --- Tool 3: Volume Tier Pricing Calculator ---
  const [calcQty, setCalcQty] = useState(1);
  const nextTierNeeded = calcQty < 5 ? 5 - calcQty : calcQty < 20 ? 20 - calcQty : 0;
  const progressPercent = calcQty >= 20 ? 100 : (calcQty / 20) * 100;

  // --- Tool 4: Free Sample Box Builder ---
  const [selectedSamples, setSelectedSamples] = useState<ProductItem[]>([
    productsCatalog[0],
    productsCatalog[4],
  ]);

  const handleAddSample = (item: ProductItem) => {
    if (selectedSamples.some((s) => s.id === item.id)) {
      showToast(lang === 'ar' ? 'هذا الصنف مضاف مسبقاً في صندوق العينات' : 'Item already in sample box');
      return;
    }
    if (selectedSamples.length >= 3) {
      showToast(lang === 'ar' ? 'الحد الأقصى هو 3 عينات مجانية للصندوق' : 'Maximum 3 samples per kit');
      return;
    }
    setSelectedSamples((prev) => [...prev, item]);
    showToast(lang === 'ar' ? `تمت إضافة ${item.nameAr} لصندوق العينات` : `Added ${item.nameEn} to sample kit`);
  };

  const handleRemoveSample = (id: string) => {
    setSelectedSamples((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRequestSampleKit = () => {
    if (selectedSamples.length === 0) {
      showToast(lang === 'ar' ? 'يرجى اختيار عينة واحدة على الأقل' : 'Please select at least 1 sample');
      return;
    }
    showToast(
      lang === 'ar'
        ? 'تم تسجيل طلب صندوق العينات المجاني وسيتواصل معك مندوبنا لنزوى ومسقط'
        : 'Sample kit request received! Our Oman logistics desk will dispatch shortly.'
    );
  };

  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const totalCasesInCsv = csvRows?.reduce((acc, row) => acc + row.qty, 0) || 0;
  const totalAmountInCsv = csvRows?.reduce((acc, row) => acc + row.lineTotal, 0) || 0;
  const csvDiscountPercent = totalCasesInCsv >= 20 ? 18 : totalCasesInCsv >= 5 ? 10 : 0;
  const finalCsvTotal = totalAmountInCsv * (1 - csvDiscountPercent / 100);

  return (
    <section id="tools">
      <div className="section-head">
        <div className="tag">{t.tag}</div>
        <h2>{t.heading}</h2>
        <p>{t.sub}</p>
      </div>

      <div className="tools-grid">
        {/* ========================================================
            CARD 1: Smart CSV Purchase Order Batch Upload
            ======================================================== */}
        <div className="border-trail-wrapper">
          <div className="tool-card spotlight" onMouseMove={handleSpotlight}>
            <div className="icon">CSV</div>
            <h4>{t.csvTitle}</h4>
            <p>{t.csvDesc}</p>

            <button
              type="button"
              onClick={handleLoadSampleCsv}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                color: 'var(--ink)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {t.csvSampleBtn}
            </button>

            <label
              className={`csv-drop ${isDragging ? 'drag' : ''}`}
              id="csvDrop"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleCsvFile(e.dataTransfer.files?.[0]);
              }}
            >
              {t.csvDropLabel}
              <input
                type="file"
                id="csvInput"
                accept=".csv"
                ref={fileInputRef}
                onChange={(e) => handleCsvFile(e.target.files?.[0])}
              />
            </label>

            {csvRows && (
              <div>
                <div className="csv-table-wrapper">
                  <table className="csv-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>{lang === 'ar' ? 'الصنف' : 'Item'}</th>
                        <th>{lang === 'ar' ? 'الكمية' : 'Qty'}</th>
                        <th>OMR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csvRows.map((r, i) => (
                        <tr key={i}>
                          <td><b>{r.sku}</b></td>
                          <td>{r.name}</td>
                          <td>{r.qty}</td>
                          <td>{r.lineTotal.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    fontSize: '0.78rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>{lang === 'ar' ? 'إجمالي الكراتين:' : 'Total Cases:'}</span>
                    <b>{totalCasesInCsv} {lang === 'ar' ? 'كرتون' : 'cases'}</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>{lang === 'ar' ? 'خصم الكمية المطبق:' : 'Tier Discount:'}</span>
                    <b style={{ color: 'var(--accent)' }}>{csvDiscountPercent}% Off</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '6px' }}>
                    <span>{lang === 'ar' ? 'الإجمالي التقديري:' : 'Estimated Total:'}</span>
                    <b style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>OMR {finalCsvTotal.toFixed(2)}</b>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            CARD 2: Instant Quote Builder & Official PDF Exporter
            ======================================================== */}
        <div className="border-trail-wrapper">
          <div className="tool-card spotlight" onMouseMove={handleSpotlight}>
            <div className="icon">PDF</div>
            <h4>{t.quoteTitle}</h4>
            <p>{t.quoteDesc}</p>

            <div className="quote-form">
              <select
                id="qMaterial"
                value={qMaterial}
                onChange={(e) => setQMaterial(e.target.value)}
              >
                <option value="Paper">{lang === 'ar' ? 'ورق (Paper)' : 'Paper'}</option>
                <option value="Plastic">{lang === 'ar' ? 'بلاستيك (Plastic)' : 'Plastic'}</option>
                <option value="Aluminium">{lang === 'ar' ? 'ألمنيوم (Aluminium)' : 'Aluminium'}</option>
                <option value="Foam">{lang === 'ar' ? 'فوم (Foam)' : 'Foam'}</option>
              </select>
              <input
                type="number"
                id="qQty"
                placeholder={lang === 'ar' ? 'الكمية (كرتون)' : 'Quantity (cases)'}
                min={1}
                value={qQty}
                onChange={(e) => setQQty(parseInt(e.target.value, 10) || 0)}
              />
              <input
                type="text"
                id="qNote"
                placeholder={lang === 'ar' ? 'ملاحظات الطباعة أو التخصيص (اختياري)' : 'Custom print or spec notes (optional)'}
                value={qNote}
                onChange={(e) => setQNote(e.target.value)}
              />
              <button type="button" id="qGenerate" onClick={handleGenerateQuote}>
                {t.quoteBtn}
              </button>
            </div>

            {quoteResult && (
              <div className="quote-out" id="quoteOut" style={{ display: 'block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{lang === 'ar' ? 'عرض السعر:' : 'Quote ID:'} <b>{quoteResult.id}</b></span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--ink-dim)' }}>{quoteResult.date}</span>
                </div>
                <div style={{ margin: '6px 0' }}>
                  {lang === 'ar' ? 'الخامة:' : 'Material:'} <b>{quoteResult.material}</b> • {quoteResult.qty} {lang === 'ar' ? 'كرتون' : 'cases'}
                </div>
                {quoteResult.notes && (
                  <div style={{ fontSize: '0.74rem', color: 'var(--ink-dim)', marginBottom: '4px' }}>
                    {lang === 'ar' ? 'ملاحظات:' : 'Notes:'} {quoteResult.notes}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '6px' }}>
                  <span>{lang === 'ar' ? 'خصم الكمية:' : 'Discount:'} <b>{quoteResult.discountPercent}% off</b></span>
                  <span>{lang === 'ar' ? 'الإجمالي:' : 'Total:'} <b style={{ color: 'var(--accent)' }}>OMR {quoteResult.total.toFixed(2)}</b></span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPdfModal(true)}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--accent)',
                    background: 'var(--surface)',
                    color: 'var(--accent)',
                    fontWeight: 700,
                    fontSize: '0.76rem',
                    cursor: 'pointer',
                  }}
                >
                  {t.quotePrintBtn}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            CARD 3: Volume Tier Pricing Calculator
            ======================================================== */}
        <div className="border-trail-wrapper">
          <div className="tool-card spotlight" onMouseMove={handleSpotlight}>
            <div className="icon">%</div>
            <h4>{t.volTitle}</h4>
            <p>{t.volDesc}</p>

            <div className="qty-controls">
              <button
                type="button"
                id="qtyMinus"
                onClick={() => setCalcQty((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span id="qtyValue">{calcQty}</span>
              <button
                type="button"
                id="qtyPlus"
                onClick={() => setCalcQty((prev) => Math.min(999, prev + 1))}
              >
                +
              </button>
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-dim)' }}>
                {lang === 'ar' ? 'كرتون' : 'cases'}
              </span>
            </div>

            {/* Visual Tier Progress */}
            <div className="tier-progress-wrap">
              <div className="tier-progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--ink-dim)', marginTop: '4px' }}>
              <span>1 {lang === 'ar' ? 'كرتون' : 'case'}</span>
              <span>5 ({lang === 'ar' ? 'خصم 10%' : '10% off'})</span>
              <span>20+ ({lang === 'ar' ? 'خصم 18%' : '18% off'})</span>
            </div>

            <div className="discount-label" id="discountLabel" style={{ marginTop: '10px' }}>
              {calcQty >= 20
                ? lang === 'ar' ? `تم تطبيق خصم 18% على ${calcQty} كرتون` : `18% off applied at ${calcQty} cases`
                : calcQty >= 5
                ? lang === 'ar' ? `تم تطبيق خصم 10% على ${calcQty} كرتون` : `10% off applied at ${calcQty} cases`
                : lang === 'ar' ? `سعر القائمة الأساسي (${calcQty} كرتون)` : `List price at ${calcQty} case(s)`}
            </div>

            {nextTierNeeded > 0 && (
              <div style={{ fontSize: '0.74rem', color: 'var(--ink-dim)', marginTop: '4px' }}>
                {lang === 'ar'
                  ? `أضف ${nextTierNeeded} كرتون للوصول إلى الخصم التالي!`
                  : `Add ${nextTierNeeded} more cases to unlock the next discount tier!`}
              </div>
            )}

            <div className="price-tier">
              <div>
                <span>1 {lang === 'ar' ? 'إلى 4 كراتين' : 'to 4 cases'}</span>
                <b>{lang === 'ar' ? 'سعر القائمة' : 'List price'}</b>
              </div>
              <div>
                <span>5 {lang === 'ar' ? 'إلى 19 كرتون' : 'to 19 cases'}</span>
                <b style={{ color: 'var(--accent-3)' }}>10% {lang === 'ar' ? 'خصم' : 'off'}</b>
              </div>
              <div>
                <span>20+ {lang === 'ar' ? 'كرتون فما فوق' : 'cases'}</span>
                <b style={{ color: 'var(--accent)' }}>18% {lang === 'ar' ? 'خصم' : 'off'}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          TOOL 4: Free Sample Box Builder ("Order a Free Sample Box")
          ======================================================== */}
      <div className="sample-builder-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="tag" style={{ color: 'var(--accent-3)' }}>{lang === 'ar' ? 'خدمة الشركات والمطاعم' : 'For Hospitality & Restaurants'}</div>
            <h3 style={{ fontSize: '1.25rem', marginTop: '4px' }}>{t.sampleTitle}</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--ink-dim)', maxWidth: '600px', marginTop: '4px' }}>
              {t.sampleDesc}
            </p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={handleRequestSampleKit}
            style={{ fontSize: '0.84rem', padding: '10px 20px' }}
          >
            {t.sampleSubmitBtn} ({selectedSamples.length}/3)
          </button>
        </div>

        {/* 3 Slots */}
        <div className="sample-slots-row">
          {[0, 1, 2].map((slotIdx) => {
            const item = selectedSamples[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`sample-slot-box ${item ? 'filled' : ''}`}
              >
                {item ? (
                  <>
                    <button
                      type="button"
                      className="sample-remove-btn"
                      onClick={() => handleRemoveSample(item.id)}
                      title={lang === 'ar' ? 'إزالة' : 'Remove'}
                    >
                      ✕
                    </button>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)' }}>
                      {lang === 'ar' ? item.nameAr : item.nameEn}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-dim)', marginTop: '2px' }}>
                      {item.sku} • {item.mat}
                    </div>
                  </>
                ) : (
                  <span style={{ fontSize: '0.78rem', color: 'var(--ink-dim)' }}>
                    + {lang === 'ar' ? `عينة رقم ${slotIdx + 1} (فارغ)` : `Sample Slot ${slotIdx + 1} (Empty)`}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Catalog Quick Pick Chips */}
        <div style={{ fontSize: '0.76rem', color: 'var(--ink-dim)', marginBottom: '8px', fontWeight: 600 }}>
          {lang === 'ar' ? 'انقر لإضافة عينات من الكتالوج إلى الصندوق:' : 'Click to add packaging samples to your box:'}
        </div>
        <div className="sample-catalog-pick">
          {productsCatalog.slice(0, 8).map((p) => (
            <button
              key={p.id}
              type="button"
              className="sample-chip"
              onClick={() => handleAddSample(p)}
            >
              + {lang === 'ar' ? p.nameAr : p.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          OFFICIAL PRINTABLE PDF QUOTATION MODAL
          ======================================================== */}
      {showPdfModal && quoteResult && (
        <div className="command-overlay" onClick={() => setShowPdfModal(false)}>
          <div
            className="advisor-modal"
            style={{ maxWidth: '780px', padding: '16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px' }}>
              <button
                className="btn-primary"
                onClick={() => window.print()}
                style={{ padding: '8px 18px', fontSize: '0.84rem' }}
              >
                🖨️ {lang === 'ar' ? 'طباعة / حفظ كملف PDF' : 'Print / Save as PDF'}
              </button>
              <button
                onClick={() => setShowPdfModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Printable Document */}
            <div className="pdf-quote-sheet">
              <div className="pdf-header">
                <div>
                  <div className="company-title">MOROOJ NIZWA INT. CO. LLC</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>MONIPACK DISPOSABLE FOOD PACKAGING</div>
                  <div style={{ fontSize: '0.76rem', color: '#5b655c', marginTop: '4px' }}>
                    Karsha Industrial Area, PO Box 1168, Nizwa, Sultanate of Oman<br />
                    CR No: 1083472 • Tel: +968 25447378 • Email: info@monipack.com
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ color: '#e12229', margin: 0 }}>OFFICIAL QUOTATION</h3>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '4px' }}>#{quoteResult.id}</div>
                  <div style={{ fontSize: '0.78rem', color: '#5b655c' }}>Date: {quoteResult.date}</div>
                </div>
              </div>

              <table className="pdf-meta-table">
                <thead>
                  <tr>
                    <th>Line Item & Description</th>
                    <th>Material Line</th>
                    <th>Cases</th>
                    <th>Rate / Case</th>
                    <th>Total (OMR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Commercial Packaging Supply</b>
                      {quoteResult.notes && <div style={{ fontSize: '0.74rem', color: '#5b655c' }}>Note: {quoteResult.notes}</div>}
                    </td>
                    <td>{quoteResult.material}</td>
                    <td>{quoteResult.qty}</td>
                    <td>OMR 12.500</td>
                    <td>OMR {quoteResult.subtotal.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '20px' }}>
                <div style={{ fontSize: '0.76rem', color: '#5b655c', maxWidth: '360px' }}>
                  <b>Payment Terms:</b> Net 30 for registered trade accounts / COD on delivery.<br />
                  <b>Delivery Logistics:</b> Direct factory dispatch from Nizwa across all Oman Wilayats (Muscat, Sohar, Salalah).<br />
                  <b>Validity:</b> 30 days from date of quotation.
                </div>
                <div style={{ width: '220px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Subtotal:</span>
                    <span>OMR {quoteResult.subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#e12229' }}>
                    <span>Tier Discount ({quoteResult.discountPercent}%):</span>
                    <span>- OMR {quoteResult.discountAmount.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #1c231d', paddingTop: '6px', fontWeight: 700, fontSize: '0.95rem' }}>
                    <span>Total Net:</span>
                    <span style={{ color: '#e12229' }}>OMR {quoteResult.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '30px', paddingTop: '16px', borderTop: '1px dashed #e4e9e2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#5b655c' }}>
                <span>Electronically verified quotation generated via Monipack Trade Platform</span>
                <span>Authorized Signatory: Morooj Nizwa International Co. LLC</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
