import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import { Image_Folders } from "../config/imageFolders";
import "./pictures.css";

export default function Pictures() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<typeof Image_Folders[0] | null>(null);
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

  const handleFolderSelect = (folder: typeof Image_Folders[0]) => {
    setSelectedFolder(folder);
    setMenuOpen(false);
  };

  return (
    <div className="pictures-container">
      {/* Header Buttons */}
      <button
        className="pictures-hamburger-button"
        onClick={() => setMenuOpen(!menuOpen)}
        title="Toggle menu"
      >
        <span className="pictures-hamburger-line" />
        <span className="pictures-hamburger-line" />
        <span className="pictures-hamburger-line" />
      </button>

      <button
        className="pictures-header-button"
        style={{ left: "5.5rem", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transform: `translateX(${menuOpen ? 0 : -100}px)` }}
        onClick={() => setModalOpen(true)}
        title="Information"
      >
        i
      </button>

      <button
        className="pictures-header-button"
        style={{ left: "10rem", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transform: `translateX(${menuOpen ? 0 : -100}px)` }}
        onClick={() => navigate("/")}
        title="Back to home"
      >
        ←
      </button>

      {/* Information Modal */}
      {modalOpen && (
        <div className="pictures-modal-overlay" onClick={() => setModalOpen(false)}>
          <div
            className="pictures-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="pictures-modal-text">These are some of my pictures, <br />taken during weekends, walks or both.</p>
            <button
              className="pictures-modal-button"
              onClick={() => setModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Side Menu */}
      <div
        className="pictures-side-menu"
        style={{
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="pictures-menu-header">
        </div>
        <div className="pictures-menu-list">
          {Image_Folders.map((folder) => (
            <button
              key={folder.id}
              className={`pictures-menu-item ${selectedFolder?.id === folder.id ? "active" : ""}`}
              onClick={() => handleFolderSelect(folder)}
            >
              {folder.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay for menu */}
      {menuOpen && (
        <div
          className="pictures-menu-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="pictures-content">
        {selectedFolder ? (
          <ImageCarousel
            folderPath={selectedFolder.path}
            imageCount={selectedFolder.imageCount}
            folderName={selectedFolder.id}
          />
        ) : (
          <div className="pictures-welcome-container">
            <img
              src={randomImage || ""}
              alt="Random picture"
              className="pictures-welcome-image"
            />
            <p className="pictures-welcome-text">
              Welcome to my pictures page, select a folder in the menu on the left
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
