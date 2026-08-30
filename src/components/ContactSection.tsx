'use client';

import React, { useState } from 'react';
import { translations, Language } from '@/data/translations';

interface ContactSectionProps {
  showToast: (msg: string) => void;
  lang: Language;
}

export default function ContactSection({ showToast, lang }: ContactSectionProps) {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{ text: string; isError?: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus({
        text: lang === 'ar' ? 'يرجى تعبئة جميع الحقول قبل الإرسال.' : 'Please fill in every field before sending.',
        isError: true,
      });
      return;
    }

    const firstName = name.split(' ')[0];
    setStatus({
      text:
        lang === 'ar'
          ? `شكراً لك، ${firstName}. تم إرسال رسالتك بنجاح إلى فريق مبيعات مونيباك (info@monipack.com).`
          : `Thank you, ${firstName}. Your message has been queued to info@monipack.com.`,
      isError: false,
    });
    showToast(lang === 'ar' ? 'تم إرسال الرسالة بنجاح' : 'Message sent successfully');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact">
      <div className="section-head scroll-reveal">
        <div className="tag">{t.tag}</div>
        <h2>{t.heading}</h2>
      </div>

      <div className="contact-wrap scroll-reveal">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t.namePlaceholder}
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
          <textarea
            placeholder={t.msgPlaceholder}
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            required
          />
          <button type="submit">{t.sendBtn}</button>
          {status && (
            <div
              className="contact-status"
              style={{
                color: status.isError ? 'var(--accent-2)' : 'var(--accent)',
              }}
            >
              {status.text}
            </div>
          )}
        </form>

        <div className="contact-info">
          <div className="row">
            <div className="icon">T</div>
            <div>
              <h4>{t.phone}</h4>
              <span>
                +968 25447378 ({lang === 'ar' ? 'المكتب' : 'office'})
                <br />
                +968 96597969 ({lang === 'ar' ? 'الجوال' : 'mobile'})
                <br />
                Fax +968 25447378
              </span>
            </div>
          </div>
          <div className="row">
            <div className="icon">@</div>
            <div>
              <h4>{t.email}</h4>
              <span>info@monipack.com</span>
            </div>
          </div>
          <div className="row">
            <div className="icon">A</div>
            <div>
              <h4>{t.address}</h4>
              <span style={{ whiteSpace: 'pre-line' }}>{t.addressValue}</span>
            </div>
          </div>
          <iframe
            src="https://maps.google.com/maps?q=22.8407981,57.5521236&hl=en&z=17&output=embed"
            width="100%"
            height="220"
            style={{ border: 0, borderRadius: '12px', marginTop: '6px' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Monipack Location"
          />
        </div>
      </div>
    </section>
  );
}
