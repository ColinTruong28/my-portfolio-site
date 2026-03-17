'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Varsity from './images/Varsity.JPG?url'
import HeadShot from './images/Prof Headshot.JPG?url';
import Drawing from './images/Drawing.JPG?url';
import OrbitingSkills from './orbiting';
import ProfCarousel from './profCarousel';

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const tabs = [
    {
      id: 1,
      name: 'Professional',
      icon: '💼',
      content: (
        // Adding flex and row direction here
        <div className="flex flex-col lg:flex-row gap-8 items-start my-auto">
          <div className="w-full lg:w-100 flex-shrink-0">
            <ProfCarousel></ProfCarousel>
          </div>
          <div className="flex-1 space-y-5 text-l my-auto">
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
              In my collegiate career, I have been active in the Society of Asian Scientists and Engineers as President and Events Coordinator,
              increasing active-membership by 63% through the organization of 50+ yearly events, winning National Overall Strongest Chapter of 2025.
            </p>
            <p>
              I also act as a Volunteer Manager for the Pan Asian Association, coordinating a 1000+ attendee, six-figure event with 100+ unique volunteers and 10+ student organizations.
            </p>
          </div>
          {/* Image next to the text */}
          
        </div>
      )
    },
    {
      id: 2,
      name: 'Tech Stack',
      icon: '🛠️',
      content: (
        <div className="flex flex-wrap gap-4">
          <OrbitingSkills></OrbitingSkills>
          <div>
            <p>As an aspring Software and Robotic Engineer, I have much experience with many different languages and frameworks.</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      name: 'Personal',
      icon: '🎨',
      content: (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
           <div className="flex-1 ">
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
           </div>
           <div className="grid grid-cols-2 gap-2 w-full lg:w-80">
             <img src={Varsity} alt="Varsity" className="rounded-lg h-32 object-cover" />
             <img src={Drawing} alt="Drawing" className="rounded-lg h-32 object-cover" />
           </div>
        </div>
      )
    },
  ];

  return (
    <div className='flex justify-center items-center min-h-screen w-full py-10'>
      <div className='w-full max-w-[80vw]'>
        <div className='flex flex-col md:flex-row gap-6 items-start'>
          
          {/* Sidebar */}
          <div className='w-full md:w-56 flex md:flex-col gap-2 rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-lg p-2'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative group flex items-center w-full px-4 py-4 transition-all rounded-lg z-10
                  ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId='tabBackground'
                    // COLOR CHANGE: Edit the gradient here (e.g., red for WPI)
                    className='absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 rounded-lg -z-10'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <div className='flex items-center gap-3'>
                  <span className='text-xl'>{tab.icon}</span>
                  <span className='font-medium'>{tab.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area - FIXED HEIGHT AND OVERFLOW */}
          <div className='flex-1 relative rounded-3xl bg-white/10 dark:bg-gray-900/40 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[500px]'>
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key='loader'
                  className='absolute inset-0 z-20 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="animate-spin h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className='p-10 h-auto'
              >
                <div className='prose dark:prose-invert max-w-none'>
                  {tabs.find((tab) => tab.id === activeTab)?.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}