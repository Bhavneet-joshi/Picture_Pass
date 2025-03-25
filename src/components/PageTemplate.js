import React from 'react';

const PageTemplate = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-dark-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Movie Details</h1>
            <button className="text-primary-500 hover:text-primary-600 transition-colors">
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageTemplate; 