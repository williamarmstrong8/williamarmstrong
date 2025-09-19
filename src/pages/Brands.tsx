import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import BrandCard from "@/components/BrandCard";

const Brands = () => {
  // Detailed brand information - you can customize these with actual details
  const brands = [
    {
      name: "Mod Brew",
      logo: "/modbrew_logo.svg",
      description: "A premium coffee subscription service that delivers freshly roasted, artisanal coffee beans directly to your door. ModBrew focuses on sustainable sourcing and supports small-batch roasters from around the world.",
      category: "Coffee & Lifestyle",
      status: "Active" as const,
      website: "https://modbrew.vercel.app/",
      founded: "2023"
    },
    {
      name: "Destination Drifters",
      logo: "/drifters_logo.svg",
      description: "An adventure travel platform that connects outdoor enthusiasts with unique experiences and gear. Drifters curates off-the-beaten-path destinations and provides expert guidance for unforgettable adventures.",
      category: "Travel & Adventure",
      status: "Launched" as const,
      website: "https://www.destinationdrifters.com/",
      founded: "2022"
    },
    {
      name: "ClubPack",
      logo: "/clubpack_logo.svg",
      description: "A comprehensive club management platform designed for sports teams, fitness clubs, and community organizations. ClubPack streamlines membership management, event coordination, and communication.",
      category: "Sports & Community",
      status: "Active" as const,
      website: "https://www.joinclubpack.com/",
      founded: "2023"
    },
    {
      name: "Happy Mile Run Club",
      logo: "/happymile_logo.svg",
      description: "A wellness and fitness tracking app that gamifies healthy living through community challenges and personalized goals. HappyMile makes staying active fun and social with friends and family.",
      category: "Health & Wellness",
      status: "In Development" as const,
      website: "https://www.happymilerc.com/",
      founded: "2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="px-20 pt-8 pb-16">
        {/* Page Title */}
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1
          }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
          >
            My Brands
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4
            }}
          >
            Four innovative ventures I've founded and built, each solving unique problems in their respective industries.
          </motion.p>
        </motion.section>

        {/* Brands Grid */}
        <motion.section 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.3,
            delay: 0.6
          }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.7 + (index * 0.15),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <BrandCard
                name={brand.name}
                logo={brand.logo}
                description={brand.description}
                category={brand.category}
                status={brand.status}
                website={brand.website}
                founded={brand.founded}
              />
            </motion.div>
          ))}
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 1.2
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "4", label: "Brands Founded" },
              { number: "2", label: "Active Ventures" },
              { number: "3", label: "Years Experience" },
              { number: "1", label: "In Development" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.3 + (index * 0.1),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="text-4xl font-bold text-foreground mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.4 + (index * 0.1),
                    ease: [0.68, -0.55, 0.265, 1.55]
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 1.8
          }}
        >
          <motion.div 
            className="bg-card backdrop-blur-md border border-border rounded-3xl p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.9
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.h2 
              className="text-3xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 2.0
              }}
            >
              Interested in Collaborating?
            </motion.h2>
            <motion.p 
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 2.1
              }}
            >
              I'm always open to discussing new opportunities, partnerships, or investment in innovative ventures. Let's build something amazing together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 2.2
              }}
            >
              <Link to="/contact">
                <motion.button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                >
                  Get In Touch
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default Brands;
