import { cn } from "@/lib/utils";

interface AboutCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const AboutCard = ({ 
  title, 
  description, 
  icon, 
  className 
}: AboutCardProps) => {
  return (
    <div
      className={cn(
        "bg-card backdrop-blur-md border border-border rounded-3xl p-8 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg",
        "flex flex-col items-center text-center",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
        className
      )}
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <div className="w-8 h-8 text-primary">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-foreground mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default AboutCard;
