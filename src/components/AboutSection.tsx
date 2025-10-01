import { useTheme } from "@/contexts/ThemeContext";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const AboutSection = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Creative engineer passionate about bringing innovative ideas to life through design, technology, and storytelling.";
  
  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30); // Speed of typewriter effect
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 px-20 bg-background">
      <div className="w-full">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            About Me
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl">
              <img
                src="/william-1.JPG"
                alt="William Armstrong - Creative Professional"
                className="w-full h-[500px] object-cover transition-all duration-700 group-hover:scale-[1.01]"
                style={{ objectPosition: "center 15%" }}
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              {/* Grain texture overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay'
                }}
              />
              {/* Subtle border glow */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-3xl transition-all duration-500" />
            </div>
            
            {/* Text under image */}
            <motion.div 
              className="mt-8 space-y-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold text-foreground">
                William Armstrong
              </h3>
              <p className="text-muted-foreground leading-relaxed min-h-[4rem]">
                {displayedText}
                <span className="inline-block w-0.5 h-5 bg-foreground ml-1 animate-pulse" style={{ display: displayedText === fullText ? 'none' : 'inline-block' }} />
              </p>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Main Description */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-bold text-foreground">
                Engineer. Designer. Entrepreneur.
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a creative professional who thrives on turning complex ideas into elegant, user-centered solutions. 
                With a passion for both design and technology, I bring a unique perspective to every project, 
                ensuring that form and function work in perfect harmony.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey spans across multiple disciplines, from brand development to digital innovation, 
                always with the goal of creating meaningful connections between brands and their audiences.
              </p>
            </motion.div>


            {/* Additional Content */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              <h4 className="text-xl font-semibold text-foreground">
                What Drives Me
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Every project is an opportunity to push boundaries, learn something new, and create something extraordinary. 
                I'm passionate about staying at the forefront of design trends while maintaining timeless principles that ensure lasting impact.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Human-Centered Engineering",
                  "Venture Building",
                  "UI/UX Design",
                  "Product Development",
                ].map((label, index) => (
                  <motion.span
                    key={label}
                    className="relative group px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium overflow-hidden border border-primary/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                  >
                    <span className="relative z-10">{label}</span>
                    {/* Metallic gleam */}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Collaboration CTA */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-card border border-border rounded-2xl shadow-lg">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="text-foreground font-medium">
                  Always excited to collaborate on new projects
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
