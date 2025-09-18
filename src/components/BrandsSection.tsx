import { useTheme } from "@/contexts/ThemeContext";

const BrandsSection = () => {
  const { theme } = useTheme();
  
  // Placeholder brand data - you can replace these with actual brand information
  const brands = [
    { name: "ModBrew", logo: "/modbrew.svg" },
    { name: "Drifters", logo: "/drifters.svg" },
    { name: "ClubPack", logo: "/clubpack.svg" },
    { name: "HappyMile", logo: "/happymile.svg" },
  ];

  return (
    <section className="pb-20 px-20 pt-0">
      <div className="text-left mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          My Brands
        </h2>
      </div>

      <div className="flex justify-center items-center gap-24">
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="h-16 w-auto object-contain opacity-100 transition-all duration-300"
            style={{ 
              filter: theme === 'dark' 
                ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' 
                : 'brightness(0) saturate(100%) invert(55%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default BrandsSection;
