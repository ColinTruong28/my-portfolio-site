import FallingPetal from "./cherryBlossom";

function CherryBlossoms() {
  const petals = Array.from({ length: 15 }).map(() => ({
    left: Math.random() * window.innerWidth, // Randomize horizontal position
  }));

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {petals.map((petal, index) => (
        <FallingPetal key={index} left={`${petal.left}px`} />
      ))}
    </div>
  );
}

export default CherryBlossoms;