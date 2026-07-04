import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { translations } from '../data/translations';
import { wilayasData } from '../data/martyrs';

const WilayasMap = ({ martyrs, onMartyrClick, lang }) => {
  const [selectedWilaya, setSelectedWilaya] = useState('I');
  const t = translations[lang];

  const currentWilaya = wilayasData[selectedWilaya];
  
  // Find martyrs who belong to the selected Wilaya
  const wilayaMartyrs = martyrs.filter(m => m.wilaya === selectedWilaya);

  const getLocalizedValue = (field) => {
    return typeof field === 'object' && field !== null ? field[lang] : field;
  };

  return (
    <section id="wilayas" className="wilaya-section">
      <div className="container">
        <div className="section-header">
          <span className="hero-badge" style={{ marginBottom: '15px' }}>{t.wilayasBadge}</span>
          <h2 className="section-title">
            {t.wilayasTitleMain} <span className="gold-text">{t.wilayasTitleSub}</span>
          </h2>
          <p className="section-desc">{t.wilayasDesc}</p>
        </div>

        <div className="wilaya-grid">
          {/* Interactive SVG Map Visualizer */}
          <div className="map-svg-container">
            <svg 
              viewBox="0 0 500 400" 
              width="100%" 
              height="100%" 
              style={{ maxHeight: '400px' }}
            >
              <defs>
                <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#141c20" />
                  <stop offset="100%" stopColor="#0b0f12" />
                </linearGradient>
              </defs>

              {/* Grid Lines in background for aesthetic depth */}
              <line x1="50" y1="0" x2="50" y2="400" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="150" y1="0" x2="150" y2="400" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="250" y1="0" x2="250" y2="400" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="350" y1="0" x2="350" y2="400" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="450" y1="0" x2="450" y2="400" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="0" y1="200" x2="500" y2="200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              <line x1="0" y1="300" x2="500" y2="300" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

              {/* Border Outline of Northern Algeria */}
              {/* Wilaya V - Oranie (West) */}
              <path 
                d="M 30,120 Q 90,130 150,150 L 150,230 L 50,230 Z" 
                className={`wilaya-path ${selectedWilaya === 'V' ? 'selected' : ''}`}
                onClick={() => setSelectedWilaya('V')}
              />
              <text x="80" y="180" className="wilaya-label">V</text>

              {/* Wilaya IV - Algérois (North Central) */}
              <path 
                d="M 150,150 Q 200,140 230,155 L 210,230 L 150,230 Z" 
                className={`wilaya-path ${selectedWilaya === 'IV' ? 'selected' : ''}`}
                onClick={() => setSelectedWilaya('IV')}
              />
              <text x="185" y="190" className="wilaya-label">IV</text>

              {/* Wilaya III - Kabylie (North East-Central) */}
              <path 
                d="M 230,155 Q 260,150 290,165 L 280,220 L 210,230 Z" 
                className={`wilaya-path ${selectedWilaya === 'III' ? 'selected' : ''}`}
                onClick={() => setSelectedWilaya('III')}
              />
              <text x="250" y="195" className="wilaya-label">III</text>

              {/* Wilaya II - Nord-Constantinois (North East Coast) */}
              <path 
                d="M 290,165 Q 340,160 380,180 L 370,230 L 280,220 Z" 
                className={`wilaya-path ${selectedWilaya === 'II' ? 'selected' : ''}`}
                onClick={() => setSelectedWilaya('II')}
              />
              <text x="330" y="200" className="wilaya-label">II</text>

              {/* Wilaya I - Aurès (East Interior) */}
              <path 
                d="M 280,220 L 370,230 L 390,290 L 280,290 Z" 
                className={`wilaya-path ${selectedWilaya === 'I' ? 'selected' : ''}`}
                onClick={() => setSelectedWilaya('I')}
              />
              <text x="330" y="260" className="wilaya-label">I</text>

              {/* Wilaya VI - Sud / Sahara (Vast South) */}
              <path 
                d="M 50,230 L 280,230 L 280,290 L 390,290 L 410,380 L 30,380 Z" 
                className={`wilaya-path ${selectedWilaya === 'VI' ? 'selected' : ''}`}
                onClick={() => setSelectedWilaya('VI')}
              />
              <text x="180" y="310" className="wilaya-label">VI</text>

            </svg>
            <div style={{ position: 'absolute', bottom: '15px', right: lang === 'ar' ? 'auto' : '20px', left: lang === 'ar' ? '20px' : 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {t.mapDisclaimer}
            </div>
          </div>

          {/* Selected Wilaya Details Panel */}
          <div className="wilaya-info-card">
            <div className="wilaya-info-num">{t.wilayaZone}</div>
            <h3 className="wilaya-info-name gold-text">{getLocalizedValue(currentWilaya.name)}</h3>
            
            <div className="wilaya-info-meta">
              <div className="wilaya-meta-item">
                <span className="wilaya-meta-label">{t.wilayaLeader}</span>
                <span className="wilaya-meta-val">{getLocalizedValue(currentWilaya.leader)}</span>
              </div>
              <div className="wilaya-meta-item">
                <span className="wilaya-meta-label">{t.wilayaHQ}</span>
                <span className="wilaya-meta-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} className="green-text" />
                  {getLocalizedValue(currentWilaya.capital)}
                </span>
              </div>
            </div>

            <p className="wilaya-info-desc">{getLocalizedValue(currentWilaya.description)}</p>
            
            <div style={{ marginBottom: '15px' }}>
              <span className="wilaya-meta-label" style={{ display: 'block', marginBottom: '4px' }}>{t.wilayaBattles}</span>
              <span className="wilaya-meta-val" style={{ color: 'var(--text-primary)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                {getLocalizedValue(currentWilaya.battles)}
              </span>
            </div>

            {wilayaMartyrs.length > 0 && (
              <div className="wilaya-chouhada-list">
                <span className="wilaya-chouhada-title">{t.wilayaMartyrsList}</span>
                <div className="wilaya-chouhada-names">
                  {wilayaMartyrs.map(m => (
                    <span 
                      key={m.id} 
                      className="chouhada-pill"
                      onClick={() => onMartyrClick(m)}
                    >
                      {getLocalizedValue(m.name)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WilayasMap;
