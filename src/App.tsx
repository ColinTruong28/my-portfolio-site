declare module '*.css';
import {useState, useEffect} from 'react';
import './App.css';
import Navbar from './Navbar';
import Collapsible from 'react-collapsible';
import Typewriter from 'typewriter-effect';
import CherryBlossoms from './cherryBlossoms';
import AboutMe from "./AboutMe.tsx";
import AutoRomiShowcase from './projectShowcases/AutoRomiShowcase';
import FiveBarShowcase from './projectShowcases/FiveBarShowcase';
import { HiPencilAlt } from "react-icons/hi";
import { PiPhoneCallFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import Resolution from './images/Resolution.png';
import Resolution_example_homepage from './images/Resolution_example_homepage.png';
import Resolution_example_recordpage from './images/Resolution_example_recordpage.png';
import { FaGithub } from "react-icons/fa";
// import EmbeddedSchematic from './images/Embedded_PI_Motor_Controller_Schematic.png?url'
// Import Swiper components
// Import required modules
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



function App() {

  // scrollPosition can be used to track the user's position within the webpage
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeCollapsibleIndex, setActiveIndex] = useState<number | null>(null);
  const [openCollapsibleOne, setCollapsibleOne] = useState(true);
  const [openCollapsibleTwo, setCollapsibleTwo] = useState(false);
  const [openCollapsibleThree, setCollapsibleThree] = useState(false);

      const handleScroll = () => {
          const position = window.pageYOffset;
          setScrollPosition(position);
      };

      const handleOpen = (index: number) => {
        setActiveIndex(index);
        if (index == 1) {
          setCollapsibleOne(true);
          setCollapsibleTwo(false);
          setCollapsibleThree(false);
        } else if (index == 2) {
          setCollapsibleOne(false);
          setCollapsibleTwo(true);
          setCollapsibleThree(false);
        } else {
          setCollapsibleOne(false);
          setCollapsibleTwo(false);
          setCollapsibleThree(true);
        }
      };
  
      useEffect(() => {
          window.addEventListener('scroll', handleScroll, {passive: true});
      
  
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  
      }, []); 


    // Example labels for each slide
    const fiveBarSlideLabels = [
      'Design',
      'Analysis',
      'Demo'
    ];

    // const embeddedSlideLabels = [
    //   'Demo',
    //   'Schematic',
    //   'Code'
    // ];

    const romiLabels = [
      'Computer Vision',
      'Hysteresis IMU',
      'PID Driven Turns'
    ];
    
  return (
    <main>
      <Navbar />

      {/* Title */}
      <section className="title-screen" 
          style={{opacity: 1-scrollPosition/500}}
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
        <div className="intro-info">
          <h3 className="sub-info">WPI Undergrad Student</h3>
          <h3 className="sub-info">Robotic Engineering</h3>
          <h3 className="sub-info">Global Lab Web Developer</h3>
          <h3 className="sub-info">Computer Science</h3>
        </div>
      </section>

      <section className = "about-me" id="about-me">
        <AboutMe>
          
        </AboutMe>
        {/* <div className = "about-picture">
          <div className = "picture-container">
              <div className = "collapsible-items" style={{transform: activeCollapsibleIndex == 2 ? "translateY(-33.33%)": activeCollapsibleIndex == 3 ? "translateY(-66.66%)": "translateY(0)"}}>
                <div>
                    <img src={HeadShot} alt="" />
                </div>
                <div>
                    <img src={Varsity} alt="" />
                </div>
                <div>
                    <img src={Drawing} alt="" />
                </div>
              </div>
          </div>   
          <div className = "randomBlock"></div>
        </div>
        
        <div className = "about-info">
          <div className = "about-title">
            <h1>A Few Words About Me</h1>
            <h2>Innovation - Passion - Creativity</h2>
          </div>
          <Collapsible trigger="- ✧ Professional ✧ -" open={openCollapsibleOne} onOpening={() => handleOpen(1)}>
              <p>
                Over the last three years I have been honing my leadership skills through
                projects and programs where I can have an impact on my surrounding 
                communities.
              </p>
              <p>
                I have been working at the WPI Global Lab, spearheading a full visual and 
                thematic overhaul of the website to show the evolving student 
                initiatives and faculty research.
              </p>
              <p>
                In my collegiate career, I have been active in the Society of Asian 
                Scientists and Engineers as an Events Coordinator in which I planned 
                weekly events focused on professional devlopment, community service 
                and cultural empowerment that increased active-membership by 63%, 
                 winning WPI's 2025 Social Program of the Year and SASE's 2025 Overall
                 Strongest Chapter.
              </p>
              <p>
                I work as a Resident Advisor for the 2025-26 academic year 
                where I will be responsible for overseeing and providng mentorship to 
                incoming freshmen.
              </p>
          </Collapsible>

          <Collapsible trigger = "- ✧ Technical ✧ -" open = {openCollapsibleTwo} onOpening={() => handleOpen(2)}>
            <h4>Front-End</h4>
            <p>Technology Stack: HTML5, CSS, JavaScript, TypeScript, Python</p>  
            <p>Tools: Boostrap, ReactJS, Kivy/KivyMD, Figma</p>
            <h4>Back-End</h4>
            <p>Technology Stack: Java, Python, C++</p>
            <p>Tools: NodeJS, FireBase, VexV5</p>
          </Collapsible>

          <Collapsible trigger = "- ✧ Personal ✧ -" open = {openCollapsibleThree} onOpening={() => handleOpen(3)}>
            <p>On a more personoal level, hi, I'm Colin Truong (he/him) and I'm from Milton, Massachusetts!</p>
            <p>
              When I am away from my desk I enjoy getting out into the world. I enjoy rock climbing
              playing video games, watching basketball, and any activity that gets my adrenaline up. 
            </p>
            <p>
              Like my work, I'm very interested in creative expression. I'm a big fan of videography and
              story-telling. Whether it's a book, comic, tv-show, or movie I can get easily caught up in 
              unique stories and complicated characters
            </p>
            <p>Feel free to follow me on Instagram <a href="https://www.instagram.com/colinptruong/">@instagram.com/colinptruong</a></p>
            
          </Collapsible>
        </div> */}

      </section>      
      
      <section id="projects">
        <div className="major-toggle">

        </div>

        <div className="project-screen" id="projects">
          <div className="project-title-card">
            <h1 className="resolution-title">Resolution</h1>
            <h2 className="resolution-subtitle">Diabetic Health Goals App</h2>
            <h3 className="resolution-text">Kivy Front-End</h3>
            <h3 className="resolution-text">FireBase Back-End</h3>
            <div className="resolution-hyperlinks">
              <a
                href="https://github.com/ColinTruong28/Resolution"
                className="github-link resolution"
              >
                <FaGithub size="2.5vw" />
                <h2>Github</h2>
              </a>
              {/* icon */}
            </div>
          </div>

          <div className="resolution-display-card">
            
            <div className="circular-container">
            <img className="phone-screen res-home " src={Resolution_example_homepage} alt="" />
            <img className="phone-screen res-record " src={Resolution_example_recordpage} alt="" />

            <img className="Resolution-Icon" src={Resolution} alt="Resolution Icon" />

            </div>
          </div>
        </div>

        <div className="project-screen" id="projects">
          <div className="project-title-card">
            <h1 className="auto-romi-title">Autonomous Robot</h1>
            <h2 className="auto-romi-subtitle">Multi-Sensor PID Decision Making</h2>
            <div className="auto-romi-hyperlinks">
              <a
                href="https://github.com/ColinTruong28/RBE2002?tab=readme-ov-file"
                className="github-link"
              >
                <FaGithub size="2.5vw" />
                <h2>Github</h2>
              </a>
              {/* icon */}
            </div>
          </div>

          <div className="auto-romi-display-card">
            
            
            <AutoRomiShowcase></AutoRomiShowcase>


          </div>
        </div>

        <div className="project-screen" id="projects">
          <div className="project-title-card">
            <h1 className="five-bar-title">Shelf Sorting Arm</h1>
            <h2 className="five-bar-subtitle">Five-Bar Linkage</h2>
            <h3 className="five-bar-text">Designed, Modeled, and Tested in SolidWorks</h3>
            <div className="five-bar-hyperlinks">
              {/* icon */}
              {/* icon */}
            </div>
          </div>

          <div className="five-bar-display-card">
            
            
            <FiveBarShowcase>

            </FiveBarShowcase>


          </div>
        </div>

        {/* <div className="embedded-PI-motor-controller-screen" id="projects">
          <div className="embedded-PI-motor-controller-card">
            <h1 className="embedded-PI-motor-controller-title">Embedded PI Motor Controller</h1>
            <h2 className="embedded-PI-motor-controller-subtitle">Raspberry PI Pico W</h2>
            <h3 className="embedded-PI-motor-controller-text">Designed in KiCad</h3>
            <h3 className="embedded-PI-motor-controller-text">Programmed in C</h3>
            <h3 className="embedded-PI-motor-controller-text">Deployed with Linux on a VMWare Workstation</h3>
            <div className="embedded-PI-motor-controller-hyperlinks">
              {}
              {}
            </div>
          </div>

          <div className="embedded-PI-motor-controller-display-card">
            
            
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              navigation={true}
              pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className}">${embeddedSlideLabels[index]}</span>`;
                }
              }}
            >
              <SwiperSlide>
                <video src={SolidworksFiveBarDemo} className="embedded-PI-motor-controller-slide" autoPlay muted loop/>
              </SwiperSlide>
              <SwiperSlide>
                <img src={EmbeddedSchematic} alt="Schematic of Embedded PI Motor Controller" className="embedded-PI-motor-controller-slide" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={EmbeddedSchematic} alt="Schematic of Embedded PI Motor Controller" className="embedded-PI-motor-controller-slide" />
              </SwiperSlide>
            </Swiper>


          </div>
        </div> */}
      </section>

      

      {/* Contact Me Section */}
      <section className = "contacts" id="contact">
        <div className="contactMe">Feel Free to Reach Out!</div>
        <div className="email">
          <h3>Write me -</h3>
          <HiPencilAlt size="20vh" style={{margin:"4vh"}}/>
          <a className = "link" href="mailto:ColinPTruong@gmail.com">ColinPTruong@gmail.com</a>
        </div>
        <div className = "phone_number">
          <h3>Contact Me -</h3>
          <PiPhoneCallFill size="20vh" style={{margin:"4vh"}}/>
          <h1 className = "link">+1 (617) 762 8333</h1>
        </div>
        <div className = "linkedin">
          <h3>Connect with Me - </h3>
          <FaLinkedin size="20vh" style={{margin:"4vh"}}/>
          <a className = "link" href="https://www.linkedin.com/in/colinptruong/">www.linkedin.com/in/ColinPTruong</a>
        </div>
      </section>
      <section className="footer">

      </section>
      
    </main>
  )
}

export default App


