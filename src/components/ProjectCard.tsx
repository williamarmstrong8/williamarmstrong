import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  className?: string;
  size?: "small" | "medium" | "large";
  image?: string;
}

const ProjectCard = ({ title, className, size = "medium", image }: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "bg-project-card backdrop-blur-md border border-project-card-border rounded-3xl overflow-hidden transition-all duration-300 ease-out relative",
        "flex items-center justify-start",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
        className
      )}
    >
      {image && (
        <motion.div
          className="absolute left-0 h-[100%] w-[3000px]"
          animate={{ 
            x: ["0px", "-1700px"],
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-contain object-left"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ProjectCard;