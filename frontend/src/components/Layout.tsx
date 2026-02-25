import "./Layout.css";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <nav className="navbar">
          <button onClick={() => navigate("/")} className="nav-item">Home</button>
          <button onClick={() => navigate("/recipes")} className="nav-item">Recipes</button>
          <button onClick={() => navigate("/pictures")} className="nav-item">Pictures</button>
          <button onClick={() => navigate("/panels")} className="nav-item">Panels</button>
          </nav>
          <main className="main-content">{children}</main>
      </div>
  );
}
