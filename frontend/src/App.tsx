import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Recipes from "./pages/recipes";
import Pictures from "./pages/pictures";
import Projects from "./pages/projects";
import Project1 from "./pages/projects/project1";
import Project2 from "./pages/projects/project2";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout><Home /></Layout>} path="/" />
        <Route element={<Layout><Recipes /></Layout>} path="/recipes" />
        <Route element={<Layout><Pictures /></Layout>} path="/pictures" />
        {/* <Route element={<Layout><Projects /></Layout>} path="/projects">
          <Route index element={<Project1 />} />
          <Route path="project1" element={<Project1 />} />
          <Route path="project2" element={<Project2 />} />
        </Route> */}
      </Routes>
    </HashRouter>
  );
}
