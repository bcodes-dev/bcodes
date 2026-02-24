import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Recepies from "./pages/recepies";
import Pictures from "./pages/pictures";
import Layout from "./components/Layout";

const Page = ({ title }: { title: string }) => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "3rem",
    backgroundColor: "#222",
    color: "white"
  }}>
    {title}
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <HashRouter>
    <Routes>
      <Route element={<Layout><App /></Layout>} path = "/" />
      <Route element={<Layout><Recepies /></Layout>} path = "/recepies" />
      <Route element={<Layout><Pictures /></Layout>} path = "/pictures" />
      <Route element={<Layout><Page title="Panels" /></Layout>} path = "/panels" />
    </Routes>
  </HashRouter>
);
