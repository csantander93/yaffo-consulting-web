import React, { useState, useEffect } from 'react';
import alephLogoGif from "../../assets/Gif-Aleph-una-vez.gif";
import ModulosPopup from './ModulosPopup';
import { modulesData } from './data/modulesData';
import "./Solutions.css";

const Solutions = () => {
  const [showModulesPopup, setShowModulesPopup] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentPopupTab, setCurrentPopupTab] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Effect for Schema Markup (SEO)
  useEffect(() => {
    const tabs = [
      'Net Discovery',
      'GRC',
      'Business Continuity',
      'Expected Credit Loss',
      'AML/CFT'
    ];

    const tabMapping = {
      'Net Discovery': 'Net Discovery',
      'GRC': 'GRC (Governance, Risk and Compliance)',
      'Business Continuity': 'Business Continuity',
      'Expected Credit Loss': 'Expected Credit Loss',
      'AML/CFT': 'AML/CFT (Anti-Money Laundering and Counter-Terrorism Financing)'
    };

    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": tabs.map((tab, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": tabMapping[tab] || tab,
        "description": `${tabMapping[tab] || tab} solution by YAFO Consulting`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web-based",
        "offers": {
          "@type": "Offer",
          "category": "SoftwareAsAService"
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(softwareSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (showModulesPopup) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [showModulesPopup]);

  const tabs = [
    'Net Discovery',
    'GRC',
    'Business Continuity',
    'Expected Credit Loss',
    'AML/CFT'
  ];

  const tabMapping = {
    'Net Discovery': 'Net Discovery',
    'GRC': 'GRC (Governance, Risk and Compliance)',
    'Business Continuity': 'Business Continuity',
    'Expected Credit Loss': 'Expected Credit Loss',
    'AML/CFT': 'AML/CFT (Anti-Money Laundering and Counter-Terrorism Financing)'
  };

  const handleTabClick = (tab) => {
    const fullTabName = tabMapping[tab] || tab;
    setCurrentPopupTab(fullTabName);
    setShowModulesPopup(true);
    setSelectedModule(null);
  };

  const handleModuleSelect = (moduleName) => {
    setSelectedModule(moduleName);
  };

  const handleClosePopup = () => {
    setShowModulesPopup(false);
    setSelectedModule(null);
    setCurrentPopupTab(null);
  };

  const handleBack = () => {
    setSelectedModule(null);
  };

  useEffect(() => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particlesCount = isMobile ? 30 : Math.min(Math.floor(window.innerWidth / 10), 100);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(0, 191, 255, ${Math.random() * 0.5 + 0.1})`;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function init() {
      for (let i = 0; i < particlesCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <section 
      id='solutions' 
      className='main-section' 
      role="region" 
      aria-labelledby="main-heading"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* SEO meta tags */}
      <meta itemProp="name" content="YAFO Software Solutions" />
      <meta itemProp="description" content="Specialized platforms for GRC, business continuity and financial compliance" />
      
      <canvas 
        id="particles-canvas" 
        className="particles-background"
        aria-hidden="true"
      ></canvas>
      <div className="main-header">
        <h1 id="main-heading" className="main-title" itemProp="headline">SOFTWARE SOLUTIONS</h1>
      </div>
      <div className='main-container'>
        <div className='tabs-container' role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${currentPopupTab === tabMapping[tab] ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
              role="tab"
              aria-selected={currentPopupTab === tabMapping[tab]}
              aria-controls={`${tab.toLowerCase().replace(/\s+/g, '-')}-panel`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={tabs.indexOf(tab) + 1} />
              <span itemProp="name">{tab}</span>
              <span className="tab-highlight" aria-hidden="true"></span>
            </button>
          ))}
        </div>
        
        <div className='main-content'>
          <img 
            src={alephLogoGif} 
            alt="Aleph Manager Platform - GRC and risk management solutions" 
            className="main-logo" 
            loading="lazy"
            width="400"
            height="200"
            decoding="async"
            itemProp="image"
          />
        </div>
      </div>
  
      {showModulesPopup && currentPopupTab && (
        <ModulosPopup
          initialCategory={currentPopupTab}
          selectedModule={selectedModule}
          onModuleSelect={handleModuleSelect}
          onClose={handleClosePopup}
          onBack={handleBack}
          modulesData={modulesData}
          categoryMapping={tabMapping}
        />
      )}
    </section>
  );
};

export default Solutions;