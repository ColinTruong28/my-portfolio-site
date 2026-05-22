declare module '*.css';
import {useState, useEffect} from 'react';
import './App.css';
import { motion } from 'framer-motion';
import Navbar from './components/ui/Navbar.tsx';
import RobotDemo from './images/Robo_Demo.mp4?url'
import SpinningCard from './components/ui/spinningCard.tsx';
import Drawing from './images/Drawing.jpg';
import Headshot from './images/Prof Headshot.jpg';
import Varsity from './images/Varsity.jpg';
// import RobotNod from './images/robot_nod.mp4';
import RobotCircle from './images/robot_circular.mp4';
// import EdgeCase from './images/interesting_edge_case.mp4'
import LiveTracking from './images/live_tracking.mp4';
// import Marquee from "react-fast-marquee";
import Typewriter from 'typewriter-effect';
import CherryBlossoms from './components/ui/cherryBlossoms';
// import AboutMe from "./AboutMe.tsx";
// import Resolution from './images/Resolution.png';
// import Resolution_example_homepage from './images/Resolution_example_homepage.png';
// import Resolution_example_recordpage from './images/Resolution_example_recordpage.png';
import April_tag_tracking from './images/Computer_Vision_PID_Following.gif?url';
import Hysteresis_IMU     from './images/Hysteresis_IMU.gif?url';
import PID_turn           from './images/PID_turn.gif?url';
import FiveBarDemo        from './images/FiveBarDemo.mp4?url';
import SolidworksFiveBar  from './images/Solidworks_FiveBar_Demo.mp4?url';
import StressedBar        from './images/Bar_Stress_Analysis.png?url';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PillToggle, type ProjectCategory } from './components/ui/ProjectToggle';
import NextProjectButton from './components/ui/NextProjectButton';
import AboutSection from './AboutMe.tsx';
import ProjectShowcase from './ProjectShowcase.tsx';
import Footer from './Footer.tsx';
import Dashboard_Walkthrough from './images/iBank/Dashboard_Walkthrough.mp4';
import Basic_Landing_and_Login from './images/iBank/Basic_Landing_and_Login.mp4';
import Management from './images/iBank/Management.mp4';
import Additional_Features from './images/iBank/Additional_Features.mp4';
import Role_Based_Viewing from './images/iBank/Role_Based_Viewing.mp4';
import Work_Flow from './images/iBank/Work_Flow.mp4';
import Home from './images/iBank/Page.png';
import Global from './images/Global Lab/GlobalLab.png';
import Global_AI from './images/Global Lab/Global_AI.mp4';
import Global_XR from './images/Global Lab/Global_XR.mp4';
import Audio_Podcasts from './images/Global Lab/Audio_Podcasts.mp4';
import Mapping from './images/Global Lab/Mapping.mp4';
import About from './images/Global Lab/About.mp4';
import Events_Resouces from './images/Global Lab/Events_Resources.mp4';


