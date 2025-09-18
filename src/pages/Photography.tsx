import { useState } from "react";
import Navigation from "@/components/Navigation";
import PhotoCard from "@/components/PhotoCard";
import ImageModal from "@/components/ImageModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Photography = () => {
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [modalImage, setModalImage] = useState<{ src: string; title: string; index: number } | null>(null);

  // Photo collections - to be populated with real data
  const collections = {
    all: [
      { id: 1, title: "Event Action", collection: "5k-run-roll", image: "/5k run and roll/DSCF0149.jpg" },
      { id: 2, title: "Special Day", collection: "graduation", image: "/graduation/DSCF5258.jpg" },
      { id: 3, title: "Event Moment", collection: "5k-run-roll", image: "/5k run and roll/DSCF0606.jpg" },
      { id: 4, title: "Achievement Moment", collection: "graduation", image: "/graduation/DSCF5935.jpg" },
      { id: 5, title: "Group Photo", collection: "5k-run-roll", image: "/5k run and roll/DSCF0151.jpg" },
      { id: 6, title: "Graduation Ceremony", collection: "graduation", image: "/graduation/DSCF4916.jpg" },
      { id: 7, title: "Runners in Action", collection: "5k-run-roll", image: "/5k run and roll/DSCF0121.jpg" },
      { id: 8, title: "Celebration Moment", collection: "graduation", image: "/graduation/DSCF5283.jpg" },
      { id: 9, title: "Event Scene", collection: "5k-run-roll", image: "/5k run and roll/DSCF0643.jpg" },
      { id: 10, title: "Final Celebration", collection: "graduation", image: "/graduation/DSCF5970.jpg" },
      { id: 11, title: "5K Run Start", collection: "5k-run-roll", image: "/5k run and roll/DSCF0112.jpg" },
      { id: 12, title: "Ceremony", collection: "graduation", image: "/graduation/DSCF3390.jpg" },
      { id: 13, title: "Award Ceremony", collection: "5k-run-roll", image: "/5k run and roll/DSCF0170.jpg" },
      { id: 14, title: "Graduation Day", collection: "graduation", image: "/graduation/DSCF3456.jpg" },
      { id: 15, title: "Event Wrap-up", collection: "5k-run-roll", image: "/5k run and roll/DSCF0190.jpg" },
      { id: 16, title: "Special Moment", collection: "graduation", image: "/graduation/DSCF3640.jpg" },
      { id: 17, title: "Finish Line", collection: "5k-run-roll", image: "/5k run and roll/DSCF0127.jpg" },
      { id: 18, title: "Achievement", collection: "graduation", image: "/graduation/DSCF3685.jpg" },
      { id: 19, title: "Celebration", collection: "5k-run-roll", image: "/5k run and roll/DSCF0140.jpg" },
      { id: 20, title: "Graduation Moment", collection: "graduation", image: "/graduation/DSCF3263.jpg" },
      { id: 21, title: "Ceremony Scene", collection: "graduation", image: "/graduation/DSCF5928.jpg" },
      { id: 22, title: "Graduation Event", collection: "graduation", image: "/graduation/DSCF5434.jpg" },
      { id: 23, title: "Celebration", collection: "graduation", image: "/graduation/DSCF3428.jpg" },
      { id: 24, title: "Ceremony Moment", collection: "graduation", image: "/graduation/DSCF3917.jpg" },
      { id: 25, title: "Special Event", collection: "graduation", image: "/graduation/DSCF4006.jpg" },
      { id: 26, title: "Graduation Scene", collection: "graduation", image: "/graduation/DSCF3966.jpg" },
      { id: 27, title: "Achievement Day", collection: "graduation", image: "/graduation/DSCF4061.jpg" },
      { id: 28, title: "Celebration Day", collection: "graduation", image: "/graduation/DSCF3948.jpg" },
      { id: 29, title: "Final Moment", collection: "graduation", image: "/graduation/DSCF4426.jpg" },
      { id: 30, title: "Graduation Event", collection: "graduation", image: "/graduation/DSCF3869.jpg" },
      { id: 31, title: "Graduation Day", collection: "graduation", image: "/graduation/DSCF5939.jpg" },
      { id: 32, title: "Run Moment", collection: "5k-run-roll", image: "/5k run and roll/DSCF0157.jpg" },
    ],
    "5k-run-roll": [
      { id: 1, title: "Event Moment", collection: "5k-run-roll", image: "/5k run and roll/DSCF0606.jpg" },
      { id: 2, title: "Group Photo", collection: "5k-run-roll", image: "/5k run and roll/DSCF0151.jpg" },
      { id: 3, title: "Event Scene", collection: "5k-run-roll", image: "/5k run and roll/DSCF0643.jpg" },
      { id: 4, title: "5K Run Start", collection: "5k-run-roll", image: "/5k run and roll/DSCF0112.jpg" },
      { id: 5, title: "Award Ceremony", collection: "5k-run-roll", image: "/5k run and roll/DSCF0170.jpg" },
      { id: 6, title: "Runners in Action", collection: "5k-run-roll", image: "/5k run and roll/DSCF0121.jpg" },
      { id: 7, title: "Event Wrap-up", collection: "5k-run-roll", image: "/5k run and roll/DSCF0190.jpg" },
      { id: 8, title: "Finish Line", collection: "5k-run-roll", image: "/5k run and roll/DSCF0127.jpg" },
      { id: 9, title: "Celebration", collection: "5k-run-roll", image: "/5k run and roll/DSCF0140.jpg" },
      { id: 31, title: "Event Action", collection: "5k-run-roll", image: "/5k run and roll/DSCF0149.jpg" },
      { id: 32, title: "Run Moment", collection: "5k-run-roll", image: "/5k run and roll/DSCF0157.jpg" },
    ],
    "graduation": [
      { id: 10, title: "Ceremony Scene", collection: "graduation", image: "/graduation/DSCF5928.jpg" },
      { id: 11, title: "Special Day", collection: "graduation", image: "/graduation/DSCF5258.jpg" },
      { id: 12, title: "Graduation Moment", collection: "graduation", image: "/graduation/DSCF3263.jpg" },
      { id: 13, title: "Achievement Moment", collection: "graduation", image: "/graduation/DSCF5935.jpg" },
      { id: 14, title: "Celebration", collection: "graduation", image: "/graduation/DSCF3428.jpg" },
      { id: 15, title: "Graduation Event", collection: "graduation", image: "/graduation/DSCF5434.jpg" },
      { id: 16, title: "Special Moment", collection: "graduation", image: "/graduation/DSCF3640.jpg" },
      { id: 17, title: "Ceremony", collection: "graduation", image: "/graduation/DSCF3390.jpg" },
      { id: 18, title: "Final Celebration", collection: "graduation", image: "/graduation/DSCF5970.jpg" },
      { id: 19, title: "Graduation Day", collection: "graduation", image: "/graduation/DSCF3456.jpg" },
      { id: 20, title: "Achievement", collection: "graduation", image: "/graduation/DSCF3685.jpg" },
      { id: 21, title: "Celebration Moment", collection: "graduation", image: "/graduation/DSCF5283.jpg" },
      { id: 22, title: "Graduation Ceremony", collection: "graduation", image: "/graduation/DSCF4916.jpg" },
      { id: 23, title: "Ceremony Moment", collection: "graduation", image: "/graduation/DSCF3917.jpg" },
      { id: 24, title: "Special Event", collection: "graduation", image: "/graduation/DSCF4006.jpg" },
      { id: 25, title: "Graduation Scene", collection: "graduation", image: "/graduation/DSCF3966.jpg" },
      { id: 26, title: "Achievement Day", collection: "graduation", image: "/graduation/DSCF4061.jpg" },
      { id: 27, title: "Celebration Day", collection: "graduation", image: "/graduation/DSCF3948.jpg" },
      { id: 28, title: "Final Moment", collection: "graduation", image: "/graduation/DSCF4426.jpg" },
      { id: 29, title: "Graduation Event", collection: "graduation", image: "/graduation/DSCF3869.jpg" },
      { id: 30, title: "Graduation Day", collection: "graduation", image: "/graduation/DSCF5939.jpg" },
    ]
  };

  const collectionOptions = [
    { id: "all", name: "All Photos", count: collections.all.length },
    { id: "5k-run-roll", name: "5K Run & Roll", count: collections["5k-run-roll"].length },
    { id: "graduation", name: "Graduation", count: collections.graduation.length },
  ];

  const currentPhotos = collections[selectedCollection as keyof typeof collections];

  const handleImageClick = (imageSrc: string, title: string) => {
    const currentPhotos = collections[selectedCollection as keyof typeof collections];
    const index = currentPhotos.findIndex(photo => photo.image === imageSrc);
    setModalImage({ src: imageSrc, title, index });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const goToPrevious = () => {
    if (modalImage) {
      const currentPhotos = collections[selectedCollection as keyof typeof collections];
      const prevIndex = modalImage.index - 1;
      if (prevIndex >= 0) {
        const prevPhoto = currentPhotos[prevIndex];
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
      const currentPhotos = collections[selectedCollection as keyof typeof collections];
      const nextIndex = modalImage.index + 1;
      if (nextIndex < currentPhotos.length) {
        const nextPhoto = currentPhotos[nextIndex];
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
        <section className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground leading-none">
            Photography
          </h1>
        </section>

        {/* Collection Selector */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {collectionOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedCollection === option.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCollection(option.id)}
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
            ))}
          </div>
        </section>

        {/* Photography Grid - Column Layout */}
        <section className="columns-1 md:columns-2 lg:columns-4 gap-6">
          {currentPhotos.map((photo) => (
            <div key={photo.id} className="break-inside-avoid mb-6">
              <PhotoCard
                title={photo.title}
                className="w-full"
                image={photo.image}
                onImageClick={handleImageClick}
              />
            </div>
          ))}
        </section>
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
        hasNext={modalImage ? modalImage.index < currentPhotos.length - 1 : false}
      />
    </div>
  );
};

export default Photography;
