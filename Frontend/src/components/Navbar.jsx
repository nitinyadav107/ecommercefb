import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36' alt="Logo" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p className='text-black'>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p className='text-black'>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p className='text-black'>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p className='text-black'>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search Icon" />

        <div className='group relative'>
          <Link to='/login'>
            <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="Profile Icon" />
          </Link>
          <div className='absolute hidden group-hover:block bg-white right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart Icon" />
          <p className='absolute top-[-10px] right-[-10px] w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center'>
            {getCartCount()}
          </p>
        </Link>

        <img onClick={() => setVisible(!visible)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu Icon" />
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(!visible)} className='flex items-center gap-4 p-3'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Back Icon" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
          <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border' to='/about'>About</NavLink>
          <NavLink onClick={() => setVisible(!visible)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
