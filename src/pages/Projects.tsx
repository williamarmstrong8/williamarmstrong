import { useState } from "react";
import Navigation from "@/components/Navigation";
import ProjectGridCard from "@/components/ProjectGridCard";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectModal from "@/components/ProjectModal";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Project data based on actual folders in public/projects
  const projects = [
    {
      id: 1,
      title: "Architecture Design",
      category: "Design",
      description: "Architectural design project showcasing innovative building concepts and spatial planning.",
      longDescription: "A comprehensive architectural design project that explores innovative building concepts, spatial relationships, and sustainable design principles. The project demonstrates expertise in creating functional and aesthetically pleasing spaces that respond to user needs and environmental considerations.",
      images: [
        "/projects/architecture/SI1.jpg",
        "/projects/architecture/SI2.jpg",
        "/projects/architecture/SI3.jpg",
        "/projects/architecture/SI4.jpg",
        "/projects/architecture/SI5.jpg",
        "/projects/architecture/SI6.jpg"
      ],
      technologies: ["AutoCAD", "SketchUp", "Revit", "Adobe Creative Suite"],
      features: [
        "3D modeling and visualization",
        "Technical drawings and blueprints",
        "Sustainable design principles",
        "Space planning and optimization",
        "Material selection and specification",
        "Client presentation and documentation"
      ]
    },
    {
      id: 2,
      title: "Projector System",
      category: "Engineering",
      description: "Advanced projector system design with precision optics and mechanical engineering.",
      longDescription: "An advanced projector system project that combines precision optics, mechanical engineering, and electronic control systems. The project demonstrates expertise in creating high-performance projection solutions with innovative features and reliable operation.",
      images: [
        "/projects/projector/projector1.jpg",
        "/projects/projector/projector2.jpg",
        "/projects/projector/projector3.jpg",
        "/projects/projector/projector4.jpg",
        "/projects/projector/projector5.jpg",
        "/projects/projector/projector6.jpg",
        "/projects/projector/projector7.jpg",
        "/projects/projector/projector8.jpg",
        "/projects/projector/projector9.jpg",
        "/projects/projector/projector10.jpg",
        "/projects/projector/projector11.jpg"
      ],
      technologies: ["SolidWorks", "Optical Design Software", "Arduino", "3D Printing"],
      features: [
        "Precision optical system design",
        "Mechanical housing and mounting",
        "Electronic control systems",
        "Thermal management",
        "Prototype development and testing",
        "Performance optimization"
      ]
    },
    {
      id: 3,
      title: "Prosthetic Exoskeleton",
      category: "Engineering",
      description: "Innovative prosthetic exoskeleton design for enhanced mobility and functionality.",
      longDescription: "A groundbreaking prosthetic exoskeleton project that combines biomedical engineering, robotics, and human factors design. The project focuses on creating assistive technology that enhances mobility and independence for users with mobility challenges.",
      images: [
        "/projects/prosthetic-exo/prosthetic1.jpg",
        "/projects/prosthetic-exo/prosthetic1.1.jpg",
        "/projects/prosthetic-exo/prosthetic2.jpg",
        "/projects/prosthetic-exo/prosthetic3.jpg",
        "/projects/prosthetic-exo/prosthetic4.jpg"
      ],
      technologies: ["SolidWorks", "Arduino", "3D Printing", "Biomedical Sensors"],
      features: [
        "Biomechanical analysis and design",
        "Actuator and sensor integration",
        "User interface and control systems",
        "Ergonomic design optimization",
        "Prototype testing and validation",
        "Clinical trial preparation"
      ]
    },
    {
      id: 4,
      title: "PWS Refrigeration System",
      category: "Engineering",
      description: "Advanced refrigeration system design with energy efficiency and smart controls.",
      longDescription: "An advanced refrigeration system project that focuses on energy efficiency, smart control systems, and sustainable cooling solutions. The project demonstrates expertise in thermal engineering and modern refrigeration technology.",
      images: [
        "/projects/PWS-fridge/pws1.jpg",
        "/projects/PWS-fridge/pws2.jpg",
        "/projects/PWS-fridge/pws3.jpg",
        "/projects/PWS-fridge/pws4.jpg",
        "/projects/PWS-fridge/pws5.jpg",
        "/projects/PWS-fridge/pws6.jpg",
        "/projects/PWS-fridge/pws7.jpg"
      ],
      technologies: ["SolidWorks", "Thermal Analysis Software", "PLC Programming", "IoT Sensors"],
      features: [
        "Thermal system design and optimization",
        "Energy efficiency improvements",
        "Smart control and monitoring",
        "Component selection and integration",
        "Performance testing and validation",
        "Maintenance and serviceability"
      ]
    },
    {
      id: 5,
      title: "Skateboard Design",
      category: "Design",
      description: "Custom skateboard design project featuring innovative materials and ergonomic shapes.",
      longDescription: "A custom skateboard design project that explores innovative materials, ergonomic shapes, and performance optimization. The project demonstrates expertise in product design, material science, and user-centered design principles for sports equipment.",
      images: [
        "/projects/skateboard/skateboard1.jpg",
        "/projects/skateboard/skateboard2.jpg",
        "/projects/skateboard/skateboard3.jpg",
        "/projects/skateboard/skateboard4.jpg",
        "/projects/skateboard/skateboard5.jpg",
        "/projects/skateboard/skateboard6.jpg",
        "/projects/skateboard/skateboard7.jpg",
        "/projects/skateboard/skateboard8.jpg"
      ],
      technologies: ["SolidWorks", "Material Testing", "3D Printing", "CNC Machining"],
      features: [
        "Ergonomic design and user testing",
        "Material selection and testing",
        "Performance optimization",
        "Manufacturing process design",
        "Quality control and testing",
        "Brand and aesthetic development"
      ]
    },
    {
      id: 6,
      title: "Table Design",
      category: "Design",
      description: "Innovative table design project combining functionality with aesthetic appeal.",
      longDescription: "An innovative table design project that balances functionality, aesthetics, and manufacturing considerations. The project showcases expertise in furniture design, material selection, and creating pieces that enhance living and working spaces.",
      images: [
        "/projects/table/table1.jpg",
        "/projects/table/table2.jpg",
        "/projects/table/table3.jpg",
        "/projects/table/table4.jpg",
        "/projects/table/table5.jpg",
        "/projects/table/table6.jpg",
        "/projects/table/table7.JPG",
        "/projects/table/table8.JPG"
      ],
      technologies: ["SolidWorks", "Woodworking", "Metal Fabrication", "Finishing Techniques"],
      features: [
        "Functional design and space optimization",
        "Material selection and sourcing",
        "Manufacturing process development",
        "Assembly and finishing techniques",
        "Quality control and testing",
        "Documentation and specifications"
      ]
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = selectedProject 
    ? projects.find(project => project.id === selectedProject) 
    : null;

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
              onClick={() => handleProjectClick(project.id)}
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

      {/* Project Modal */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
        project={selectedProjectData}
      />
    </div>
  );
};

export default Projects;
