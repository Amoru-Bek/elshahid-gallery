import React from 'react';
import { translations } from '../data/translations';

const Footer = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-emblem">🇩🇿</div>
        
        <div>
          <p className="footer-text" style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: "'Cairo', sans-serif", color: 'var(--text-primary)', marginBottom: '4px' }}>
            {t.footerArabicMotto}
          </p>
          <p className="footer-text" style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '0.95rem' }}>
            {t.footerFrenchMotto}
          </p>
        </div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} {t.footerCopyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
