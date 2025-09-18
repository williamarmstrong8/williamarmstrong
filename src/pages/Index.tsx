import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-hero text-hero-foreground">
      <Navigation />
      <HeroSection />
      <BrandsSection />
      <AboutSection />
      <ProjectsSection />
    </div>
  );
};

export default Index;
