import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AppIconCard from "./AppIconCard";
import FeaturedProjectsCard from "./FeaturedProjectsCard";

const HeroSection = () => {
  return (
    <main className="min-h-screen px-20 pt-8 pb-0">
      <motion.section 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none">
          Always Creating
        </h2>
      </motion.section>

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
            <ProjectCard 
              title="Project Three" 
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
            image="/ui-apps.jpg"
          />
        </motion.div>
      </motion.section>
    </main>
  );
};

export default HeroSection;