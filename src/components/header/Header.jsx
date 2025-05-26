import { useState, useEffect } from "react";
import logo from '../../assets/logo-yaffo.webp';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Smooth scroll function
  const smoothScroll = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth"
      });
    }
  };

  // Effect to detect scroll and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      
      const menuSectionIds = ["home", "services", "solutions", "about", "clients", "contact"];
      const sections = Array.from(document.querySelectorAll('section[id]'))
        .filter(section => menuSectionIds.includes(section.id));
      
      const viewportMiddle = window.innerHeight / 2;
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          setActiveSection(`#${section.id}`);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items with improved ARIA attributes
  const menuItems = [
    { 
      name: "Home", 
      href: "#home",
      ariaLabel: "Go to YAFFO Consulting home section" 
    },
    { 
      name: "About Us", 
      href: "#about",
      ariaLabel: "Learn about YAFFO Consulting" 
    },
    { 
      name: "Services", 
      href: "#services",
      ariaLabel: "View our professional services" 
    },
    { 
      name: "Solutions", 
      href: "#solutions",
      ariaLabel: "Explore our business solutions" 
    },
    { 
      name: "Clients", 
      href: "#clients",
      ariaLabel: "See our success cases" 
    },
    { 
      name: "Contact", 
      href: "#contact",
      ariaLabel: "Contact YAFFO Consulting" 
    }
  ];

  // Inject structured data in the head
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "YAFFO Consulting",
      "url": "https://yaffoconsulting.com",
      "logo": "https://yaffoconsulting.com" + logo,
      "sameAs": [
        "https://www.linkedin.com/company/yaffo-consulting",
        "https://twitter.com/yaffoconsulting"
      ],
      "description": "Comprehensive professional solutions for your business"
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="header-container">
        {/* Logo with optimized SEO attributes */}
        <a 
          href="#home" 
          className="logo-link"
          aria-label="YAFFO Consulting - Home"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("#home");
            smoothScroll("#home");
          }}
        >
          <div className="logo-glow" aria-hidden="true"></div>
          <img 
            src={logo} 
            alt="YAFFO Consulting Logo - Professional solutions" 
            className="header-logo"
            width="150" 
            height="50"
            loading="eager"
          />
        </a>

        {/* Main navigation with enhanced semantics */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.href ? 'active' : ''}`}
                  aria-current={activeSection === item.href ? "page" : null}
                  aria-label={item.ariaLabel}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.href);
                    smoothScroll(item.href);
                  }}
                >
                  {item.name}
                  <span className="nav-link-glow" aria-hidden="true"></span>
                  {activeSection === item.href && (
                    <span className="active-indicator" aria-hidden="true"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Accessible mobile menu button */}
        <button 
          className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-content"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      {/* Mobile menu with improved accessibility */}
      <div 
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        id="mobile-menu-content"
        role="navigation"
        aria-label="Mobile navigation menu"
      >
        <ul className="mobile-nav-list">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={`mobile-nav-link ${activeSection === item.href ? 'active' : ''}`}
                aria-current={activeSection === item.href ? "page" : null}
                aria-label={item.ariaLabel}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setActiveSection(item.href);
                  smoothScroll(item.href);
                }}
              >
                {item.name}
                {activeSection === item.href && (
                  <span className="mobile-active-indicator" aria-hidden="true"></span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;