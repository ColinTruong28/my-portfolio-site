import {useState, useEffect} from 'react'
import './App.css'
import Navbar from './Navbar'
import Collapsible from 'react-collapsible';
import Typewriter from 'typewriter-effect'
import CherryBlossoms from './cherryBlossoms'
import { HiPencilAlt } from "react-icons/hi";
import { PiPhoneCallFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import Varsity from './images/Varsity.JPG?url'
import HeadShot from './images/Prof Headshot.JPG?url';
import Drawing from './images/Drawing.JPG?url'
import FiveBarDemo from './images/FiveBarDemo.mp4?url';
import SolidworksFiveBarDemo from './images/Solidworks_FiveBar_Demo.mp4?url';
import StressedBar from './images/Bar_Stress_Analysis.png?url';
import Resolution from './images/Resolution.png'
import Resolution_example_homepage from './images/Resolution_example_homepage.png'
import Resolution_example_recordpage from './images/Resolution_example_recordpage.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';



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
    const slideLabels = [
      'Design',
      'Analysis',
      'Demo'
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
        <div className = "about-picture">
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
          <Collapsible trigger="- Professional -" open={openCollapsibleOne} onOpening={() => handleOpen(1)}>
              <p>
                Over the last three years I have been honing my leadership skills through
                projects and programs where I can have an impact on my surrounding 
                communities.
              </p>
              <p>
                I have been working at the WPI Global Lab, spearheading a full visual and 
                thematic overhaul of the main website to represent the evolving student 
                initiatives and faculty research.
              </p>
              <p>
                In my collegiate career, I have been active in the Society of Asian 
                Scientists and Engineers as an Events Coordinator in which I planned 
                weekly events focused on professional devlopment, community service 
                and cultural empowerment that increased active-membership by 63% 
                and contributed to winning WPI's 2025 Social Program of the Year and 
                SASE's 2025 Overall Strongest Chapter.
              </p>
              <p>
                I will be working as a Resident Advisor for the 2025-26 academic year 
                where I will be responsible for overseeing and providng mentorship to 
                incoming freshmen.
              </p>
          </Collapsible>

          <Collapsible trigger = "- Technical -" open = {openCollapsibleTwo} onOpening={() => handleOpen(2)}>
            <h4>Front-End</h4>
            <p>Technology Stack: HTML5, CSS, JavaScript, TypeScript, Python</p>  
            <p>Tools: Boostrap, ReactJS, Kivy/KivyMD, Figma</p>
            <h4>Back-End</h4>
            <p>Technology Stack: Java, Python, C++</p>
            <p>Tools: NodeJS, FireBase, VexV5</p>
          </Collapsible>

          <Collapsible trigger = "- Personal -" open = {openCollapsibleThree} onOpening={() => handleOpen(3)}>
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
        </div>
      </section>      
      
      <section id="projects">
        <div className="major-toggle">

        </div>

        <div className="Resolution-screen" id="projects">
          <div className="resolution-title-card">
            <h1 className="resolution-title">Resolution</h1>
            <h2 className="resolution-subtitle">Diabetic Health Goals App</h2>
            <h3 className="resolution-text">Kivy Front-End</h3>
            <h3 className="resolution-text">FireBase Back-End</h3>
            <div className="resolution-hyperlinks">
              {/* icon */}
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

        <div className="five-bar-screen" id="projects">
          <div className="five-bar-title-card">
            <h1 className="five-bar-title">Shelf Sorting Arm</h1>
            <h2 className="five-bar-subtitle">Five-Bar Linkage</h2>
            <h3 className="five-bar-text">Designed, Modeled, and Tested in SolidWorks</h3>
            <div className="five-bar-hyperlinks">
              {/* icon */}
              {/* icon */}
            </div>
          </div>

          <div className="five-bar-display-card">
            
            
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className}">${slideLabels[index]}</span>`;
                }
              }}
              style={{ height: '50vh' }}
            >
              <SwiperSlide>
                <video src={SolidworksFiveBarDemo} className="five-bar-slide" autoPlay muted loop/>
              </SwiperSlide>
              <SwiperSlide>
                <img src={StressedBar} alt="Five_Bar_Stress_Tested_SolidWorks" className="five-bar-slide" />
              </SwiperSlide>
              <SwiperSlide>
                <video src={FiveBarDemo} className="five-bar-slide" autoPlay muted loop/>
              </SwiperSlide>
            </Swiper>


          </div>
        </div>
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
          <a className = "link" href="https://www.linkedin.com/in/cptruong2005/">www.linkedin.com/in/cptruong2005</a>
        </div>
      </section>
      <section className="footer">

      </section>
      
    </main>
  )
}

export default App


