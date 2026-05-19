// import React from "react";
import { motion } from "framer-motion";

// Spinning Card Component
const randomNumber: number = Math.floor((Math.random() * 50)) + 100;

export default function SpinningCard({image} : {image: string}) {
  return (
    <div className="flex items-center justify-center h-min bg-transparent opacity-[25%]">
      <motion.div
        className="rounded-xl shadow-lg flex items-center justify-center text-white text-xl font-bold"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: `${randomNumber}px`,
          height: `${randomNumber * 1.5}px`,
            
          backdropFilter: "blur(10px)",
        }}
        animate={{
          rotateY: [0, 360], // Spin around Y-axis
        }}
        transition={{
          repeat: Infinity,
          duration: Math.floor(Math.random() * (15 - 5 + 1)) + 5,
          ease: "linear",
        }}
      >
      </motion.div>
    </div>
  );
}
