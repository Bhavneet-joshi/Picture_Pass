import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-dark-800 rounded-lg overflow-hidden ${
      hover ? 'transition-transform duration-200 hover:scale-105' : ''
    } ${className}`}>
      {children}
    </div>
  );
};

export default Card; 