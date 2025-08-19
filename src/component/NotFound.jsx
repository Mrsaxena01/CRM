import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#081b29] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-[#0ef] mb-4">404</h1>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">Oops! Page Not Found</h2>
          <p className="text-gray-400">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-[#0ef] text-[#081b29] 
                     font-semibold rounded-lg hover:bg-white transition-colors 
                     duration-300 ease-in-out"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;