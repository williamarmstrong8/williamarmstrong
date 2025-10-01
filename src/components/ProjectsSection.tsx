import ProjectGridCard from "./ProjectGridCard";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProjectsSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    <section ref={ref} className="py-20 px-20 bg-background">
      <div className="w-full">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            >
              <ProjectGridCard
                title={project.title}
                category={project.category}
                description={project.description}
                size="compact"
                onClick={() => navigate("/projects")}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
