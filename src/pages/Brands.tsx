import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import BrandCard from "@/components/BrandCard";
import BrandModal from "@/components/BrandModal";

type Brand = {
  name: string;
  logo: string;
  description: string;
  category: string;
  status: "Active" | "Launched" | "In Beta";
  website?: string;
  founded?: string;
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  screenshots?: string[];
  metrics?: {
    users?: string;
    revenue?: string;
    growth?: string;
    partnerships?: string;
    customLabel1?: string;
    customLabel2?: string;
  };
  team?: string[];
  timeline?: {
    year: string;
    milestone: string;
  }[];
};

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  // Detailed brand information with comprehensive data for modals
  const brands: Brand[] = [
    {
      name: "Mod Brew",
      logo: "/modbrew_logo.svg",
      description: "A speakeasy-style coffee pop-up that disrupted campus coffee culture by offering premium quality coffee at student-friendly prices. ModBrew created an exclusive, in-the-know brand that became a campus phenomenon within a week.",
      category: "Coffee & Lifestyle",
      status: "Active" as const,
      website: "https://modbrew.vercel.app/",
      founded: "2025",
      longDescription: "ModBrew started as a college house coffee pop-up that identified a massive gap in the campus coffee market. While Starbucks charged students $8 per cup and was inconveniently located, I positioned my mod right on the main student walking path to campus. By offering premium quality coffee at just $4 per cup with an exclusive, speakeasy-style brand, ModBrew became a campus sensation within a week. We consistently sold out within an hour, generating $300-$400 per pop-up session. The brand's success came from creating an 'in-the-know' community feeling that made students feel special for discovering this hidden gem.",
      features: [
        "Strategic campus location on main student walking path",
        "Premium quality coffee at student-friendly $4 pricing",
        "Exclusive speakeasy-style branding and experience",
        "Rapid campus adoption and viral word-of-mouth marketing",
        "Consistent sell-out within 1 hour of opening",
        "Analytics tracking website and member rewards program"
      ],
      technologies: ["React", "Next.js", "Analytics Dashboard", "Payment Processing", "Brand Design", "Social Media Marketing"],
      screenshots: [
        "/brands/modbrew/wide.jpeg",
        "/brands/modbrew/group.jpeg",
        "/brands/modbrew/hand.jpeg",
        "/brands/modbrew/mary.jpeg",
        "/brands/modbrew/rain.jpeg",
        "/brands/modbrew/shop.jpeg",
        "/brands/modbrew/window.jpeg"
      ],
      metrics: {
        users: "1000+",
        revenue: "$300-400",
        customLabel1: "Customers",
        customLabel2: "Per Pop-up",
        growth: "Viral Growth",
        partnerships: "Campus Community"
      },
      team: ["Founder & CEO", "Brand Designer", "Operations Manager", "Community Manager"],
      timeline: [
        { year: "2025", milestone: "Identified campus coffee market gap" },
        { year: "2025", milestone: "Launched speakeasy-style pop-up" },
        { year: "2025", milestone: "Achieved viral campus adoption within a week" },
        { year: "2025", milestone: "Consistent $300-400 revenue per pop-up session" }
      ]
    },
    {
      name: "ClubPack",
      logo: "/clubpack_logo.svg",
      description: "A SaaS platform that solves the fragmented software problem for social club founders. ClubPack centralizes everything needed to run a club - from event creation and RSVP management to custom websites and analytics - all in one place.",
      category: "Sports & Community",
      status: "In Beta" as const,
      website: "https://www.joinclubpack.com/",
      founded: "2025",
      longDescription: "ClubPack was born from personal experience founding a run club and struggling with scattered, disconnected software tools. After experiencing the frustration of managing events, RSVPs, websites, and analytics across multiple platforms, I built ClubPack to centralize everything social club founders need. Within minutes, clubs can launch a custom branded website and publish their club's presence online. Partnering with a co-founder, we've automated outreach to college clubs nationwide and now have 25+ clubs actively trialing the platform. Built with my low-code experience and AI assistance, ClubPack is making it easier than ever to start and manage social clubs.",
      features: [
        "Custom branded website generation in minutes",
        "Centralized event creation and RSVP management",
        "Admin dashboard with comprehensive analytics",
        "Automated outreach to college clubs nationwide",
        "Built with low-code experience and AI assistance",
        "All-in-one solution replacing multiple scattered tools"
      ],
      technologies: ["React", "Node.js", "AI-Assisted Development", "Automated Outreach", "Analytics Dashboard", "Web Development"],
      screenshots: [
        "/brands/clubpack/screenshot.png",
        "/brands/clubpack/screenshot2.png",
        "/brands/clubpack/Untitled design (2).jpg"
      ],
      metrics: {
        users: "25+",
        revenue: "Seeking Funding",
        customLabel1: "Clubs Trialing",
        customLabel2: "Funding Stage",
        growth: "Rapid Expansion",
        partnerships: "College Clubs"
      },
      team: ["Founder & CEO", "Co-Founder", "Product Development", "Growth & Outreach"],
      timeline: [
        { year: "2025", milestone: "Founded run club and identified software fragmentation problem" },
        { year: "2025", milestone: "Built ClubPack platform using low-code experience and AI assistance" },
        { year: "2025", milestone: "Partnered with co-founder and automated college outreach" },
        { year: "2025", milestone: "25+ clubs actively trialing platform, seeking funding for scale" }
      ]
    },
    {
      name: "Happy Mile Run Club",
      logo: "/happymile_logo.svg",
      description: "A viral San Francisco run club that filled the gap for free, fun, young, and social running communities. HappyMile leveraged social media to create partnerships with local businesses, offering free benefits to members while building a thriving community.",
      category: "Health & Wellness",
      status: "Launched" as const,
      website: "https://www.happymilerc.com/",
      founded: "2024",
      longDescription: "Happy Mile Run Club was founded to address the lack of free, fun, young, and social running communities in San Francisco. By leveraging social media marketing and strategic partnerships, we created a viral movement that grew to 100+ weekly runners and 3,000 followers within just 2 months. We partnered with coffee shops, restaurants, and venues across San Francisco to provide free benefits to our members, including coffee, food, snacks, and merchandise. The club's rapid growth and strong community engagement led to a major Nike partnership, showcasing the power of authentic community building and strategic social media presence.",
      features: [
        "Free weekly running events for young professionals",
        "Strategic partnerships with SF coffee shops and restaurants",
        "Viral social media marketing and community building",
        "Free member benefits including coffee, food, and merchandise",
        "Public speaking and community organization leadership",
        "Major brand partnerships including Nike collaboration"
      ],
      technologies: ["Social Media Marketing", "Partnership Development", "Community Management", "Public Speaking", "Event Organization", "Brand Collaboration"],
      screenshots: [
        "/brands/happy-mile/me.jpeg",
        "/brands/happy-mile/group.jpeg",
        "/brands/happy-mile/2BC3E075-F7BF-4177-A916-514E63D772A6_1_102_o.jpeg",
        "/brands/happy-mile/377E84DF-2DDD-452B-A172-01A9526C0464_1_105_c.jpeg",
        "/brands/happy-mile/4955AFAD-0835-4876-8128-69B30476917F_1_105_c.jpeg",
        "/brands/happy-mile/BBBEA98B-2B81-4ED6-AADF-838089EBF357_1_102_o.jpeg",
        "/brands/happy-mile/D8C6C408-A979-433B-A6E1-936C4280BBBF_1_102_o.jpeg"
      ],
      metrics: {
        users: "100+",
        revenue: "Nike Partnership",
        customLabel1: "Weekly Runners",
        customLabel2: "Major Achievement",
        growth: "Viral Growth",
        partnerships: "Nike Partnership"
      },
      team: ["Founder & CEO", "Co-Founder", "Social Media Manager", "Partnership Coordinator"],
      timeline: [
        { year: "2024", milestone: "Founded run club to address SF community gap" },
        { year: "2024", milestone: "Went viral on social media within 2 months" },
        { year: "2024", milestone: "Grew to 100+ weekly runners and 3,000 followers" },
        { year: "2024", milestone: "Landed major Nike partnership" }
      ]
    },
    {
      name: "Destination Drifters",
      logo: "/drifters_logo.svg",
      description: "An outdoor travel brand I created freshman year of college to inspire people and share my love for the outdoors. I saw a lack of outdoor inspiration in my first year and built this social media and merchandise brand that became a recognizable staple on campus.",
      category: "Travel & Adventure",
      status: "Launched" as const,
      website: "https://www.destinationdrifters.com/",
      founded: "2021",
      longDescription: "Destination Drifters was born from my freshman year realization that there was a lack of outdoor inspiration and community at college. I created this brand to inspire people and share my love for the outdoors, growing it throughout my college years into a thriving social media and merchandise business. The brand generated $3,500 in revenue and gained hundreds of thousands of views on my blog and social media content. It became such a recognizable staple of clothing on my college campus that people would stop me to ask about the brand. I even partnered with my local study abroad program, writing blogs and creating content for them, and connected with various Airbnbs and hostels across the globe for free accommodation opportunities.",
      features: [
        "Social media brand building and content creation",
        "Merchandise design and sales ($3,500 revenue)",
        "Blog writing with hundreds of thousands of views",
        "Study abroad program partnership and content creation",
        "Global accommodation partnerships with Airbnbs and hostels",
        "Campus recognition as a staple clothing brand"
      ],
      technologies: ["Social Media Marketing", "Content Creation", "Blog Writing", "Merchandise Design", "Partnership Development", "Brand Building"],
      screenshots: [
        "/brands/drifters/experiences.jpg",
        "/brands/drifters/planning.jpg",
        "/brands/drifters/community.jpg"
      ],
      metrics: {
        users: "250k+",
        revenue: "$3,500",
        customLabel1: "Engagement",
        customLabel2: "Total Revenue",
        growth: "Campus Recognition",
        partnerships: "Study Abroad + Accommodations"
      },
      team: ["Founder & CEO"],
      timeline: [
        { year: "2021", milestone: "Founded as freshman year outdoor inspiration brand" },
        { year: "2022", milestone: "Grew social media presence and merchandise sales" },
        { year: "2024", milestone: "Established global accommodation partnerships and campus recognition" },
        { year: "2025", milestone: "Partnered with study abroad program for content creation" }
      ]
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
                metrics={brand.metrics}
                onClick={() => setSelectedBrand(index)}
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

      {/* Brand Modal */}
      <BrandModal
        isOpen={selectedBrand !== null}
        onClose={() => setSelectedBrand(null)}
        brand={selectedBrand !== null ? brands[selectedBrand] : null}
      />
    </div>
  );
};

export default Brands;
