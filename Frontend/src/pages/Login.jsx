import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useRef } from 'react';

const LoginForm = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, backendUrl, verifyemail, setVerifyemail} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();

  }, []);



  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setVerifyemail(true);
          localStorage.setItem('email', response.data.email);
          toast.success("Verification email sent!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          console.log(response.data);
          if (response.data.v === false) {
            setVerifyemail(true);
            navigate('/verifyemail');
          } else {
            navigate('/');
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
          }
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const api = axios.create({
    baseURL: `${backendUrl}/api/user`,
  });

  const googleAuth = (code) => api.get(`/google?code=${code}`);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const { email, name, image } = result.data.user;
        const token = result.data.token;
        const obj = { email, name, token, image };

        localStorage.setItem("user-info", JSON.stringify(obj));
        setToken(token);
        localStorage.setItem("token", token);
        navigate("/");
        toast.success("Logged in with Google!");
      } else {
        throw new Error("Google login failed");
      }
    } catch (e) {
      toast.error("Error while Google Login");
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: () => toast.error("Google login failed!"),
    flow: "auth-code",
  });

  useEffect(() => {
    if (verifyemail === true && currentState !== 'Login') {
      navigate('/verifyemail');
    }
  }, [verifyemail]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 text-gray-800 dark:text-white dark:bg-slate-800 p-6 rounded-lg shadow-lg'>
      <div className='inline-flex items-center gap-2 mb-4'>
        <h2 className='text-3xl font-bold dark:text-white'>{currentState}</h2>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 dark:bg-white' />
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800 dark:border-white dark:bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Name'
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        ref={inputRef}
        required
        type="email"
        className='w-full px-3 py-2 border border-gray-800 dark:border-white dark:bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Email'
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        type="password"
        className='w-full px-3 py-2 border border-gray-800 dark:border-white dark:bg-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Password'
      />

      <div className='w-full flex justify-between text-sm mt-2 dark:text-white'>
        <p className='cursor-pointer' onClick={() => navigate('/forgetpassword')}>Forgot Your Password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Already have an account?</p>
        )}
      </div>

      {/* Sign In / Sign Up Button */}
      {/* Sign In / Sign Up Button */}
      <button
        type="submit"
        className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 mt-4 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Loading...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
      </button>

      {/* Google Button */}
      <div className='mt-4 w-full'>
        <button
          type="button"
          onClick={googleLogin}
          className='w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-full py-3 text-gray-700 font-medium shadow hover:shadow-md transition-all duration-300 dark:bg-slate-700 dark:border-gray-600 dark:text-white'
        >
          <span className="flex items-center justify-center w-full dark:bg-slate-700 rounded-full">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="google"
              className="w-5 h-5 dark:bg-slate-700"
            />
            <span className="ml-2 dark:bg-slate-700 ">Continue with Google</span>
          </span>
        </button>
      </div>

    </form >
  );
};

// Wrap in GoogleOAuthProvider
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
};

export default Login;
