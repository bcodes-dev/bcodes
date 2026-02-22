import React, { useState, useEffect } from "react";
import "./ImageCarousel.css";

interface ImageCarouselProps {
  folderPath: string;
  imageCount: number;
  folderName: string;
}

export default function ImageCarousel({
  folderPath,
  imageCount,
  folderName,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Generate image paths based on folder naming convention
    // Assuming images are named like: 2025-12-28-01.jpg, 2025-12-28-02.jpg, etc.
    const imagePaths = Array.from({ length: imageCount }, (_, i) => {
      const padded = String(i + 1).padStart(2, "0");
      return `${folderPath}/${folderName}-${padded}.jpg`;
    });
    setImages(imagePaths);
    setCurrentIndex(0);
  }, [folderPath, imageCount, folderName]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getPreviousIndex = () =>
    currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const getNextIndex = () =>
    currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  if (images.length === 0) {
    return <div className="no-images">No images found</div>;
  }

  return (
    <div className="carousel-container">
      {/* Left Arrow Button */}
      <button
        onClick={goToPrevious}
        className="carousel-arrow-button"
        style={{ left: "1rem" }}
        title="Previous image"
      >
        ←
      </button>

      {/* Left Image (Blurred) */}
      {/* <img
        src={images[getPreviousIndex()]}
        alt="Previous"
        className="carousel-side-image"
      /> */}

      {/* Center Image (Sharp) */}
      <div className="carousel-center-image-wrapper">
        <img
          src={images[currentIndex]}
          alt={`${folderName} - ${currentIndex + 1}`}
          className="carousel-center-image"
        />
        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Right Image (Blurred) */}
      {/* <img
        src={images[getNextIndex()]}
        alt="Next"
        className="carousel-side-image"
      /> */}

      {/* Right Arrow Button */}
      <button
        onClick={goToNext}
        className="carousel-arrow-button"
        style={{ right: "1rem" }}
        title="Next image"
      >
        →
      </button>
    </div>
  );
}

