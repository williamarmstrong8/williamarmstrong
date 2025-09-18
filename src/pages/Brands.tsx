import { Link } from "react-router-dom";
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
      website: "https://modbrew.com",
      founded: "2023"
    },
    {
      name: "Destination Drifters",
      logo: "/drifters_logo.svg",
      description: "An adventure travel platform that connects outdoor enthusiasts with unique experiences and gear. Drifters curates off-the-beaten-path destinations and provides expert guidance for unforgettable adventures.",
      category: "Travel & Adventure",
      status: "Launched" as const,
      website: "https://drifters.com",
      founded: "2022"
    },
    {
      name: "ClubPack",
      logo: "/clubpack_logo.svg",
      description: "A comprehensive club management platform designed for sports teams, fitness clubs, and community organizations. ClubPack streamlines membership management, event coordination, and communication.",
      category: "Sports & Community",
      status: "Active" as const,
      website: "https://clubpack.com",
      founded: "2023"
    },
    {
      name: "Happy Mile Run Club",
      logo: "/happymile_logo.svg",
      description: "A wellness and fitness tracking app that gamifies healthy living through community challenges and personalized goals. HappyMile makes staying active fun and social with friends and family.",
      category: "Health & Wellness",
      status: "In Development" as const,
      founded: "2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="px-20 pt-8 pb-16">
        {/* Page Title */}
        <section className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none">
            My Brands
          </h1>
          <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
            Four innovative ventures I've founded and built, each solving unique problems in their respective industries.
          </p>
        </section>

        {/* Brands Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <BrandCard
              key={index}
              name={brand.name}
              logo={brand.logo}
              description={brand.description}
              category={brand.category}
              status={brand.status}
              website={brand.website}
              founded={brand.founded}
            />
          ))}
        </section>

        {/* Stats Section */}
        <section className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">4</div>
              <div className="text-muted-foreground">Brands Founded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">2</div>
              <div className="text-muted-foreground">Active Ventures</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">3</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">1</div>
              <div className="text-muted-foreground">In Development</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <div className="bg-card backdrop-blur-md border border-border rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interested in Collaborating?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, partnerships, or investment in innovative ventures. Let's build something amazing together.
            </p>
            <Link to="/contact">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 ease-out hover:scale-105">
                Get In Touch
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Brands;
