import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import HeadShot from './images/Prof Headshot.JPG?url';
import Varsity from './images/Varsity.JPG?url'
import Drawing from './images/Drawing.jpg'

export default function ProfCarousel() {
 return (
    <div style={{overflow: "hidden", height: "400px"}}>
        <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={false} interval={7000}>
            <div>
                <img src={HeadShot} alt="Slide 1"  />
            </div>
            <div>
                <img src={Varsity} alt="Slide 2" />
            </div>
            <div>
                <img src={Drawing} alt="Slide 3" />
            </div>
        </Carousel>
   </div>
 );
}