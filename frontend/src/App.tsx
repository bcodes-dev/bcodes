import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Recipes from "./pages/recipes";
import Pictures from "./pages/pictures";

const Page = ({ title }: { title: string }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "3rem",
      color: "white",
    }}
  >
    {title}
  </div>
);

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout><Home /></Layout>} path="/" />
        <Route element={<Layout><Recipes /></Layout>} path="/recipes" />
        <Route element={<Layout><Pictures /></Layout>} path="/pictures" />
        <Route element={<Layout><Page title="Panels" /></Layout>} path="/panels" />
      </Routes>
    </HashRouter>
  );
}
