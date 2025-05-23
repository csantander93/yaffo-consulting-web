import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Intro from "./components/intro/Intro"
import AnimatedSection from './components/section/AnimatedSection';
import Seo from "./components/seo/Seo"

function App() {
  return (
    <>

      <Seo
        title="YAFFO Consulting LLC"
        description="Protección proactiva de activos digitales con soluciones integrales de ciberseguridad, gestión de riesgos y desarrollo seguro."
        keywords="ciberseguridad, protección digital, consultoría IT, YAFO, seguridad avanzada, pentesting, desarrollo seguro, compliance"        image="https://yafoconsultora.com/assets/Logo Yafo JPG_grises 300 dpi.jpg"
        url="https://yaffoconsulting.com"
      />
      
      <Header />

        <AnimatedSection id="inicio" aria-label="Sección de inicio">
          <Intro />
        </AnimatedSection>
      
      <Footer />
    </>
  );
}

export default App;