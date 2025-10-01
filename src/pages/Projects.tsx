import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import ProjectGridCard from "@/components/ProjectGridCard";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectModal from "@/components/ProjectModal";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Project data based on actual folders in public/projects - ordered by most recent date
  const projects = [
    {
      id: 1,
      title: "Proof - Social Health Tracker",
      category: "UI/UX",
      date: "December 2024",
      description: "Social media app concept that gamifies health challenges through photo-based task tracking and social accountability, featuring a working prototype built with Flutter.",
      longDescription: "Proof is a social media app concept I developed to address the challenge of maintaining accountability in health and wellness goals. The app gamifies health challenges by requiring users to post photos as proof of completing tasks, which are then shared in a social feed for friends to see and provide encouragement. This creates a system of social accountability that motivates users to stay consistent with their health goals. The project presented a great UI/UX challenge, requiring me to design an intuitive interface that balances social features with privacy considerations. I used Figma for design mockups and prototyping, then built a working prototype using Cursor and Flutter. The app addresses the common problem of people starting health challenges but losing motivation without accountability, providing a solution that combines social connection with goal achievement.",
      images: [
        "/projects/proof/Untitled design.jpg",
        "/projects/proof/Proof of Productive Habits.png",
        "/projects/proof/ChatGPT Image Sep 30, 2025, 01_02_46 PM.png"
      ],
      technologies: ["Figma", "Flutter", "Cursor", "UI/UX Design", "App Development", "Social Media Design"],
      features: [
        "Photo-based task verification system",
        "Social feed for accountability and motivation",
        "Gamification of health challenges",
        "Intuitive UI/UX design for mobile app",
        "Working Flutter prototype development",
        "Social accountability features",
        "Health challenge integration",
        "Privacy-conscious social sharing"
      ]
    },
    {
      id: 2,
      title: "Happy Mile - Run Club App",
      category: "UI/UX",
      date: "November 2024",
      description: "Modern UI/UX redesign of my run club with an innovative app concept featuring contemporary design principles and user-centered interface development.",
      longDescription: "Happy Mile represents a comprehensive redesign of my run club through modern UI/UX principles. This project involved creating an innovative app concept that reimagines how running communities connect and engage. I focused on developing a contemporary interface that prioritizes user experience while maintaining the social and motivational aspects that make running clubs successful. The design incorporates modern UI patterns, intuitive navigation, and engaging visual elements that encourage community participation and goal achievement. This project showcases my ability to apply current design trends and user-centered design principles to create meaningful digital experiences for fitness communities.",
      images: [
        "/projects/happy mile/Untitled design (1).jpg"
      ],
      technologies: ["Figma", "Canva", "UI/UX Design", "Modern Design Principles", "App Design", "User-Centered Design"],
      features: [
        "Modern UI/UX redesign and app concept",
        "Contemporary design principles implementation",
        "User-centered interface development",
        "Community engagement features",
        "Intuitive navigation and user flow",
        "Social running platform design",
        "Motivational and goal-setting interfaces",
        "Mobile-first responsive design approach"
      ]
    },
    {
      id: 10,
      title: "Adviser GPT - Product Launch Video",
      category: "UI/UX",
      date: "August 2024",
      description: "LinkedIn product launch video created for an AI internship, demonstrating creative translation of engineering and business visions into engaging visual storytelling using Adobe After Effects, Illustrator, and Premiere Pro.",
      longDescription: "During my AI internship at Adviser GPT this summer, I created a professional product launch video that was posted on their LinkedIn and website to attract customers. This project required me to learn Adobe After Effects from scratch, while also utilizing Illustrator and Premiere Pro to create a fun, stylish, and modern demonstration of what the product does. The challenge was to take complex engineering and business visions and translate them into a creative, accessible format that would resonate with potential users. I developed a compelling visual narrative that showcased the product's capabilities in an engaging way, combining motion graphics, visual effects, and professional editing to create a polished final product. The video successfully brought the company's vision to life and served as a key marketing asset that drove customer engagement and product adoption.",
      thumbnail: "/projects/adviser_gpt/linkedin_cover_photo.jpg",
      videos: [
        "/projects/adviser_gpt/Adviser_GPT_Answer_DEMO.mp4"
      ],
      technologies: ["Adobe After Effects", "Adobe Illustrator", "Adobe Premiere Pro", "Motion Graphics", "Video Editing", "Visual Storytelling"],
      features: [
        "Professional product launch video production",
        "Self-taught Adobe After Effects proficiency",
        "Motion graphics and visual effects design",
        "Creative translation of technical concepts",
        "Professional video editing and post-production",
        "Marketing content creation for LinkedIn and website",
        "Brand storytelling and product demonstration",
        "Customer engagement and conversion-focused content"
      ],
      link: "https://www.linkedin.com/company/advisergpt/"
    },
    {
      id: 3,
      title: "PWS Refrigeration System",
      category: "Engineering",
      date: "September 2024",
      description: "Human-centered engineering project developing a smart refrigeration system for individuals with Prader-Willi Syndrome to promote independence and safety.",
      longDescription: "This human-centered engineering project focused on developing a specialized refrigeration system for individuals with Prader-Willi Syndrome (PWS), a condition where individuals cannot regulate hunger. Through extensive collaboration with PWS facilities and multiple site visits, our team gained deep understanding of the unique challenges faced by individuals with PWS. Working on the electronics team, I contributed to the design using CAD software, Arduino programming, electronics integration, PCB specification, circuit design, and more. The beta prototype we developed addresses a critical need, allowing individuals with PWS to be more independent and live alone for longer periods while maintaining their safety and well-being.",
      images: [
        "/projects/PWS-fridge/pws1.jpg",
        "/projects/PWS-fridge/pws2.jpg",
        "/projects/PWS-fridge/pws3.jpg",
        "/projects/PWS-fridge/pws4.jpg",
        "/projects/PWS-fridge/pws5.jpg",
        "/projects/PWS-fridge/pws6.jpg",
        "/projects/PWS-fridge/pws7.jpg"
      ],
      technologies: ["CAD Software", "Arduino", "Electronics", "PCB Design", "Circuit Design", "Human-Centered Design"],
      features: [
        "Human-centered design approach with stakeholder collaboration",
        "Site visits and user research with PWS facilities",
        "Electronics system design and integration",
        "Arduino programming and control systems",
        "PCB specification and circuit design",
        "Beta prototype development and testing",
        "Promotes independence for individuals with PWS",
        "Addresses critical safety and accessibility needs"
      ]
    },
    {
      id: 4,
      title: "Waste Management and Sorting System",
      category: "Engineering",
      date: "March 2022",
      description: "Redesigned Boston College's waste system with an automated conveyor system that sorts trash, compost, and recycling to improve accessibility and user experience.",
      longDescription: "This project focused on redesigning Boston College's waste management system to make it more accessible and user-friendly. Our team was tasked with designing a solution that considered business partners and funding opportunities. We developed a conveyor system prototype that could automatically sort trash, compost, and recycling materials. The project emphasized both technical innovation and business development, as we worked with mock partners and presented our design at a business fair. Using DC motors, circuits, Arduino programming, and C++, we created a functional prototype that demonstrated the potential for improved waste management on campus while showcasing our ability to bridge engineering solutions with business partnerships.",
      images: [
        "/projects/conveyor/conveyor1.jpg"
      ],
      videos: [
        "/projects/conveyor/IMG_4890.MOV",
        "/projects/conveyor/IMG_4885.MOV"
      ],
      technologies: ["DC Motors", "Arduino", "C++", "Circuit Design", "Human-Centered Design", "Business Engineering"],
      features: [
        "Automated waste sorting system (trash, compost, recycling)",
        "Conveyor system design and implementation",
        "DC motor control and circuit integration",
        "Arduino programming and C++ development",
        "Human-centered design approach",
        "Business partnership development",
        "Mock partner collaboration and presentations",
        "Business fair presentation and pitch development"
      ]
    },
    {
      id: 5,
      title: "Architecture Design",
      category: "Engineering",
      date: "June 2021",
      description: "Developed physical 3D models for Mark Cavagnero Associates using cutting-edge 3D printing technology to bring virtual architectural designs to life for client presentations.",
      longDescription: "This project involved working with the prestigious architecture firm Mark Cavagnero Associates to create physical 3D models using cutting-edge 3D printing technology. I analyzed architectural designs from Rhino, Revit, and SketchUp along with architectural drawings and paperwork to convert their virtual models into tangible 3D designs. The complete design was built at a 1:2000 scale and featured a modular system that allowed architects, partners, contractors, and clients to visualize floor layouts and designs. The system included different proposal options that could be easily substituted. The final design was presented to clients, enabling them to see and interact with the architectural designs in real life. Throughout this project, I collaborated with architects, conducted site visits to observe projects, and worked with business partners, designers, and contractors using OnShape for 3D design.",
      images: [
        "/projects/architecture/SI1.jpg",
        "/projects/architecture/SI2.jpg",
        "/projects/architecture/SI3.jpg",
        "/projects/architecture/SI4.jpg",
        "/projects/architecture/SI5.jpg",
        "/projects/architecture/SI6.jpg"
      ],
      technologies: ["OnShape", "Rhino", "Revit", "SketchUp", "3D Printing", "Architectural Modeling"],
      features: [
        "3D model conversion from multiple CAD platforms",
        "Physical model creation at 1:2000 scale",
        "Modular design system for flexibility",
        "Multiple proposal integration capability",
        "Client presentation and visualization",
        "Cross-platform software integration",
        "Site visit coordination and analysis",
        "Multi-stakeholder collaboration (architects, contractors, clients)"
      ],
      link: "https://www.cavagnero.com/project/st-ignatius/#project-type=featured"
    },
    {
      id: 6,
      title: "Prosthetic Exoskeleton",
      category: "Engineering",
      date: "June 2021",
      description: "Engineered a working prosthetic exoskeleton prototype with Vanderbilt University professors, utilizing EMG signals to control DC motor movement for enhanced mobility assistance.",
      longDescription: "This project stands out as a testament to my skills and passion for engineering. During the summer of my junior year in high school, I engineered a prosthetic exoskeleton in collaboration with engineering professors from Vanderbilt University. We successfully developed a working prototype that utilized signals from EMG modules to control the exoskeleton's movement. I sought mentorship from professors nationwide, combining STEM expertise with engineering guidance to develop this innovative prosthetic exoskeleton alongside Vanderbilt faculty and students. The project involved implementing EMG sensors to enable precise control of a robust DC motor, significantly enhancing the functionality and usability of the exoskeleton. This experience provided invaluable mentorship and guidance from university-level engineering professionals while contributing to assistive technology development.",
      images: [
        "/projects/prosthetic-exo/prosthetic1.jpg",
        "/projects/prosthetic-exo/prosthetic1.1.jpg",
        "/projects/prosthetic-exo/prosthetic2.jpg",
        "/projects/prosthetic-exo/prosthetic3.jpg",
        "/projects/prosthetic-exo/prosthetic4.jpg"
      ],
      technologies: ["EMG Sensors", "DC Motors", "Control Systems", "Biomedical Engineering", "Signal Processing"],
      features: [
        "EMG signal processing and control implementation",
        "DC motor control and movement coordination",
        "University-level collaboration and mentorship",
        "Working prototype development and testing",
        "Biomedical engineering principles application",
        "Assistive technology innovation",
        "Cross-institutional project coordination",
        "Advanced engineering mentorship integration"
      ]
    },
    {
      id: 7,
      title: "Sustainable Upcycled Tables",
      category: "Passion",
      date: "November 2020",
      description: "Sustainability-focused project creating community tables from upcycled pallets, demonstrating engineering passion for building and fostering community connections.",
      longDescription: "This project showcases my passion for engineering as a tool for building and fostering community through sustainable practices. I focused on sustainability and upcycling by collecting used pallets for free throughout San Francisco. Using carpentry and woodworking skills, I systematically tore down the pallets and rebuilt them into functional tables. The project culminated in building three 8-foot tables for a Friendsgiving celebration with friends, demonstrating how engineering can create meaningful community experiences. This work highlights my commitment to environmental responsibility, resourcefulness, and using technical skills to bring people together through shared spaces and experiences.",
      images: [
        "/projects/table/table1.jpg",
        "/projects/table/table2.jpg",
        "/projects/table/table3.jpg",
        "/projects/table/table4.jpg",
        "/projects/table/table5.jpg",
        "/projects/table/table6.jpg",
        "/projects/table/table7.JPG",
        "/projects/table/table8.JPG"
      ],
      technologies: ["Carpentry", "Woodworking", "Upcycling", "Sustainability Practices", "Community Building"],
      features: [
        "Sustainable material sourcing and upcycling",
        "Pallet deconstruction and reconstruction",
        "Carpentry and woodworking techniques",
        "Community-focused design approach",
        "Resource optimization and waste reduction",
        "Large-scale furniture construction (8-foot tables)",
        "Event planning and community gathering facilitation",
        "Environmental responsibility and circular design"
      ]
    },
    {
      id: 8,
      title: "Custom Skateboard Business",
      category: "Passion",
      date: "July 2020",
      description: "COVID-era skateboard business creating custom boards for local community, combining woodworking passion with entrepreneurial spirit and community service.",
      longDescription: "During the COVID-19 pandemic, I started a custom skateboard business that combined my love for woodworking with my passion for skateboarding. What began as a personal project quickly evolved into a small business serving my local community. I specialized in creating custom skateboards using different wood types tailored to specific needs and riding styles. Each board was carefully crafted to meet individual requirements, whether for street skating, cruising, or specific performance characteristics. This entrepreneurial venture demonstrated my ability to identify market opportunities, develop technical skills, and build a community-focused business during challenging times. The business showcased my woodworking expertise, customer service skills, and understanding of the skateboarding community's diverse needs.",
      images: [
        "/projects/skateboard/skateboard1.jpg",
        "/projects/skateboard/skateboard2.jpg",
        "/projects/skateboard/skateboard3.jpg",
        "/projects/skateboard/skateboard4.jpg",
        "/projects/skateboard/skateboard5.jpg",
        "/projects/skateboard/skateboard6.jpg",
        "/projects/skateboard/skateboard7.jpg",
        "/projects/skateboard/skateboard8.jpg"
      ],
      technologies: ["Woodworking", "Custom Manufacturing", "Material Selection", "Business Development", "Community Engagement"],
      features: [
        "Custom skateboard design and manufacturing",
        "Specialized wood selection for different riding needs",
        "Local community business development",
        "COVID-era entrepreneurial adaptation",
        "Customer consultation and needs assessment",
        "Quality craftsmanship and finishing",
        "Small business operations and management",
        "Community-focused service delivery"
      ]
    },
    {
      id: 9,
      title: "Automatic Remote-Controlled Projector System",
      category: "Engineering",
      date: "April 2020",
      description: "My introduction to engineering design - an automatic remote-controlled projector system that adjusts height for perfect wall display, solving a real-world problem through integrated mechanical and electronic systems.",
      longDescription: "This project marked my introduction to engineering design and problem-solving. I built an automatic remote-controlled projector system that would control the height of a projector to perfectly display on my wall. This was my first experience using engineering principles to solve a personal problem I was facing. The project required me to learn circuit design, mechanical design principles, and how to create collapsing and moving integrated systems. I utilized 3D CAD design software to model the mechanical components and implemented DC motor and motor controller designs to achieve precise height adjustment. This foundational project taught me the fundamentals of engineering design, from identifying a problem to developing a complete solution that integrated multiple engineering disciplines.",
      images: [
        "/projects/projector/projector1.jpg",
        "/projects/projector/projector2.jpg",
        "/projects/projector/projector3.jpg",
        "/projects/projector/projector4.jpg",
        "/projects/projector/projector5.jpg",
        "/projects/projector/projector6.jpg",
        "/projects/projector/projector7.jpg",
        "/projects/projector/projector8.jpg",
        "/projects/projector/projector9.jpg",
        "/projects/projector/projector10.jpg",
        "/projects/projector/projector11.jpg"
      ],
      technologies: ["3D CAD Design", "DC Motors", "Motor Controllers", "Circuit Design", "Mechanical Design", "Remote Control Systems"],
      features: [
        "Automatic height adjustment system",
        "Remote control functionality",
        "Precise wall display positioning",
        "Integrated mechanical and electronic systems",
        "Collapsing and moving mechanism design",
        "DC motor control and implementation",
        "3D CAD modeling and design",
        "Problem-solving engineering approach"
      ]
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = selectedProject 
    ? projects.find(project => project.id === selectedProject) 
    : null;

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
            Projects
          </motion.h1>
        </motion.section>

        {/* Filter Section */}
        <section className="flex justify-end mb-12">
          <ProjectFilter 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </section>

        {/* Projects Grid */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -20, 
                  scale: 0.9,
                  transition: {
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <ProjectGridCard
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  date={project.date}
                  image={project.thumbnail || (project.images && project.images.length > 0 ? project.images[0] : undefined)}
                  onClick={() => handleProjectClick(project.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-muted-foreground text-lg">
                No projects found for the selected category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Project Modal */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
        project={selectedProjectData}
      />
    </div>
  );
};

export default Projects;
