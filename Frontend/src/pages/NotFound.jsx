import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  let navigate = useNavigate();

  const gotoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-r h-screen p-12 from-slate-100 via-slate-200 to-slate-100 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 text-slate-900 dark:text-white px-4">
      {/* 404 Heading */}
      <h1 className="text-8xl md:text-9xl font-extrabold tracking-wider animate-pulse text-red-500 drop-shadow-lg">
        404
      </h1>

      {/* Message */}
      <p className="mt-6 text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={gotoHome}
        className="mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
      >
        ⬅ Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
