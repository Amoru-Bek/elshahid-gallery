import React from 'react';
import { timelineData } from '../data/martyrs';
import { translations } from '../data/translations';

const Timeline = ({ lang }) => {
  const t = translations[lang];

  const getLocalizedValue = (field) => {
    return typeof field === 'object' && field !== null ? field[lang] : field;
  };

  const getLocalizedDate = (dateStr) => {
    if (lang !== 'ar') return dateStr;
    
    // Algerian Arabic translation mapping for timeline dates
    const mapping = {
      "November 1, 1954": "1 نوفمبر 1954",
      "January 18, 1955": "18 جانفي 1955",
      "August 20, 1955": "20 أوت 1955",
      "March 22, 1956": "22 مارس 1956",
      "June 19, 1956": "19 جوان 1956",
      "August 20, 1956": "20 أوت 1956",
      "1956 - 1957": "1956 - 1957",
      "March 4, 1957": "4 مارس 1957",
      "October 8, 1957": "8 أكتوبر 1957",
      "March 28, 1959": "28 مارس 1959",
      "March 18, 1962": "18 مارس 1962",
      "July 5, 1962": "5 جويلية 1962"
    };
    
    return mapping[dateStr] || dateStr;
  };

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <div className="section-header">
          <span className="hero-badge" style={{ marginBottom: '15px' }}>{t.timelineBadge}</span>
          <h2 className="section-title">
            {t.timelineTitleMain} <span className="gold-text">{t.timelineTitleSub}</span>
          </h2>
          <p className="section-desc">{t.timelineDesc}</p>
        </div>

        <div className="timeline-container">
          {timelineData.map((item, index) => {
            const sideClass = index % 2 === 0 ? 'left' : 'right';
            return (
              <div key={index} className={`timeline-item ${sideClass}`}>
                <div className="timeline-badge"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{getLocalizedDate(item.year)}</div>
                  <h3 className="timeline-title">{getLocalizedValue(item.title)}</h3>
                  <p className="timeline-desc">{getLocalizedValue(item.desc)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
