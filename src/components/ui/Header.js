import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { RiSlideshow3Fill } from 'react-icons/ri';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Use useMemo to memoize navItems
  const navItems = useMemo(() => [
    { id: 0, name: 'Home', icon: <MdMovie />, path: '/' },
    { id: 1, name: 'Movies', icon: <MdMovie />, path: '/movies' },
    { id: 2, name: 'TV Shows', icon: <RiSlideshow3Fill />, path: '/tv' },
    { id: 3, name: 'Upcoming', icon: <BsFillCalendarEventFill />, path: '/upcoming' }
  ], []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.id);
    }
  }, [navItems]);

  return (
    <header className="header">
      {/* Desktop Header */}
      <div className="header-desktop">
        <div className="flex items-center space-x-8">
          <Link to="/" className="logo">
            Picture Pass
          </Link>
          <nav className="nav-desktop">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="header-actions">
          <button className="location-button">
            <FaMapMarkerAlt />
            <span>Select Location</span>
          </button>
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="header-mobile">
        <div className="mobile-header">
          <Link to="/" className="logo">
            Picture Pass
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="search-button"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mobile-menu">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`mobile-nav-link ${activeTab === index ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(index);
                  setIsMenuOpen(false);
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 