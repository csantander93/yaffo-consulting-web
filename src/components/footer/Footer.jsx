import './Footer.css';
import logoYafo from '../../assets/logo-yaffo.webp';

const Footer = () => {
  return (
    <footer className="footer-container" itemScope itemType="https://schema.org/WPFooter">
      <div className="footer-content">
        <div className="footer-logo-section" itemScope itemType="https://schema.org/Organization">
          <a 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit Yafo Consulting's website"
          >
            <img 
              src={logoYafo} 
              alt="Icon Yaffo Consulting" 
              className="info-logo" 
              itemProp="logo"
              loading="lazy"
            />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p itemProp="copyrightYear">
          &copy; {new Date().getFullYear()} <span itemProp="copyrightHolder">YAFFO CONSULTING S.R.L</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;