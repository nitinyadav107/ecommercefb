import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl, verifyemail,
    setVerifyemail } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        console.log(currentState)
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        console.log(response.data);
        if (response.data.success) {
          // setToken(response.data.token);
          // localStorage.setItem('token', response.data.token);
          setVerifyemail(true);
          
          localStorage.setItem('email', response.data.email);
          console.log(response.data.email);

          console.log(response.data.message);
        } else {
          toast.error(response.data.message);
          console.log(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          console.log(response.data);
          console.log(response.data.v)
          if(response.data.v === false){
            setVerifyemail(true);
            navigate('/verifyemail')

          }
          else{
            navigate('/');
            setToken(response.data.token);
             localStorage.setItem('token', response.data.token);
          }
          
          console.log("ntin")
          // setToken(response.data.token);
          // localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
          console.log(response.data.message);
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request data:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  useEffect(() => {

    if (verifyemail === true && currentState !== 'Login') {
      navigate('/verifyemail');
    }
  }, [verifyemail]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 dark:text-white dark:bg-slate-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl dark:text-white'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 dark:bg-white' />
      </div>
      {currentState === 'Login' ? '' : (
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 dark:border-white dark:bg-slate-800' placeholder='Name' />
      )}
      <input onChange={(e) => setEmail(e.target.value)} value={email} required type="email" className='w-full px-3 border py-2 border-gray-800 dark:border-white dark:bg-slate-800' placeholder='Email' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} required type="password" className='w-full px-3 py-2 border border-gray-800 dark:border-white dark:bg-slate-800' placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[-8px] dark:text-white'>
        <p className='cursor-pointer dark:text-white'>Forgot Your Password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer dark:text-white'>Create Account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer dark:text-white'>Already have an account?</p>
        )}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded-sm dark:bg-gray-700 dark:text-white'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
}

export default Login;