import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: {
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
    };
    team?: string[];
    timeline?: {
      year: string;
      milestone: string;
    }[];
  } | null;
}

const BrandModal = ({ isOpen, onClose, brand }: BrandModalProps) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [imageAspectRatios, setImageAspectRatios] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setCurrentScreenshotIndex(0);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Load image aspect ratios
  useEffect(() => {
    if (brand?.screenshots && brand.screenshots.length > 0) {
      const loadAspectRatios = async () => {
        const ratios: number[] = [];
        for (const screenshot of brand.screenshots) {
          const img = new Image();
          await new Promise((resolve) => {
            img.onload = () => {
              ratios.push(img.naturalWidth / img.naturalHeight);
              resolve(true);
            };
            img.onerror = () => {
              // Fallback to 4:3 aspect ratio for failed images
              ratios.push(4 / 3);
              resolve(true);
            };
            img.src = screenshot;
          });
        }
        setImageAspectRatios(ratios);
      };
      loadAspectRatios();
    }
  }, [brand?.screenshots]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !brand) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Launched":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "In Beta":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const nextScreenshot = () => {
    if (brand?.screenshots && brand.screenshots.length > 0) {
      setCurrentScreenshotIndex((prev) => (prev + 1) % brand.screenshots!.length);
    }
  };

  const prevScreenshot = () => {
    if (brand?.screenshots && brand.screenshots.length > 0) {
      setCurrentScreenshotIndex((prev) => (prev - 1 + brand.screenshots!.length) % brand.screenshots!.length);
    }
  };

  // Calculate the transform to position the current image
  const calculateTransform = () => {
    if (!containerRef.current || !brand?.screenshots || brand.screenshots.length === 0 || imageAspectRatios.length === 0) {
      return 'translateX(0)';
    }
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = 500; // Fixed height
    
    // Calculate the actual width of each image based on its aspect ratio
    const imageWidths = imageAspectRatios.map(ratio => containerHeight * ratio);
    
    // Calculate the cumulative position of each image
    let cumulativeWidth = 0;
    const imagePositions = imageWidths.map(width => {
      const position = cumulativeWidth;
      cumulativeWidth += width;
      return position;
    });
    
    const currentImagePosition = imagePositions[currentScreenshotIndex] || 0;
    const currentImageWidth = imageWidths[currentScreenshotIndex] || containerWidth;
    
    let translateX = 0;
    
    if (brand.screenshots.length === 1) {
      // Single image: center it
      translateX = (containerWidth / 2) - (currentImagePosition + currentImageWidth / 2);
    } else if (currentScreenshotIndex === 0) {
      // First image: left-align
      translateX = -currentImagePosition;
    } else if (currentScreenshotIndex === brand.screenshots.length - 1) {
      // Last image: right-align
      translateX = containerWidth - (currentImagePosition + currentImageWidth);
    } else {
      // Middle images: center
      const currentImageCenter = currentImagePosition + (currentImageWidth / 2);
      translateX = (containerWidth / 2) - currentImageCenter;
    }
    
    return `translateX(${translateX}px)`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background border border-border rounded-3xl shadow-2xl max-w-7xl max-h-[95vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-border">
          <div className="flex items-center space-x-6">
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="w-16 h-16 object-contain"
              style={{ 
                filter: brand.name === 'Happy Mile Run Club' || brand.name === 'ClubPack'
                  ? 'none' // Keep original colors for HappyMile and ClubPack
                  : brand.name === 'Mod Brew' || brand.name === 'Destination Drifters'
                    ? theme === 'dark' 
                      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' // White in dark mode
                      : 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)' // Black in light mode
                    : theme === 'dark' 
                      ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' 
                      : 'brightness(0) saturate(100%) invert(55%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
              }}
            />
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-3xl font-bold text-foreground">
                  {brand.name}
                </h2>
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium border",
                  getStatusColor(brand.status)
                )}>
                  {brand.status}
                </span>
              </div>
              <p className="text-muted-foreground">
                {brand.category} • Founded {brand.founded}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-muted rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-8">
            {/* Hero Section */}
            <div className="mb-12">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {brand.longDescription || brand.description}
              </p>
            </div>

            {/* Screenshots Section */}
            {brand.screenshots && brand.screenshots.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6">Product Screenshots</h3>
                <div className="relative rounded-2xl overflow-hidden bg-muted">
                  {/* Image Viewport Container */}
                  <div ref={containerRef} className="h-[500px] overflow-hidden">
                    {/* Image Carousel */}
                    <div 
                      className="flex transition-transform duration-300 ease-in-out h-full"
                      style={{
                        transform: calculateTransform()
                      }}
                    >
                      {brand.screenshots.map((screenshot, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 relative overflow-hidden h-full"
                        >
                          <img
                            src={screenshot}
                            alt={`${brand.name} screenshot ${index + 1}`}
                            className="h-full w-auto object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {brand.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevScreenshot}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextScreenshot}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full z-10">
                        {currentScreenshotIndex + 1} / {brand.screenshots.length}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Features */}
                {brand.features && brand.features.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {brand.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Timeline */}
                {brand.timeline && brand.timeline.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Timeline</h3>
                    <div className="space-y-4">
                      {brand.timeline.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-16 text-sm font-medium text-primary flex-shrink-0">
                            {item.year}
                          </div>
                          <div className="text-muted-foreground">{item.milestone}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Metrics */}
                {brand.metrics && (
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">Key Metrics</h3>
                    <div className="space-y-4">
                      {brand.metrics.users && (
                        <div className="p-4 bg-card border border-border rounded-xl">
                          <div className="text-2xl font-bold text-foreground">{brand.metrics.users}</div>
                          <div className="text-sm text-muted-foreground">Active Users</div>
                        </div>
                      )}
                      {brand.metrics.revenue && (
                        <div className="p-4 bg-card border border-border rounded-xl">
                          <div className="text-2xl font-bold text-foreground">{brand.metrics.revenue}</div>
                          <div className="text-sm text-muted-foreground">Annual Revenue</div>
                        </div>
                      )}
                      {brand.metrics.growth && (
                        <div className="p-4 bg-card border border-border rounded-xl">
                          <div className="text-2xl font-bold text-foreground">{brand.metrics.growth}</div>
                          <div className="text-sm text-muted-foreground">Growth Rate</div>
                        </div>
                      )}
                      {brand.metrics.partnerships && (
                        <div className="p-4 bg-card border border-border rounded-xl">
                          <div className="text-2xl font-bold text-foreground">{brand.metrics.partnerships}</div>
                          <div className="text-sm text-muted-foreground">Partnerships</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {brand.technologies && brand.technologies.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {brand.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team */}
                {brand.team && brand.team.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">Team</h3>
                    <div className="space-y-2">
                      {brand.team.map((member, index) => (
                        <div key={index} className="text-muted-foreground">
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {/* Website Link */}
                {brand.website && (
                  <div>
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <span className="text-foreground font-medium">Visit Website</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
