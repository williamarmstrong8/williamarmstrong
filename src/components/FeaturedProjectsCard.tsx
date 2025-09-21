import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const FeaturedProjectsCard = () => {
  const projects = [
    {
      title: "Architecture Project",
      category: "Design",
      image: "/projects/architecture/SI1.jpg"
    },
    {
      title: "Conveyor System",
      category: "Engineering", 
      image: "/projects/conveyor/conveyer1.jpg"
    },
    {
      title: "Projector System",
      category: "Technology",
      image: "/projects/projector/projector1.jpg"
    },
    {
      title: "Prosthetic Exoskeleton",
      category: "Biomedical",
      image: "/projects/prosthetic-exo/prosthetic1.jpg"
    },
    {
      title: "PWS Refrigeration",
      category: "Engineering",
      image: "/projects/PWS-fridge/pws1.jpg"
    },
    {
      title: "Custom Skateboard",
      category: "Design",
      image: "/projects/skateboard/skateboard1.jpg"
    },
    {
      title: "Modern Table Design",
      category: "Furniture",
      image: "/projects/table/table1.jpg"
    }
  ];

  return (
    <motion.div
      className={cn(
        "bg-project-card backdrop-blur-md border border-project-card-border rounded-3xl p-6 transition-all duration-300 ease-out hover:bg-project-card-hover hover:scale-[1.02] hover:shadow-lg cursor-pointer group",
        "flex flex-col justify-between h-full",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Featured Projects</h3>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <div className="space-y-1.5">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2 p-1.5 rounded-lg bg-background/20 hover:bg-background/40 transition-all duration-300 group/item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.2 + (index * 0.05)
              }}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
            >
              {/* Project Image */}
              <div className="w-10 h-10 rounded-md overflow-hidden bg-background/30 flex-shrink-0">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                />
              </div>
              
              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {project.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {project.category}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                <svg 
                  width="10" 
                  height="10" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-muted-foreground"
                >
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        className="mt-2 pt-2 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
      >
        <p className="text-xs text-muted-foreground text-center">
          View all projects →
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedProjectsCard;
