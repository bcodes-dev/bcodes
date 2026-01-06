import React, { useState, useEffect } from "react";

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
    return <div style={{ padding: "2rem" }}>No images found</div>;
  }

  return (
    <div style={styles.carouselContainer}>
      {/* Left Arrow Button */}
      <button
        onClick={goToPrevious}
        style={{ ...styles.arrowButton, left: "1rem" }}
        title="Previous image"
      >
        ←
      </button>

      {/* Left Image (Blurred) */}
      {/* <img
        src={images[getPreviousIndex()]}
        alt="Previous"
        style={styles.sideImage}
      /> */}

      {/* Center Image (Sharp) */}
      <div style={styles.centerImageWrapper}>
        <img
          src={images[currentIndex]}
          alt={`${folderName} - ${currentIndex + 1}`}
          style={styles.centerImage}
        />
        <div style={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Right Image (Blurred) */}
      {/* <img
        src={images[getNextIndex()]}
        alt="Next"
        style={styles.sideImage}
      /> */}

      {/* Right Arrow Button */}
      <button
        onClick={goToNext}
        style={{ ...styles.arrowButton, right: "1rem" }}
        title="Next image"
      >
        →
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  carouselContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0",
    backgroundColor: "#1a1a1a",
    height: "100vh",
    width: "100%",
    color: "#fff",
    overflow: "hidden",
    position: "relative",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0, 123, 255, 0)",
    border: "none",
    color: "#fff",
    fontSize: "3rem",
    cursor: "pointer",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    transition: "all 0.3s",
    zIndex: 50,
  },
  sideImage: {
    width: "20%",
    height: "100%",
    objectFit: "contain",
    filter: "blur(8px)",
    flexShrink: 0,
  },
  centerImageWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  centerImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  counter: {
    position: "absolute",
    bottom: "1.5rem",
    fontSize: "1.1rem",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
  },
};
