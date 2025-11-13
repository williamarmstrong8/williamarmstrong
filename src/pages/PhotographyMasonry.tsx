import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ImageModal from "@/components/ImageModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Masonry, { Item as MasonryItem } from "@/components/Masonry";
import { collectionOptions, photoCollections, type PhotoItem } from "@/data/photography";

const getEstimatedHeight = (photo: PhotoItem, seed: number) => {
  const portraitHeights = [520, 560, 600, 640];
  const landscapeHeights = [320, 360, 400, 440];
  const heights = photo.aspectRatio === "portrait" ? portraitHeights : landscapeHeights;
  return heights[seed % heights.length];
};

const PhotographyMasonry = () => {
  const isMobile = useIsMobile();
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [modalImage, setModalImage] = useState<{ src: string; title: string; index: number } | null>(null);
  const [visibleCount, setVisibleCount] = useState(40);

  const currentPhotos = photoCollections[selectedCollection as keyof typeof photoCollections] ?? photoCollections.all;

  const currentPhotosWithIndex = useMemo(
    () => currentPhotos.map((photo, index) => ({ ...photo, index })),
    [currentPhotos]
  );

  const visiblePhotos = useMemo(
    () => currentPhotosWithIndex.slice(0, visibleCount),
    [currentPhotosWithIndex, visibleCount]
  );

  const masonryItems = useMemo<MasonryItem[]>(
    () =>
      visiblePhotos.map(photo => ({
        id: `${photo.collection}-${photo.id}-${photo.index}`,
        img: photo.image,
        url: photo.image,
        height: getEstimatedHeight(photo, photo.index),
        title: photo.title,
        data: {
          index: photo.index,
        },
      })),
    [visiblePhotos]
  );

  const handleImageClick = (index: number) => {
    if (index < 0 || index >= currentPhotosWithIndex.length) return;
    const photo = currentPhotosWithIndex[index];
    setModalImage({ src: photo.image, title: photo.title, index });
  };

  const loadMorePhotos = () => {
    setVisibleCount(prev => Math.min(prev + 40, currentPhotos.length));
  };

  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollection(collectionId);
    setVisibleCount(40);
  };

  const closeModal = () => setModalImage(null);

  const goToPrevious = () => {
    if (!modalImage) return;
    const prevIndex = modalImage.index - 1;
    if (prevIndex >= 0) {
      const prevPhoto = currentPhotosWithIndex[prevIndex];
      setModalImage({
        src: prevPhoto.image,
        title: prevPhoto.title,
        index: prevIndex,
      });
    }
  };

  const goToNext = () => {
    if (!modalImage) return;
    const nextIndex = modalImage.index + 1;
    if (nextIndex < currentPhotosWithIndex.length) {
      const nextPhoto = currentPhotosWithIndex[nextIndex];
      setModalImage({
        src: nextPhoto.image,
        title: nextPhoto.title,
        index: nextIndex,
      });
    }
  };

  const remainingCount = Math.max(currentPhotos.length - visibleCount, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className={`${isMobile ? "px-4" : "px-20"} pt-8 pb-16`}>
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1,
          }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
          >
            Photography
          </motion.h1>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4,
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
                  delay: 0.5 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
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
                      : "bg-muted/20 text-foreground hover:bg-muted/40 hover:text-foreground"
                  )}
                >
                  {option.name}
                  <span className="ml-2 text-xs opacity-70">({option.count})</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
        >
          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.97}
            blurToFocus
            colorShiftOnHover={false}
            onItemClick={item => {
              const indexFromData = typeof item.data?.index === "number" ? item.data.index : -1;
              const fallbackIndex =
                indexFromData >= 0 ? indexFromData : currentPhotosWithIndex.findIndex(photo => photo.image === item.img);
              if (fallbackIndex >= 0) {
                handleImageClick(fallbackIndex);
              }
            }}
          />
        </motion.section>

        {remainingCount > 0 && (
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
              Load More Photos ({remainingCount} remaining)
            </Button>
          </motion.div>
        )}
      </main>

      <ImageModal
        isOpen={!!modalImage}
        onClose={closeModal}
        imageSrc={modalImage?.src || ""}
        title={modalImage?.title}
        onPrevious={goToPrevious}
        onNext={goToNext}
        hasPrevious={modalImage ? modalImage.index > 0 : false}
        hasNext={modalImage ? modalImage.index < currentPhotosWithIndex.length - 1 : false}
      />
    </div>
  );
};

export default PhotographyMasonry;

