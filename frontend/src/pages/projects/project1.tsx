export default function NumberGuess() {
  return (
    <iframe
      src={`${process.env.PUBLIC_URL}/projects/01-numberguess/index.html`}
      title="Number Guess Game"
      style={{ width: "100%", height: "calc(100vh - 42px)", border: "none" }}
    />
  );
}
