import AboutSection from "../../components/landing/AboutSection";
import Footer from "../../components/landing/Footer";
import HeroSection from "../../components/landing/HeroSection";
import HowItWorks from "../../components/landing/HowItWorks";
import PrizePool from "../../components/landing/PrizePool";

const Index = () => {
  return (    
    <div className="min-h-screen bg-black/95">
      <HeroSection />
      <HowItWorks />
      <PrizePool />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
