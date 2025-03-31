import  { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import SearchBar from './SearchBar';
import { FaShoppingBag } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setVerifyemail, setCartItems } = useContext(ShopContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    navigate('/login');
    setVerifyemail(false);
    localStorage.removeItem("token");
    setToken('');
    setCartItems({});
  }

  return (
    <div className={`flex items-center justify-between py-5 font-medium dark:text-white dark:bg-slate-800 ${sticky ? "sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out" : ""}`}>
      <Link to='/' className='w-36 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold cursor-pointer text-gray-700 dark:text-white' alt="Logo">
        LIBAS
      </Link>




      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 dark:text-white dark:bg-slate-800 '>
        <NavLink to='/' className='flex flex-col items-center gap-1 dark:text-white dark:bg-slate-800'>
          <p className='text-black dark:text-white dark:bg-slate-800'>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-slate-800' />
        </NavLink>
        

        <NavLink to='/collection' className='flex flex-col items-center gap-1 dark:text-white dark:bg-slate-800'>
          <p className='text-black dark:text-white dark:bg-slate-800'>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-slate-800' />
        </NavLink>

        <NavLink to='/about' onClick={() => setShowSearch(false)}  className='flex flex-col items-center gap-1 dark:text-white dark:bg-slate-800'>
          <p className='text-black dark:text-white dark:bg-slate-800'>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-slate-800' />
        </NavLink>

        <NavLink to='/contact' onClick={() => setShowSearch(false)}  className='flex flex-col items-center gap-1 dark:text-white dark:bg-slate-800'>
          <p className='text-black dark:text-white dark:bg-slate-800'>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden dark:bg-slate-800' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6 dark:text-white dark:bg-slate-800'>
        {!showSearch && (

          <IoSearchOutline size={30} onClick={() => setShowSearch(true)} />

        )}
       
        <div className='hidden  md:block'>
          <SearchBar />
        </div>
       



        <label className="swap swap-rotate dark:text-white dark:bg-slate-800">
          <input
            type="checkbox"
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            checked={theme === "dark"}
            className="hidden"
          />
          {theme === "light" ? (
            <svg
              className="swap-off h-8 w-10 fill-current dark:text-white dark:bg-slate-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          ) : (
            <svg
              className="swap-on h-8 w-10 fill-current dark:text-white dark:bg-slate-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.08-.88A7.49,7.49,0,0,1,13.88,3.44a1,1,0,0,0-1-1.08h-.16a10,10,0,1,0,9,11.64A1,1,0,0,0,21.64,13ZM12,20A8,8,0,0,1,12,4.07,9.47,9.47,0,0,0,14,12a9.47,9.47,0,0,0,2,7.93A7.93,7.93,0,0,1,12,20Z" />
            </svg>
          )}
        </label>

        <div className='group relative dark:text-white dark:bg-slate-800 z-10'>

          <CgProfile size={30} onClick={() => token ? null : navigate('/login')} />
          {token && <div className='absolute hidden group-hover:block bg-white right-0 pt-4 dark:text-white dark:bg-slate-800'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded dark:text-white dark:bg-slate-800'>
              <p className='cursor-pointer hover:text-black dark:text-white dark:bg-slate-800'>My Profile</p>
              <p onClick={() => navigate('/order')} className='cursor-pointer hover:text-black dark:text-white dark:bg-slate-800'>Orders</p>
              
              <p onClick={() => logout()} className='cursor-pointer hover:text-black dark:text-white dark:bg-slate-800'>Logout</p>
            </div>
          </div>}
        </div>

        <Link to='/cart' onClick={() => setShowSearch(false)} className='relative dark:text-white dark:bg-slate-800'>

          <FaShoppingBag size={25} />
          <p className='absolute top-[-10px] right-[-10px] w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center dark:text-white dark:bg-red-500'>
            {getCartCount()}
          </p>
        </Link>

        <img onClick={() => setVisible(!visible)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden dark:text-white dark:bg-slate-800' alt="Menu Icon" />
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden z-10 bg-white transition-all ${visible ? 'w-full' : 'w-0'} dark:text-white dark:bg-slate-800`}>
        <div className='flex flex-col text-gray-600 dark:text-white dark:bg-slate-800'>
          <div onClick={() => setVisible(!visible)} className='flex items-center gap-4 p-3 dark:text-white dark:bg-slate-800'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180 dark:text-white dark:bg-slate-800' alt="Back Icon" />
            <p className='dark:text-white dark:bg-slate-800'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border dark:text-white dark:bg-slate-800' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border dark:text-white dark:bg-slate-800' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => {setVisible(!visible)  , setShowSearch(false)}}  className='py-2 pl-6 border dark:text-white dark:bg-slate-800' to='/about'>About</NavLink>
          <NavLink onClick={() => {setVisible(!visible)  , setShowSearch(false)}} className='py-2 pl-6 border dark:text-white dark:bg-slate-800' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;