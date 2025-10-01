import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AppIconCardProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const AppIconCard = ({ className, size = "medium" }: AppIconCardProps) => {
  const brandLogos = [
    { name: "ModBrew", logo: "/modbrew_logo.svg", color: "orange-500" },
    { name: "Destination Drifters", logo: "/drifters_logo.svg", color: "blue-500" },
    { name: "ClubPack", logo: "/clubpack_logo.svg", color: "green-500" },
    { name: "Happy Mile", logo: "/happymile_logo.svg", color: "purple-500" }
  ];

  return (
    <Link to="/brands">
      <motion.div
        className={cn(
          "bg-project-card backdrop-blur-md border border-project-card-border rounded-3xl p-6 transition-all duration-500 ease-out cursor-pointer relative overflow-hidden",
          "flex flex-col items-center justify-center",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
          className
        )}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.7, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gray-100/5 opacity-50" />
        
        {/* Modern glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* App Icons Grid - Modern Design */}
      <div className={cn(
        "grid w-full h-full gap-3 relative z-10",
        size === "large" ? "grid-cols-2" : "grid-cols-2"
      )}>
        {brandLogos.map((brand, index) => (
          <motion.div
            key={brand.name}
            className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-gray-300 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2 + (index * 0.1),
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.05,
              y: -3
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-50/30 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
            
            {/* Icon content */}
            <div className="relative w-full h-full flex items-center justify-center p-3">
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`}
                className="w-full h-full object-contain transition-all duration-300 filter drop-shadow-sm group-hover/icon:drop-shadow-lg group-hover/icon:scale-110"
              />
            </div>

            {/* Modern border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Simple title that appears on hover */}
      <motion.div 
        className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
      >
        <div className="text-center">
          <h3 className="text-sm font-medium text-foreground">My Apps</h3>
        </div>
      </motion.div>
      </motion.div>
    </Link>
  );
};

export default AppIconCard;
