import { cn } from "@/lib/utils";

interface PhotoCardProps {
  title?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "tall";
  className?: string;
  image?: string;
  onImageClick?: (imageSrc: string, title: string) => void;
}

const PhotoCard = ({ 
  title = "Photo", 
  aspectRatio = "square",
  className,
  image,
  onImageClick
}: PhotoCardProps) => {
  return (
    <div
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
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain rounded-2xl"
          />
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
};

export default PhotoCard;
