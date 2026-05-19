import { useMemo } from "react"; 
import FallingPetal from "./cherryBlossom";

function CherryBlossoms() {
  const petals = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      left: Math.random() * window.innerWidth,
      delay: Math.random() * 20, // Add a random start delay for variety
      duration: Math.random() * 10 + 7 // Randomize speed here instead of inside the child
    }));
  }, []);

  return (
    <div style={{ position: "absolute", width: "100vw", height: "100vh", overflow: "hidden", pointerEvents: "none" }}>
      {petals.map((petal, index) => (
        <FallingPetal 
          key={index} 
          left={`${petal.left}px`} 
        />
      ))}
    </div>
  );
}

export default CherryBlossoms;