import { useState } from "react";
import Navigation from "@/components/Navigation";
import ProjectGridCard from "@/components/ProjectGridCard";
import ProjectFilter from "@/components/ProjectFilter";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Placeholder project data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Engineering",
      description: "Full-stack e-commerce solution with modern architecture and seamless user experience."
    },
    {
      id: 2,
      title: "Mobile App Design",
      category: "Design",
      description: "Intuitive mobile application design focusing on user-centered design principles."
    },
    {
      id: 3,
      title: "AI Chatbot",
      category: "Engineering",
      description: "Intelligent conversational AI system with natural language processing capabilities."
    },
    {
      id: 4,
      title: "Brand Identity",
      category: "Design",
      description: "Complete brand identity system including logo, typography, and visual guidelines."
    },
    {
      id: 5,
      title: "Photography Portfolio",
      category: "Passion",
      description: "Personal photography project showcasing landscape and portrait photography."
    },
    {
      id: 6,
      title: "Data Analytics Dashboard",
      category: "Engineering",
      description: "Real-time analytics dashboard with interactive visualizations and reporting tools."
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="px-20 pt-8 pb-16">
        {/* Page Title */}
        <section className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none">
            Projects
          </h1>
        </section>

        {/* Filter Section */}
        <section className="flex justify-end mb-12">
          <ProjectFilter 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectGridCard
              key={project.id}
              title={project.title}
              category={project.category}
              description={project.description}
            />
          ))}
        </section>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No projects found for the selected category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
