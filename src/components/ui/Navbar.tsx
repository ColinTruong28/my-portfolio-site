import { useState } from 'react';
import "./Navbar.css"
import { scrollToAboutMe } from '../../lib/lenis';

function Navbar() {
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    return (
        <nav className="navbar container-fluid">
            <button
                className="nav-hamburger"
                aria-label="Toggle navigation menu"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
            >
                <span className={`hamburger-bar ${open ? 'open' : ''}`} />
                <span className={`hamburger-bar ${open ? 'open' : ''}`} />
                <span className={`hamburger-bar ${open ? 'open' : ''}`} />
            </button>

            <div className={`nav-links ${open ? 'open' : ''}`}>
                <div className="glowy-text-wrapper">
                    <a
                        className="glowy-text"
                        href="#about-me"
                        onClick={(e) => {
                            e.preventDefault();
                            close();
                            if (window.location.hash !== '#about-me') {
                                history.pushState(null, '', '#about-me');
                            }
                            scrollToAboutMe();
                        }}
                    >
                        About Me
                    </a>
                </div>
                <div className="glowy-text-wrapper">
                    <a className="glowy-text" href="#projects" onClick={close}>Projects</a>
                </div>
                <div className="glowy-text-wrapper">
                    <a className="glowy-text" href="#contact" onClick={close}>Contact</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar