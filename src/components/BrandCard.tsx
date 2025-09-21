import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface BrandCardProps {
  name: string;
  logo: string;
  description: string;
  category: string;
  status: "Active" | "Launched" | "In Beta";
  website?: string;
  founded?: string;
  className?: string;
  onClick?: () => void;
      metrics?: {
        users?: string;
        revenue?: string;
        growth?: string;
        partnerships?: string;
        customLabel1?: string;
        customLabel2?: string;
      };
}

const BrandCard = ({ 
  name, 
  logo, 
  description, 
  category, 
  status, 
  website, 
  founded,
  className,
  onClick,
  metrics
}: BrandCardProps) => {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-500";
      case "Launched":
        return "text-blue-500";
      case "In Beta":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card backdrop-blur-md border border-border rounded-3xl p-6 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg cursor-pointer group",
        "flex flex-col justify-between h-full min-h-[320px]",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
        className
      )}
    >
      {/* Header with logo and status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-12 h-12 object-contain"
            style={{ 
              filter: name === 'Happy Mile Run Club' || name === 'ClubPack'
                ? 'none' // Keep original colors for HappyMile and ClubPack
                : name === 'Mod Brew' || name === 'Destination Drifters'
                  ? theme === 'dark' 
                    ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // White in dark mode
                    : 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)' // Black in light mode
                  : theme === 'dark' 
                    ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' 
                    : 'brightness(0) saturate(100%) invert(55%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            }}
          />
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {category}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className={cn("text-xs font-medium px-2 py-1 rounded-full", getStatusColor(status))}>
            {status}
          </span>
          {founded && (
            <span className="text-xs text-muted-foreground px-2">
              Founded {founded}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 mb-4">
        <p className="text-muted-foreground leading-relaxed text-base">
          {description}
        </p>
      </div>

      {/* Metrics */}
      {metrics && (
        <div className="mb-4">
          <div className="flex gap-3">
            {metrics.users && (
              <div className="flex-1 bg-muted/50 dark:bg-muted/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-foreground">{metrics.users}</div>
                <div className="text-xs text-muted-foreground">{metrics.customLabel1 || "Users"}</div>
              </div>
            )}
            {metrics.revenue && (
              <div className="flex-1 bg-muted/50 dark:bg-muted/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-foreground">{metrics.revenue}</div>
                <div className="text-xs text-muted-foreground">{metrics.customLabel2 || (metrics.revenue.includes('$') ? "Revenue" : "Status")}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer with website link */}
      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          {website ? (
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center space-x-2"
            >
              <span>Visit Website</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">Coming Soon</span>
          )}
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <svg 
              className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" 
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

export default BrandCard;
