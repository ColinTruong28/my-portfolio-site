import {useState, useEffect} from 'react'
import './App.css'
import Navbar from './Navbar'
import Typewriter from 'typewriter-effect'
import CherryBlossoms from './cherryBlossoms'
import Resolution from './Resolution.png'
import Resolution_example_homepage from './Resolution_example_homepage.png'
import Resolution_example_recordpage from './Resolution_example_recordpage.png'

function App() {

  // scrollPosition can be used to track the user's position within the webpage
  const [scrollPosition, setScrollPosition] = useState(0);
  
      const handleScroll = () => {
          const position = window.pageYOffset;
          setScrollPosition(position);
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
      <div className="title-screen" 
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
      </div>

      <div className = "about-me">
        <div></div>
      </div>      

      <div className="Resolution-screen" id="projects">
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
      </div>

      {/* Contact Me Section */}
      <div className = "contacts" id="contact">
        <div className="contactMe">Feel Free to Reach Out!</div>
        <div className="email">
          <h3>Write me -</h3>
          <a className = "link" href="mailto:ColinPTruong@gmail.com">ColinPTruong@gmail.com</a>
        </div>
        <div className = "phone_number">
          <h3>Contact Me -</h3>
          <h1 className = "link">+1 (617) 762 8333</h1>
        </div>
        <div className = "linkedin">
          <h3>Connect with Me - </h3>
          <a className = "link" href="https://www.linkedin.com/in/cptruong2005/">www.linkedin.com/in/cptruong2005</a>
        </div>
      </div>
      
    </main>
  )
}

export default App




























{/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}