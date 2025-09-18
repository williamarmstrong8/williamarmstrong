import ProjectCard from "./ProjectCard";

const HeroSection = () => {
  return (
    <main className="min-h-screen px-20 pt-8 pb-0">
      <section className="text-center mb-12">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none">
          Always Creating
        </h2>
      </section>

      <section className="grid grid-cols-4 gap-4 h-[550px] mb-0">
        <div className="col-span-1">
          <ProjectCard 
            title="Featured Project" 
            className="w-full h-full"
            size="medium"
          />
        </div>
        
        <div className="col-span-1 grid grid-rows-2 gap-4">
          <ProjectCard 
            title="Project Two" 
            className="w-full h-full"
            size="small"
          />
          <ProjectCard 
            title="Project Three" 
            className="w-full h-full"
            size="small"
          />
        </div>
        
        <div className="col-span-2">
          <ProjectCard 
            title="Project Four" 
            className="w-full h-full"
            size="large"
          />
        </div>
      </section>
    </main>
  );
};

export default HeroSection;