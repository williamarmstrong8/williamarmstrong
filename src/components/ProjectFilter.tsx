import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

const ProjectFilter = ({ activeFilter, onFilterChange, className }: ProjectFilterProps) => {
  const filters = ["All", "Engineering", "Design", "Passion"];

  return (
    <div className={cn("flex items-center", className)}>
      <div className="bg-muted/30 backdrop-blur-md border border-border rounded-full px-2 py-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-out",
              "hover:bg-background/50",
              activeFilter === filter
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter;
