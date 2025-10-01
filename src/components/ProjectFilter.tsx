import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

const ProjectFilter = ({ activeFilter, onFilterChange, className }: ProjectFilterProps) => {
  const filters = ["All", "Engineering", "UI/UX", "Passion"];

  return (
    <div className={cn("flex items-center", className)}>
      <motion.div 
        className="bg-muted/30 backdrop-blur-md border border-border rounded-full px-2 py-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {filters.map((filter, index) => (
          <motion.button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-out relative",
              "hover:bg-background/50",
              activeFilter === filter
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeFilter === filter && (
              <motion.div
                className="absolute inset-0 bg-background shadow-sm rounded-full"
                layoutId="activeFilter"
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}
            <span className="relative z-10">{filter}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectFilter;
