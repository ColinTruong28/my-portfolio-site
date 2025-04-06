import { motion } from "framer-motion";
import cherry from './cherry.png'

interface PetalProps {
  left: string; // Explicitly defining the type
}

const FallingPetal: React.FC<PetalProps> = ({ left }) => {
  return (
    <motion.img
      src= {cherry}
      alt="Cherry Blossom"
      className="blossom"
      initial={{ y: -100, rotate: 0, opacity: .5 }}
      animate={{ y: "100vh", rotate: 360, opacity: 0.5 }}
      transition={{ duration: Math.random() * 7 + 7, ease: "linear", repeat: Infinity }}
      style={{
        position: "absolute",
        top: 0,
        left,
        width: "30px",
      }}
    />
  );
};

export default FallingPetal;