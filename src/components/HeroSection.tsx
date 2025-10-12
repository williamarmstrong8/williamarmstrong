import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AppIconCard from "./AppIconCard";
import FeaturedProjectsCard from "./FeaturedProjectsCard";
import PhotoGridCard from "./PhotoGridCard";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
    <main className={`min-h-screen ${isMobile ? 'px-4 pt-8 pb-16' : 'px-20 py-16'}`}>
      <motion.section 
        className={`text-center ${isMobile ? 'mb-12' : 'mb-12'}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className={`font-bold text-foreground leading-none ${
          isMobile 
            ? 'text-6xl' 
            : 'text-6xl md:text-8xl lg:text-9xl'
        }`}>
          Always Creating
        </h2>
      </motion.section>

      {isMobile ? (
        // Mobile Layout - Vertical Stack
        <motion.section 
          className="space-y-6 mb-0 flex flex-col items-center" 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Featured Projects */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <FeaturedProjectsCard />
          </motion.div>

          {/* App Icons and Photo Cards - Side by Side */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <motion.div 
              className="aspect-square w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <AppIconCard 
                className="w-full h-full"
                size="small"
              />
            </motion.div>

            <motion.div 
              className="aspect-square w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <PhotoGridCard 
                className="w-full h-full"
                size="small"
              />
            </motion.div>
          </div>
        </motion.section>
      ) : (
        // Desktop Layout - Original Grid
        <motion.section 
          className="grid gap-4 h-[550px] mb-0" 
          style={{gridTemplateColumns: "0.8fr auto 1.2fr"}}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div 
            className="h-full min-w-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <FeaturedProjectsCard />
          </motion.div>
          
          <div className="grid grid-rows-2 gap-4 h-full" style={{width: "275px"}}>
            <motion.div 
              className="aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <AppIconCard 
                className="w-full h-full"
                size="small"
              />
            </motion.div>
            <motion.div 
              className="aspect-square"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <PhotoGridCard 
                className="w-full h-full"
                size="small"
              />
            </motion.div>
          </div>
          
          <motion.div 
            className="h-full min-w-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <ProjectCard 
              title="Project Four" 
              className="w-full h-full"
              size="large"
              image="/transparent-ui-apps.png"
            />
          </motion.div>
        </motion.section>
      )}
    </main>
  );
};

export default HeroSection;