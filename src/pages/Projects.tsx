import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import ProjectGridCard from "@/components/ProjectGridCard";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectModal from "@/components/ProjectModal";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Project data based on actual folders in public/projects - ordered by most recent date
  const projects = [
    {
      id: 1,
      title: "PWS Refrigeration System",
      category: "Engineering",
      date: "September 2024",
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
      id: 2,
      title: "Waste Management and Sorting System",
      category: "Engineering",
      date: "March 2022",
      description: "Conveyor system prototype designed to improve cafeteria traffic and reduce food waste through automated sorting.",
      longDescription: "Faced with the chaos of long cafeteria lines and the sheer amount of food that ended up in the trash, our team dove headfirst into a one-week project to create a functional food sorting system prototype for our school. We had a dual mission: improve cafeteria traffic and slash food waste. In addition, we had to get ready to pitch our idea to potential investors who would assess not just our prototype, but also our presentation and marketing skills.",
      images: [
        "/projects/conveyor/conveyer1.jpg"
      ],
      videos: [
        "/projects/conveyor/IMG_4890.MOV",
        "/projects/conveyor/IMG_4885.MOV"
      ],
      technologies: ["Conveyor Systems", "Automation", "Prototyping", "Systems Engineering"],
      features: [
        "Automated food sorting mechanism",
        "Cafeteria traffic optimization",
        "Food waste reduction system",
        "Rapid prototyping and testing",
        "Investor presentation preparation",
        "Marketing and pitch development"
      ]
    },
    {
      id: 3,
      title: "Architecture Design",
      category: "Design",
      date: "June 2021",
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
      ],
      link: "https://www.cavagnero.com/project/st-ignatius/#project-type=featured"
    },
    {
      id: 4,
      title: "Prosthetic Exoskeleton",
      category: "Engineering",
      date: "June 2021",
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
      id: 5,
      title: "Table Design",
      category: "Design",
      date: "November 2020",
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
    },
    {
      id: 6,
      title: "Skateboard Design",
      category: "Design",
      date: "July 2020",
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
      id: 7,
      title: "Projector System",
      category: "Engineering",
      date: "April 2020",
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
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1
          }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
          >
            Projects
          </motion.h1>
        </motion.section>

        {/* Filter Section */}
        <section className="flex justify-end mb-12">
          <ProjectFilter 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </section>

        {/* Projects Grid */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -20, 
                  scale: 0.9,
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <ProjectGridCard
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  date={project.date}
                  image={project.id === 7 ? project.images[project.images.length - 1] : project.id === 3 ? project.images[4] : project.id === 6 ? project.images[6] : project.images[0]}
                  onClick={() => handleProjectClick(project.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-muted-foreground text-lg">
                No projects found for the selected category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
