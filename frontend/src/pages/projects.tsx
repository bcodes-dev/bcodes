import { NavLink, Outlet } from "react-router-dom";
import "./projects.css";

export default function Projects() {
  return (
    <div className="projects-container">
      <nav className="projects-sidebar">
        <h2 className="projects-sidebar-title">Projects</h2>
        <NavLink
          to="project1"
          className={({ isActive }) => `project-nav-item${isActive ? " active" : ""}`}
        >
          Number Guess
        </NavLink>
        <NavLink
          to="project2"
          className={({ isActive }) => `project-nav-item${isActive ? " active" : ""}`}
        >
          Pig Game
        </NavLink>
      </nav>
      <div className="projects-content">
        <Outlet />
      </div>
    </div>
  );
}
