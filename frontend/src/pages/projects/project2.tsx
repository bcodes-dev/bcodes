export default function PigGame() {
  return (
    <iframe
      src={`${process.env.PUBLIC_URL}/projects/02-piggame/index.html`}
      title="Pig Game"
      style={{ width: "100%", height: "calc(100vh - 42px)", border: "none" }}
    />
  );
}
