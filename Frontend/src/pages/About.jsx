import React from 'react';

const About = () => {
  return (
    <div className="px-6 py-12 bg-gray-100 dark:bg-slate-800 min-h-screen flex flex-col items-center text-center dark:text-white">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">About Us</h1>
      <p className="text-lg max-w-3xl text-gray-600 dark:text-gray-400">
        Welcome to our website! We aim to provide high-quality products/services with a user-friendly experience.
        Whether you're here to explore, shop, or learn more, we're glad to have you.
        Our mission is to deliver excellence through technology and design. 🌟
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white dark:bg-slate-800 p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-white mb-2">🚀 Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-400">To build impactful digital experiences that make lives easier and more connected.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-white mb-2">💼 What We Do</h2>
          <p className="text-gray-600 dark:text-gray-400">We develop scalable web solutions with a focus on speed, design, and functionality.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-white mb-2">🌱 Our Values</h2>
          <p className="text-gray-600 dark:text-gray-400">Innovation, user satisfaction, transparency, and continuous improvement.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

