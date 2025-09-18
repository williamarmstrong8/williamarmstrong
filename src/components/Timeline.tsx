import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  subtitle?: string;
  date: string;
  description: string;
}

interface TimelineProps {
  title: string;
  icon: React.ReactNode;
  items: TimelineItem[];
  className?: string;
}

const Timeline = ({ title, icon, items, className }: TimelineProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Section Header */}
      <div className="flex items-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mr-6">
          <div className="w-8 h-8 text-primary">
            {icon}
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
          {title}
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
        
        {/* Timeline Items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline Dot */}
              <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>
              
              {/* Content */}
              <div className="ml-16 bg-card backdrop-blur-md border border-border rounded-2xl p-6 w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-primary font-medium">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="text-primary font-medium text-sm md:text-base mt-2 md:mt-0">
                    {item.date}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
