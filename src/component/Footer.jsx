import React, { useState, useEffect } from 'react';
import { useSidebar } from '../context/SidebarContext';

function Footer() {
  const currentUser = 'admin';
  const department = 'admin';
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const { isOpen } = useSidebar();

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      className={`bg-[#081b29] z-99 text-white py-4 px-6 fixed bottom-0 transition-all duration-300 ease-in-out
        ${isOpen ? 'left-64 w-[calc(100%-16rem)]' : 'left-16 w-[calc(100%-4rem)]'}`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-2 md:mb-0">
          Copyright © 2025 
          <span className="text-[#0ef] mx-1 font-semibold">BIREENA INFO TECH</span>
        </div>
        <div className="text-gray-400">
          <span className="mx-1">|</span>
          {currentTime}
          <span className="mx-1">|</span>
          {currentUser}
          <span className="text-gray-500 ml-1">
            (Dept: {department})
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;