function App() {

  // scrollPosition can be used to track the user's position within the webpage
    const [scrollPosition, setScrollPosition] = useState(0);
    const [projectCategory, setProjectCategory] = useState<ProjectCategory>('robotics');
    const [autoFall, setAutoFall] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          // This is the magic: it waits 0.3s between each child's animation
          staggerChildren: 3, 
          delayChildren: 2,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" as const },
      },
    };

    const flickerLifeVariant = {
      hidden: { 
        opacity: 0,
        color: "#444",
        textShadow: "0 0 0px rgba(0,0,0,0)"
      },
      visible: {
        // Rapid stutter: Off -> Bright -> Dim -> Bright -> Steady
        opacity: [0, 1, 0.4, 1, 0.8, 1],
        color: ["#444", "#fff", "#888", "#fff", "#aaa", "#fff"],
        textShadow: [
          "0 0 0px rgba(0,0,0,0)",
          "0 0 15px #fff, 0 0 30px #d4af37", // First spark
          "0 0 2px #fff, 0 0 5px #d4af37",   // Struggle
          "0 0 20px #fff, 0 0 40px #d4af37", // Second spark
          "0 0 5px #fff, 0 0 10px #d4af37",  // Dip
          "0 0 7px #fff, 0 0 20px #d4af37"   // Final Steady Glow
        ],
        transition: {
          duration: 0.8, // Fast, punchy ignition
          times: [0, 0.1, 0.2, 0.3, 0.4, 1], 
          ease: "easeInOut" as const,
        }
      }
    };


    

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, {passive: true});
      // --- Auto-Fall Logic (The "Clock") ---
      let frameId: number;
      const speed = 1.5; // Pixels per frame
      const limit = window.innerHeight + 3000; // Reset point

      const animate = () => {
        setAutoFall((prev) => (prev + speed) % limit);
        frameId = requestAnimationFrame(animate); 
      };

      frameId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(frameId);
      };

    }, []); 


    // Example labels for each slide
    // const fiveBarSlideLabels = [
    //   'Design',
    //   'Analysis',
    //   'Demo'
    // ];

    // const embeddedSlideLabels = [
    //   'Demo',
    //   'Schematic',
    //   'Code'
    // ];

    // const romiLabels = [
    //   'Computer Vision',
    //   'Hysteresis IMU',
    //   'PID Driven Turns'
    // ];
    
  return (
    <main>
      <Navbar />

      {/* Title */}
      <section className="title-screen relative" 
          style={{opacity: 1-scrollPosition/200, pointerEvents: 'none'}}
       >
        <div className = "cherryBlossom-wrapper">
          <CherryBlossoms></CherryBlossoms>
        </div>

        <div className = "shadow-overlay"></div>
        
        <div className="title">
          
          <h1 className="name-card">Colin Truong</h1>
          <div className="typewriter-text">
            <Typewriter options={{
              strings: ["Software Engineer", "Web Developer", "Robotics Engineer"],
              autoStart: true,
              loop: true,
              delay: 250,
            }} />
          </div>
        </div>
        <div className="intro-info" style={{pointerEvents: 'none',}}>
          <h3 className="sub-info">WPI Undergrad Student</h3>
          <h3 className="sub-info">Robotic Engineering</h3>
          <h3 className="sub-info">Global Lab Web Developer</h3>
          <h3 className="sub-info">Computer Science</h3>
        </div>
      </section>


{/* -------ABOUT ME --------------------------*/}
      <section className = "about-me" id="about-me">
        <div className = "about-card-container">
          <div 
          id = "card-1"
          style={{transform: `translateY(${scrollPosition * .2 + autoFall*.53 - 700}px)`}}
          >
            <SpinningCard image={Drawing}></SpinningCard>
          </div>
          <div 
          id = "card-2"
          style={{transform: `translateY(${scrollPosition * .2 + autoFall*.55 - 600}px)`}}
          >
            <SpinningCard image = {Headshot}></SpinningCard>
          </div>
          <div 
          id = "card-3"
          style={{transform: `translateY(${scrollPosition * .2 + autoFall*.5 - 800}px)`}}>
            <SpinningCard image = {Varsity}></SpinningCard>
          </div>
        </div>

        <div className='about-description'>
            <motion.div 
            className='about-neon-sign'
            variants={flickerLifeVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: "-350px 0px"}}
            >
            About Me
            </motion.div>
            <motion.div 
              className='about-text'
              variants={containerVariants}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: .6 }}
              
            >
                <motion.p variants={itemVariants}>Over the last three years I have been honing my leadership skills through projects and programs where I can have an impact on my surrounding communities.</motion.p>
                <motion.p variants={itemVariants}>I have been working at the WPI Global Lab, spearheading a full visual and thematic overhaul of the website to show the evolving student initiatives and faculty research.</motion.p>
                <motion.p variants={itemVariants}>In my collegiate career, I have been active in the Society of Asian Scientists and Engineers as President and Events Coordinator, increasing active-membership by 63% through the organization of 50+ events yearly, winning National Overall Strongest Chapter of 2025.</motion.p>
                <motion.p variants={itemVariants}>I also act as a Volunteer Manager for the Pan Asian Association, coordinating a 1000+ attendee, six-figure event with 100+ unique volunteers and 10+ student organizations.</motion.p>
                
                
            </motion.div>

            <AboutSection />
          
        </div>
        

      </section>  


      <section id="projects" className="w-full relative">
        <div className="relative z-10">
          {/* Section heading + toggle */}
          <div className="max-w-[85vw] mx-auto pt-20 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white font-mono mb-1 text-start">
                Selected Work
              </p>
              <h2
                className="text-5xl md:text-6xl text-[rgb(255,118,237)] text-start"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  textShadow: '0 0 3ch rgba(255,202,248,1), 0 0 40px rgba(255,202,248,1)',
                  filter: 'brightness(1.5)', 
                }}
              >
                Projects
              </h2>
            </div>

            {/* ── CHOOSE ONE TOGGLE STYLE ── */}
            {/* Option A — Bookshelf (wrap in relative so the shelf plank positions correctly) */}
            {/* <div className="relative pb-8">
              <BookshelfToggle active={projectCategory} onChange={setProjectCategory} />
            </div> */}

            {/* Option B — Pill (comment out Option A and uncomment this) */}
            <PillToggle active={projectCategory} onChange={setProjectCategory} />
          </div>

          {/* ── ROBOTICS projects ── */}
          {projectCategory === 'robotics' && (
            <>
              <div id="project-robot-arm">
                <ProjectShowcase
                  title="4-DOF Sorting Arm"
                  subtitle="Robotic Pick & Place System"
                  tags={['MATLAB', 'Computer Vision', 'Inverse Kinematics', 'Trajectory Planning', 'DH Parameters']}
                  links={[
                    { label: 'GitHub', href: 'https://github.com/ColinTruong28/4DOF_Robotic_Pick_and_Sort_Arm', icon: 'github' },
                    { label: 'Demo Video', href: 'https://1drv.ms/v/c/4c41deb30d8da158/IQBDqC8neL1ERKCWuSNBDAwbAaeO1dqa1RB0J1XMKX_Zou4', icon: 'external' },
                  ]}
                  slides={[
                    {
                      label: 'Pick & Place',
                      description: 'The full autonomous sorting pipeline: a top-down camera detects colored balls via color-threshold masking, extracts centroids with connected-component analysis, and converts pixel coordinates into world-frame positions through intrinsic calibration and a geometric correction that accounts for the camera\'s viewing angle and ball radius.',
                      mediaSrc: RobotDemo,
                      mediaType: 'video',
                    },
                    {
                      label: 'Trajectory Planning',
                      description: 'Quintic and cubic trajectory generators produce smooth, jerk-limited joint-space paths. The Jacobian is monitored throughout — if its determinant drops below a threshold, an E-stop fires to avoid singularities.',
                      mediaSrc: RobotCircle,
                      mediaType: 'video',
                    },
                    {
                      label: 'Live Ball Tracking',
                      description: 'A real-time vision loop streams frames from the calibrated webcam, segments the red ball by hue threshold, and applies the checkerboard-to-robot frame transform on every tick for closed-loop tracking.',
                      mediaSrc: LiveTracking,
                      mediaType: 'video',
                    },
                  ]}
                />
              </div>

              <div id="project-autonomous-robot">
                <ProjectShowcase
                  flip
                  title="Autonomous Robot"
                  subtitle="Multi-Sensor PID"
                  tags={['C++', 'ROS', 'Computer Vision', 'PID Control', 'IMU']}
                  links={[{ label: 'GitHub', href: 'https://github.com/ColinTruong28/RBE2002?tab=readme-ov-file', icon: 'github' }]}
                  slides={[
                    { label: 'AprilTag Tracking', description: 'A camera-based PID loop locks onto AprilTag fiducials and drives the robot toward the target, compensating for distance and angular offset in real time.', mediaSrc: April_tag_tracking, mediaType: 'image' },
                    { label: 'IMU Hysteresis', description: 'A hysteresis filter on the IMU data smooths heading estimates, preventing oscillation during slow drift-prone straight-line driving.', mediaSrc: Hysteresis_IMU, mediaType: 'image' },
                    { label: 'PID Tuning', description: 'Closed-loop PID turns were tuned iteratively to achieve ±2° accuracy at various angular setpoints without overshoot.', mediaSrc: PID_turn, mediaType: 'image' },
                  ]}
                />
              </div>

              <div id="project-five-bar">
                <ProjectShowcase
                  title="Shelf Sorting Arm"
                  subtitle="Five-Bar Linkage"
                  tags={['SolidWorks', 'FEA', 'Kinematics', 'Mechanical Design']}
                  slides={[
                    { label: 'CAD Design', description: 'Parametric linkage geometry designed in SolidWorks with full constraint-based assembly.', mediaSrc: SolidworksFiveBar, mediaType: 'video' },
                    { label: 'Stress Analysis', description: 'FEA run on the most heavily loaded bar under worst-case payload conditions to confirm factor-of-safety margins.', mediaSrc: StressedBar, mediaType: 'image' },
                    { label: 'Physical Demo', description: 'The fabricated arm demonstrates the full workspace trajectory with sub-centimeter repeatability.', mediaSrc: FiveBarDemo, mediaType: 'video' },
                  ]}
                />
              </div>
            </>
          )}

          {/* ── SOFTWARE projects ── (add your software ProjectShowcase entries here) */}
          {projectCategory === 'software' && (
            <>
              <div id="software-iBank">
                <ProjectShowcase
                  title="iBank | Hanover Insurance Group"
                  subtitle="Content Management System"
                  tags={['PERN Stack', 'Tailwind CSS', 'TypeScript', 'MUI', 'Prisma ORM', 'Supabase']}
                  links={[
                    { label: 'GitHub', href: 'https://github.com/CS3733-D26-Team-G/teamg-app', icon: 'github' },
                    { label: 'User Manual', href: 'https://drive.google.com/file/d/19Nz3Dnpj9h3_d5ZIMQhlT8DByg3Pf82e/view?usp=sharing', icon: 'external'}
                  ]}
                  slides={[
                    { label: 'Overview',     description: 'A robust, centralized content management platform designed for the Hanover Insurance Group to streamline policy documentation, claims processing, and agent workflows. This application also includes user and role management system, login authentication, data analytics, notification calendar, language toggle, and a customizable dashboard.',      mediaSrc: Home,   mediaType: 'image' },
                    { label: 'Login',     description: 'Secure authentication gateway ensuring compliance, data privacy, and protected access to sensitive policyholder information.',      mediaSrc: Basic_Landing_and_Login,   mediaType: 'video' },
                    { label: 'Dashboard',  description: 'A customizable data analytics hub surfacing real-time performance metrics, open claims trends, and critical operational KPIs for quick executive insights.',         mediaSrc: Dashboard_Walkthrough, mediaType: 'video' },
                    { label: 'Management',  description: 'An administrative core for handling full CRUD operations over insurance content, system users, and centralized documentation for various insurance claims. The content managment system was the brunt of this application so it features the ability to check in and out content to prevent simoultaneous edits, a timeline of all actions, and an annotation feature for any and all documents.',         mediaSrc: Management, mediaType: 'video' },
                    { label: 'Role Based Viewing',  description: 'Granular role-based access control (RBAC) filtering UI elements and data exposure differently for Agents, Underwriters, and System Admins. There are a total of 8 possible user roles with varying levels of permissions.',         mediaSrc: Role_Based_Viewing, mediaType: 'video' },
                    { label: 'Work Flow',  description: 'An optimized, end-to-end operational pipeline showcasing how a claim or policy document moves from initial submission through an agent through internal underwriting review where it can be approved by system admins.',         mediaSrc: Work_Flow, mediaType: 'video' },
                    { label: 'Additional Features',  description: 'Advanced platform capabilities: User specific profile customization, notifications, recent activity page, expiration and notofication calendar, interactive tutorial/guide, language toggle, and voice control.',         mediaSrc: Additional_Features, mediaType: 'video' },

                  ]}
                />
              </div>

              <div id="software-global-lab">
                <ProjectShowcase
                  title="WPI Global Lab Website"
                  subtitle="WPI Global Lab"
                  tags={['WordPress', 'Divi 5', 'UI/UX', 'Figma']}
                  links={[
                    { label: 'Website Link', href: 'https://global-lab.wpi.edu/', icon: 'external'}
                  ]}
                  slides={[
                    { label: 'Overview',     description: 'A robust, centralized content management platform designed for the Hanover Insurance Group to streamline policy documentation, claims processing, and agent workflows. This application also includes user and role management system, login authentication, data analytics, notification calendar, language toggle, and a customizable dashboard.',      mediaSrc: Global,   mediaType: 'image' },
                    { label: 'Global AI',     description: 'Secure authentication gateway ensuring compliance, data privacy, and protected access to sensitive policyholder information.',      mediaSrc: Global_AI,   mediaType: 'video' },
                    { label: 'Global XR',  description: 'A customizable data analytics hub surfacing real-time performance metrics, open claims trends, and critical operational KPIs for quick executive insights.',         mediaSrc: Global_XR, mediaType: 'video' },
                    { label: 'Audio and Podcasting',  description: 'An administrative core for handling full CRUD operations over insurance content, system users, and centralized documentation for various insurance claims. The content managment system was the brunt of this application so it features the ability to check in and out content to prevent simoultaneous edits, a timeline of all actions, and an annotation feature for any and all documents.',         mediaSrc: Audio_Podcasts, mediaType: 'video' },
                    { label: 'Mapping',  description: 'An optimized, end-to-end operational pipeline showcasing how a claim or policy document moves from initial submission through an agent through internal underwriting review where it can be approved by system admins.',         mediaSrc: Mapping, mediaType: 'video' },
                    { label: 'About Page',  description: 'Advanced platform capabilities: User specific profile customization, notifications, recent activity page, expiration and notofication calendar, interactive tutorial/guide, language toggle, and voice control.',         mediaSrc: About, mediaType: 'video' },
                    { label: 'Events & Resources',  description: 'Advanced platform capabilities: User specific profile customization, notifications, recent activity page, expiration and notofication calendar, interactive tutorial/guide, language toggle, and voice control.',         mediaSrc: Events_Resouces, mediaType: 'video' },

                  ]}
                />
              </div>

              
            </>
          )}
        </div>

        {/* Sticky next-project button — renders globally, detects position automatically */}
        <NextProjectButton category={projectCategory} />
      </section>    
      

      <section className="footer">
          <Footer />
      </section>
      
    </main>
  )
}

export default App


