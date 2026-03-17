// src/components/AutoRomiShowcase.tsx
import ReusableTabs from "../components/reusableTabs";
import "./AutoRomiShowcase.css"
// Import your project assets
import April_tag_tracking from '../images/Computer_Vision_PID_Following.gif?url';
import Hysteresis_IMU from '../images/Hysteresis_IMU.gif?url';
import PID_turn from '../images/PID_turn.gif?url';

export default function AutoRomiShowcase() {
  const romiProjectData = [
    {
      id: "tracking",
      name: "AprilTag Tracking",
      content: (
        <div className="media-container mt-4 overflow-hidden rounded-xl border border-zinc-800">
          <img src={April_tag_tracking} alt="AprilTag Tracking" className="standard-media w-full object-cover" />
        </div>
      ),
    },
    {
      id: "imu",
      name: "IMU Hysteresis",
      content: (
        <div className="media-container mt-4 overflow-hidden rounded-xl border border-zinc-800">
          <img src={Hysteresis_IMU} alt="IMU Hysteresis" className="standard-media w-full object-cover" />
        </div>
      ),
    },
    {
      id: "pid",
      name: "PID Tuning",
      content: (
        <div className="media-container mt-4 overflow-hidden rounded-xl border border-zinc-800">
          <img src={PID_turn} alt="PID Turn" className="standard-media w-full object-cover" />
        </div>
      ),
    },
  ];

  return (
    <div className="auto-romi-display-card">
      <ReusableTabs items={romiProjectData} />
    </div>
  );
}