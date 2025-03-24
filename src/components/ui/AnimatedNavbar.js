import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMovie } from 'react-icons/md';
import { RiSlideshow3Fill } from 'react-icons/ri';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import './AnimatedNavbar.css';

const AnimatedNavbar = () => {
  const [activeTab, setActiveTab] = useState(0); // Default to Home
  const location = useLocation();

  const navItems = useMemo(() => [
    { id: 0, name: 'Home', icon: <FaHome />, path: '/' },
    { id: 1, name: 'Movies', icon: <MdMovie />, path: '/movies' },
    { id: 2, name: 'TV', icon: <RiSlideshow3Fill />, path: '/tv' },
    { id: 3, name: 'Upcoming', icon: <BsFillCalendarEventFill />, path: '/upcoming' }
  ], []);

  // Update active tab based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    const item = navItems.find(item => item.path === currentPath);
    if (item) {
      setActiveTab(item.id);
    } else if (currentPath.includes('/movies/') || currentPath.includes('/movie/')) {
      setActiveTab(1); // Movies tab
    } else if (currentPath.includes('/tv/')) {
      setActiveTab(2); // TV tab
    }
  }, [location.pathname, navItems]);

  return (
    <div className="animated-navbar">
      {navItems.map((item) => (
        <input 
          key={`input-${item.id}`}
          type="radio" 
          name="nav" 
          id={`nav${item.id}`}
          checked={activeTab === item.id}
          onChange={() => setActiveTab(item.id)}
        />
      ))}
      
      {navItems.map((item) => (
        <label 
          key={`label-${item.id}`}
          htmlFor={`nav${item.id}`}
        >
          <Link to={item.path}>
            {item.icon}
          </Link>
        </label>
      ))}
      
      <div className="circle"></div>
      <div className="navbar_content">
        <div className="navbar_bottom">
          <span className="indicator"></span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedNavbar; 