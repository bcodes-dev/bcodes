import "./App.css";

export default function App() {
  return (
    <div
      className="page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        flexDirection: "column",
      }}
    >
      <h1 className="title">Welcome to my page!</h1>
      <p className="welcome-description">
        This web application is a combination of portfolio's so I could practice with programming javascript/typescript and react. Feel free to look around, check out my photo's, recipes or code projects. You can also see the source code for this application on Github.
      </p>
    </div>
  );
}
