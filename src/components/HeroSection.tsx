import ProjectCard from "./ProjectCard";

const HeroSection = () => {
  return (
    <main className="px-6 md:px-8 pb-8">
      <section className="text-center mb-12 md:mb-16">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-8 leading-none">
          Always Creating
        </h2>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        <div className="md:col-span-1 lg:col-span-2">
          <ProjectCard 
            title="Featured Project" 
            className="aspect-[4/5] md:aspect-[2/3]"
            size="large"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <ProjectCard 
            title="Project Two" 
            className="aspect-square"
            size="medium"
          />
          <ProjectCard 
            title="Project Three" 
            className="aspect-square"
            size="medium"
          />
        </div>
        
        <div className="md:col-span-1">
          <ProjectCard 
            title="Project Four" 
            className="aspect-[4/5] md:aspect-[3/4]"
            size="large"
          />
        </div>
      </section>
    </main>
  );
};

export default HeroSection;