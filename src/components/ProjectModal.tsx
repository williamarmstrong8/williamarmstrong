import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    longDescription?: string;
    images?: string[];
    videos?: string[];
    technologies?: string[];
    features?: string[];
    link?: string;
    github?: string;
  } | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaAspectRatios, setMediaAspectRatios] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Combine images and videos into a single media array
  const mediaItems = [
    ...(project?.images?.map(img => ({ type: 'image', src: img })) || []),
    ...(project?.videos?.map(vid => ({ type: 'video', src: vid })) || [])
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset to first media item when modal closes
      setCurrentMediaIndex(0);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  // Load media aspect ratios
  useEffect(() => {
    if (mediaItems.length > 0) {
      const loadAspectRatios = async () => {
        const ratios: number[] = [];
        for (const mediaItem of mediaItems) {
          if (mediaItem.type === 'image') {
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
              img.src = mediaItem.src;
            });
          } else if (mediaItem.type === 'video') {
            // For videos, try to load video metadata for accurate aspect ratio
            const video = document.createElement('video');
            await new Promise((resolve) => {
              video.onloadedmetadata = () => {
                const aspectRatio = video.videoWidth / video.videoHeight;
                ratios.push(aspectRatio || 16 / 9); // Fallback to 16:9
                resolve(true);
              };
              video.onerror = () => {
                // Fallback to 16:9 aspect ratio for failed videos
                ratios.push(16 / 9);
                resolve(true);
              };
              video.src = mediaItem.src;
              video.load();
            });
          }
        }
        setMediaAspectRatios(ratios);
      };
      loadAspectRatios();
    }
  }, [mediaItems]);

  if (!isOpen || !project) return null;

  const nextMedia = () => {
    if (mediaItems.length > 0) {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }
  };

  const prevMedia = () => {
    if (mediaItems.length > 0) {
      setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  // Calculate the transform to center the current media
  const calculateTransform = () => {
    if (!containerRef.current || mediaItems.length === 0 || mediaAspectRatios.length === 0) {
      return 'translateX(0)';
    }
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = 600; // Fixed height
    
    // Calculate the actual width of each media item based on its aspect ratio
    const mediaWidths = mediaAspectRatios.map(ratio => containerHeight * ratio);
    
    // Calculate the cumulative position of each media item
    let cumulativeWidth = 0;
    const mediaPositions = mediaWidths.map(width => {
      const position = cumulativeWidth;
      cumulativeWidth += width;
      return position;
    });
    
    // Calculate the center point of the current media item
    const currentMediaPosition = mediaPositions[currentMediaIndex] || 0;
    const currentMediaWidth = mediaWidths[currentMediaIndex] || containerWidth;
    const currentMediaCenter = currentMediaPosition + (currentMediaWidth / 2);
    
    // Debug logging
    console.log('Navigation Debug:', {
      currentMediaIndex,
      totalMediaItems: mediaItems.length,
      containerWidth,
      mediaWidths,
      mediaPositions,
      currentMediaPosition,
      currentMediaWidth,
      currentMediaCenter
    });
    
    // Special case for the first media item - align it to the left edge
    if (currentMediaIndex === 0) {
      return 'translateX(0px)';
    }
    
    // Special case for the last media item - align it to the right edge
    if (currentMediaIndex === mediaItems.length - 1) {
      const totalWidth = mediaPositions[mediaPositions.length - 1] + mediaWidths[mediaWidths.length - 1];
      const translateX = Math.max(0, totalWidth - containerWidth);
      console.log('Last item transform:', { totalWidth, containerWidth, translateX });
      return `translateX(-${translateX}px)`;
    }
    
    // For all other media items, center them in the container
    const containerCenter = containerWidth / 2;
    const translateX = Math.max(0, currentMediaCenter - containerCenter);
    console.log('Center transform:', { currentMediaCenter, containerCenter, translateX });
    
    return `translateX(-${translateX}px)`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background border border-border rounded-3xl shadow-2xl max-w-7xl max-h-[95vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {project.category}
            </span>
            <h2 className="text-2xl font-bold text-foreground mt-1">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Media Gallery Section */}
            {mediaItems.length > 0 && (
              <div className="mb-8">
                <div className="relative rounded-2xl overflow-hidden bg-muted">
                  {/* Media Viewport Container */}
                  <div ref={containerRef} className="h-[600px] overflow-hidden">
                    {/* Media Carousel */}
                    <div 
                      className="flex transition-transform duration-300 ease-in-out h-full"
                      style={{
                        transform: calculateTransform()
                      }}
                    >
                      {mediaItems.map((mediaItem, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 relative overflow-hidden h-full"
                        >
                          {mediaItem.type === 'image' ? (
                            <img
                              src={mediaItem.src}
                              alt={`${project.title} - Image ${index + 1}`}
                              className="h-full w-auto object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                          ) : (
                            <video
                              src={mediaItem.src}
                              className="h-full w-auto object-contain"
                              autoPlay
                              loop
                              muted
                              playsInline
                              onError={(e) => {
                                console.error('Video failed to load:', mediaItem.src);
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Media Navigation */}
                  {mediaItems.length > 1 && (
                    <>
                      <button
                        onClick={prevMedia}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextMedia}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {/* Media Counter */}
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full z-10">
                        {currentMediaIndex + 1} / {mediaItems.length}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Media Thumbnails */}
                {mediaItems.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {mediaItems.map((mediaItem, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors relative",
                          currentMediaIndex === index 
                            ? "border-primary" 
                            : "border-border hover:border-muted-foreground"
                        )}
                      >
                        {mediaItem.type === 'image' ? (
                          <img
                            src={mediaItem.src}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        ) : (
                          <>
                            <video
                              src={mediaItem.src}
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-4 h-4 bg-white/80 rounded-full flex items-center justify-center">
                                <svg className="w-2 h-2 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Project Details */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">About This Project</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
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

                {/* Links */}
                {(project.link || project.github) && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Links</h3>
                    <div className="space-y-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                          <span className="text-foreground font-medium">Project Link</span>
                        </a>
                      )}
                      
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:bg-accent/5 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </div>
                          <span className="text-foreground font-medium">View Code</span>
                        </a>
                      )}
                    </div>
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

export default ProjectModal;
