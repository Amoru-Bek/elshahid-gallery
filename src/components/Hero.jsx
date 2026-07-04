import React from 'react';
import { Award } from 'lucide-react';
import { translations } from '../data/translations';

const Hero = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="hero" className="hero">
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url('/images/hero_bg.png')` }}
      ></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-badge">
          <Award size={14} className="gold-text" style={{ filter: 'drop-shadow(0 0 4px var(--accent-gold))' }} />
          <span>{t.heroBadge}</span>
        </div>
        
        <h1 className="hero-title">
          {t.heroTitleMain} <span className="gold-text">{t.heroTitleSub}</span>
        </h1>
        
        <p className="hero-subtitle">
          {t.heroSubtitle}
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number red-text glow-text">1.5M+</span>
            <span className="stat-label">{t.statMartyrs}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number gold-text glow-text">7.5</span>
            <span className="stat-label">{t.statYears}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number green-text glow-text">132</span>
            <span className="stat-label">{t.statColonization}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
