import ProjectCard from "./ProjectCard";
import AppIconCard from "./AppIconCard";
import FeaturedProjectsCard from "./FeaturedProjectsCard";

const HeroSection = () => {
  return (
    <main className="min-h-screen px-20 pt-8 pb-0">
      <section className="text-center mb-12">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none">
          Always Creating
        </h2>
      </section>

      <section className="grid gap-4 h-[550px] mb-0" style={{gridTemplateColumns: "0.8fr auto 1.2fr"}}>
        <div className="h-full min-w-0">
          <FeaturedProjectsCard />
        </div>
        
        <div className="grid grid-rows-2 gap-4 h-full" style={{width: "275px"}}>
          <div className="aspect-square">
            <AppIconCard 
              className="w-full h-full"
              size="small"
            />
          </div>
          <div className="aspect-square">
            <ProjectCard 
              title="Project Three" 
              className="w-full h-full"
              size="small"
            />
          </div>
        </div>
        
        <div className="h-full min-w-0">
          <ProjectCard 
            title="Project Four" 
            className="w-full h-full"
            size="large"
            image="/ui-apps.jpg"
          />
        </div>
      </section>
    </main>
  );
};

export default HeroSection;