import React, { useState } from 'react';
import { Star, Menu, X } from 'lucide-react';
import { translations } from '../data/translations';

const Navbar = ({ activeSection, setActiveSection, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: 'hero', label: t.navHome },
    { id: 'gallery', label: t.navMartyrs },
    { id: 'wilayas', label: t.navWilayas },
    { id: 'timeline', label: t.navTimeline },
    { id: 'anthem', label: t.navAnthem },
  ];

  const handleScroll = (id) => {
    setActiveSection(id);
    setIsOpen(false); // Auto close mobile menu
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); handleScroll('hero'); }}>
          <div className="logo-icon">🇩🇿</div>
          <div>
            <div className="logo-text">{t.logoMain}</div>
            <div className="logo-subtitle">{t.logoSubtitle}</div>
          </div>
        </a>

        {/* Desktop Menu - hidden on mobile/tablet */}
        <div className="nav-menu-desktop">
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.id}>
                <span
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleScroll(item.id)}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="lang-selector">
            <button 
              className={`lang-btn ${lang === 'ar' ? 'active' : ''}`} 
              onClick={() => setLang('ar')}
            >
              عربي
            </button>
            <button 
              className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} 
              onClick={() => setLang('fr')}
            >
              FR
            </button>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          <button className="nav-btn" onClick={() => handleScroll('gallery')}>
            <Star size={16} fill="currentColor" />
            <span>{t.exploreBtn}</span>
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <button 
          className="mobile-menu-toggle-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <span
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mobile-divider"></div>

        <div className="mobile-lang-selector">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>
            {lang === 'ar' ? 'اختر اللغة:' : (lang === 'en' ? 'Choose Language:' : 'Choisir la langue :')}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`lang-btn ${lang === 'ar' ? 'active' : ''}`} 
              onClick={() => { setLang('ar'); setIsOpen(false); }}
            >
              عربي
            </button>
            <button 
              className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} 
              onClick={() => { setLang('fr'); setIsOpen(false); }}
            >
              FR
            </button>
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => { setLang('en'); setIsOpen(false); }}
            >
              EN
            </button>
          </div>
        </div>

        <div className="mobile-divider"></div>

        <button className="nav-btn" onClick={() => handleScroll('gallery')} style={{ width: '100%', justifyContent: 'center' }}>
          <Star size={16} fill="currentColor" />
          <span>{t.exploreBtn}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
