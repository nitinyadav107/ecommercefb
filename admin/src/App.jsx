import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; 
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency='$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(() => {
    localStorage.setItem('token',token);

    
  },[token]
  )

  return (
    
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        token === "" ? 
          <Login setToken={setToken}/>
         : 
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List  token={token}/>} /> {/* Corrected path casing */}
                  <Route path='/order' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
          
        
      } 
    </div>
  );
};

export default App;
