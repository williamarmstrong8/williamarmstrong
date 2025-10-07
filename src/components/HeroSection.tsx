import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AppIconCard from "./AppIconCard";
import FeaturedProjectsCard from "./FeaturedProjectsCard";
import PhotoGridCard from "./PhotoGridCard";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
    <main className={`min-h-screen ${isMobile ? 'px-4 pt-4 pb-0' : 'px-20 pt-8 pb-0'}`}>
      <motion.section 
        className={`text-center ${isMobile ? 'mb-8' : 'mb-12'}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className={`font-bold text-foreground leading-none ${
          isMobile 
            ? 'text-4xl' 
            : 'text-6xl md:text-8xl lg:text-9xl'
        }`}>
          Always Creating
        </h2>
      </motion.section>

      {isMobile ? (
        // Mobile Layout - Vertical Stack
        <motion.section 
          className="space-y-6 mb-0" 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Hero Card Layout - 2x2 Grid */}
          <motion.div 
            className="bg-card border border-border rounded-lg p-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-3 h-[200px]">
              <motion.div 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
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
                className="bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                <PhotoGridCard 
                  className="w-full h-full"
                  size="small"
                />
              </motion.div>
              <motion.div 
                className="bg-white rounded-lg shadow-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                <div className="text-2xl font-bold text-black">MB</div>
              </motion.div>
              <motion.div 
                className="bg-white rounded-lg shadow-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              >
                <div className="text-2xl">😊</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Cards - Remove fixed heights */}
          <motion.div 
            className="min-h-[300px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <FeaturedProjectsCard />
          </motion.div>
          
          <motion.div 
            className="h-[250px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <ProjectCard 
              title="Project Four" 
              className="w-full h-full"
              size="large"
              image="/transparent-ui-apps.png"
            />
          </motion.div>
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