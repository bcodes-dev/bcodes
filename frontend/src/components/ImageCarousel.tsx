import React, { useState, useEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./ImageCarousel.css";

interface ImageCarouselProps {
  folderPath: string;
  imageCount: number;
  folderName: string;
  initialIndex?: number;
  onClose?: () => void;
  onNextFolder?: () => void;
  onPrevFolder?: () => void;
}

export default function ImageCarousel({
  folderPath,
  imageCount,
  folderName,
  initialIndex,
  onClose,
  onNextFolder,
  onPrevFolder,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [flashSide, setFlashSide] = useState<"left" | "right" | null>(null);
  const [flashActive, setFlashActive] = useState(false);
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Generate image paths based on folder naming convention
    // Assuming images are named like: 2025-12-28-01.jpg, 2025-12-28-02.jpg, etc.
    const imagePaths = Array.from({ length: imageCount }, (_, i) => {
      const padded = String(i + 1).padStart(2, "0");
      return `${folderPath}/${folderName}-${padded}.jpg`;
    });
    setImages(imagePaths);
    // If an initialIndex is provided, clamp it to valid range
    const start = typeof initialIndex === 'number' ? Math.max(0, Math.min(initialIndex, imagePaths.length - 1)) : 0;
    setCurrentIndex(start);
  }, [folderPath, imageCount, folderName, initialIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        if (onPrevFolder) {
          onPrevFolder();
          return prev; // keep index until parent switches folder
        }
        return images.length - 1;
      }
      return prev - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev === images.length - 1) {
        if (onNextFolder) {
          onNextFolder();
          return prev; // keep index until parent switches folder
        }
        return 0;
      }
      return prev + 1;
    });
  };

  const triggerMobileFlash = (side: "left" | "right") => {
    setFlashSide(side);
    setFlashActive(false);

    requestAnimationFrame(() => {
      setFlashActive(true);
    });

    if (flashTimeoutRef.current) {
      clearTimeout(flashTimeoutRef.current);
    }

    flashTimeoutRef.current = setTimeout(() => {
      setFlashActive(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) {
        clearTimeout(flashTimeoutRef.current);
      }
    };
  }, []);

  if (images.length === 0) {
    return <div className="no-images">No images found</div>;
  }

  // derive a human-friendly label from the folderName (YYYY-MM-DD -> Month D, YYYY)
  let folderLabel = folderName;
  if (/^\d{4}-\d{2}-\d{2}$/.test(folderName)) {
    try {
      const d = new Date(folderName);
      folderLabel = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (e) {
      // leave folderName as-is
    }
  }

  return (
    <div className="carousel-container">
      <div
        className={`carousel-mobile-flash ${flashActive ? "active" : ""} ${
          flashSide === "left" ? "left" : ""
        } ${flashSide === "right" ? "right" : ""}`}
      />
      <div className="carousel-folder-label">{folderLabel}</div>
      <button
        className="carousel-close-button"
        onClick={() => onClose && onClose()}
        title="Close"
      >
        <CloseIcon style={{ fontSize: 18, color: '#111' }} />
      </button>
      {/* Left Arrow Button */}
      <button
        onClick={goToPrevious}
        className="carousel-arrow-button"
        style={{ left: "1rem" }}
        title="Previous image"
      >
        <ArrowBackIosNewIcon style={{ fontSize: 20, color: '#111' }} />
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
        <button
          className="carousel-mobile-nav-zone carousel-mobile-nav-prev"
          onClick={() => {
            triggerMobileFlash("left");
            goToPrevious();
          }}
          title="Previous image"
          aria-label="Previous image"
        />
        <button
          className="carousel-mobile-nav-zone carousel-mobile-nav-next"
          onClick={() => {
            triggerMobileFlash("right");
            goToNext();
          }}
          title="Next image"
          aria-label="Next image"
        />
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
        <ArrowForwardIosIcon style={{ fontSize: 20, color: '#111' }} />
      </button>
    </div>
  );
}

