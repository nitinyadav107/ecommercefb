import React, { useState } from 'react';

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const onSubmitHandler=async (e)=>{
    try{
      e.preventDefault();
    }
    catch(err){
      console.log(err)
    }
  }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Panel</h1>
        <form>
          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-2">Email Address</p>
            <input
              type="email"
              placeholder="nitinyadav4800@gmail.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-2">Password</p>
            <input
              type="password"
              placeholder="Enter Your Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
