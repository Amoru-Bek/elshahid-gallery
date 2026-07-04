import React, { useEffect } from 'react';
import { X, Award, BookOpen } from 'lucide-react';
import { translations } from '../data/translations';

const BiographyModal = ({ martyr, onClose, lang }) => {
  const t = translations[lang];

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getLocalizedValue = (field) => {
    return typeof field === 'object' && field !== null ? field[lang] : field;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label={t.modalClose}>
          <X size={20} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-panel">
            <img 
              src={martyr.image} 
              alt={getLocalizedValue(martyr.name)} 
              className="modal-image"
              onError={(e) => {
                e.target.src = '/images/martyr_placeholder.svg';
              }}
            />
            <div className="modal-image-overlay"></div>
          </div>

          <div className="modal-info-panel">
            <div className="modal-header-meta">
              <span className="modal-subtitle">{getLocalizedValue(martyr.title)}</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-light)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {lang === 'ar' ? `الولاية ${martyr.wilaya}` : `Wilaya ${martyr.wilaya}`}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 className="modal-title">{getLocalizedValue(martyr.name)}</h2>
              {lang !== 'ar' && martyr.arabicName && (
                <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '4px' }}>
                  {martyr.arabicName}
                </span>
              )}
            </div>

            <div className="modal-life">
              <div className="life-item">
                <span className="life-label">{t.modalBirth}</span>
                <span className="life-val">{getLocalizedValue(martyr.birthDate)}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{getLocalizedValue(martyr.birthPlace)}</span>
              </div>
              <div className="life-item">
                <span className="life-label">{t.modalDeath}</span>
                <span className="life-val">{getLocalizedValue(martyr.deathDate)}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{getLocalizedValue(martyr.deathPlace)}</span>
              </div>
              <div className="life-item">
                <span className="life-label">{t.modalAge}</span>
                <span className="life-val" style={{ color: 'var(--accent-red)' }}>
                  {martyr.ageAtDeath} {t.modalAgeVal}
                </span>
              </div>
            </div>

            <div className="modal-bio">
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} className="gold-text" />
                {t.modalBioTitle}
              </h3>
              {getLocalizedValue(martyr.biography).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {martyr.operations && getLocalizedValue(martyr.operations).length > 0 && (
              <div className="modal-details-list">
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Award size={14} />
                  {t.modalOpsTitle}
                </h3>
                {getLocalizedValue(martyr.operations).map((op, idx) => (
                  <div key={idx} className="detail-row">
                    <span className="detail-value" style={{ width: '100%' }}>• {op}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiographyModal;
