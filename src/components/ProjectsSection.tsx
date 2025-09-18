import ProjectGridCard from "./ProjectGridCard";

const ProjectsSection = () => {

  // Featured projects for the home page - simplified for overview
  const featuredProjects = [
    {
      id: 1,
      title: "Architecture Design",
      category: "Design",
      description: "Architectural design project showcasing innovative building concepts and spatial planning."
    },
    {
      id: 2,
      title: "Projector System",
      category: "Engineering",
      description: "Advanced projector system design with precision optics and mechanical engineering."
    },
    {
      id: 3,
      title: "Prosthetic Exoskeleton",
      category: "Engineering",
      description: "Innovative prosthetic exoskeleton design for enhanced mobility and functionality."
    },
    {
      id: 4,
      title: "Skateboard Design",
      category: "Design",
      description: "Custom skateboard design project featuring innovative materials and ergonomic shapes."
    }
  ];

  return (
    <section className="py-20 px-20 bg-background">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <ProjectGridCard
              key={project.id}
              title={project.title}
              category={project.category}
              description={project.description}
            />
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-12">
          <a 
            href="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors font-medium"
          >
            View All Projects
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
