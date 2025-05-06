import { useState } from "react";
import clsx from "clsx";

const ImageSlider = ({ images = [] }: { images?: { url: string }[] }) => {
  // Default to an empty array with a fallback image if no images are provided
  const safeImages =
    images.length > 0 ? images : [{ url: "default-placeholder.jpg" }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((currentIndex + safeImages.length - 1) % safeImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % safeImages.length);
  };

  const openLightbox = (currentIndex: number) => {
    setCurrentIndex(currentIndex);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (
      !(event.target as Element).closest(".lightbox-container") &&
      !(event.target as Element).closest("button")
    ) {
      closeLightbox();
    }
  };

  return (
    <>
      <div className="w-full mx-auto overflow-hidden">
        <div className="relative h-[25vh] lg:h-[55vh] sm:h-[30vh] w-full lg:w-3/4 mx-auto">
          <img
            src={`/uploads/${safeImages[currentIndex].url}`}
            alt={`/uploads/${safeImages[currentIndex].url}` + " foto"}
            className="w-full h-full object-cover rounded-lg"
            width={1500}
            height={1500}
            onClick={() => openLightbox(currentIndex)}
          />
          {safeImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-0 sm:left-1 transform -translate-y-1/2 text-white bg-black/75 bg-opacity-50 px-2 py-2 text-sm sm:text-2xl hover:cursor-pointer rounded"
              >
                ❮
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-0 sm:right-1 transform -translate-y-1/2 text-white bg-black/75 bg-opacity-50 px-2 py-2 text-sm sm:text-2xl hover:cursor-pointer rounded"
              >
                ❯
              </button>
            </>
          )}
        </div>
        <div className="flex justify-center mt-8">
          {safeImages.map((_: any, index: number) => (
            <button
              key={index}
              className={clsx(
                `h-2 w-2 mx-1 rounded-lg ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                }`,
                { block: safeImages.length > 1 },
                { hidden: safeImages.length === 1 }
              )}
            ></button>
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="lightbox-overlay fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.9)] flex justify-center items-center z-[1056]"
          onClick={handleOverlayClick}
        >
          <div className="lightbox-container p-5 rounded-xl shadow w-[90%] max-w-[800px] my-8 mx-auto">
            <img
              className="w-full h-screen object-contain"
              src={`/uploads/${safeImages[currentIndex].url}`}
              alt={`/uploads/${safeImages[currentIndex].url}` + " gambar"}
              width={1500}
              height={1500}
            />
          </div>
          <div className="absolute w-full h-screen">
            <button
              className="bg-[#333333] text-white border-none py-2 px-4 cursor-pointer hover:bg-[#444444] active:bg-[#555555] absolute top-3 right-3 rounded-md"
              onClick={closeLightbox}
            >
              Close
            </button>
            {safeImages.length > 1 && (
              <>
                <button
                  className="bg-[#333333] text-white text-2xl border-none py-2 px-4 cursor-pointer hover:bg-[#444444] active:bg-[#555555] absolute top-[47%] sm:left-8 left-0 rounded"
                  onClick={goToPrevious}
                >
                  ❮
                </button>
                <button
                  className="bg-[#333333] text-white text-2xl border-none py-2 px-4 cursor-pointer hover:bg-[#444444] active:bg-[#555555] absolute top-[47%] sm:right-8 right-0 rounded"
                  onClick={goToNext}
                >
                  ❯
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
