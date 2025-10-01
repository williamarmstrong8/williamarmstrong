import ProjectGridCard from "./ProjectGridCard";
import { useNavigate } from "react-router-dom";

const ProjectsSection = () => {
  const navigate = useNavigate();

  // Featured projects for the home page - 4 most recent projects in chronological order
  const featuredProjects = [
    {
      id: 1,
      title: "Proof - Social Health Tracker",
      category: "UI/UX",
      description: "Social media app concept that gamifies health challenges through photo-based task tracking and social accountability, featuring a working prototype built with Flutter."
    },
    {
      id: 2,
      title: "Happy Mile - Run Club App",
      category: "UI/UX",
      description: "Modern UI/UX redesign of my run club with an innovative app concept featuring contemporary design principles and user-centered interface development."
    },
    {
      id: 3,
      title: "PWS Refrigeration System",
      category: "Engineering",
      description: "Human-centered engineering project developing a smart refrigeration system for individuals with Prader-Willi Syndrome to promote independence and safety."
    },
    {
      id: 4,
      title: "Waste Management and Sorting System",
      category: "Engineering",
      description: "Redesigned Boston College's waste system with an automated conveyor system that sorts trash, compost, and recycling to improve accessibility and user experience."
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
              size="compact"
              onClick={() => navigate("/projects")}
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
