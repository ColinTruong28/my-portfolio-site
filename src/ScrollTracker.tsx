import { useState, useEffect } from 'react';

function ScrollTracker() {
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
        <div>
            <h1>Scroll Position: {scrollPosition}</h1>
        </div>
    );
};

export default ScrollTracker