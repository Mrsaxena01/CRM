import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faUsers, faCog, faCalendarDays,
  faProjectDiagram, faSignOutAlt, faChevronLeft,
  faChevronRight, faClipboardList, faChartBar
} from '@fortawesome/free-solid-svg-icons';
import { useSidebar } from '../context/SidebarContext';  // ✅ import context

function Slider() {
  const { isOpen, toggleSidebar } = useSidebar();  // ✅ use context
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: faHome, path: '/OwnerDashboard' },
    { name: 'Users', icon: faUsers, path: '/users' },
    { name: 'Settings', icon: faCog, path: '/setting' },
    { name: 'Projects', icon: faProjectDiagram, path: '/project' },
    { name: 'Leaves', icon: faCalendarDays, path: '/leaves' },
    { name: 'Attendance Report', icon: faClipboardList, path: '/attendanceReport' },
    { name: 'Attendance Summary', icon: faChartBar, path: '/attendanceSummary' },
  ];

  const handleNavigation = (path) => navigate(path);
  const handleLogout = () => navigate('/login');

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#081b29] text-white 
      transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'} shadow-lg`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 border-b border-[#0ef]/20">
        <div className="flex items-center">
          {isOpen ? (
            <img src="/BIREENA-INFO-TECH.jpg" alt="Logo" className="w-40 h-12 object-contain" />
          ) : (
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 flex items-center justify-center bg-[#0ef]/10 text-[#0ef] rounded-md hover:bg-[#0ef]/20 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          )}
        </div>
        {isOpen && (
          <button
            onClick={toggleSidebar}
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
            onClick={() => handleNavigation(item.path)}
            className={`flex items-center cursor-pointer px-4 py-3 
              hover:bg-[#0ef]/10 transition-colors 
              ${isOpen ? 'justify-start' : 'justify-center'}`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <FontAwesomeIcon icon={item.icon} className={`${isOpen ? 'text-lg' : 'text-xl'} text-[#0ef]`} />
            </div>
            {isOpen && <span className="ml-3 text-sm font-medium">{item.name}</span>}
          </div>
        ))}
      </div>

      {/* Bottom Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#0ef]/20">
        <div
          onClick={handleLogout}
          className={`flex items-center cursor-pointer px-4 py-3 hover:bg-[#0ef]/10 transition-colors 
          ${isOpen ? 'justify-start' : 'justify-center'}`}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <FontAwesomeIcon icon={faSignOutAlt} className={`${isOpen ? 'text-lg' : 'text-xl'} text-[#0ef]`} />
          </div>
          {isOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
        </div>
      </div>
    </div>
  );
}

export default Slider;
