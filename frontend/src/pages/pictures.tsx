import { useState, useEffect } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { Image_Folders } from "../config/imageFolders";
import "./pictures.css";

export default function Pictures() {
  const [selectedFolder, setSelectedFolder] = useState<typeof Image_Folders[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [randomImage, setRandomImage] = useState<string | null>(null);

  // Get a random image from all folders
  const getRandomImage = () => {
    const allImages: string[] = [];
    Image_Folders.forEach((folder) => {
      for (let i = 1; i <= folder.imageCount; i++) {
        const padded = String(i).padStart(2, "0");
        allImages.push(`${folder.path}/${folder.id}-${padded}.jpg`);
      }
    });
    return allImages.length > 0
      ? allImages[Math.floor(Math.random() * allImages.length)]
      : null;
  };

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  const handleThumbnailClick = (folder: typeof Image_Folders[0], index: number) => {
    setSelectedFolder(folder);
    setSelectedIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pictures-container">
      <div className="pictures-content">
        {selectedFolder ? (
          <ImageCarousel
            folderPath={selectedFolder.path!}
            imageCount={selectedFolder.imageCount}
            folderName={selectedFolder.id}
            initialIndex={selectedIndex}
            onClose={() => setSelectedFolder(null)}
            onNextFolder={() => {
              const idx = Image_Folders.findIndex((f) => f.id === selectedFolder.id);
              if (idx >= 0 && idx < Image_Folders.length - 1) {
                const next = Image_Folders[idx + 1];
                setSelectedFolder(next);
                setSelectedIndex(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // no next folder: close carousel
                setSelectedFolder(null);
              }
            }}
            onPrevFolder={() => {
              const idx = Image_Folders.findIndex((f) => f.id === selectedFolder.id);
              if (idx > 0) {
                const prev = Image_Folders[idx - 1];
                setSelectedFolder(prev);
                setSelectedIndex(prev.imageCount > 0 ? prev.imageCount - 1 : 0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // no previous folder: close carousel
                setSelectedFolder(null);
              }
            }}
          />
        ) : (
          <div className="gallery">
            {Image_Folders.map((folder) => (
              <section key={folder.id} className="folder-section">
                <h4 className="folder-title">{folder.label}</h4>
                <div className="thumbnails-row">
                  {Array.from({ length: folder.imageCount }, (_, i) => {
                    const padded = String(i + 1).padStart(2, "0");
                    const src = `${folder.path}/${folder.id}-${padded}.jpg`;
                    return (
                      <img
                        key={src}
                        src={src}
                        alt={`${folder.label} ${i + 1}`}
                        className="thumbnail"
                        loading="lazy"
                        onClick={() => handleThumbnailClick(folder, i)}
                      />
                    );
                  })}
                </div>
              </section>
            ))}

            <div className="pictures-welcome-container">
              <img
                src={randomImage || ""}
                alt="Random picture"
                className="pictures-welcome-image"
              />
              <p className="pictures-welcome-text">
                Welcome to my pictures page, click a folder row to open the carousel
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
