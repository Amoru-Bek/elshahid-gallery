import React, { useState } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { translations } from '../data/translations';
import MartyrCard from './MartyrCard';

const MartyrGrid = ({ martyrs, onMartyrClick, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const t = translations[lang];

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'founder', label: t.filterFounders },
    { id: 'commander', label: t.filterCommanders },
    { id: 'mujahiate', label: t.filterMujahidate },
    { id: 'young', label: t.filterYoung }
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (id) => {
    setActiveFilter(id);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
  };

  // Search logic checks across all localized values
  const filteredMartyrs = martyrs.filter((martyr) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return activeFilter === 'all' || martyr.category === activeFilter;

    const matchesName = 
      martyr.name.ar.includes(query) || 
      martyr.name.en.toLowerCase().includes(query) || 
      martyr.name.fr.toLowerCase().includes(query);

    const matchesTitle = 
      martyr.title.ar.includes(query) || 
      martyr.title.en.toLowerCase().includes(query) || 
      martyr.title.fr.toLowerCase().includes(query);

    const matchesRole = 
      martyr.role.ar.includes(query) || 
      martyr.role.en.toLowerCase().includes(query) || 
      martyr.role.fr.toLowerCase().includes(query);

    const matchesWilaya = 
      martyr.wilaya.toLowerCase().includes(query) ||
      (lang === 'ar' ? 'الولاية' : 'wilaya').includes(query);

    const matchesSearch = matchesName || matchesTitle || matchesRole || matchesWilaya;
    const matchesCategory = activeFilter === 'all' || martyr.category === activeFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header">
          <span className="hero-badge" style={{ marginBottom: '15px' }}>{t.galleryBadge}</span>
          <h2 className="section-title">
            {t.galleryTitleMain} <span className="gold-text">{t.galleryTitleSub}</span>
          </h2>
          <p className="section-desc">{t.galleryDesc}</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="controls-container">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filters-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} className="gold-text" />
              <span className="filter-label">{t.filterLabel}</span>
            </div>
            
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterClick(cat.id)}
                className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span>
            {filteredMartyrs.length} {filteredMartyrs.length > 1 ? t.resultsCountPlural : t.resultsCount}
          </span>
        </div>

        {/* Grid display */}
        {filteredMartyrs.length > 0 ? (
          <div className="martyrs-grid">
            {filteredMartyrs.map((martyr) => (
              <MartyrCard 
                key={martyr.id} 
                martyr={martyr} 
                onClick={() => onMartyrClick(martyr)} 
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', border: '1px dashed var(--border-card)', borderRadius: '12px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '1.1rem' }}>
              {t.noResults}
            </p>
            <button className="nav-btn" onClick={handleResetFilters} style={{ margin: '0 auto' }}>
              <RotateCcw size={16} />
              {t.resetFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MartyrGrid;
