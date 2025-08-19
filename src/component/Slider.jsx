import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUser, 
  faCog, 
  faEnvelope, 
  faChartLine,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

function Slider() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: faHome },
    { name: 'Profile', icon: faUser },
    { name: 'Settings', icon: faCog },
    { name: 'Messages', icon: faEnvelope },
    { name: 'Analytics', icon: faChartLine },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#081b29] text-white transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      } shadow-lg`}
    >
      {/* Header Section with Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-[#0ef]/20">
        <div className="flex items-center">
          {isOpen ? (
            <img
              src="../public/BIREENA-INFO-TECH.jpg"
              alt="Logo"
              className="w-40 h-12 object-contain"
            />
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="w-8 h-8 flex items-center justify-center bg-[#0ef]/10 text-[#0ef] rounded-md hover:bg-[#0ef]/20 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          )}
        </div>
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center bg-[#0ef]/10 text-[#0ef] rounded-md hover:bg-[#0ef]/20 transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="py-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center cursor-pointer px-4 py-3 hover:bg-[#0ef]/10 transition-colors
              ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <FontAwesomeIcon 
                icon={item.icon} 
                className={`${isOpen ? 'text-lg' : 'text-xl'} text-[#0ef]`} 
              />
            </div>
            {isOpen && (
              <span className="ml-3 text-sm font-medium">{item.name}</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#0ef]/20">
        <div
          className={`flex items-center cursor-pointer px-4 py-3 hover:bg-[#0ef]/10 transition-colors
            ${isOpen ? 'justify-start' : 'justify-center'}`}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <FontAwesomeIcon 
              icon={faSignOutAlt} 
              className={`${isOpen ? 'text-lg' : 'text-xl'} text-[#0ef]`} 
            />
          </div>
          {isOpen && (
            <span className="ml-3 text-sm font-medium">Logout</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Slider;