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

  const servicesData = [
    {
      name: "Risk management and business continuity consulting",
      description: "Comprehensive assessment of operational and strategic risks",
      keywords: ["risk consulting", "business continuity", "risk management"]
    },
    {
      name: "Penetration Testing and adversary simulations (Red Team)",
      description: "Offensive security testing to identify vulnerabilities",
      keywords: ["pentesting", "red team", "offensive security"]
    },
    {
      name: "SIEM platforms for security event monitoring",
      description: "Centralized solution for real-time threat detection",
      keywords: ["SIEM", "security monitoring", "threat detection"]
    },
    {
      name: "Identity & Access Management (IAM) for critical data",
      description: "Access control and privileged identity management",
      keywords: ["IAM", "identity management", "access control"]
    },
    {
      name: "Software development and customized solutions",
      description: "Tailored technological solutions for your business",
      keywords: ["software development", "custom solutions", "tailored technology"]
    },
    {
      name: "Leading products like Core Impact and Cobalt Strike",
      description: "Professional tools for penetration testing",
      keywords: ["Core Impact", "Cobalt Strike", "security tools"]
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

        {/* Services Section */}
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
          <div className="about-content">
            <h2 className="content-title" ref={addToRefs}>
              <span className="title-decoration">Our services</span>
            </h2>
            <ul className="services-list">
              {servicesData.map((service, index) => (
                <li 
                  className="service-item" 
                  key={index}
                  ref={addToRefs}
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <span className="service-icon">⟫</span>
                  <span itemProp="name">{service.name}</span>
                  <meta itemProp="description" content={service.description} />
                  <meta itemProp="provider" content="YAFO Consulting"/>
                  {service.keywords.map((keyword, i) => (
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