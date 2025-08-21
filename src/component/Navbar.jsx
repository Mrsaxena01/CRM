import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faUser, 
  faSearch, 
  faBars,
  faXmark,
  faSignOut,
  faCog,
  faQuestionCircle,
  faProjectDiagram,
  faUsers,
  faCalendarAlt,
  faChartBar,
  faClock,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import { useSidebar } from '../context/SidebarContext';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const { isOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Mock data - आप अपने actual data से replace करें
  const mockData = {
    users: [
      { id: 1, name: 'John Doe', role: 'Developer', email: 'john@company.com' },
      { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@company.com' },
      { id: 3, name: 'Mike Johnson', role: 'Manager', email: 'mike@company.com' },
    ],
    projects: [
      { id: 1, name: 'E-commerce App', status: 'Active', team: 5 },
      { id: 2, name: 'Mobile Dashboard', status: 'Completed', team: 3 },
      { id: 3, name: 'Analytics Platform', status: 'In Progress', team: 7 },
    ],
    documents: [
      { id: 1, name: 'Project Requirements.pdf', type: 'PDF', size: '2.5MB' },
      { id: 2, name: 'Team Guidelines.docx', type: 'DOCX', size: '1.2MB' },
      { id: 3, name: 'Budget Report.xlsx', type: 'XLSX', size: '890KB' },
    ]
  };

  // Search functionality
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = [];
      const lowerQuery = query.toLowerCase();

      // Search in users
      mockData.users.forEach(user => {
        if (user.name.toLowerCase().includes(lowerQuery) || 
            user.role.toLowerCase().includes(lowerQuery) ||
            user.email.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'user',
            icon: faUser,
            title: user.name,
            subtitle: `${user.role} • ${user.email}`,
            action: () => navigate(`/users?search=${user.name}`)
          });
        }
      });

      // Search in projects
      mockData.projects.forEach(project => {
        if (project.name.toLowerCase().includes(lowerQuery) || 
            project.status.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'project',
            icon: faProjectDiagram,
            title: project.name,
            subtitle: `${project.status} • ${project.team} team members`,
            action: () => navigate(`/project?search=${project.name}`)
          });
        }
      });

      // Search in documents
      mockData.documents.forEach(doc => {
        if (doc.name.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'document',
            icon: faFileAlt,
            title: doc.name,
            subtitle: `${doc.type} • ${doc.size}`,
            action: () => console.log('Opening document:', doc.name)
          });
        }
      });

      // Add navigation suggestions
      const navigationItems = [
        { path: '/dashboard', name: 'Dashboard', icon: faChartBar },
        { path: '/users', name: 'User Management', icon: faUsers },
        { path: '/project', name: 'Projects', icon: faProjectDiagram },
        { path: '/leaves', name: 'Leave Management', icon: faCalendarAlt },
        { path: '/attendanceReport', name: 'Attendance Report', icon: faClock }
      ];

      navigationItems.forEach(item => {
        if (item.name.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'navigation',
            icon: item.icon,
            title: item.name,
            subtitle: 'Go to page',
            action: () => navigate(item.path)
          });
        }
      });

      setSearchResults(results.slice(0, 8)); // Limit to 8 results
      setShowSearchResults(true);
      setSearchLoading(false);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
      if (!event.target.closest('.mobile-menu')) {
        setShowMobileMenu(false);
      }
      if (!event.target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
    setShowProfileMenu(false);
    setShowSearchResults(false);
  }, [location.pathname]);

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const getPageTitle = () => {
    const paths = {
      '/dashboard': 'Dashboard',
      '/users': 'User Management',
      '/setting': 'Settings',
      '/project': 'Project Management',
      '/leaves': 'Leave Management',
      '/attendanceReport': 'Attendance Report',
      '/attendanceSummary': 'Attendance Summary'
    };
    return paths[location.pathname] || '';
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      searchResults[0].action(); // Execute first result action
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (result) => {
    result.action();
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const getTypeColor = (type) => {
    const colors = {
      user: 'text-blue-600',
      project: 'text-green-600',
      document: 'text-purple-600',
      navigation: 'text-orange-600'
    };
    return colors[type] || 'text-gray-600';
  };

  return (
    <nav 
      className={`fixed top-0 z-50 h-16 bg-white shadow-md transition-all duration-300 ease-in-out
        ${isOpen ? 'left-64 w-[calc(100%-16rem)]' : 'left-16 w-[calc(100%-4rem)]'}`}
    >
      <div className="h-full px-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 truncate">
          {getPageTitle()}
        </h1>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative search-container">
            <form onSubmit={handleSearch}>
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users, projects, documents..."
                className="w-80 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none 
                  focus:ring-2 focus:ring-[#0ef]/50 focus:border-[#0ef] transition-all"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              {searchLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0ef]"></div>
                </div>
              )}
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchResultClick(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      >
                        <FontAwesomeIcon 
                          icon={result.icon} 
                          className={`${getTypeColor(result.type)} text-sm`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {result.subtitle}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400 capitalize">
                          {result.type}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.trim() && !searchLoading ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <FontAwesomeIcon icon={faSearch} className="text-2xl mb-2 opacity-30" />
                    <p className="text-sm">No results found for "{searchQuery}"</p>
                    <p className="text-xs mt-1">Try searching for users, projects, or documents</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <FontAwesomeIcon icon={faBell} className="text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative profile-menu">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-[#0ef]/10 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-[#081b29]" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
                  <FontAwesomeIcon icon={faCog} className="mr-2 text-gray-400" />
                  Profile Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-gray-400" />
                  Help Center
                </button>
                <hr className="my-1" />
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                >
                  <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg mobile-menu"
        >
          <FontAwesomeIcon 
            icon={showMobileMenu ? faXmark : faBars} 
            className="text-xl text-gray-600" 
          />
        </button>
      </div>

      {showMobileMenu && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden border-t border-gray-200">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users, projects, documents..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none 
                  focus:ring-2 focus:ring-[#0ef]/50 focus:border-[#0ef]"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </form>

            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <FontAwesomeIcon icon={faBell} className="text-gray-600" />
                <span className="text-sm font-medium">Notifications</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                <span className="text-sm font-medium">Settings</span>
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-gray-50 rounded-lg"
              >
                <FontAwesomeIcon icon={faSignOut} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;