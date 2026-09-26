import {useState, useEffect, useRef} from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import { setLenis, setSnap, smoothScrollTo, scrollToAboutMe } from './lib/lenis';
import { debounce } from './lib/debounce';
import './App.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './components/ui/ScrollReveal.tsx';
import Navbar from './components/ui/Navbar.tsx';
import RobotDemo from './images/Robo_Demo.mp4?url'
// import SpinningCard from './components/ui/spinningCard.tsx';
// import Drawing from './images/Drawing.jpg';
// import Headshot from './images/Prof Headshot.jpg';
// import Varsity from './images/Varsity.jpg';
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
import SolidworksFiveBar  from './images/Solidworks_Fivebar_Demo.mp4?url';
import StressedBar        from './images/Bar_Stress_Analysis.png?url';
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
import ParticleBackground from './components/ui/ParticleBackground.tsx';

function App() {

    const [projectCategory, setProjectCategory] = useState<ProjectCategory>('robotics');

    // Hero stays pinned while the shadow slab rises over it. Driven off
    // absolute page scroll so both values share one unambiguous source.
    const heroScrollRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    // .hero-scroll is 260vh tall, so the hero stays pinned for 160vh of scroll.
    const [pinDistance, setPinDistance] = useState(1600);
    useEffect(() => {
      const measure = () => setPinDistance(window.innerHeight * 1.6);
      measure();
      const onResize = debounce(measure, 150);
      window.addEventListener('resize', onResize);
      return () => {
        onResize.cancel();
        window.removeEventListener('resize', onResize);
      };
    }, []);
    // Ends at -50%: far enough for the slab's solid section to clear the top of
    // the viewport, but not so far that its bottom edge rises above the bottom
    // of the viewport and re-exposes the hero underneath.
    const shadowRiseY = useTransform(scrollY, [0, pinDistance], ['100%', '-50%'], { clamp: true });

    // "About Me" neon sign: the flicker is scrubbed by scroll position rather
    // than fired once on entry, so it reads correctly scrolling either way.
    // Measured against the sign itself. It stays dark until it reaches the
    // vertical middle of the screen (50%), then flickers on as it travels up
    // to 18% — so the whole animation plays out in the centre of the viewport.
    const neonRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: aboutProgress } = useScroll({
      target: neonRef,
      offset: ['start 0.5', 'start 0.18'],
    });
    // Stutters on like a failing neon tube, scrubbed by scroll rather than timed.
    const neonOpacity = useTransform(
      aboutProgress,
      [0, 0.22, 0.30, 0.42, 0.50, 0.62, 0.70, 0.85],
      [0, 1, 0.2, 1, 0.35, 1, 0.65, 1]
    );


    // Smooth wheel/trackpad scrolling. Kept in its own isolated effect so it
    // can be removed independently if it ever conflicts with page scroll.
    useEffect(() => {
      const lenis = new Lenis();
      setLenis(lenis);

      // Soft centering assist. 'proximity' only nudges when you come to rest
      // near a target, so free scrolling is never captured or blocked.
      const snap = new Snap(lenis, {
        type: 'proximity',
        // Only corrects near-misses: stopping within 20% of the viewport height
        // of a target aligns it, anything further is left where you put it.
        distanceThreshold: '20%',
        duration: 0.6,
        debounce: 350,
      });
      setSnap(snap);

      let frameId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };
      frameId = requestAnimationFrame(raf);
      return () => {
        cancelAnimationFrame(frameId);
        setSnap(null);
        snap.destroy();
        setLenis(null);
        lenis.destroy();
      };
    }, []);

    useEffect(() => {
      let t: ReturnType<typeof setTimeout> | undefined;
      const id = window.location.hash.slice(1);
      if (id) {
        const SOFTWARE_IDS = ['software-iBank', 'software-global-lab'];
        if (SOFTWARE_IDS.includes(id)) setProjectCategory('software');

        t = setTimeout(() => {
          if (id === 'about-me') return scrollToAboutMe();
          const el = document.getElementById(id);
          if (el) smoothScrollTo(el);
        }, 150);
      }

      // Editing the hash in the address bar doesn't reload, so the browser
      // does its own jump to the section's top edge (blank clearance). Redirect it.
      const onHashChange = () => {
        if (window.location.hash === '#about-me') scrollToAboutMe();
      };
      window.addEventListener('hashchange', onHashChange);

      return () => {
          if (t) clearTimeout(t);
          window.removeEventListener('hashchange', onHashChange);
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

      {/* Title — the wrapper supplies the scroll distance the pinned hero
          stays put for while the shadow rises over it. */}
      <div className="hero-scroll" ref={heroScrollRef}>
      <section className="title-screen relative"
          style={{pointerEvents: 'none'}}
       >
        <div className = "cherryBlossom-wrapper">
          <CherryBlossoms></CherryBlossoms>
        </div>

        <div className = "shadow-overlay"></div>

        <motion.div className="shadow-rise" style={{ y: shadowRiseY }} />

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
          <h3 className="sub-info text-right">Robotic Engineering</h3>
          <h3 className="sub-info">Global Lab Web Developer</h3>
          <h3 className="sub-info text-right">Computer Science</h3>
        </div>
      </section>
      </div>


{/* -------ABOUT ME --------------------------*/}
      <section className = "about-me relative" id="about-me">
        <ParticleBackground />
        {/* <div className = "about-card-container">
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
        </div> */}

        <div className='about-description'>
            <motion.div
            ref={neonRef}
            id="about-neon"
            className='about-neon-sign'
            style={{ opacity: neonOpacity }}
            >
            About Me
            </motion.div>
            <div className='about-text'>
                <ScrollReveal from="left"><p>Over the last three years I have been honing my leadership skills through projects and programs where I can have an impact on my surrounding communities.</p></ScrollReveal>
                <ScrollReveal from="right"><p>This past summer, I interned at an Autologous Cell Therapy Manufacturing company in Automation and Manufacturing Systems where I got the priveledge of building and integrating custom AI agents and building manufacturing automation pipelines.</p></ScrollReveal>
                <ScrollReveal from="left"><p>I have been working at the WPI Global Lab, spearheading a full visual and thematic overhaul of the website to show the evolving student initiatives and faculty research.</p></ScrollReveal>
                <ScrollReveal from="right"><p>In my collegiate career, I have been active in the Society of Asian Scientists and Engineers as President and Events Coordinator, increasing active-membership by 63% through the organization of 50+ events yearly, winning National Overall Strongest Chapter of 2025.</p></ScrollReveal>
            </div>

            <ScrollReveal from="left"><AboutSection /></ScrollReveal>
          
        </div>
        

      </section>  


      <section id="projects" className="w-full relative">
        <ParticleBackground></ParticleBackground>

        <div className="relative z-10">
          {/* Section heading + toggle */}
          <ScrollReveal from="left" className="max-w-[85vw] mx-auto pt-12 sm:pt-20 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white font-mono mb-1 text-start">
                Selected Work
              </p>
              <h2
                className="text-5xl md:text-6xl text-[rgb(255,118,237)] text-start"
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  textShadow: '0 0 3ch rgba(255,202,248,1), 0 0 40px rgba(255,202,248,1)',
                  filter: 'brightness(1.5)', 
                }}
              >
                Projects
              </h2>
            </div>

            
            <PillToggle active={projectCategory} onChange={setProjectCategory} />
          </ScrollReveal>

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
                    { label: 'Overview',     description: 'As a part of the WPI Global Lab, I was tasked with completely reimaging their website to the evolving technologies and impact WPI has around the world.',      mediaSrc: Global,   mediaType: 'image' },
                    { label: 'Global AI',     description: 'This page features the AI resources provided by the Global Lab to students and faculty towards their global projects and research. To this end, the page also showcases previous instances of projects and impact where AI was leveraged to support endeavors.',      mediaSrc: Global_AI,   mediaType: 'video' },
                    { label: 'Global XR',  description: 'This page features all resources and global projects related to XR imaging including VR, AR, photography, and video production. There are many different ways to showcase different projects around the globe and the purpose of this page is to enable students to be more creative in how they document their impact.',         mediaSrc: Global_XR, mediaType: 'video' },
                    { label: 'Audio and Podcasting',  description: 'With the rise of podcasting as a medium to showcase ideas, this page is meant to provide students with a venue to experience with audio capturing and storytelling. Here there are many resources to provide students with the means to capture audio for purposes such as interview, sound analysis, or documentation.',         mediaSrc: Audio_Podcasts, mediaType: 'video' },
                    { label: 'Mapping',  description: 'With the WPI Global Projects program as big and expansive as it is, this page provides insight to the different ways to display and analyze the various environments that students and faculty will travel through around the world. This page also showcases a few of the impressive projects conducted on the Worcester area including a VR recreation of the WPI campus on a heat map analysis on the city of Worcester.',         mediaSrc: Mapping, mediaType: 'video' },
                    { label: 'About Page',  description: 'Standard about page explaining the Global Labs purpose, the staff, the fellows, and the programs the lab offers to both students and faculty.',         mediaSrc: About, mediaType: 'video' },
                    { label: 'Events & Resources',  description: 'A central hub that houses all available resources provided at the global lab as well as featured upcoming events students and faculty may be interested in attending.',         mediaSrc: Events_Resouces, mediaType: 'video' },

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
          <ScrollReveal from="left"><Footer /></ScrollReveal>
      </section>
      
    </main>
  )
}

export default App