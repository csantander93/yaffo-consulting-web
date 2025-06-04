import React, { useEffect, useRef, useCallback } from 'react';
import teamImage from '../../assets/development.webp';
import alephabout from '../../assets/aleph-about.webp';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);
  const observerRef = useRef(null);

  // Preload images and resources
  useEffect(() => {
    // Preload images
    [teamImage, alephabout].forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });

    // Schema Markup
    const aboutSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "headline": "About YAFO Consulting - Cybersecurity and Compliance Experts",
      "description": "Meet our team of experts in financial systems, cybersecurity and business continuity",
      "image": [teamImage, alephabout],
      "publisher": {
        "@type": "Organization",
        "name": "YAFO Consulting",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.yafo-consultora.com/logo.webp"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(aboutSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const addToRefs = useCallback((el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  }, []);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observerRef.current?.unobserve(entry.target);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    const currentElements = elementsRef.current;
    currentElements.forEach(el => observerRef.current.observe(el));

    return () => {
      currentElements.forEach(el => observerRef.current?.unobserve(el));
    };
  }, []);

  const approachData = [
    {
      name: "Customized approach",
      description: "Solutions tailored to each client's specific needs",
      keywords: ["personalization", "custom solutions", "client-focused approach"]
    },
    {
      name: "Cutting-edge technology",
      description: "We implement market-leading tools for maximum effectiveness",
      keywords: ["technological innovation", "advanced tools", "state-of-the-art technology"]
    },
    {
      name: "Multidisciplinary team",
      description: "Experts in security, fintech and risk management working together",
      keywords: ["expert team", "multidisciplinary", "integrated knowledge"]
    },
    {
      name: "Proven methodology",
      description: "Processes validated with over 50 clients in Latin America",
      keywords: ["methodology", "validated processes", "proven experience"]
    },
    {
      name: "Continuous support",
      description: "Support throughout all implementation and operation stages",
      keywords: ["technical support", "ongoing assistance", "continuous service"]
    },
    {
      name: "Strategic vision",
      description: "Solutions aligned with each organization's business objectives",
      keywords: ["strategy", "business alignment", "comprehensive vision"]
    }
  ];

  return (
    <section 
      id="about" 
      className="about-section" 
      ref={sectionRef}
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      <meta itemProp="name" content="About YAFO Consulting" />
      <meta itemProp="description" content="Experts in cybersecurity, compliance and risk management" />
      
      <div className="about-background-tech" aria-hidden="true">
        <div className="tech-grid-animated"></div>
      </div>
      
      <div className="about-container">
        {/* Mission Section */}
        <div className="about-header" ref={addToRefs}>
          <h2 id="about-heading" className="about-title" itemProp="headline">
            <span className="title-highlight" itemProp="keywords">TRANSFORMING</span> <span itemProp="keywords">COMPLIANCE</span> AND <span itemProp="keywords">SECURITY</span> MANAGEMENT WITH TECHNOLOGY
          </h2>
          <p className="about-description" itemProp="description">
            We are a team of <strong itemProp="keywords">financial systems experts</strong>, <strong itemProp="keywords">cybersecurity</strong> and <strong itemProp="keywords">business continuity</strong> professionals. Over 50 clients across <strong>Argentina and Latin America</strong> trust our <strong>technological solutions</strong> to protect and optimize their critical operations.
          </p>
          <div className="divider-line" ref={addToRefs}></div>
        </div>

        {/* Team Section */}
        <div className="about-row" ref={addToRefs} itemScope itemType="https://schema.org/Organization">
          <div className="about-image-wrapper">
            <div className="image-tech-border image-left-border">
              <div className="image-blue-frame">
                <img
                  src={teamImage}
                  alt="YAFO Consulting's multidisciplinary team working on cybersecurity projects"
                  className="about-image"
                  width="600"
                  height="400"
                  loading="eager"
                  ref={addToRefs}
                  itemProp="image"
                />
              </div>
            </div>
            <p className="image-caption" ref={addToRefs}>Team of specialists in <span itemProp="keywords">risk management</span></p>
          </div>
          <div className="about-content">
            <h2 className="content-title" ref={addToRefs}>
              <span className="title-decoration">Who we are</span>
            </h2>
            <p className="content-text" ref={addToRefs} itemProp="description">
              At <span itemProp="name">YAFO Consulting</span>, we combine <strong>technical expertise</strong> and <strong>strategic vision</strong> to deliver comprehensive solutions in <span itemProp="keywords">risk management</span>, <span itemProp="keywords">cybersecurity</span> and <span itemProp="keywords">regulatory compliance</span>.
            </p>
            <p className="content-text" ref={addToRefs} itemProp="description">
              From <strong>startups</strong> to <strong>large enterprises</strong>, we help our clients navigate complex environments with <strong>innovative tools</strong> and an unwavering commitment to quality.
            </p>
          </div>
        </div>

        {/* Approach Section */}
        <div className="about-row reverse-row" ref={addToRefs}>
          <div className="about-image-wrapper">
            <div className="image-tech-border image-right-border">
              <div className="image-blue-frame">
                <img
                  src={alephabout}
                  alt="YAFO Consulting's Aleph Manager platform for risk and compliance management"
                  className="about-image"
                  width="600"
                  height="400"
                  loading="lazy"
                  ref={addToRefs}
                  itemProp="image"
                />
              </div>
            </div>
            <p className="image-caption" ref={addToRefs}>Innovative technological solutions for <span itemProp="keywords">compliance management</span></p>
          </div>
          <div className="about-content about-approach">
            <h2 className="content-title" ref={addToRefs}>
              <span className="title-decoration">Our approach</span>
            </h2>
            
            <ul className="services-list">
              {approachData.map((item, index) => (
                <li 
                  className="service-item" 
                  key={index}
                  ref={addToRefs}
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <span className="service-icon">•</span>
                  <span itemProp="name">{item.name}</span>
                  <meta itemProp="description" content={item.description} />
                  <meta itemProp="provider" content="YAFO Consulting"/>
                  {item.keywords.map((keyword, i) => (
                    <meta key={i} itemProp="keywords" content={keyword} />
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);