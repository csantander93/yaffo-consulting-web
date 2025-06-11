import { Helmet } from 'react-helmet-async';

const BASE_URL = "https://yaffoconsulting.com";

const Seo = ({ 
  title = "YAFO Consulting LLC | Cybersecurity & Risk Management Experts", 
  description = "Professional consulting services in cybersecurity, risk management and software development for financial institutions", 
  keywords = "Cybersecurity Consulting, Risk Management, GRC Solutions, Business Continuity, Software Development, Financial Security, Regulatory Compliance", 
  path = "/",
  image = `${BASE_URL}/assets/Logo-Yafo-JPG_grises-300-dpi.jpg`,
  type = "website"
}) => {
  const canonicalUrl = BASE_URL;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="author" content="YAFO Consulting LLC" />
      
      {/* Canonical and alternates */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={`${BASE_URL}/en`} hreflang="en" />
      <link rel="alternate" href={BASE_URL} hreflang="x-default" />
      
      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="YAFO Consulting LLC" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@YAFOConsulting" />
      <meta name="twitter:creator" content="@YAFOConsulting" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Favicon links */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "YAFO Consulting LLC",
          "url": BASE_URL,
          "logo": `${BASE_URL}/logo.png`,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Your Street Address",
            "addressLocality": "Your City",
            "addressRegion": "Your State",
            "postalCode": "Your ZIP",
            "addressCountry": "US"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-XXX-XXX-XXXX",
            "contactType": "customer service",
            "email": "contact@yaffoconsulting.com"
          },
          "sameAs": [
            "https://www.linkedin.com/company/yafo-consultora-srl/posts/?feedView=all",
            "https://twitter.com/YAFOConsulting"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default Seo;