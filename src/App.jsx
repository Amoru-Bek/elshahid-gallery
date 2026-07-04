import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MartyrGrid from './components/MartyrGrid';
import WilayasMap from './components/WilayasMap';
import Timeline from './components/Timeline';
import AnthemPlayer from './components/AnthemPlayer';
import Footer from './components/Footer';
import BiographyModal from './components/BiographyModal';
import { martyrsData } from './data/martyrs';
import './App.css';

function App() {
  const [lang, setLang] = useState('ar');
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedMartyr, setSelectedMartyr] = useState(null);

  // Set document direction and language when lang state changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Monitor scrolling to update active navbar section
  useEffect(() => {
    const sections = ['hero', 'gallery', 'wilayas', 'timeline', 'anthem'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMartyrClick = (martyr) => {
    setSelectedMartyr(martyr);
  };

  const handleCloseModal = () => {
    setSelectedMartyr(null);
  };

  return (
    <div className="app-wrapper">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        lang={lang} 
        setLang={setLang} 
      />
      
      <main>
        <Hero lang={lang} />
        
        <MartyrGrid 
          martyrs={martyrsData} 
          onMartyrClick={handleMartyrClick} 
          lang={lang}
        />
        
        <WilayasMap 
          martyrs={martyrsData} 
          onMartyrClick={handleMartyrClick} 
          lang={lang}
        />
        
        <Timeline lang={lang} />
        
        <AnthemPlayer lang={lang} />
      </main>

      <Footer lang={lang} />

      {selectedMartyr && (
        <BiographyModal 
          martyr={selectedMartyr} 
          onClose={handleCloseModal} 
          lang={lang}
        />
      )}
    </div>
  );
}

export default App;
