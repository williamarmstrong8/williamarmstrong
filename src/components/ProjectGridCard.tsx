import { cn } from "@/lib/utils";

interface ProjectGridCardProps {
  title: string;
  category?: string;
  description?: string;
  className?: string;
  onClick?: () => void;
}

const ProjectGridCard = ({ 
  title, 
  category = "Project", 
  description = "Project description coming soon...",
  className,
  onClick
}: ProjectGridCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card backdrop-blur-md border border-border rounded-2xl p-6 transition-all duration-300 ease-out hover:bg-accent/5 hover:scale-[1.02] hover:shadow-lg cursor-pointer group",
        "flex flex-col justify-between h-full min-h-[200px]",
        "shadow-[0_2px_8px_hsl(222_47%_11%_/_0.06)]",
        className
      )}
    >
      <div className="flex-1">
        <div className="mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">View Project</span>
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <svg 
              className="w-3 h-3 text-primary group-hover:translate-x-0.5 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGridCard;
