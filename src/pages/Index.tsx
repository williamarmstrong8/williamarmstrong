import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-hero text-hero-foreground">
      <Navigation />
      <HeroSection />
      <BrandsSection />
    </div>
  );
};

export default Index;
