import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { translations } from '../data/translations';

const MartyrCard = ({ martyr, onClick, lang }) => {
  const t = translations[lang];

  const getBadgeClass = (category) => {
    switch (category) {
      case 'founder': return 'founder';
      case 'commander': return 'commander';
      default: return '';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'founder': 
        return lang === 'ar' ? 'عضو مؤسس' : (lang === 'en' ? 'Founding Member' : 'Membre Fondateur');
      case 'commander': 
        return lang === 'ar' ? 'قائد عسكري' : (lang === 'en' ? 'Military Commander' : 'Chef Militaire');
      case 'mujahiate': 
        return lang === 'ar' ? 'مجاهدة' : (lang === 'en' ? 'Moudjahida' : 'Moudjahida / Combattante');
      case 'young': 
        return lang === 'ar' ? 'شبل الثورة' : (lang === 'en' ? 'Young Martyr' : 'Jeune Combattant');
      default: 
        return lang === 'ar' ? 'شهيد' : 'Chahid';
    }
  };

  const getLocalizedValue = (field) => {
    return typeof field === 'object' && field !== null ? field[lang] : field;
  };

  // Safe split for birth/death dates
  const birthYear = getLocalizedValue(martyr.birthDate).split(',').pop().trim();
  const deathYear = getLocalizedValue(martyr.deathDate).split(',').pop().trim();

  return (
    <div className="martyr-card" onClick={onClick}>
      <span className={`card-badge ${getBadgeClass(martyr.category)}`}>
        {getCategoryLabel(martyr.category)}
      </span>
      
      <div className="card-image-container">
        <img 
          src={martyr.image} 
          alt={getLocalizedValue(martyr.name)} 
          className="card-image"
          onError={(e) => {
            e.target.src = '/images/martyr_placeholder.svg';
          }}
        />
        <div className="card-overlay">
          <div className="card-dates">
            {lang === 'ar' ? `${deathYear} – ${birthYear}` : `${birthYear} – ${deathYear}`}
          </div>
          <h3 className="card-name">{getLocalizedValue(martyr.name)}</h3>
        </div>
      </div>

      <div className="card-content">
        <p className="card-role">{getLocalizedValue(martyr.title) || getLocalizedValue(martyr.role)}</p>
        
        <div className="card-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} className="green-text" />
            <span>
              {lang === 'ar' ? `الولاية ${martyr.wilaya}` : `Wilaya ${martyr.wilaya}`}
            </span>
          </div>
          <span className="card-more">
            {t.readMore} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MartyrCard;
