import Features from "../../components/gen/Features";
import Footer from "../../components/gen/Footer";
import HeroSection from "../../components/gen/HeroSection";
import HowItWorks from "../../components/gen/HowItWorks";
import LeaderboardPreview from "../../components/gen/LeaderboardPreview";
import Navbar from "../../components/gen/Navbar";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <LeaderboardPreview />
      <Footer />
    </div>
  );
};

export default Index;
