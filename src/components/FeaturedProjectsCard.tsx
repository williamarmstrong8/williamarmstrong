import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FeaturedProjectsCard = () => {
  const navigate = useNavigate();
  const projects = [
    {
      title: "Proof - Social Health Tracker",
      category: "UI/UX",
      image: "/projects/proof/Untitled design.jpg"
    },
    {
      title: "Happy Mile - Run Club App",
      category: "UI/UX",
      image: "/projects/happy mile/Untitled design (1).jpg"
    },
    {
      title: "Architecture Project",
      category: "UI/UX",
      image: "/projects/architecture/SI1.jpg"
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
      title: "Sustainable Upcycled Tables",
      category: "Passion",
      image: "/projects/table/table1.jpg"
    }
  ];

  return (
    <motion.div
      className={cn(
        "bg-project-card backdrop-blur-md border border-project-card-border rounded-3xl px-6 pt-6 pb-3 transition-all duration-300 ease-out hover:bg-project-card-hover hover:scale-[1.02] hover:shadow-lg cursor-pointer group",
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
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pb-0">
        <div className="space-y-1.5">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => navigate('/projects')}
              className={cn(
                "flex items-center space-x-3 py-2.5 px-3 rounded-xl bg-card/60 backdrop-blur-sm border border-border/40 transition-all duration-300 cursor-pointer",
                index === projects.length - 1 && "mb-0"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.2 + (index * 0.05)
              }}
            >
              {/* Project Image */}
              <div className="w-20 h-12 rounded-md overflow-hidden bg-background/30 flex-shrink-0">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Project Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-foreground truncate">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {project.category}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        className="mt-1 pt-1.5 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
