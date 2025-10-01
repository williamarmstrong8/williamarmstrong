import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import AboutCard from "@/components/AboutCard";
import Timeline from "@/components/Timeline";

const About = () => {
  // About cards data
  const aboutCards = [
    {
      title: "Engineer",
      description: "Building innovative solutions with modern technology. Passionate about creating user-centered experiences that solve real-world problems.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Entrepreneur",
      description: "Founded multiple ventures across different industries. Focused on sustainable business models and community impact.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Leader",
      description: "Experienced in team management and strategic planning. Committed to developing others and driving organizational success.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  // Education timeline data
  const educationItems = [
    {
      title: "Boston College",
      subtitle: "Bachelor of Science in Human-Centered Engineering, Minor in General Business",
      date: "August 2022 — May 2026",
      description: "Relevant courses include Machine Learning & Statistical Data Analysis, Computation and Programming, Circuits, Physical Modeling and Lab Analysis, Statics and Mechanics, Marketing, Engineering for Society, and Thermodynamics. Emphasizing Jesuit education blending rigorous academics with social responsibility and community impact."
    },
    {
      title: "Saint Ignatius College Preparatory",
      subtitle: "High School Diploma",
      date: "2018 – 2022",
      description: "Graduated from a Jesuit high school in San Francisco known for academic excellence and its focus on developing leaders dedicated to service and justice."
    }
  ];

  // Experience timeline data
  const experienceItems = [
    {
      title: "AdviserGPT",
      subtitle: "Intern, Client Onboarding & Product Support",
      date: "May 2025 – Present",
      description: "Building an AI content generation tool to boost SEO and visibility, while supporting onboarding and integration of AI solutions and creating demo content in Adobe Suite to enhance client engagement."
    },
    {
      title: "Mark Farrell for Mayor Campaign",
      subtitle: "Intern/Fellow Team Lead",
      date: "May 2024 – August 2024",
      description: "Led and trained a 60+ person intern team, managing schedules and optimizing distribution to increase weekly canvassing numbers by 30% across San Francisco."
    },
    {
      title: "Orangetheory Fitness",
      subtitle: "Lead Sales Associate",
      date: "June 2023 – August 2023",
      description: "Onboarded 20+ new members in one summer through targeted outreach and sales pitches. Spearheaded sales initiatives, conducted fitness assessments, tailored packages, and collaborated with associates to achieve team targets."
    },
    {
      title: "Nike Soccer Camp",
      subtitle: "Assistant Soccer Coach",
      date: "June 2022 – August 2022",
      description: "Led and managed daily training sessions, fostering skill development, teamwork, and discipline in a high-energy, inclusive environment. Provided individualized coaching, organized drills, and ensured a positive experience for players of varying skill levels."
    },
    {
      title: "Vanderbilt, Prosthetic Exo-Skeleton",
      subtitle: "Mechanical Engineer Intern",
      date: "June 2021 – August 2021",
      description: "Designed, prototyped, and tested a prosthetic exoskeleton using EMG-controlled motors, aiding in up to 10 lbs of lifting force to support improved mobility for individuals with disabilities."
    },
    {
      title: "Mark Cavagnero Associates",
      subtitle: "Architecture Intern",
      date: "June 2021 – August 2021",
      description: "Collaborated with architects in design discussions and client meetings. Used CAD and 3D printing to create a 3D model of a school's remodeling plans. Learned professional practices, emphasizing timelines, and client communication."
    }
  ];

  // Projects timeline data
  const projectsItems = [
    {
      title: "AI Blog Generator",
      subtitle: "OpenAI-Powered Content Generation Tool",
      date: "May 2025 - July 2025",
      description: "Developed an OpenAI-powered content generation tool that produces professional, SEO-optimized blog posts to increase online visibility and drive organic traffic for businesses."
    },
    {
      title: "Machine Learning for Water Quality Classification",
      subtitle: "Boston College Academic Project",
      date: "August 2024 – December 2024",
      description: "Built machine learning models (decision tree, kNN, Naive Bayes, SVM) achieving 90% accuracy in predicting water potability, improving monitoring capabilities and supporting targeted public health interventions."
    }
  ];

  // Entrepreneur/Club activities data
  const entrepreneurItems = [
    {
      title: "Soaring Startup Circle Venture",
      subtitle: "Senior Analyst",
      date: "August 2024 – Present",
      description: "Provided leadership and organization to the prototyping team, helping build business ideas and brands from concept to funding, supporting Boston College startups through strategic guidance and innovative prototype development."
    },
    {
      title: "West End House Boys and Girls Club",
      subtitle: "Volunteer",
      date: "August 2023 – June 2024",
      description: "Inspired the youth in our after-school program at West End House, harnessing shared interests to create a dynamic learning community while incorporating in-class lessons on Philosophy and Theology."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="px-20 pt-8 pb-16">
        {/* Page Title */}
        <motion.section 
          className="text-center mb-16"
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
            About Me
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
            Engineer, entrepreneur, and leader passionate about building innovative solutions and creating positive impact.
          </motion.p>
        </motion.section>


        {/* About Cards */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.3,
            delay: 0.6
          }}
        >
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  duration: 0.4,
                  delay: 0.7 + (index * 0.1),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              <AboutCard
                title={card.title}
                description={card.description}
                icon={card.icon}
              />
            </motion.div>
          ))}
        </motion.section>


        {/* Timeline Sections */}
        <motion.div 
          className="space-y-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.3,
            delay: 0.9
          }}
        >
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.0
            }}
          >
            <Timeline
              title="Education"
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              items={educationItems}
            />
          </motion.div>

          {/* Projects Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.2
            }}
          >
            <Timeline
              title="Key Projects"
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              items={projectsItems}
            />
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.4
            }}
          >
            <Timeline
              title="Experience"
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              }
              items={experienceItems}
            />
          </motion.div>

          {/* Entrepreneur/Leadership Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.6
            }}
          >
            <Timeline
              title="Leadership & Service"
              icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              items={entrepreneurItems}
            />
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.section 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 1.8
          }}
        >
          <motion.div 
            className="bg-card backdrop-blur-md border border-border rounded-3xl p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.9
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <motion.h2 
              className="text-3xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 2.0
              }}
            >
              Let's Work Together
            </motion.h2>
            <motion.p 
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 2.1
              }}
            >
              I'm always interested in new opportunities, collaborations, and meaningful projects. Let's connect and build something amazing together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 2.2
              }}
            >
              <Link to="/contact">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out hover:scale-105">
                  Get In Touch
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default About;
