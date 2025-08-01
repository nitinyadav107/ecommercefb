import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg dark:text-white dark:bg-slate-800">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Contact Us</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white"
            id="name"
            type="text"
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white"
            id="email"
            type="email"
            placeholder="Your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white"
            id="message"
            rows="4"
            placeholder="Your message"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-800"
            type="button"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;

