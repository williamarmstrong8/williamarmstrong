import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectCardProps {
  title: string;
  className?: string;
  size?: "small" | "medium" | "large";
  image?: string;
}

const ProjectCard = ({ title, className, size = "medium", image }: ProjectCardProps) => {
  const isMobile = useIsMobile();
  
  // Adjust animation values based on screen size
  const animationValues = isMobile 
    ? { width: "2000px", movement: "-1400px" }  // Mobile: smaller movement range
    : { width: "3000px", movement: "-2000px" }; // Desktop: larger movement range

  return (
    <div
      className={cn(
        "bg-project-card backdrop-blur-md border border-project-card-border rounded-3xl overflow-hidden transition-all duration-300 ease-out relative",
        "flex items-center justify-center",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
        className
      )}
    >
      {image && (
        <motion.div
          className="absolute h-[100%] left-1/2"
          style={{ width: animationValues.width, transform: 'translateX(-50%)' }}
          animate={{ 
            x: ["0px", animationValues.movement],
          }}
          transition={{
            duration: isMobile ? 50 : 60,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-contain object-center"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ProjectCard;