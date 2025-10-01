import { useTheme } from "@/contexts/ThemeContext";

const AboutSection = () => {
  const { theme } = useTheme();

  return (
    <section className="py-20 px-20 bg-background">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            About Me
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/william-1.JPG"
                alt="William Armstrong - Creative Professional"
                className="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                style={{ objectPosition: "center 15%" }}
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              {/* Overlay gradient for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Text under image */}
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                William Armstrong
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Creative engineer passionate about bringing innovative ideas to life through design, technology, and storytelling.
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Main Description */}
            <div className="space-y-6">
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
            </div>


            {/* Additional Content */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-foreground">
                What Drives Me
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Every project is an opportunity to push boundaries, learn something new, and create something extraordinary. 
                I'm passionate about staying at the forefront of design trends while maintaining timeless principles that ensure lasting impact.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Human-Centered Engineering
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Venture Building
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  UI/UX Design
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Product Development
                </span>
              </div>
            </div>

            {/* Collaboration CTA */}
            <div className="mt-8">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-card border border-border rounded-2xl shadow-lg">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="text-foreground font-medium">
                  Always excited to collaborate on new projects
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
