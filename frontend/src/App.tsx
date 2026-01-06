import "./App.css";
import { useNavigate } from "react-router-dom";

const buttons = [
  { title: "Recepies", image: "/images/recepies.jpg", path: "/recepies" },
  { title: "Panels", image: "/images/panels.jpg", path: "/panels" },
  { title: "Pictures", image: "/images/pictures.jpg", path: "/pictures" },
  { title: "Code", image: "/images/code.jpg", path: "/code" },
  { title: "More", image: "/images/more.jpg", path: "/more" },
];

export default function App() {
  const navigate = useNavigate();

  return (
    <div
      className="page"
      style={{
        "--bg-image": `url("/images/main-bg-small.jpg")`,
      } as React.CSSProperties}
    >
      <div className="box">
        {buttons.map(({ title, image, path }) => (
          <button
            key={path}
            className="tile"
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => navigate(path)}
          >
            <span>{title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
