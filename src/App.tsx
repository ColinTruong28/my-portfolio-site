import {createContext, useContext, useState, useEffect} from 'react'
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
import Resolution from './images/Resolution.png'
import Resolution_example_homepage from './images/Resolution_example_homepage.png'
import Resolution_example_recordpage from './images/Resolution_example_recordpage.png'

function App() {

  // scrollPosition can be used to track the user's position within the webpage
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeCarouselIndex, setActiveIndex] = useState<number | null>(null);
  const [openCarouselOne, setCarouselOne] = useState(true);
  const [openCarouselTwo, setCarouselTwo] = useState(false);
  const [openCarouselThree, setCarouselThree] = useState(false);

      const handleScroll = () => {
          const position = window.pageYOffset;
          setScrollPosition(position);
      };

      const handleOpen = (index: number) => {
        setActiveIndex(index);
        if (index == 1) {
          setCarouselOne(true);
          setCarouselTwo(false);
          setCarouselThree(false);
        } else if (index == 2) {
          setCarouselOne(false);
          setCarouselTwo(true);
          setCarouselThree(false);
        } else {
          setCarouselOne(false);
          setCarouselTwo(false);
          setCarouselThree(true);
        }
      };
  
      useEffect(() => {
          window.addEventListener('scroll', handleScroll, {passive: true});
      
  
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  
      }, []); 


  
    
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
              strings: ["Software Engineer", "Web Developer", "Robotic Systems Programmer"],
              autoStart: true,
              loop: true,
              delay: 250,
            }} />
          </div>
        </div>
        <div className="intro-info">
          <h3 className="sub-info">WPI Undergrad Student</h3>
          <h3 className="sub-info">Robotic Engineering</h3>
          <h3 className="sub-info">SASE Events Coordinator</h3>
          <h3 className="sub-info">Computer Science</h3>
        </div>
      </section>

      <section className = "about-me" id="about-me">
        <div className = "about-picture">
          <div className = "picture-container">
              <div className = "carousel-items" style={{transform: activeCarouselIndex == 2 ? "translateY(-33.33%)": activeCarouselIndex == 3 ? "translateY(-66.66%)": "translateY(0)"}}>
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
          <Collapsible trigger="- Professional -" open={openCarouselOne} onOpening={() => handleOpen(1)}>
              <p>
                Over the last three years I have been honing my leadership skills through
                projects and programs where I can have an impact on my surrounding 
                communities.
              </p>
              <p>
                In my collegiate career, I have been active in the Society of Asian 
                Scientists and Engineers as an Events Coordinator in which I planned 
                weekly events focused on professional devlopment, community service 
                and cultural empowerment that increased active-membership by 63%.
              </p>
              <p>
                I will be working as a Resident Advisor for the 2025-26 academic year 
                where I will be responsible for overseeing and providng mentorship to 
                incoming freshmen.
              </p>
          </Collapsible>

          <Collapsible trigger = "- Technical -" open = {openCarouselTwo} onOpening={() => handleOpen(2)}>
            <h4>Front-End</h4>
            <p>Technology Stack: HTML5, CSS, JavaScript, TypeScript, Python</p>  
            <p>Tools: Boostrap, ReactJS, Kivy/KivyMD, Figma</p>
            <h4>Back-End</h4>
            <p>Technology Stack: Java, Python, C++</p>
            <p>Tools: NodeJS, FireBase, VexV5</p>
          </Collapsible>

          <Collapsible trigger = "- Personal -" open = {openCarouselThree} onOpening={() => handleOpen(3)}>
            <p>I'm a fatty :p</p>
          </Collapsible>
        </div>
      </section>      

      <section className="Resolution-screen" id="projects">
        <div className="resolution-title-card">
          <h1 className="resolution-title">Resolution</h1>
          <h2 className="resolution-subtitle">Diabetic Health Goals App</h2>
          <h3 className="resolution-text">Kivy Front-End</h3>
          <h3 className="resolution-text">Python Back-End</h3>
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


