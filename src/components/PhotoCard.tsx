import { memo, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  title?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "tall";
  className?: string;
  image?: string;
  onImageClick?: (imageSrc: string, title: string) => void;
}

const PhotoCard = memo(({ 
  title = "Photo", 
  aspectRatio = "square",
  className,
  image,
  onImageClick
}: PhotoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1 
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "bg-card backdrop-blur-md border border-border rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg cursor-pointer group",
        "relative",
        className
      )}
    >
      {/* Image content */}
      {image ? (
        <div 
          className="relative cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Image clicked:', image, title);
            onImageClick?.(image, title);
          }}
        >
          {/* Loading placeholder */}
          {!isLoaded && (
            <div className="w-full h-64 bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center rounded-2xl">
              <div className="text-center opacity-60">
                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-muted-foreground/20 flex items-center justify-center animate-pulse">
                  <svg 
                    className="w-4 h-4 text-muted-foreground" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs text-muted-foreground font-medium">Loading...</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="w-full h-64 bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center rounded-2xl">
              <div className="text-center opacity-60">
                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg 
                    className="w-4 h-4 text-red-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-xs text-red-500 font-medium">Failed to load</p>
              </div>
            </div>
          )}

          {/* Actual image - only load when in view */}
          {isInView && !hasError && (
            <img
              ref={imgRef}
              src={image}
              alt={title}
              className={cn(
                "w-full h-auto object-contain rounded-2xl transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
            />
          )}

          {/* Hover overlay with image icon */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center pointer-events-none rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/50 flex items-center justify-center">
          <div className="text-center opacity-60 group-hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted-foreground/20 flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-muted-foreground" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground font-medium">{title}</p>
          </div>
        </div>
      )}
    </div>
  );
});

PhotoCard.displayName = "PhotoCard";

export default PhotoCard;
