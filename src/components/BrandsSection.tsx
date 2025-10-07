import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const BrandsSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  // Placeholder brand data - you can replace these with actual brand information
  const brands = [
    { name: "ModBrew", logo: "/modbrew.svg" },
    { name: "Drifters", logo: "/drifters.svg" },
    { name: "ClubPack", logo: "/clubpack.svg" },
    { name: "HappyMile", logo: "/happymile.svg" },
  ];

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section ref={ref} className={`py-16 ${isMobile ? 'px-4' : 'px-20'}`}>
      <motion.div 
        className={`${isMobile ? 'text-center' : 'text-left'} ${isMobile ? 'mb-8' : 'mb-16'}`}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className={`font-bold text-foreground mb-4 ${
          isMobile ? 'text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'
        }`}>
          My Brands
        </h2>
      </motion.div>

      {isMobile ? (
        // Mobile: Infinite scrolling carousel
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-12 items-center"
            animate={{ 
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <img
                key={index}
                src={brand.logo}
                alt={`${brand.name} logo`}
                onClick={() => navigate('/brands')}
                className="h-14 w-auto object-contain cursor-pointer flex-shrink-0"
                style={{ 
                  filter: theme === 'dark' 
                    ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' 
                    : 'brightness(0) saturate(100%) invert(55%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                }}
              />
            ))}
          </motion.div>
        </div>
      ) : (
        // Desktop: Original grid layout
        <div className="flex justify-center items-center gap-24">
          {brands.map((brand, index) => (
            <motion.img
              key={index}
              src={brand.logo}
              alt={`${brand.name} logo`}
              onClick={() => navigate('/brands')}
              className="w-auto h-16 object-contain cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.1,
                opacity: 0.8,
                transition: { duration: 0.3 }
              }}
              style={{ 
                filter: theme === 'dark' 
                  ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' 
                  : 'brightness(0) saturate(100%) invert(55%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BrandsSection;
