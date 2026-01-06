import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import { IMAGE_FOLDERS } from "../config/imageFolders";

export default function Pictures() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<typeof IMAGE_FOLDERS[0] | null>(
    IMAGE_FOLDERS.length > 0 ? IMAGE_FOLDERS[0] : null
  );

  const handleFolderSelect = (folder: typeof IMAGE_FOLDERS[0]) => {
    setSelectedFolder(folder);
    setMenuOpen(false);
  };

  return (
    <div style={styles.container}>
      {/* Header Buttons */}
      <button
        style={styles.hamburgerButton}
        onClick={() => setMenuOpen(!menuOpen)}
        title="Toggle menu"
      >
        <span style={styles.hamburgerLine} />
        <span style={styles.hamburgerLine} />
        <span style={styles.hamburgerLine} />
      </button>

      <button
        style={{ ...styles.headerButton, left: "4.5rem", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transform: `translateX(${menuOpen ? 0 : -100}px)` }}
        onClick={() => setModalOpen(true)}
        title="Information"
      >
        i
      </button>

      <button
        style={{ ...styles.headerButton, left: "7.5rem", opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transform: `translateX(${menuOpen ? 0 : -100}px)` }}
        onClick={() => navigate("/")}
        title="Back to home"
      >
        ←
      </button>

      {/* Information Modal */}
      {modalOpen && (
        <div style={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={styles.modalText}>These are some of my pictures, <br />taken during weekends, walks or both.</p>
            <button
              style={styles.modalButton}
              onClick={() => setModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Side Menu */}
      <div
        style={{
          ...styles.sideMenu,
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div style={styles.menuHeader}>
          <h2></h2>
        </div>
        <div style={styles.menuList}>
          {IMAGE_FOLDERS.map((folder) => (
            <button
              key={folder.id}
              style={{
                ...styles.menuItem,
                backgroundColor:
                  selectedFolder?.id === folder.id ? "#007bff" : "transparent",
              }}
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
          style={styles.menuOverlay}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div style={styles.content}>
        {selectedFolder ? (
          <ImageCarousel
            folderPath={selectedFolder.path}
            imageCount={selectedFolder.imageCount}
            folderName={selectedFolder.id}
          />
        ) : (
          <div style={styles.emptyState}>
            <h1>No albums available</h1>
            <p>Please add folders to the configuration</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    overflow: "hidden",
    width: "100%",
  },
  hamburgerButton: {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "2.5rem",
    height: "2.5rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    zIndex: 1001,
    padding: "0.5rem",
  },
  headerButton: {
    position: "fixed",
    top: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    zIndex: 1001,
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
  },
  hamburgerLine: {
    width: "100%",
    height: "3px",
    backgroundColor: "#fff",
    borderRadius: "2px",
    transition: "all 0.3s",
  },
  sideMenu: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "280px",
    height: "100vh",
    backgroundColor: "#222",
    boxShadow: "2px 0 10px rgba(0,0,0,0.5)",
    zIndex: 1000,
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    flexDirection: "column",
  },
  menuHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem",
    borderBottom: "1px solid #444",
    gap: "1rem",
  },
  menuList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "1rem",
    overflowY: "auto",
  },
  menuItem: {
    padding: "0.75rem 1rem",
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "left",
    fontSize: "1rem",
  },
  menuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  content: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: "1rem",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#222",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "2rem",
    gap: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "300px",
  },
  modalText: {
    fontSize: "1.2rem",
    margin: "0",
    textAlign: "center",
  },
  modalButton: {
    padding: "0.75rem 2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s",
  },
};