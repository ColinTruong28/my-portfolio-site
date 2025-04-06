
import "./Navbar.css"

function Navbar() {

    return(
        <nav className="navbar container-fluid">
            <div className="glowy-text-wrapper">
                <a className="glowy-text" href="#contact">Contact</a>
            </div>
            <div className="glowy-text-wrapper">
                <a className="glowy-text" href="#projects">Projects</a>
            </div>
            <div className="glowy-text-wrapper">
                <h1 className="glowy-text">About Me</h1>
            </div>
        </nav>
    )
}

export default Navbar