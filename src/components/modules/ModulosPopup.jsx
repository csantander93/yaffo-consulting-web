import React, { useState, useEffect, useRef } from 'react';
import './ModulosPopup.css';

const ModulosPopup = ({
  initialCategory,
  selectedModule,
  onModuleSelect,
  onClose,
  onBack,
  modulesData,
  categoryMapping
}) => {
  const [animate, setAnimate] = useState(false);
  const [isPanelAnimated, setIsPanelAnimated] = useState(false);
  const descriptionPanelRef = useRef(null);

  // Schema Markup for modules (SEO)
  useEffect(() => {
    if (selectedModule && modulesData[initialCategory]?.[selectedModule]) {
      const moduleSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": selectedModule,
        "description": modulesData[initialCategory][selectedModule].description,
        "applicationCategory": "BusinessApplication",
        "featureList": modulesData[initialCategory][selectedModule].features,
        "operatingSystem": "Web-based",
        "offers": {
          "@type": "Offer",
          "category": "SoftwareAsAService"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(moduleSchema);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [selectedModule, initialCategory, modulesData]);

  const getShortCategoryName = (category) => {
    return category.includes('(') ? category.split('(')[0].trim() : category;
  };

  useEffect(() => {
    if (descriptionPanelRef.current) {
      descriptionPanelRef.current.scrollTop = 0;
    }
  }, [selectedModule]);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (selectedModule) {
      setTimeout(() => setIsPanelAnimated(true), 50);
    } else {
      setIsPanelAnimated(false);
    }
  }, [selectedModule]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!descriptionPanelRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = descriptionPanelRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      
      if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
        e.stopPropagation();
      }
    };

    const panel = descriptionPanelRef.current;
    if (panel) {
      panel.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (panel) {
        panel.removeEventListener('wheel', handleWheel);
      }
    };
  }, [selectedModule]);

  const handleModuleClick = (moduleName) => {
    onModuleSelect(moduleName);
  };

  if (!modulesData[initialCategory]) {
    console.error(`Category "${initialCategory}" doesn't exist in modulesData`);
    return null;
  }

  return (
    <div className="modules-popup-overlay">
      <div className={`modules-popup-container ${animate ? 'animate-in' : ''}`}>
        <div className="popup-header">
          <div className="breadcrumbs">
            <span className="breadcrumb" itemProp="applicationCategory">
              {categoryMapping[initialCategory] || initialCategory}
            </span>
            {selectedModule && (
              <>
                <span className="breadcrumb-divider">/</span>
                <span className="breadcrumb active" itemProp="name">{selectedModule}</span>
              </>
            )}
          </div>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close popup"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={`modules-popup-content ${isPanelAnimated ? 'panel-animated' : ''}`}>
          <div className="modules-panel">
            <div className="panel-header modules-header-container">
              <h3>Modules</h3>
              <span className="modules-count">
                {Object.keys(modulesData[initialCategory]).length} modules
              </span>
              <p>Select a module to view details</p>
            </div>
            
            <div className="modules-list">
              {Object.keys(modulesData[initialCategory]).map((moduleName, index) => (
                <div
                  key={moduleName}
                  className={`module-item ${selectedModule === moduleName ? 'selected' : ''}`}
                  onClick={() => handleModuleClick(moduleName)}
                  style={{ '--delay': `${index * 0.05 + 0.1}s` }}
                  itemScope
                  itemType="https://schema.org/SoftwareApplication"
                >
                  <div className="module-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h4 itemProp="name">{moduleName}</h4>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="module-detail-panel" 
            ref={descriptionPanelRef}
            itemScope
            itemType="https://schema.org/SoftwareApplication"
          >
            {selectedModule && (
              <>
                <div className="module-detail-header">
                  <div className="mobile-back-button-container">
                    <button 
                      className="mobile-back-button"
                      onClick={onBack}
                      aria-label="Back to modules"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Back
                    </button>
                  </div>
                  <h3 title={selectedModule} itemProp="name">{selectedModule}</h3>
                  <div className="module-category-badge" itemProp="applicationCategory">
                    {getShortCategoryName(initialCategory)}
                  </div>
                </div>
                
                <div className="module-detail-content">
                  <p className="module-description" itemProp="description">
                    {modulesData[initialCategory][selectedModule].description}
                  </p>
                  
                  {modulesData[initialCategory][selectedModule].features && (
                    <div className="module-features" itemProp="featureList">
                      <h4>Key Features:</h4>
                      <ul>
                        {modulesData[initialCategory][selectedModule].features.map((feature, i) => (
                          <li key={i} itemProp="feature">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulosPopup;