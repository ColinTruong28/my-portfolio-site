// src/components/AutoRomiShowcase.tsx
import ReusableTabs from "../components/reusableTabs";
import "./FiveBarShowcase.css"
// Import your project assets
import FiveBarDemo from '../images/FiveBarDemo.mp4?url';
import SolidworksFiveBarDemo from '../images/Solidworks_FiveBar_Demo.mp4?url';
import StressedBar from '../images/Bar_Stress_Analysis.png?url';

export default function FiveBarShowcase() {
  const fiveBarProjectData = [
    {
      id: "design",
      name: "Design",
      content: (
        <div className="media-container mt-4 overflow-hidden rounded-xl border border-zinc-800">
          <video autoPlay loop src={SolidworksFiveBarDemo} className="standard-media w-full object-cover" />
        </div>
      ),
    },
    {
      id: "analysis",
      name: "Analysis",
      content: (
        <div className="media-container mt-4 overflow-hidden rounded-xl border border-zinc-800">
          <img src={StressedBar} alt="Stress Analysis" className="standard-media w-full object-cover" />
        </div>
      ),
    },
    {
      id: "demo",
      name: "Demo",
      content: (
        <div className="media-container mt-4 overflow-hidden rounded-xl border border-zinc-800">
          <video autoPlay loop muted src={FiveBarDemo} className="w-full object-cover standard-media" />
        </div>
      ),
    },
  ];

  return (
    <div className="five-bar-display-card">
      <ReusableTabs items={fiveBarProjectData} />
    </div>
  );
}