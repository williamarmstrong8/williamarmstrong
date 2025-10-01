import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface PhotoGridCardProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const PhotoGridCard = ({ className, size = "medium" }: PhotoGridCardProps) => {
  const navigate = useNavigate();
  const photos = [
    { 
      src: "/photography/landscape/thumbnails/image1.jpg", 
      alt: "Landscape Photography",
      title: "Landscape"
    },
    { 
      src: "/photography/landscape/thumbnails/image4.jpg", 
      alt: "Landscape Photography",
      title: "Landscape"
    },
    { 
      src: "/photography/landscape/thumbnails/image6.jpg", 
      alt: "Landscape Photography",
      title: "Landscape"
    },
    { 
      src: "/photography/landscape/thumbnails/image13.jpg", 
      alt: "Landscape Photography",
      title: "Landscape"
    }
  ];

  return (
    <motion.div
      className={cn(
        "bg-project-card backdrop-blur-md border border-project-card-border rounded-3xl p-6 transition-all duration-500 ease-out relative overflow-hidden",
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
      
      
      {/* Photos Grid - Seamless Design */}
      <div className={cn(
        "grid w-full h-full gap-1 relative z-10 overflow-hidden rounded-2xl",
        size === "large" ? "grid-cols-2" : "grid-cols-2"
      )}>
        {photos.map((photo, index) => (
           <motion.div
             key={photo.alt}
             className="relative overflow-hidden cursor-pointer group/photo"
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ 
               duration: 0.6,
               delay: 0.2 + (index * 0.1),
               ease: [0.25, 0.46, 0.45, 0.94]
             }}
             whileHover={{ 
               scale: 1.02
             }}
             transition={{ duration: 0.3 }}
             onClick={() => navigate('/photography')}
           >
            {/* Photo content */}
            <div className="relative w-full h-full overflow-hidden">
              <img 
                src={photo.src} 
                alt={photo.alt}
                className="w-full h-full object-cover transition-all duration-300 group-hover/photo:scale-105"
              />
            </div>

            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-gray-100/20 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 z-10" />
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};

export default PhotoGridCard;
