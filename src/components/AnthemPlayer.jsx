import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ShieldAlert, Award } from 'lucide-react';
import { translations } from '../data/translations';
import { anthemLyrics } from '../data/martyrs';

const AnthemPlayer = ({ lang }) => {
  const t = translations[lang];
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [translationLang, setTranslationLang] = useState(lang === 'en' ? 'en' : 'fr');
  
  const audioRef = useRef(null);
  const audioUrl = "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/48/Kassaman_instrumental.ogg/Kassaman_instrumental.ogg.mp3";

  // Sync translation lang when UI lang changes
  useEffect(() => {
    if (lang === 'en' || lang === 'fr') {
      setTranslationLang(lang);
    }
  }, [lang]);

  // Synchronize audio playback with state
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed: ", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles time update from the HTML Audio player to sync lyrics & progress bar
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 73.24; // fallback duration from wiki metadata
    
    const progress = (current / duration) * 100;
    setPlaybackProgress(progress);

    // Sync lyric lines based on current timestamp
    const lineIndex = Math.min(
      Math.floor((current / duration) * anthemLyrics.length),
      anthemLyrics.length - 1
    );
    setCurrentLine(lineIndex);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentLine(0);
    setPlaybackProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentLine(0);
    setPlaybackProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleNext = () => {
    const nextLine = (currentLine + 1) % anthemLyrics.length;
    setCurrentLine(nextLine);
    setPlaybackProgress((nextLine / anthemLyrics.length) * 100);
    if (audioRef.current) {
      const duration = audioRef.current.duration || 73.24;
      audioRef.current.currentTime = (nextLine / anthemLyrics.length) * duration;
    }
  };

  const handlePrev = () => {
    const prevLine = (currentLine - 1 + anthemLyrics.length) % anthemLyrics.length;
    setCurrentLine(prevLine);
    setPlaybackProgress((prevLine / anthemLyrics.length) * 100);
    if (audioRef.current) {
      const duration = audioRef.current.duration || 73.24;
      audioRef.current.currentTime = (prevLine / anthemLyrics.length) * duration;
    }
  };

  return (
    <section id="anthem" className="anthem-section">
      <div className="container">
        <div className="section-header">
          <span className="hero-badge" style={{ marginBottom: '15px' }}>{t.anthemBadge}</span>
          <h2 className="section-title">
            {t.anthemTitleMain} <span className="gold-text">{t.anthemTitleSub}</span>
          </h2>
          <p className="section-desc">{t.anthemDesc}</p>
        </div>

        {/* HTML Audio element hidden in DOM */}
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          preload="auto" 
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
        />

        <div className="anthem-card">
          {/* Audio Visualizer & Lyrics Panel */}
          <div className="anthem-lyric-side">
            <h3 className="anthem-title-arabic">{t.lyricTitleAr}</h3>
            <h4 className="anthem-title-fr">{t.lyricTitleFr}</h4>

            <div className="lyric-lines-carousel">
              <p className="arabic-lyric green-text glow-text">
                {anthemLyrics[currentLine].ar}
              </p>
              <p className="translation-lyric">
                {translationLang === 'fr' ? anthemLyrics[currentLine].fr : anthemLyrics[currentLine].en}
              </p>
            </div>

            {/* Custom simulated audio progress bar */}
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', margin: '20px 0' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${playbackProgress}%`, 
                  background: 'linear-gradient(90deg, var(--primary-color), var(--accent-red))',
                  transition: 'width 0.1s linear'
                }}
              ></div>
            </div>

            <div className="anthem-controls">
              <button className="anthem-ctrl-btn" onClick={handlePrev} title="Précédent">
                ←
              </button>
              <button 
                className="anthem-ctrl-btn play-btn" 
                onClick={handlePlayPause}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" style={{ marginLeft: lang === 'ar' ? '0' : '2px', marginRight: lang === 'ar' ? '2px' : '0' }} />}
              </button>
              <button className="anthem-ctrl-btn" onClick={handleReset} title="Recommencer">
                <RotateCcw size={16} />
              </button>
              <button className="anthem-ctrl-btn" onClick={handleNext} title="Suivant">
                →
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
              <button 
                className={`filter-btn ${translationLang === 'fr' ? 'active' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                onClick={() => setTranslationLang('fr')}
              >
                FR
              </button>
              <button 
                className={`filter-btn ${translationLang === 'en' ? 'active' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                onClick={() => setTranslationLang('en')}
              >
                EN
              </button>
            </div>
          </div>

          {/* Historical Information Panel */}
          <div className="anthem-info-side">
            <h3 className="anthem-history-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} className="gold-text" />
              {t.anthemHistoryTitle}
            </h3>
            
            <p className="anthem-history-text">{t.anthemHistoryDesc1}</p>
            
            <p className="anthem-history-text">{t.anthemHistoryDesc2}</p>

            <div style={{ display: 'flex', gap: '10px', background: 'rgba(210, 16, 52, 0.05)', border: '1px solid rgba(210, 16, 52, 0.15)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <ShieldAlert size={28} className="red-text" style={{ flexShrink: 0 }} />
              <div>{t.anthemHistoryDisclaimer}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnthemPlayer;
