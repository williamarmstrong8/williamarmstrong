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
      { id: 1, title: "Mountain Scene", collection: "landscape", image: "/photography/landscape/image2.jpg" },
      { id: 2, title: "Event Action", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0149.jpg" },
      { id: 3, title: "Graduation Ceremony", collection: "graduation", image: "/photography/graduation/DSCF4916.jpg" },
      { id: 4, title: "Forest Path", collection: "landscape", image: "/photography/landscape/image3.JPG" },
      { id: 5, title: "Runners in Action", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0121.jpg" },
      { id: 6, title: "Special Day", collection: "graduation", image: "/photography/graduation/DSCF5258.jpg" },
      { id: 7, title: "Coastal View", collection: "landscape", image: "/photography/landscape/image4.jpg" },
      { id: 8, title: "Event Moment", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0606.jpg" },
      { id: 9, title: "Achievement Moment", collection: "graduation", image: "/photography/graduation/DSCF5935.jpg" },
      { id: 10, title: "Sunset Horizon", collection: "landscape", image: "/photography/landscape/image5.jpg" },
      { id: 11, title: "Group Photo", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0151.jpg" },
      { id: 12, title: "Celebration Moment", collection: "graduation", image: "/photography/graduation/DSCF5283.jpg" },
      { id: 13, title: "Valley Vista", collection: "landscape", image: "/photography/landscape/image6.jpg" },
      { id: 14, title: "Event Scene", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0643.jpg" },
      { id: 15, title: "Final Celebration", collection: "graduation", image: "/photography/graduation/DSCF5970.jpg" },
      { id: 16, title: "Lake Reflection", collection: "landscape", image: "/photography/landscape/image7.jpg" },
      { id: 17, title: "5K Run Start", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0112.jpg" },
      { id: 18, title: "Ceremony", collection: "graduation", image: "/photography/graduation/DSCF3390.jpg" },
      { id: 19, title: "Meadow Scene", collection: "landscape", image: "/photography/landscape/image8.jpg" },
      { id: 20, title: "Award Ceremony", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0170.jpg" },
      { id: 21, title: "Graduation Day", collection: "graduation", image: "/photography/graduation/DSCF3456.jpg" },
      { id: 22, title: "River Bend", collection: "landscape", image: "/photography/landscape/image10.jpg" },
      { id: 23, title: "Event Wrap-up", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0190.jpg" },
      { id: 24, title: "Special Moment", collection: "graduation", image: "/photography/graduation/DSCF3640.jpg" },
      { id: 25, title: "Mountain Peak", collection: "landscape", image: "/photography/landscape/image11.jpg" },
      { id: 26, title: "Finish Line", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0127.jpg" },
      { id: 27, title: "Achievement", collection: "graduation", image: "/photography/graduation/DSCF3685.jpg" },
      { id: 28, title: "Countryside", collection: "landscape", image: "/photography/landscape/image12.jpg" },
      { id: 29, title: "Celebration", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0140.jpg" },
      { id: 30, title: "Graduation Moment", collection: "graduation", image: "/photography/graduation/DSCF3263.jpg" },
      { id: 31, title: "Ocean View", collection: "landscape", image: "/photography/landscape/image13.jpg" },
      { id: 32, title: "Ceremony Scene", collection: "graduation", image: "/photography/graduation/DSCF5928.jpg" },
      { id: 33, title: "Run Moment", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0157.jpg" },
      { id: 34, title: "Graduation Event", collection: "graduation", image: "/photography/graduation/DSCF5434.jpg" },
      { id: 35, title: "Forest Trail", collection: "landscape", image: "/photography/landscape/image14.jpg" },
      { id: 36, title: "Celebration", collection: "graduation", image: "/photography/graduation/DSCF3428.jpg" },
      { id: 37, title: "Hilltop Vista", collection: "landscape", image: "/photography/landscape/image15.jpg" },
      { id: 38, title: "Ceremony Moment", collection: "graduation", image: "/photography/graduation/DSCF3917.jpg" },
      { id: 39, title: "Waterfall Scene", collection: "landscape", image: "/photography/landscape/image16.jpg" },
      { id: 40, title: "Special Event", collection: "graduation", image: "/photography/graduation/DSCF4006.jpg" },
      { id: 41, title: "Autumn Colors", collection: "landscape", image: "/photography/landscape/image17.jpg" },
      { id: 42, title: "Graduation Scene", collection: "graduation", image: "/photography/graduation/DSCF3966.jpg" },
      { id: 43, title: "Winter Landscape", collection: "landscape", image: "/photography/landscape/image18.jpg" },
      { id: 44, title: "Achievement Day", collection: "graduation", image: "/photography/graduation/DSCF4061.jpg" },
      { id: 45, title: "Spring Meadow", collection: "landscape", image: "/photography/landscape/image19.jpg" },
      { id: 46, title: "Celebration Day", collection: "graduation", image: "/photography/graduation/DSCF3948.jpg" },
      { id: 47, title: "Landscape View", collection: "landscape", image: "/photography/landscape/image1.jpg" },
      { id: 48, title: "Final Moment", collection: "graduation", image: "/photography/graduation/DSCF4426.jpg" },
      { id: 49, title: "Graduation Event", collection: "graduation", image: "/photography/graduation/DSCF3869.jpg" },
      { id: 50, title: "Graduation Day", collection: "graduation", image: "/photography/graduation/DSCF5939.jpg" },
    ],
    "5k-run-roll": [
      { id: 1, title: "Event Moment", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0606.jpg" },
      { id: 2, title: "Group Photo", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0151.jpg" },
      { id: 3, title: "Event Scene", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0643.jpg" },
      { id: 4, title: "5K Run Start", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0112.jpg" },
      { id: 5, title: "Award Ceremony", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0170.jpg" },
      { id: 6, title: "Runners in Action", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0121.jpg" },
      { id: 7, title: "Event Wrap-up", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0190.jpg" },
      { id: 8, title: "Finish Line", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0127.jpg" },
      { id: 9, title: "Celebration", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0140.jpg" },
      { id: 31, title: "Event Action", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0149.jpg" },
      { id: 32, title: "Run Moment", collection: "5k-run-roll", image: "/photography/5k run and roll/DSCF0157.jpg" },
    ],
    "graduation": [
      { id: 10, title: "Ceremony Scene", collection: "graduation", image: "/photography/graduation/DSCF5928.jpg" },
      { id: 11, title: "Special Day", collection: "graduation", image: "/photography/graduation/DSCF5258.jpg" },
      { id: 12, title: "Graduation Moment", collection: "graduation", image: "/photography/graduation/DSCF3263.jpg" },
      { id: 13, title: "Achievement Moment", collection: "graduation", image: "/photography/graduation/DSCF5935.jpg" },
      { id: 14, title: "Celebration", collection: "graduation", image: "/photography/graduation/DSCF3428.jpg" },
      { id: 15, title: "Graduation Event", collection: "graduation", image: "/photography/graduation/DSCF5434.jpg" },
      { id: 16, title: "Special Moment", collection: "graduation", image: "/photography/graduation/DSCF3640.jpg" },
      { id: 17, title: "Ceremony", collection: "graduation", image: "/photography/graduation/DSCF3390.jpg" },
      { id: 18, title: "Final Celebration", collection: "graduation", image: "/photography/graduation/DSCF5970.jpg" },
      { id: 19, title: "Graduation Day", collection: "graduation", image: "/photography/graduation/DSCF3456.jpg" },
      { id: 20, title: "Achievement", collection: "graduation", image: "/photography/graduation/DSCF3685.jpg" },
      { id: 21, title: "Celebration Moment", collection: "graduation", image: "/photography/graduation/DSCF5283.jpg" },
      { id: 22, title: "Graduation Ceremony", collection: "graduation", image: "/photography/graduation/DSCF4916.jpg" },
      { id: 23, title: "Ceremony Moment", collection: "graduation", image: "/photography/graduation/DSCF3917.jpg" },
      { id: 24, title: "Special Event", collection: "graduation", image: "/photography/graduation/DSCF4006.jpg" },
      { id: 25, title: "Graduation Scene", collection: "graduation", image: "/photography/graduation/DSCF3966.jpg" },
      { id: 26, title: "Achievement Day", collection: "graduation", image: "/photography/graduation/DSCF4061.jpg" },
      { id: 27, title: "Celebration Day", collection: "graduation", image: "/photography/graduation/DSCF3948.jpg" },
      { id: 28, title: "Final Moment", collection: "graduation", image: "/photography/graduation/DSCF4426.jpg" },
      { id: 29, title: "Graduation Event", collection: "graduation", image: "/photography/graduation/DSCF3869.jpg" },
      { id: 30, title: "Graduation Day", collection: "graduation", image: "/photography/graduation/DSCF5939.jpg" },
    ],
    "landscape": [
      { id: 1, title: "Landscape View", collection: "landscape", image: "/photography/landscape/image1.jpg" },
      { id: 2, title: "Mountain Scene", collection: "landscape", image: "/photography/landscape/image2.jpg" },
      { id: 3, title: "Forest Path", collection: "landscape", image: "/photography/landscape/image3.JPG" },
      { id: 4, title: "Coastal View", collection: "landscape", image: "/photography/landscape/image4.jpg" },
      { id: 5, title: "Sunset Horizon", collection: "landscape", image: "/photography/landscape/image5.jpg" },
      { id: 6, title: "Valley Vista", collection: "landscape", image: "/photography/landscape/image6.jpg" },
      { id: 7, title: "Lake Reflection", collection: "landscape", image: "/photography/landscape/image7.jpg" },
      { id: 8, title: "Meadow Scene", collection: "landscape", image: "/photography/landscape/image8.jpg" },
      { id: 10, title: "River Bend", collection: "landscape", image: "/photography/landscape/image10.jpg" },
      { id: 11, title: "Mountain Peak", collection: "landscape", image: "/photography/landscape/image11.jpg" },
      { id: 12, title: "Countryside", collection: "landscape", image: "/photography/landscape/image12.jpg" },
      { id: 13, title: "Ocean View", collection: "landscape", image: "/photography/landscape/image13.jpg" },
      { id: 14, title: "Forest Trail", collection: "landscape", image: "/photography/landscape/image14.jpg" },
      { id: 15, title: "Hilltop Vista", collection: "landscape", image: "/photography/landscape/image15.jpg" },
      { id: 16, title: "Waterfall Scene", collection: "landscape", image: "/photography/landscape/image16.jpg" },
      { id: 17, title: "Autumn Colors", collection: "landscape", image: "/photography/landscape/image17.jpg" },
      { id: 18, title: "Winter Landscape", collection: "landscape", image: "/photography/landscape/image18.jpg" },
      { id: 19, title: "Spring Meadow", collection: "landscape", image: "/photography/landscape/image19.jpg" },
    ]
  };

  const collectionOptions = [
    { id: "all", name: "All Photos", count: collections.all.length },
    { id: "5k-run-roll", name: "5K Run & Roll", count: collections["5k-run-roll"].length },
    { id: "graduation", name: "Graduation", count: collections.graduation.length },
    { id: "landscape", name: "Landscape", count: collections.landscape.length },
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
        <section className="columns-1 md:columns-2 lg:columns-4 gap-6 transition-all duration-300 ease-in-out">
          {currentPhotos.map((photo, index) => (
            <div key={`${selectedCollection}-${photo.image}`} className="break-inside-avoid mb-6 transition-all duration-300 ease-in-out">
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
