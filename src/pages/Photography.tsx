import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import PhotoCard from "@/components/PhotoCard";
import ImageModal from "@/components/ImageModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Photography = () => {
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [modalImage, setModalImage] = useState<{ src: string; title: string; index: number } | null>(null);
  const [visibleCount, setVisibleCount] = useState(20); // Start with 20 images
  const [columnHeights, setColumnHeights] = useState<number[]>([0, 0, 0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to create a balanced distribution of vertical and horizontal images across 4 columns
  const createBalancedOrder = (photos: any[]) => {
    const verticalPhotos = photos.filter(photo => photo.aspectRatio === "portrait");
    const horizontalPhotos = photos.filter(photo => photo.aspectRatio === "landscape");
    
    const result: any[] = [];
    const columnCount = 4;
    
    // Distribute vertical images evenly across columns first
    verticalPhotos.forEach((photo, index) => {
      const columnIndex = index % columnCount;
      const insertIndex = columnIndex * Math.ceil(verticalPhotos.length / columnCount) + Math.floor(index / columnCount);
      result[insertIndex] = photo;
    });
    
    // Fill remaining slots with horizontal images
    let horizontalIndex = 0;
    for (let i = 0; i < result.length; i++) {
      if (!result[i] && horizontalIndex < horizontalPhotos.length) {
        result[i] = horizontalPhotos[horizontalIndex];
        horizontalIndex++;
      }
    }
    
    // Add any remaining horizontal photos
    while (horizontalIndex < horizontalPhotos.length) {
      result.push(horizontalPhotos[horizontalIndex]);
      horizontalIndex++;
    }
    
    // Remove any undefined slots
    return result.filter(photo => photo !== undefined);
  };

  // Photo collections - to be populated with real data
  const collections = {
    all: [
      { id: 1, title: "Mountain Scene", collection: "landscape", image: "/photography/landscape/image2.jpg", aspectRatio: "landscape" },
      { id: 2, title: "Event Action", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0149.jpg", aspectRatio: "landscape" },
      { id: 3, title: "Graduation Ceremony", collection: "graduation", image: "/photography/graduation/DSCF4916.jpg", aspectRatio: "portrait" },
      { id: 4, title: "Forest Path", collection: "landscape", image: "/photography/landscape/image3.JPG", aspectRatio: "landscape" },
      { id: 5, title: "Runners in Action", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0121.jpg", aspectRatio: "portrait" },
      { id: 6, title: "Special Day", collection: "graduation", image: "/photography/graduation/DSCF5258.jpg", aspectRatio: "portrait" },
      { id: 7, title: "Coastal View", collection: "landscape", image: "/photography/landscape/image4.jpg", aspectRatio: "landscape" },
      { id: 8, title: "Event Moment", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0606.jpg", aspectRatio: "portrait" },
      { id: 9, title: "Achievement Moment", collection: "graduation", image: "/photography/graduation/DSCF5935.jpg", aspectRatio: "portrait" },
      { id: 10, title: "Sunset Horizon", collection: "landscape", image: "/photography/landscape/image5.jpg", aspectRatio: "landscape" },
      { id: 11, title: "Group Photo", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0151.jpg", aspectRatio: "landscape" },
      { id: 12, title: "Celebration Moment", collection: "graduation", image: "/photography/graduation/DSCF5283.jpg", aspectRatio: "portrait" },
      { id: 13, title: "Valley Vista", collection: "landscape", image: "/photography/landscape/image6.jpg", aspectRatio: "landscape" },
      { id: 14, title: "Event Scene", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0643.jpg", aspectRatio: "portrait" },
      { id: 15, title: "Final Celebration", collection: "graduation", image: "/photography/graduation/DSCF5970.jpg", aspectRatio: "portrait" },
      { id: 16, title: "Lake Reflection", collection: "landscape", image: "/photography/landscape/image7.jpg", aspectRatio: "landscape" },
      { id: 17, title: "5K Run Start", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0112.jpg", aspectRatio: "landscape" },
      { id: 18, title: "Ceremony", collection: "graduation", image: "/photography/graduation/DSCF3390.jpg", aspectRatio: "portrait" },
      { id: 19, title: "Meadow Scene", collection: "landscape", image: "/photography/landscape/image8.jpg", aspectRatio: "landscape" },
      { id: 20, title: "Award Ceremony", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0170.jpg", aspectRatio: "portrait" },
      { id: 21, title: "Graduation Day", collection: "graduation", image: "/photography/graduation/DSCF3456.jpg", aspectRatio: "portrait" },
      { id: 22, title: "River Bend", collection: "landscape", image: "/photography/landscape/image10.jpg", aspectRatio: "landscape" },
      { id: 23, title: "Event Wrap-up", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0190.jpg", aspectRatio: "landscape" },
      { id: 24, title: "Special Moment", collection: "graduation", image: "/photography/graduation/DSCF3640.jpg", aspectRatio: "portrait" },
      { id: 25, title: "Mountain Peak", collection: "landscape", image: "/photography/landscape/image11.jpg", aspectRatio: "landscape" },
      { id: 26, title: "Finish Line", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0127.jpg", aspectRatio: "portrait" },
      { id: 27, title: "Achievement", collection: "graduation", image: "/photography/graduation/DSCF3685.jpg", aspectRatio: "portrait" },
      { id: 28, title: "Countryside", collection: "landscape", image: "/photography/landscape/image12.jpg", aspectRatio: "landscape" },
      { id: 29, title: "Celebration", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0140.jpg", aspectRatio: "landscape" },
      { id: 30, title: "Graduation Moment", collection: "graduation", image: "/photography/graduation/DSCF3263.jpg", aspectRatio: "portrait" },
      { id: 31, title: "Ocean View", collection: "landscape", image: "/photography/landscape/image13.jpg", aspectRatio: "landscape" },
      { id: 32, title: "Ceremony Scene", collection: "graduation", image: "/photography/graduation/DSCF5928.jpg", aspectRatio: "portrait" },
      { id: 33, title: "Run Moment", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0157.jpg", aspectRatio: "portrait" },
      { id: 34, title: "Graduation Event", collection: "graduation", image: "/photography/graduation/DSCF5434.jpg", aspectRatio: "portrait" },
      { id: 35, title: "Forest Trail", collection: "landscape", image: "/photography/landscape/image14.jpg", aspectRatio: "landscape" },
      { id: 36, title: "Celebration", collection: "graduation", image: "/photography/graduation/DSCF3428.jpg", aspectRatio: "portrait" },
      { id: 37, title: "Hilltop Vista", collection: "landscape", image: "/photography/landscape/image15.jpg", aspectRatio: "landscape" },
      { id: 38, title: "Ceremony Moment", collection: "graduation", image: "/photography/graduation/DSCF3917.jpg", aspectRatio: "portrait" },
      { id: 39, title: "Waterfall Scene", collection: "landscape", image: "/photography/landscape/image16.jpg", aspectRatio: "landscape" },
      { id: 40, title: "Special Event", collection: "graduation", image: "/photography/graduation/DSCF4006.jpg", aspectRatio: "portrait" },
      { id: 41, title: "Autumn Colors", collection: "landscape", image: "/photography/landscape/image17.jpg", aspectRatio: "landscape" },
      { id: 42, title: "Graduation Scene", collection: "graduation", image: "/photography/graduation/DSCF3966.jpg", aspectRatio: "portrait" },
      { id: 43, title: "Winter Landscape", collection: "landscape", image: "/photography/landscape/image18.jpg", aspectRatio: "landscape" },
      { id: 44, title: "Achievement Day", collection: "graduation", image: "/photography/graduation/DSCF4061.jpg", aspectRatio: "portrait" },
      { id: 45, title: "Spring Meadow", collection: "landscape", image: "/photography/landscape/image19.jpg", aspectRatio: "landscape" },
      { id: 46, title: "Celebration Day", collection: "graduation", image: "/photography/graduation/DSCF3948.jpg", aspectRatio: "portrait" },
      { id: 47, title: "Landscape View", collection: "landscape", image: "/photography/landscape/image1.jpg", aspectRatio: "landscape" },
      { id: 48, title: "Final Moment", collection: "graduation", image: "/photography/graduation/DSCF4426.jpg", aspectRatio: "portrait" },
      { id: 49, title: "Graduation Event", collection: "graduation", image: "/photography/graduation/DSCF3869.jpg", aspectRatio: "portrait" },
      { id: 50, title: "Graduation Day", collection: "graduation", image: "/photography/graduation/DSCF5939.jpg", aspectRatio: "portrait" },
    ],
    "5k-run-roll": [
      { id: 1, title: "Event Moment", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0606.jpg", aspectRatio: "portrait" },
      { id: 2, title: "Group Photo", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0151.jpg", aspectRatio: "landscape" },
      { id: 3, title: "Event Scene", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0643.jpg", aspectRatio: "portrait" },
      { id: 4, title: "5K Run Start", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0112.jpg", aspectRatio: "landscape" },
      { id: 5, title: "Award Ceremony", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0170.jpg", aspectRatio: "portrait" },
      { id: 6, title: "Runners in Action", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0121.jpg", aspectRatio: "portrait" },
      { id: 7, title: "Event Wrap-up", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0190.jpg", aspectRatio: "landscape" },
      { id: 8, title: "Finish Line", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0127.jpg", aspectRatio: "portrait" },
      { id: 9, title: "Celebration", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0140.jpg", aspectRatio: "landscape" },
      { id: 31, title: "Event Action", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0149.jpg", aspectRatio: "landscape" },
      { id: 32, title: "Run Moment", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0157.jpg", aspectRatio: "portrait" },
    ],
    "graduation": [
      { id: 10, title: "Ceremony Scene", collection: "graduation", image: "/photography/graduation/DSCF5928.jpg", aspectRatio: "portrait" },
      { id: 11, title: "Special Day", collection: "graduation", image: "/photography/graduation/DSCF5258.jpg", aspectRatio: "portrait" },
      { id: 12, title: "Graduation Moment", collection: "graduation", image: "/photography/graduation/DSCF3263.jpg", aspectRatio: "portrait" },
      { id: 13, title: "Achievement Moment", collection: "graduation", image: "/photography/graduation/DSCF5935.jpg", aspectRatio: "portrait" },
      { id: 14, title: "Celebration", collection: "graduation", image: "/photography/graduation/DSCF3428.jpg", aspectRatio: "portrait" },
      { id: 15, title: "Graduation Event", collection: "graduation", image: "/photography/graduation/DSCF5434.jpg", aspectRatio: "portrait" },
      { id: 16, title: "Special Moment", collection: "graduation", image: "/photography/graduation/DSCF3640.jpg", aspectRatio: "portrait" },
      { id: 17, title: "Ceremony", collection: "graduation", image: "/photography/graduation/DSCF3390.jpg", aspectRatio: "portrait" },
      { id: 18, title: "Final Celebration", collection: "graduation", image: "/photography/graduation/DSCF5970.jpg", aspectRatio: "portrait" },
      { id: 19, title: "Graduation Day", collection: "graduation", image: "/photography/graduation/DSCF3456.jpg", aspectRatio: "portrait" },
      { id: 20, title: "Achievement", collection: "graduation", image: "/photography/graduation/DSCF3685.jpg", aspectRatio: "portrait" },
      { id: 21, title: "Celebration Moment", collection: "graduation", image: "/photography/graduation/DSCF5283.jpg", aspectRatio: "portrait" },
      { id: 22, title: "Graduation Ceremony", collection: "graduation", image: "/photography/graduation/DSCF4916.jpg", aspectRatio: "portrait" },
      { id: 23, title: "Ceremony Moment", collection: "graduation", image: "/photography/graduation/DSCF3917.jpg", aspectRatio: "portrait" },
      { id: 24, title: "Special Event", collection: "graduation", image: "/photography/graduation/DSCF4006.jpg", aspectRatio: "portrait" },
      { id: 25, title: "Graduation Scene", collection: "graduation", image: "/photography/graduation/DSCF3966.jpg", aspectRatio: "portrait" },
      { id: 26, title: "Achievement Day", collection: "graduation", image: "/photography/graduation/DSCF4061.jpg", aspectRatio: "portrait" },
      { id: 27, title: "Celebration Day", collection: "graduation", image: "/photography/graduation/DSCF3948.jpg", aspectRatio: "portrait" },
      { id: 28, title: "Final Moment", collection: "graduation", image: "/photography/graduation/DSCF4426.jpg", aspectRatio: "portrait" },
      { id: 29, title: "Graduation Event", collection: "graduation", image: "/photography/graduation/DSCF3869.jpg", aspectRatio: "portrait" },
      { id: 30, title: "Graduation Day", collection: "graduation", image: "/photography/graduation/DSCF5939.jpg", aspectRatio: "portrait" },
    ],
    "landscape": [
      { id: 1, title: "Landscape View", collection: "landscape", image: "/photography/landscape/image1.jpg", aspectRatio: "landscape" },
      { id: 2, title: "Mountain Scene", collection: "landscape", image: "/photography/landscape/image2.jpg", aspectRatio: "landscape" },
      { id: 3, title: "Forest Path", collection: "landscape", image: "/photography/landscape/image3.JPG", aspectRatio: "landscape" },
      { id: 4, title: "Coastal View", collection: "landscape", image: "/photography/landscape/image4.jpg", aspectRatio: "landscape" },
      { id: 5, title: "Sunset Horizon", collection: "landscape", image: "/photography/landscape/image5.jpg", aspectRatio: "landscape" },
      { id: 6, title: "Valley Vista", collection: "landscape", image: "/photography/landscape/image6.jpg", aspectRatio: "landscape" },
      { id: 7, title: "Lake Reflection", collection: "landscape", image: "/photography/landscape/image7.jpg", aspectRatio: "landscape" },
      { id: 8, title: "Meadow Scene", collection: "landscape", image: "/photography/landscape/image8.jpg", aspectRatio: "landscape" },
      { id: 10, title: "River Bend", collection: "landscape", image: "/photography/landscape/image10.jpg", aspectRatio: "landscape" },
      { id: 11, title: "Mountain Peak", collection: "landscape", image: "/photography/landscape/image11.jpg", aspectRatio: "landscape" },
      { id: 12, title: "Countryside", collection: "landscape", image: "/photography/landscape/image12.jpg", aspectRatio: "landscape" },
      { id: 13, title: "Ocean View", collection: "landscape", image: "/photography/landscape/image13.jpg", aspectRatio: "landscape" },
      { id: 14, title: "Forest Trail", collection: "landscape", image: "/photography/landscape/image14.jpg", aspectRatio: "landscape" },
      { id: 15, title: "Hilltop Vista", collection: "landscape", image: "/photography/landscape/image15.jpg", aspectRatio: "landscape" },
      { id: 16, title: "Waterfall Scene", collection: "landscape", image: "/photography/landscape/image16.jpg", aspectRatio: "landscape" },
      { id: 17, title: "Autumn Colors", collection: "landscape", image: "/photography/landscape/image17.jpg", aspectRatio: "landscape" },
      { id: 18, title: "Winter Landscape", collection: "landscape", image: "/photography/landscape/image18.jpg", aspectRatio: "landscape" },
      { id: 19, title: "Spring Meadow", collection: "landscape", image: "/photography/landscape/image19.jpg", aspectRatio: "landscape" },
    ]
  };

  const collectionOptions = [
    { id: "all", name: "All Photos", count: collections.all.length },
    { id: "5k-run-roll", name: "5K Run & Roll", count: collections["5k-run-roll"].length },
    { id: "graduation", name: "Graduation", count: collections.graduation.length },
    { id: "landscape", name: "Landscape", count: collections.landscape.length },
  ];

  const currentPhotos = collections[selectedCollection as keyof typeof collections];
  const balancedPhotos = createBalancedOrder(currentPhotos);
  const visiblePhotos = balancedPhotos.slice(0, visibleCount);

  const handleImageClick = (imageSrc: string, title: string) => {
    const index = balancedPhotos.findIndex(photo => photo.image === imageSrc);
    setModalImage({ src: imageSrc, title, index });
  };

  const loadMorePhotos = () => {
    setVisibleCount(prev => Math.min(prev + 20, currentPhotos.length));
  };

  // Reset visible count when collection changes
  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollection(collectionId);
    setVisibleCount(20);
    setColumnHeights([0, 0, 0, 0]);
  };

  // Get number of columns based on screen size
  const getColumnCount = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  // Calculate which column to place the next image in
  const getNextColumn = () => {
    const columnCount = getColumnCount();
    const currentHeights = columnHeights.slice(0, columnCount);
    const minHeight = Math.min(...currentHeights);
    return currentHeights.indexOf(minHeight);
  };

  // Update column heights when images load
  const updateColumnHeight = (columnIndex: number, height: number) => {
    setColumnHeights(prev => {
      const newHeights = [...prev];
      newHeights[columnIndex] += height + 24; // 24px for gap
      return newHeights;
    });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const goToPrevious = () => {
    if (modalImage) {
      const prevIndex = modalImage.index - 1;
      if (prevIndex >= 0) {
        const prevPhoto = balancedPhotos[prevIndex];
        setModalImage({ 
          src: prevPhoto.image || "", 
          title: prevPhoto.title, 
          index: prevIndex 
        });
      }
    }
  };

  const goToNext = () => {
    if (modalImage) {
      const nextIndex = modalImage.index + 1;
      if (nextIndex < balancedPhotos.length) {
        const nextPhoto = balancedPhotos[nextIndex];
        setModalImage({ 
          src: nextPhoto.image || "", 
          title: nextPhoto.title, 
          index: nextIndex 
        });
      }
    }
  };

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
            Photography
          </motion.h1>
        </motion.section>

        {/* Collection Selector */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4
          }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {collectionOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + (index * 0.1),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <Button
                  variant={selectedCollection === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCollectionChange(option.id)}
                  className={cn(
                    "rounded-full px-4 py-2 transition-all duration-300",
                    selectedCollection === option.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  {option.name}
                  <span className="ml-2 text-xs opacity-70">({option.count})</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Photography Grid - Balanced Masonry Layout */}
        <motion.section 
          ref={containerRef}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.3,
            delay: 0.8
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: getColumnCount() }, (_, colIndex) => (
              <div key={colIndex} className="space-y-6">
                <AnimatePresence mode="wait">
                  {visiblePhotos
                    .map((photo, index) => ({ photo, index }))
                    .filter((_, index) => index % getColumnCount() === colIndex)
                    .map(({ photo, index }) => (
                      <motion.div
                        key={`${selectedCollection}-${photo.image}-${colIndex}`}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: {
                            duration: 0.5,
                            delay: index * 0.05,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }
                        }}
                        exit={{ 
                          opacity: 0, 
                          y: -10, 
                          scale: 0.95,
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
                        <PhotoCard
                          title={photo.title}
                          className="w-full"
                          image={photo.image}
                          onImageClick={handleImageClick}
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Load More Button */}
        {visibleCount < currentPhotos.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={loadMorePhotos}
              variant="outline"
              className="rounded-full px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Load More Photos ({currentPhotos.length - visibleCount} remaining)
            </Button>
          </motion.div>
        )}
      </main>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!modalImage}
        onClose={closeModal}
        imageSrc={modalImage?.src || ""}
        title={modalImage?.title}
        onPrevious={goToPrevious}
        onNext={goToNext}
        hasPrevious={modalImage ? modalImage.index > 0 : false}
        hasNext={modalImage ? modalImage.index < balancedPhotos.length - 1 : false}
      />
    </div>
  );
};

export default Photography;
