import './Services.css';
import React, { useEffect } from 'react';

const Services = () => {
  // Structured service data
  const servicesData = [
    {
      id: 1,
      category: "consulting",
      badge: "Consulting",
      title: "Specialized Consulting",
      description: "Expert services to manage risks, ensure business continuity and optimize your technological infrastructure.",
      features: [
        "Risk Management",
        "Information Security",
        "Business Continuity",
        "Technological Infrastructure",
        "Cyber Incident Management",
        "Third-Party Relationships",
        "Digital Financial Services"
      ],
      schema: {
        serviceType: "ProfessionalService",
        offers: {
          "@type": "Offer",
          category: "ConsultingServices"
        }
      }
    },
    {
      id: 2,
      category: "cybersecurity",
      badge: "Security",
      title: "Cybersecurity Assessment",
      description: "Comprehensive evaluations to identify vulnerabilities and strengthen your defenses against cyber threats.",
      features: [
        "OSINT + Discovery",
        "External Penetration Testing",
        "Web Application Assessment",
        "Internal Penetration Testing",
        "Mobile App Security",
        "Vulnerability Management"
      ],
      schema: {
        serviceType: "CybersecurityService",
        offers: {
          "@type": "Offer",
          category: "SecurityTesting"
        }
      }
    },
    {
      id: 3,
      category: "development",
      badge: "Dev",
      title: "Software Development",
      description: "Customized technological solutions designed to meet your organization's specific needs.",
      features: [
        "Web Applications",
        "Mobile Apps",
        "Enterprise Systems",
        "Integrations",
        "Scalable Solutions",
        "Modern Technologies"
      ],
      schema: {
        serviceType: "SoftwareDevelopment",
        offers: {
          "@type": "Offer",
          category: "CustomSoftware"
        }
      }
    }
  ];

  // Effect for Schema Markup and animations
  useEffect(() => {
    // Schema Markup for services
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": servicesData.map(service => ({
        "@type": "Service",
        "position": service.id,
        "name": service.title,
        "description": service.description,
        "serviceType": service.features,
        "provider": {
          "@type": "Organization",
          "name": "YAFO Consulting",
          "url": "https://www.yafo-consultora.com"
        },
        ...service.schema
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    // Entry animations
    const animateElements = () => {
      const elements = document.querySelectorAll('.product-card, .products-title, .products-subtitle');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100 * index);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElements();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(document.querySelector('.products-section'));

    return () => {
      document.head.removeChild(script);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="services" 
      className="products-section"
      itemScope
      itemType="https://schema.org/Service"
      aria-labelledby="services-heading"
    >
      <meta itemProp="name" content="Professional Services by YAFO Consulting" />
      <meta itemProp="description" content="Comprehensive solutions in consulting, cybersecurity and software development for businesses" />
      
      {/* Decorative background (accessible) */}
      <div className="products-background" aria-hidden="true">
        <div className="products-gradient"></div>
        <div className="products-noise"></div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`products-particle products-particle-${i}`}></div>
        ))}
      </div>

      <div className="products-container">
        <div className="products-header">
          <h2 id="services-heading" className="products-title" itemProp="headline">
            <span className="title-word title-word-1">OUR</span>
            <span className="sr-only"> </span>
            <span className="title-word title-word-2">SERVICES</span>
          </h2>
          <p className="products-subtitle" itemProp="description">
            Comprehensive solutions to <span className="highlight" itemProp="keywords">protect</span>,{' '}
            <span className="highlight" itemProp="keywords">assess</span> and{' '}
            <span className="highlight" itemProp="keywords">develop</span> your technological infrastructure
          </p>
        </div>

        <div className="products-grid">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="product-card"
              data-category={service.category}
              itemScope
              itemType="https://schema.org/Service"
              role="article"
              aria-labelledby={`service-title-${index}`}
              aria-describedby={`service-desc-${index}`}
            >
              <div className="product-card-inner">
                <div className="product-badge" itemProp="serviceType">{service.badge}</div>
                
                {/* Accessible SVG icon */}
                <div className="product-icon" aria-hidden="true">
                  {service.category === 'consulting' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 15L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {service.category === 'cybersecurity' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {service.category === 'development' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                <h3 id={`service-title-${index}`} className="product-title" itemProp="name">{service.title}</h3>
                <p id={`service-desc-${index}`} className="product-description" itemProp="description">
                  {service.description}
                </p>
                
                <div className="product-features">
                  {service.features.map((feature, i) => (
                    <span 
                      key={i} 
                      className="product-feature" 
                      itemProp="keywords"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <meta itemProp="provider" content="YAFO Consulting" />
                <link itemProp="url" href={`https://www.yafo-consultora.com/#${service.category}`} />
                <div className="product-glow" aria-hidden="true"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Services);