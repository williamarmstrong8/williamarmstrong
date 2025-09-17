import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  className?: string;
  size?: "small" | "medium" | "large";
}

const ProjectCard = ({ title, className, size = "medium" }: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "bg-project-card rounded-3xl p-6 transition-all duration-300 ease-out hover:bg-project-card-hover hover:scale-[1.02] hover:shadow-lg cursor-pointer group",
        "flex items-end justify-start",
        className
      )}
    >
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className={cn(
          "font-semibold text-foreground",
          size === "large" ? "text-xl" : "text-lg"
        )}>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCard;