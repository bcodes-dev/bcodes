import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";

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
      <Route path="/" element={<App />} />
      <Route path="/recepies" element={<Page title="Recepies!" />} />
      <Route path="/panels" element={<Page title="Panels!" />} />
      <Route path="/pictures" element={<Page title="Pictures!" />} />
      <Route path="/code" element={<Page title="Code!" />} />
    </Routes>
  </HashRouter>
);
