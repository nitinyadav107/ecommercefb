import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes('/') && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    navigate('/collection');
  };

  return showSearch && visible ? (
    <div className='bg-white dark:bg-slate-800'>
    <div className="flex items-center justify-center p-6 md:p-0">
        <div className='relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
          <input
            type='text'
            className='w-full h-10 pr-10 border border-gray-300 rounded-full p-2 dark:bg-slate-700 dark:text-white dark:border-gray-600'
            placeholder='Search for products'
            value={search}
            onChange={handleInputChange}
          />
          <img
            src={assets.search_icon}
            alt="search"
            className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50 dark:opacity-75'
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default SearchBar;